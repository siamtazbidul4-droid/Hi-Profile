import { useEffect, useState } from 'react';

import { Mail, MailOpen, Trash2 } from 'lucide-react';

import { api } from '../../services/api';

import { useToast } from '../../context/ToastContext';

import { ContactMessageData } from '../../types';

export function AdminMessagesManager() {
  const { success, error } = useToast();

  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageData | null>(null);

  const fetchMessages = () => {
    setLoading(true);

    api
      .getContactMessages()
      .then((res) => {
        if (res.success) {
          setMessages(res.data);

          if (res.data.length > 0 && !selectedMessage) {
            setSelectedMessage(res.data[0]);
          }
        }
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to load client inquiries.';

        error('Failed to Load Messages', message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg: ContactMessageData) => {
    try {
      const res = await api.updateContactMessage(msg._id, {
        isRead: !msg.isRead,
      });

      if (res.success) {
        success(
          'Status Updated',
          `Message marked as ${!msg.isRead ? 'Read' : 'Unread'}.`,
        );

        fetchMessages();

        if (selectedMessage?._id === msg._id) {
          setSelectedMessage({
            ...selectedMessage,
            isRead: !msg.isRead,
          });
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to update message status.';

      error('Update Failed', message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteContactMessage(id);

      success('Inquiry Deleted', 'Removed from MongoDB.');

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }

      fetchMessages();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete inquiry.';

      error('Delete Failed', message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Client Inquiries & Consultations CMS
          </h1>

          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized to MongoDB ContactMessage Collection
          </p>
        </div>
      </div>

      {/* Messages layout */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading client inquiries from MongoDB...
        </div>
      ) : messages.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Message List */}
          <div className="lg:col-span-5 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => {
                  setSelectedMessage(msg);

                  if (!msg.isRead) {
                    api
                      .updateContactMessage(msg._id, { isRead: true })
                      .then(() => {
                        fetchMessages();
                      })
                      .catch((err: unknown) => {
                        const message =
                          err instanceof Error
                            ? err.message
                            : 'Failed to mark message as read.';

                        error('Status Update Failed', message);
                      });
                  }
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedMessage?._id === msg._id
                    ? 'bg-neutral-900 border-emerald-500 shadow-md'
                    : msg.isRead
                      ? 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                      : 'bg-neutral-900/90 border-emerald-500/40 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-neutral-100">
                    {msg.name}
                  </span>

                  <span className="text-[10px] font-mono text-neutral-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs font-semibold text-neutral-200 truncate">
                  {msg.subject || 'Consultation Request'}
                </p>

                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {msg.message}
                </p>

                <div className="flex items-center gap-2 mt-3 text-[10px] font-mono">
                  {msg.projectBudget && (
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-emerald-400">
                      {msg.projectBudget}
                    </span>
                  )}

                  {!msg.isRead && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Message Detail View */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/60 space-y-6">
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-100">
                      {selectedMessage.subject || 'Consultation Inquiry'}
                    </h2>

                    <p className="text-xs text-neutral-400 font-mono mt-1">
                      From:{' '}
                      <span className="text-neutral-200 font-bold">
                        {selectedMessage.name}
                      </span>{' '}
                      ({selectedMessage.email})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleRead(selectedMessage)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                      title={
                        selectedMessage.isRead
                          ? 'Mark as Unread'
                          : 'Mark as Read'
                      }
                    >
                      {selectedMessage.isRead ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MailOpen className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">
                      Budget
                    </span>

                    <span className="text-xs font-bold text-emerald-400">
                      {selectedMessage.projectBudget || 'Not specified'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">
                      Timeline
                    </span>

                    <span className="text-xs font-bold text-cyan-400">
                      {selectedMessage.timeline || 'Flexible'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">
                      Received Date
                    </span>

                    <span className="text-xs font-bold text-neutral-300 font-mono">
                      {new Date(
                        selectedMessage.createdAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    Inquiry Body
                  </h3>

                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Direct Reply CTA */}
                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || 'Consultation Inquiry',
                    )}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />

                    <span>Reply to {selectedMessage.name}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-16 rounded-3xl border border-neutral-800 bg-neutral-900/30 text-center text-xs text-neutral-400 font-mono">
                Select an inquiry from the left to view complete details.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-16 rounded-3xl border border-neutral-800 bg-neutral-900/30 text-center space-y-2">
          <p className="text-base font-semibold text-neutral-200">
            Inbox is empty
          </p>

          <p className="text-xs text-neutral-400 font-mono">
            New contact submissions sent through the contact form will appear
            here.
          </p>
        </div>
      )}
    </div>
  );
}