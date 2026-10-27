import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  GraduationCap,
  BookOpen,
  Image as ImageIcon,
  Mail,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle,
  Eye,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/overview');
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setData(result);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Dashboard | MOBNET Admin Portal';
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setStatusUpdating(id);
    try {
      const res = await authFetch(`/api/admin/admissions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        await fetchDashboardData();
        if (selectedAdmission && selectedAdmission.id === id) {
          setSelectedAdmission((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setStatusUpdating(null);
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
    <AdminLayout title="Institute Overview" subtitle="Welcome to MOBNET International Administrative Command Center">
      {/* Top Banner / Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-montserrat">Campus Real-Time Summary</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real database records from Bank More, Dhanbad training campus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            to="/admin/admissions"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#292F91] text-white hover:bg-[#1f2473] shadow-xs transition-colors"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Card 1: Total Admissions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Admissions</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#292F91] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {loading ? '...' : data?.stats?.totalAdmissions || 0}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">All-time applications</span>
            <Link to="/admin/admissions" className="text-[#292F91] font-semibold hover:underline">
              View
            </Link>
          </div>
        </div>

        {/* Card 2: New Admissions */}
        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-1 bg-[#D9272E]" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-900">New (Pending)</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D9272E] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#D9272E] mt-2">
            {loading ? '...' : data?.stats?.newAdmissions || 0}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-red-50 text-[11px]">
            <span className="text-slate-500">Requires follow-up</span>
            <Link to="/admin/admissions?status=New" className="text-[#D9272E] font-semibold hover:underline">
              Action Now
            </Link>
          </div>
        </div>

        {/* Card 3: Active Courses */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Courses</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {loading ? '...' : data?.stats?.activeCourses || 0}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Published syllabi</span>
            <Link to="/admin/courses" className="text-indigo-700 font-semibold hover:underline">
              Manage
            </Link>
          </div>
        </div>

        {/* Card 4: Published Gallery */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Gallery Photos</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {loading ? '...' : data?.stats?.publishedGallery || 0}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Live on /gallery</span>
            <Link to="/admin/gallery" className="text-emerald-700 font-semibold hover:underline">
              Upload
            </Link>
          </div>
        </div>

        {/* Card 5: Unread Messages */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Unread Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {loading ? '...' : data?.stats?.unreadMessages || 0}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Contact form leads</span>
            <Link to="/admin/messages" className="text-amber-700 font-semibold hover:underline">
              Inbox
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Admissions & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Enquiries (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Admission Enquiries</h3>
                <p className="text-xs text-slate-500">Latest students applying for technical repair batches</p>
              </div>
              <Link
                to="/admin/admissions"
                className="text-xs font-semibold text-[#292F91] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#292F91]" />
                Loading admissions...
              </div>
            ) : !data?.recentAdmissions || data.recentAdmissions.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                <GraduationCap className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-medium">No admission records found yet.</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Submissions from the public <Link to="/admission" className="text-[#292F91] underline">Admission form</Link> will automatically arrive here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-3">Course</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {data.recentAdmissions.map((adm: any) => (
                      <tr key={adm.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{adm.fullName}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{adm.phone}</span>
                            <span>•</span>
                            <span>{adm.city || 'Dhanbad'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                            {adm.selectedCourse}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {new Date(adm.appliedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={adm.status}
                            disabled={statusUpdating === adm.id}
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
                              title={`Call ${adm.phone}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/91${adm.whatsapp || adm.phone}?text=${encodeURIComponent(
                                `Hello ${adm.fullName}, greetings from MOBNET International Dhanbad regarding your ${adm.selectedCourse} application.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setSelectedAdmission(adm)}
                              className="p-1.5 rounded text-slate-500 hover:text-[#292F91] hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
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
        </div>

        {/* Right Column: Recent Messages & Quick Admin Tools (1 col) */}
        <div className="space-y-6">
          {/* Quick Launch Cards */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Management Shortcuts</h3>
            <div className="space-y-2">
              <Link
                to="/admin/admissions"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-blue-50 text-[#292F91] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-[#292F91]">
                    Export Admissions CSV
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#292F91]" />
              </Link>

              <Link
                to="/admin/courses"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-[#292F91]">
                    Edit Course Details &amp; Syllabi
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#292F91]" />
              </Link>

              <Link
                to="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-[#292F91]">
                    Manage Lab Photos &amp; Benches
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#292F91]" />
              </Link>

              <Link
                to="/admin/content"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-[#292F91]">
                    Update Homepage Headlines
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#292F91]" />
              </Link>
            </div>
          </div>

          {/* Recent Inquiries List */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Recent Inquiries</h3>
              <Link to="/admin/messages" className="text-xs text-[#292F91] hover:underline font-semibold">
                Inbox
              </Link>
            </div>

            {loading ? (
              <p className="text-xs text-slate-400">Loading messages...</p>
            ) : !data?.recentMessages || data.recentMessages.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No contact inquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentMessages.map((msg: any) => (
                  <div key={msg.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {new Date(msg.receivedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{msg.phone}</p>
                    <p className="text-slate-600 mt-1 line-clamp-2 italic">"{msg.message}"</p>
                    <div className="mt-2 flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60">
                      <a
                        href={`https://wa.me/91${msg.phone}?text=${encodeURIComponent(
                          `Hello ${msg.name}, thank you for contacting MOBNET International Dhanbad.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#292F91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedAdmission.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">{selectedAdmission.fullName}</h3>
                <p className="text-xs text-slate-500">
                  Applied on {new Date(selectedAdmission.appliedAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Father's Name</span>
                <span className="font-semibold text-slate-800">{selectedAdmission.fatherName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Date of Birth &amp; Gender</span>
                <span className="font-semibold text-slate-800">
                  {selectedAdmission.dateOfBirth} ({selectedAdmission.gender})
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Phone &amp; WhatsApp</span>
                <div className="font-semibold text-slate-800 flex items-center gap-3">
                  <span>{selectedAdmission.phone}</span>
                  {selectedAdmission.whatsapp && (
                    <span className="text-emerald-700">WA: {selectedAdmission.whatsapp}</span>
                  )}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Selected Program</span>
                <span className="font-semibold text-[#292F91]">{selectedAdmission.selectedCourse}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Batch &amp; Hostel Preference</span>
                <span className="font-semibold text-slate-800">
                  Batch: {selectedAdmission.preferredBatch} | Hostel: {selectedAdmission.hostelRequired ? 'Required' : 'No'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Qualification</span>
                <span className="font-semibold text-slate-800">{selectedAdmission.qualification}</span>
              </div>
              <div className="sm:col-span-2 p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Permanent Address</span>
                <span className="font-semibold text-slate-800">
                  {selectedAdmission.address}, {selectedAdmission.city}, {selectedAdmission.state} – {selectedAdmission.pincode}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedAdmission.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/91${selectedAdmission.whatsapp || selectedAdmission.phone}?text=${encodeURIComponent(
                    `Hello ${selectedAdmission.fullName}, this is MOBNET International Dhanbad regarding your application ${selectedAdmission.id}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-100"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
