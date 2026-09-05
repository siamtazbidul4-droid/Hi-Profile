import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mail,
  Send,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  Shield,
  Phone,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export function ContactPage() {
  const location = useLocation();
  const defaultSubject = (location.state as any)?.defaultSubject || '';
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: defaultSubject || '',
    message: '',
    projectBudget: '$25,000 – $50,000',
    timeline: '1 – 3 Months',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const budgetTiers = [
    '< $15,000',
    '$15,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000+',
    'Advisory / Retainer',
  ];

  const timelineTiers = [
    'Immediate (Within 2 Weeks)',
    '1 – 3 Months',
    '3 – 6 Months',
    'Flexible / Ongoing',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      error('Validation Error', 'Please complete your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        success('Inquiry Transmitted', res.message);
        setSubmitted(true);

        // Extended duration and high particle density confetti effect
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 0 };

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 75 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }
      }
    } catch (err: any) {
      error('Submission Failed', err.message || 'Unable to transmit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Consultation & Advisory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
          Initiate an Architectural Dialogue
        </h1>
        <p className="text-slate-600 dark:text-neutral-400 text-base leading-relaxed">
          Whether you need a full-stack platform build, principal systems review, or high-concurrency database re-architecture, submit your inquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-neutral-100">Inquiry Transmitted</h3>
                <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Alexander has received your message in the secure CMS and will review the specifications within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                      projectBudget: '$25,000 – $50,000',
                      timeline: '1 – 3 Months',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                      Your Full Name <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                      Corporate / Work Email <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sjenkins@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                    Subject / Objective
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Greenfield Architecture for FinTech Core Engine"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                    Anticipated Investment Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setFormData({ ...formData, projectBudget: tier })}
                        className={`p-2.5 rounded-xl border text-xs font-mono text-center transition-all cursor-pointer ${
                          formData.projectBudget === tier
                            ? 'bg-emerald-50 dark:bg-neutral-800 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                            : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                    Target Execution Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timelineTiers.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setFormData({ ...formData, timeline: time })}
                        className={`p-2.5 rounded-xl border text-xs font-mono text-center transition-all cursor-pointer ${
                          formData.timeline === time
                            ? 'bg-emerald-50 dark:bg-neutral-800 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                            : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                    Project Scope & System Details <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your system requirements, current bottlenecks, target SLA, and tech preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Consultation Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Info Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Details Card */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xl dark:shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-100">Direct Engineering Channels</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-neutral-400">Direct Email</p>
                  <a
                    href="mailto:alexander.vance.dev@gmail.com"
                    className="text-sm font-semibold text-slate-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    siamtazbidul@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-neutral-400">Location & Timezone</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200">
                    San Francisco, California • PST / UTC-8
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-neutral-400">Response SLA</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200">
                    Within 24 business hours guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Privacy Notice */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-neutral-800/80 bg-slate-100/80 dark:bg-neutral-950/60 flex items-start gap-3.5 text-xs text-slate-600 dark:text-neutral-400">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 dark:text-neutral-300 block mb-1">
                Confidentiality & NDA
              </span>
              All project specifications and architecture inquiries are treated with strict confidentiality. Mutual NDAs executed upon request prior to architecture deep-dives.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

