import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  BookOpen,
  Edit3,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Save,
  X,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const AdminCoursesPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/courses');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCourses(data.courses || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Course Management | MOBNET Admin';
    fetchCourses();
  }, []);

  const handleTogglePublish = async (course: any) => {
    const updatedStatus = !course.isPublished;
    try {
      const res = await authFetch(`/api/admin/courses/${course.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: updatedStatus })
      });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? { ...c, isPublished: updatedStatus } : c))
        );
        showToast(`Course "${course.title}" ${updatedStatus ? 'published' : 'unpublished'}.`);
      }
    } catch (err) {
      console.error('Toggle publish failed:', err);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setIsSaving(true);
    try {
      const isNew = !courses.some((c) => c.id === editingCourse.id);
      const url = isNew ? '/api/admin/courses' : `/api/admin/courses/${editingCourse.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      });

      if (res.ok) {
        await fetchCourses();
        setEditingCourse(null);
        showToast('Course program saved successfully.');
      }
    } catch (err) {
      console.error('Failed to save course:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <AdminLayout title="Course Programs" subtitle="Manage verified syllabi, practical durations, and equipment lists">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292F91] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-montserrat">Training Curriculum &amp; Syllabi</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized directly with public course detail routes and admission preselection.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() =>
              setEditingCourse({
                id: `new-course-${Date.now()}`,
                slug: 'new-course-program',
                title: 'New Technical Repair Program',
                category: 'hardware',
                duration: '1 Month',
                hasConfirmedDuration: true,
                practicalRatio: '80% Practical / 20% Theory',
                level: 'Basic to Advance',
                shortDescription: 'Comprehensive practical training on modern smartphone diagnosis and repair.',
                fullOverview: 'Full course overview covering schematic tracing, multimeter testing, and rework bench techniques.',
                highlights: ['Hands-on laboratory bench practice', 'Trinocular stereo microscope diagnostics'],
                modules: ['Introduction to Electronics', 'Power Rail & Voltage Diagnostics'],
                toolsCovered: ['SMD Hot Air Station', 'Digital Multimeter', 'DC Power Supply'],
                skillsLearned: ['SMD soldering', 'Circuit tracing'],
                practicalApproach: 'Direct practical bench work on faulty motherboards.',
                careerOpportunities: ['Independent repair shop owner', 'Service center hardware technician'],
                faqs: [{ question: 'Are demo classes available?', answer: 'Yes, free demo sessions are available.' }],
                visualType: 'tools',
                isPublished: true
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Courses List Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#292F91]" />
          Loading course programs...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-xl border transition-all shadow-xs flex flex-col justify-between ${
                course.isPublished ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#292F91]">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        course.isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {course.isPublished ? 'Published' : 'Draft / Hidden'}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm font-montserrat line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                  {course.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <strong className="text-slate-800">{course.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Lab Ratio:</span>
                    <span className="text-emerald-700 font-medium">{course.practicalRatio}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Public Slug:</span>
                    <code className="text-[11px] text-[#292F91]">/courses/{course.slug}</code>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(course)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                    course.isPublished
                      ? 'border-amber-200 text-amber-800 hover:bg-amber-50'
                      : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {course.isPublished ? 'Unpublish' : 'Publish to Live'}
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-slate-500 hover:text-[#292F91] hover:bg-blue-50"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setEditingCourse({ ...course })}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#292F91] text-white text-xs font-semibold rounded-md hover:bg-[#1f2473]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat">
                  Edit Course Program: {editingCourse.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Ensure fees and class timings are strictly maintained via in-person counseling or official numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.slug}
                    onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    placeholder="e.g. 2 Months or Flexible Schedule"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Practical Ratio</label>
                  <input
                    type="text"
                    value={editingCourse.practicalRatio}
                    onChange={(e) => setEditingCourse({ ...editingCourse, practicalRatio: e.target.value })}
                    placeholder="e.g. 85% Practical Lab / 15% Theory"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description (for Cards &amp; SEO)</label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescription}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Comprehensive Overview</label>
                <textarea
                  rows={4}
                  value={editingCourse.fullOverview}
                  onChange={(e) => setEditingCourse({ ...editingCourse, fullOverview: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Practical Approach &amp; Laboratory Methodology
                </label>
                <textarea
                  rows={3}
                  value={editingCourse.practicalApproach}
                  onChange={(e) => setEditingCourse({ ...editingCourse, practicalApproach: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCourse.isPublished}
                    onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded text-[#292F91] border-slate-300 focus:ring-[#292F91]"
                  />
                  <span className="font-semibold text-slate-800">Publish this course to live website</span>
                </label>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#292F91] text-white rounded-lg hover:bg-[#1f2473] font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Course Data'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
