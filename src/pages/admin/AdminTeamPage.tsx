import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Users, Plus, Trash2, Edit3, CheckCircle2, Save, X, RefreshCw } from 'lucide-react';

export const AdminTeamPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTeam(data.team || []);
        }
      }
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Faculty & Leadership | MOBNET Admin';
    fetchTeam();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setIsSaving(true);
    try {
      const isNew = !team.some((m) => m.id === editingMember.id);
      const url = isNew ? '/api/admin/team' : `/api/admin/team/${editingMember.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember)
      });

      if (res.ok) {
        await fetchTeam();
        setEditingMember(null);
        showToast('Team member saved successfully.');
      }
    } catch (err) {
      console.error('Failed to save team member:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from the faculty list?`)) return;
    try {
      const res = await authFetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTeam((prev) => prev.filter((m) => m.id !== id));
        showToast('Member removed.');
      }
    } catch (err) {
      console.error('Failed to delete member:', err);
    }
  };

  return (
    <AdminLayout title="Faculty &amp; Leadership" subtitle="Manage verified instructors, lab directors, and mentors featured on the website">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292F91] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-montserrat">Faculty &amp; Leadership Members</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Profiles synchronized with public About &amp; Contact page directories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTeam}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() =>
              setEditingMember({
                id: `team-${Date.now()}`,
                name: 'New Faculty Member',
                role: 'Senior Hardware Instructor',
                initials: 'NF',
                experience: '10+ Years Chip-Level Repairing',
                accentColor: 'bg-[#292F91]'
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Faculty Member</span>
          </button>
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#292F91]" />
          Loading faculty list...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl text-white font-bold flex items-center justify-center text-base shadow-xs ${
                      member.accentColor || 'bg-[#292F91]'
                    }`}
                  >
                    {member.initials || 'MB'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-montserrat">{member.name}</h3>
                    <p className="text-xs text-[#292F91] font-semibold">{member.role}</p>
                  </div>
                </div>

                {member.experience && (
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {member.experience}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember({ ...member })}
                  className="p-1.5 rounded text-slate-500 hover:text-[#292F91] hover:bg-blue-50"
                  title="Edit member"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-montserrat">Edit Faculty Member</h3>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role / Designation</label>
                <input
                  type="text"
                  required
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  placeholder="e.g. Senior Faculty or Managing Director"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Experience / Specialty</label>
                <textarea
                  rows={2}
                  value={editingMember.experience || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, experience: e.target.value })}
                  placeholder="e.g. Master of Schematic Diagnostics & Borneo Bitmaps"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Badge Accent Color</label>
                <select
                  value={editingMember.accentColor || 'bg-[#292F91]'}
                  onChange={(e) => setEditingMember({ ...editingMember, accentColor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                >
                  <option value="bg-[#292F91]">Royal Blue (#292F91)</option>
                  <option value="bg-[#D9272E]">MOBNET Red (#D9272E)</option>
                  <option value="bg-[#1E2368]">Deep Navy (#1E2368)</option>
                  <option value="bg-emerald-700">Emerald Green</option>
                </select>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
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
                  <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
