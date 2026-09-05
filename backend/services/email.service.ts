import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectBudget?: string;
  timeline?: string;
  ipAddress?: string;
  createdAt?: Date;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const isGmail = config.smtpHost === 'smtp.gmail.com' || config.smtpHost.toLowerCase().includes('gmail');
    if (isGmail) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.smtpUser,
          pass: config.smtpPassword,
        },
      });
    } else {
      const isSecure = config.smtpPort === 465;
      transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: isSecure,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPassword,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });
    }
  }
  return transporter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<{ delivered: boolean; skipped?: boolean }> {
  // If SMTP credentials are not configured, log a safe server message and return gracefully
  if (!config.smtpUser || !config.smtpPassword) {
    console.warn('[SMTP Service] SMTP credentials not provided in environment. Contact message recorded in database; email delivery skipped.');
    return { delivered: false, skipped: true };
  }

  const receiver = config.contactReceiverEmail || config.adminEmail;
  const fromAddress = `"${config.smtpFromName}" <${config.smtpFromEmail || config.smtpUser}>`;
  const subjectLine = `New Contact Form Message — ${payload.name}`;
  const formattedDate = payload.createdAt ? new Date(payload.createdAt).toUTCString() : new Date().toUTCString();

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject);
  const safeBudget = escapeHtml(payload.projectBudget || 'Not specified');
  const safeTimeline = escapeHtml(payload.timeline || 'Not specified');
  const safeIp = escapeHtml(payload.ipAddress || 'unknown');
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');

  const textContent = `
New Contact Inquiry Received:

Visitor Name: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}
Investment Tier: ${payload.projectBudget || 'Not specified'}
Target Timeline: ${payload.timeline || 'Not specified'}
Submission Time: ${formattedDate}
Origin IP: ${payload.ipAddress || 'unknown'}

Message:
${payload.message}
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #10b981, #0d9488); padding: 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Contact Form Message</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Portfolio Inquiry Transmission</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">From:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #0d9488; text-decoration: none;">${safeEmail}</a>&gt;</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
          <td style="padding: 8px 0; color: #0f172a;">${safeSubject}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Budget Tier:</td>
          <td style="padding: 8px 0; color: #0f172a;">${safeBudget}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Timeline:</td>
          <td style="padding: 8px 0; color: #0f172a;">${safeTimeline}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Timestamp:</td>
          <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${formattedDate} (IP: ${safeIp})</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1e293b;">
          ${safeMessage}
        </div>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(payload.subject)}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; text-decoration: none;">Reply to ${safeName}</a>
      </div>
    </div>
    <div style="background: #f1f5f9; padding: 12px 24px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
      Delivered via Vance Portfolio Secure SMTP Gateway
    </div>
  </div>
</body>
</html>
  `.trim();

  const mailOptions: nodemailer.SendMailOptions = {
    from: fromAddress,
    to: receiver,
    replyTo: payload.email,
    subject: subjectLine,
    text: textContent,
    html: htmlContent,
  };

  const client = getTransporter();
  await client.sendMail(mailOptions);
  return { delivered: true };
}
