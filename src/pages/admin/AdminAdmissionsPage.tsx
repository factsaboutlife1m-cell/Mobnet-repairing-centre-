import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  GraduationCap,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  MessageSquare,
  Clock,
  Send,
  X
} from 'lucide-react';

export const AdminAdmissionsPage: React.FC = () => {
  const { authFetch, admin } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [courseFilter, setCourseFilter] = useState('all');

  const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
  const [noteText, setNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
      if (courseFilter && courseFilter !== 'all') params.append('course', courseFilter);

      const res = await authFetch(`/api/admin/admissions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setAdmissions(data.admissions || []);
          if (selectedAdmission) {
            const updatedSelected = data.admissions.find((a: any) => a.id === selectedAdmission.id);
            if (updatedSelected) setSelectedAdmission(updatedSelected);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load admissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Admissions Management | MOBNET Admin';
    fetchAdmissions();
  }, [statusFilter, courseFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdmissions();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await authFetch(`/api/admin/admissions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAdmissions((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
        if (selectedAdmission && selectedAdmission.id === id) {
          setSelectedAdmission((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedAdmission) return;

    setSubmittingNote(true);
    try {
      const res = await authFetch(`/api/admin/admissions/${selectedAdmission.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.admission) {
          setSelectedAdmission(data.admission);
          setAdmissions((prev) =>
            prev.map((a) => (a.id === data.admission.id ? data.admission : a))
          );
          setNoteText('');
        }
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete admission record ${id}?`)) {
      return;
    }

    try {
      const res = await authFetch(`/api/admin/admissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAdmissions((prev) => prev.filter((a) => a.id !== id));
        if (selectedAdmission && selectedAdmission.id === id) {
          setSelectedAdmission(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete admission:', err);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await authFetch('/api/admin/export/admissions.csv');
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mobnet-admissions-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error('CSV export failed:', err);
    }
  };

  const statusColors: Record<string, string> = {
    New: 'bg-red-50 text-red-700 border-red-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    Admitted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Closed: 'bg-slate-100 text-slate-600 border-slate-300'
  };

  return (
    <AdminLayout title="Admission Applications" subtitle="Review student applications, manage statuses, and track counseling follow-ups">
      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name, phone, application ID, or city..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Admitted">Admitted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Course:</span>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none max-w-[160px]"
              >
                <option value="all">All Programs</option>
                <option value="advance-mobile-hardware-software">Advance Mobile</option>
                <option value="basic-mobile-repairing">Basic Mobile</option>
                <option value="mobile-chip-level-repairing">Chip-Level Repairing</option>
                <option value="laptop-repairing">Laptop Repairing</option>
                <option value="computer-hardware-troubleshooting">Computer Hardware</option>
                <option value="mobile-repairing-notes">Course Notes</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              title="Download admissions CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={fetchAdmissions}
              disabled={loading}
              type="button"
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Admissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#292F91]" />
            Loading admission records...
          </div>
        ) : admissions.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">
            <GraduationCap className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-800 text-sm">No admission applications match your criteria</p>
            <p className="text-slate-500 mt-1">Try resetting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Student Details</th>
                  <th className="py-3 px-3">Selected Course</th>
                  <th className="py-3 px-3">Batch / Hostel</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] font-semibold text-[#292F91]">
                      {adm.id}
                      {adm.notes && adm.notes.length > 0 && (
                        <span className="block text-[10px] text-slate-400 font-sans mt-0.5">
                          💬 {adm.notes.length} internal note{adm.notes.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{adm.fullName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        <span>F: {adm.fatherName}</span> • <span>{adm.city || 'Dhanbad'}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                        📞 {adm.phone}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {adm.selectedCourse}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {adm.qualification}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">
                      <div>Batch: <strong className="text-slate-800">{adm.preferredBatch}</strong></div>
                      <div className="text-slate-500">
                        Hostel: {adm.hostelRequired ? 'Required' : 'Not required'}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {new Date(adm.appliedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={adm.status}
                        onChange={(e) => handleStatusChange(adm.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-none ${
                          statusColors[adm.status] || 'bg-slate-100'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`tel:${adm.phone}`}
                          className="p-1.5 rounded text-slate-500 hover:text-emerald-700 hover:bg-emerald-50"
                          title="Call Student"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/91${adm.whatsapp || adm.phone}?text=${encodeURIComponent(
                            `Hello ${adm.fullName}, this is MOBNET International Dhanbad regarding your application (${adm.id}) for ${adm.selectedCourse}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                          title="WhatsApp Follow-up"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedAdmission(adm)}
                          className="p-1.5 rounded text-slate-500 hover:text-[#292F91] hover:bg-blue-50"
                          title="View Details & Add Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(adm.id)}
                          className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Details & Notes Drawer/Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#292F91] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {selectedAdmission.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 font-montserrat">
                  {selectedAdmission.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Applied on {new Date(selectedAdmission.appliedAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Application Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Father's Name</span>
                <span className="font-semibold text-slate-800 text-sm">{selectedAdmission.fatherName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Birth &amp; Gender</span>
                <span className="font-semibold text-slate-800 text-sm">
                  {selectedAdmission.dateOfBirth} ({selectedAdmission.gender})
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone &amp; WhatsApp</span>
                <span className="font-semibold text-slate-800 text-sm font-mono">
                  {selectedAdmission.phone} {selectedAdmission.whatsapp && `/ WA: ${selectedAdmission.whatsapp}`}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                <span className="font-semibold text-slate-800 text-sm">
                  {selectedAdmission.email || 'Not provided'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Program &amp; Qualification</span>
                <span className="font-semibold text-[#292F91] block">{selectedAdmission.selectedCourse}</span>
                <span className="text-slate-600 text-[11px]">{selectedAdmission.qualification}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Batch &amp; Hostel</span>
                <span className="font-semibold text-slate-800">
                  {selectedAdmission.preferredBatch} Batch | {selectedAdmission.hostelRequired ? 'Hostel Needed' : 'Day Scholar'}
                </span>
              </div>
              <div className="sm:col-span-2 p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Address &amp; Pincode</span>
                <span className="font-semibold text-slate-800">
                  {selectedAdmission.address}, {selectedAdmission.city}, {selectedAdmission.state} – {selectedAdmission.pincode}
                </span>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div className="flex flex-wrap items-center gap-2 py-3 border-y border-slate-100">
              <a
                href={`tel:${selectedAdmission.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {selectedAdmission.phone}</span>
              </a>
              <a
                href={`https://wa.me/91${selectedAdmission.whatsapp || selectedAdmission.phone}?text=${encodeURIComponent(
                  `Hello ${selectedAdmission.fullName}, greetings from MOBNET International Dhanbad. We reviewed your application for ${selectedAdmission.selectedCourse}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-100"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Message</span>
              </a>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-slate-500">Status:</span>
                <select
                  value={selectedAdmission.status}
                  onChange={(e) => handleStatusChange(selectedAdmission.id, e.target.value)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none ${
                    statusColors[selectedAdmission.status] || 'bg-slate-100'
                  }`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Internal Counselor Notes Section */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#292F91]" />
                <span>Internal Counseling Notes &amp; Follow-Up Log</span>
              </h4>

              {/* Notes List */}
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                {!selectedAdmission.notes || selectedAdmission.notes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    No notes recorded yet. Add follow-up remarks below (e.g. called student, batch demo scheduled, fee discussed).
                  </p>
                ) : (
                  selectedAdmission.notes.map((n: any) => (
                    <div key={n.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <strong className="text-slate-800">{n.author}</strong>
                        <span>{new Date(n.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-slate-700">{n.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add note (e.g., student visiting Dhanbad lab tomorrow at 11 AM for demo)..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
                <button
                  type="submit"
                  disabled={submittingNote || !noteText.trim()}
                  className="px-3.5 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
