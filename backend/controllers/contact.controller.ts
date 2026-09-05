import { Request, Response, NextFunction } from 'express';
import { ContactMessage } from '../models/ContactMessage.model.js';
import { ContactMessageSchema } from '../validators/schemas.js';
import { sendContactEmail } from '../services/email.service.js';
import { config } from '../config/env.js';

export async function submitContactMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = ContactMessageSchema.parse(req.body);
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

    const message = await ContactMessage.create({
      ...validatedData,
      ipAddress: ipAddress || 'unknown',
    });

    // SMTP Email Delivery to configured owner/receiver inbox
    if (config.smtpUser && config.smtpPassword) {
      try {
        await sendContactEmail({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          projectBudget: validatedData.projectBudget,
          timeline: validatedData.timeline,
          ipAddress: ipAddress || 'unknown',
          createdAt: message.createdAt,
        });
      } catch (smtpErr) {
        // Log technical detail on server without leaking credentials or internal stack traces
        console.error(
          '[SMTP Error] Message delivery to owner failed:',
          smtpErr instanceof Error ? smtpErr.message : 'Unknown SMTP transport error'
        );
        res.status(503).json({
          success: false,
          error: 'Your message could not be sent right now. Please try again later.',
        });
        return;
      }
    } else {
      console.warn(
        '[SMTP Notice] SMTP_USER and SMTP_PASSWORD are not yet configured in environment variables. Inquiry recorded in database.'
      );
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been transmitted securely. Alexander will get back to you promptly.',
      data: {
        id: message._id,
        createdAt: message.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { isRead, isArchived } = req.query;
    const filter: Record<string, any> = {};

    if (isRead !== undefined) {
      filter.isRead = isRead === 'true';
    }

    if (isArchived !== undefined) {
      filter.isArchived = isArchived === 'true';
    } else {
      filter.isArchived = false; // default unarchived
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    next(err);
  }
}

export async function updateMessageStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { isRead, isArchived } = req.body;

    const updateFields: Record<string, any> = {};
    if (typeof isRead === 'boolean') updateFields.isRead = isRead;
    if (typeof isArchived === 'boolean') updateFields.isArchived = isArchived;

    const message = await ContactMessage.findByIdAndUpdate(id, updateFields, { new: true });
    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found.' });
      return;
    }

    res.json({ success: true, message: 'Message updated.', data: message });
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByIdAndDelete(id);
    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found.' });
      return;
    }
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
