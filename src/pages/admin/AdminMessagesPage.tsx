import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Mail,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  RefreshCw,
  X
} from 'lucide-react';

export const AdminMessagesPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (unreadOnly) params.append('unreadOnly', 'true');

      const res = await authFetch(`/api/admin/messages?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages || []);
          if (selectedMessage) {
            const updated = data.messages.find((m: any) => m.id === selectedMessage.id);
            if (updated) setSelectedMessage(updated);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Contact Inquiries | MOBNET Admin';
    fetchMessages();
  }, [unreadOnly]);

  const handleToggleRead = async (id: string, isRead: boolean) => {
    try {
      const res = await authFetch(`/api/admin/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead })
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev: any) => ({ ...prev, isRead }));
        }
      }
    } catch (err) {
      console.error('Failed to update read status:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedMessage) return;

    setIsSubmittingNote(true);
    try {
      const res = await authFetch(`/api/admin/messages/${selectedMessage.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.messageItem) {
          setSelectedMessage(data.messageItem);
          setMessages((prev) =>
            prev.map((m) => (m.id === data.messageItem.id ? data.messageItem : m))
          );
          setNoteText('');
        }
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await authFetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <AdminLayout title="Contact Messages &amp; Inquiries" subtitle="Manage incoming queries from website visitors and follow up promptly">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchMessages();
          }}
          className="flex-1 flex items-center gap-2 w-full"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries by sender name, phone, or text..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473]"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
              className="h-4 w-4 rounded text-[#292F91] border-slate-300"
            />
            <span>Show Unread Only</span>
          </label>

          <button
            onClick={fetchMessages}
            disabled={loading}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#292F91]" />
            Loading contact inquiries...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">
            <Mail className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-800 text-sm">No messages found</p>
            <p className="text-slate-400 mt-1">Queries submitted via the Contact page will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 transition-colors ${
                  msg.isRead ? 'bg-white hover:bg-slate-50/60' : 'bg-blue-50/30 hover:bg-blue-50/60 border-l-4 border-l-[#292F91]'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm font-montserrat">{msg.name}</span>
                    <span className="text-[11px] font-mono text-slate-500">📞 {msg.phone}</span>
                    {msg.email && <span className="text-[11px] text-slate-400">({msg.email})</span>}
                    <span className="text-[10px] text-slate-400 ml-auto md:ml-2">
                      {new Date(msg.receivedAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                    "{msg.message}"
                  </p>

                  {msg.notes && msg.notes.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#292F91]" />
                      <span>{msg.notes.length} internal note{msg.notes.length > 1 ? 's' : ''} recorded</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 md:pt-1">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(msg.id, !msg.isRead)}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
                      msg.isRead
                        ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                        : 'border-blue-300 bg-[#292F91] text-white hover:bg-[#1f2473]'
                    }`}
                  >
                    {msg.isRead ? 'Mark Unread' : 'Mark as Read'}
                  </button>

                  <a
                    href={`tel:${msg.phone}`}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    title={`Call ${msg.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/91${msg.phone}?text=${encodeURIComponent(
                      `Hello ${msg.name}, thank you for contacting MOBNET International Dhanbad. Regarding your query: "${msg.message.slice(0, 40)}..."`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50"
                    title="Reply via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50"
                    title="Add Notes & Details"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Notes Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Inquiry from {selectedMessage.name}</h3>
                <p className="text-xs text-slate-500">Phone: {selectedMessage.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 mb-4">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Message Content:</span>
              <p className="italic leading-relaxed">"{selectedMessage.message}"</p>
            </div>

            <div className="space-y-3 mb-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#292F91]" />
                <span>Internal Staff Notes</span>
              </h4>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {!selectedMessage.notes || selectedMessage.notes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
                ) : (
                  selectedMessage.notes.map((n: any) => (
                    <div key={n.id} className="p-2.5 bg-slate-50 rounded-lg text-xs border border-slate-100">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                        <strong className="text-slate-800">{n.author}</strong>
                        <span>{new Date(n.createdAt).toLocaleTimeString('en-IN')}</span>
                      </div>
                      <p className="text-slate-700">{n.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Log call outcome or action taken..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
              />
              <button
                type="submit"
                disabled={isSubmittingNote || !noteText.trim()}
                className="px-3.5 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] disabled:opacity-50 flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Save</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
