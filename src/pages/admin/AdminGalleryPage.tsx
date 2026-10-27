import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  ExternalLink,
  Save,
  X,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/gallery');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setItems(data.gallery || []);
        }
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Gallery Management | MOBNET Admin';
    fetchGallery();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleTogglePublish = async (item: any) => {
    const updatedStatus = !item.isPublished;
    try {
      const res = await authFetch(`/api/admin/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: updatedStatus })
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((g) => (g.id === item.id ? { ...g, isPublished: updatedStatus } : g))
        );
        showToast(`Item "${item.title}" ${updatedStatus ? 'published' : 'hidden'}.`);
      }
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the gallery?`)) {
      return;
    }

    try {
      const res = await authFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((g) => g.id !== id));
        showToast('Gallery photo deleted.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    try {
      const isNew = !items.some((g) => g.id === editingItem.id);
      const url = isNew ? '/api/admin/gallery' : `/api/admin/gallery/${editingItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        await fetchGallery();
        setEditingItem(null);
        showToast('Gallery item saved.');
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredItems = items.filter((item) =>
    categoryFilter === 'all' ? true : item.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  return (
    <AdminLayout title="Lab &amp; Equipment Gallery" subtitle="Manage authentic lab photographs, workstation showcases, and equipment topics">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292F91] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Category Filter:</span>
          <div className="flex flex-wrap gap-1">
            {['all', 'campus', 'hardware', 'training', 'general'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#292F91] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchGallery}
            disabled={loading}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() =>
              setEditingItem({
                id: `gallery-${Date.now()}`,
                topicNumber: items.length + 1,
                title: 'New Lab Workstation',
                category: 'hardware',
                description: 'State of the art workstation equipment at MOBNET Dhanbad practical lab.',
                badge: 'Lab Equipment',
                altText: 'Technical equipment at MOBNET International institute',
                visualType: 'tools',
                imageUrl: '',
                isPublished: true
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Gallery Photo</span>
          </button>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#292F91]" />
          Loading gallery photos...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-16 text-center text-slate-500 text-xs bg-white rounded-xl border border-slate-200">
          <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <p className="font-semibold text-slate-800 text-sm">No gallery items in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                item.isPublished ? 'border-slate-200' : 'border-amber-300 bg-amber-50/10'
              }`}
            >
              <div>
                {/* Image Preview / Placeholder */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-slate-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <span className="text-[11px] block">Interactive Technical Asset</span>
                      <span className="text-[10px] text-slate-500 font-mono">({item.visualType})</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-[#292F91] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {item.badge}
                  </span>
                  <span
                    className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                      item.isPublished ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {item.isPublished ? 'Live' : 'Hidden'}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="capitalize font-semibold text-[#292F91]">{item.category}</span>
                    <span>Topic #{item.topicNumber}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-montserrat">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(item)}
                  className={`text-xs font-semibold px-2 py-1 rounded border transition-colors ${
                    item.isPublished
                      ? 'border-amber-300 text-amber-800 hover:bg-amber-50'
                      : 'border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {item.isPublished ? 'Hide from public' : 'Publish to gallery'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...item })}
                    className="p-1.5 rounded text-slate-500 hover:text-[#292F91] hover:bg-blue-50"
                    title="Edit Item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900 font-montserrat">Edit Gallery Item</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  >
                    <option value="campus">Campus</option>
                    <option value="hardware">Hardware</option>
                    <option value="training">Training</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingItem.badge}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="e.g. Optical Bench"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL / Local Asset Path</label>
                <input
                  type="text"
                  value={editingItem.imageUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  placeholder="/assets/aistudio/IMG_20261024_134215_de481772.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={editingItem.isPublished}
                  onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                  className="h-4 w-4 rounded text-[#292F91] border-slate-300"
                />
                <label htmlFor="pub-check" className="font-semibold text-slate-800 cursor-pointer">
                  Publish on live gallery
                </label>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#292F91] text-white rounded-lg font-semibold hover:bg-[#1f2473] flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
