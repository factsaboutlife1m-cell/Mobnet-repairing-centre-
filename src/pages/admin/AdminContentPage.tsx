import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FileText, Save, CheckCircle2, RefreshCw, Plus, Trash2, ExternalLink } from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>({
    heroHeadline: '',
    heroSubheadline: '',
    heroTaglineHindi: '',
    aboutMission: '',
    whyChoosePoints: [],
    admissionCtaHeading: '',
    admissionCtaText: '',
    footerNotice: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
        }
      }
    } catch (err) {
      console.error('Failed to load content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Site Content Editor | MOBNET Admin';
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await authFetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        setToast('Content updated successfully! Changes are live on public pages.');
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error('Failed to save content:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleWhyChooseChange = (index: number, field: string, val: string) => {
    const updated = [...content.whyChoosePoints];
    updated[index] = { ...updated[index], [field]: val };
    setContent({ ...content, whyChoosePoints: updated });
  };

  const addWhyChoosePoint = () => {
    setContent({
      ...content,
      whyChoosePoints: [
        ...content.whyChoosePoints,
        { title: 'New Advantage', description: 'Description of MOBNET advantage.' }
      ]
    });
  };

  const removeWhyChoosePoint = (index: number) => {
    const updated = content.whyChoosePoints.filter((_: any, i: number) => i !== index);
    setContent({ ...content, whyChoosePoints: updated });
  };

  return (
    <AdminLayout title="Site Content Management" subtitle="Edit public headlines, Hindi slogans, mission text, and CTA highlights safely">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292F91] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Section 1: Hero Banner & Tagline */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-montserrat">Homepage Hero Section</h3>
              <p className="text-xs text-slate-500">Primary headline, Hindi tagline and mission summary</p>
            </div>
            <span className="text-[10px] bg-blue-50 text-[#292F91] font-semibold px-2 py-0.5 rounded">
              Route: /
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hindi Slogan / Tagline
              </label>
              <input
                type="text"
                value={content.heroTaglineHindi || ''}
                onChange={(e) => setContent({ ...content, heroTaglineHindi: e.target.value })}
                placeholder="मोबाइल रिपेयरिंग सीखें - अपना भविष्य बनाएं"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-[#D9272E] focus:outline-none focus:ring-2 focus:ring-[#292F91]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={content.heroHeadline || ''}
                onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hero Subheadline</label>
              <textarea
                rows={3}
                value={content.heroSubheadline || ''}
                onChange={(e) => setContent({ ...content, heroSubheadline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: About Mission */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-montserrat">Institute Mission &amp; Purpose</h3>
              <p className="text-xs text-slate-500">Appears on the About page and institute overview</p>
            </div>
            <span className="text-[10px] bg-blue-50 text-[#292F91] font-semibold px-2 py-0.5 rounded">
              Route: /about
            </span>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Mission Statement</label>
            <textarea
              rows={3}
              value={content.aboutMission || ''}
              onChange={(e) => setContent({ ...content, aboutMission: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
            />
          </div>
        </div>

        {/* Section 3: Why Choose MOBNET */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-montserrat">Why Choose MOBNET Highlights</h3>
              <p className="text-xs text-slate-500">Key strengths showcased to prospective students</p>
            </div>
            <button
              type="button"
              onClick={addWhyChoosePoint}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#292F91] text-xs font-semibold rounded-lg hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Point</span>
            </button>
          </div>

          <div className="space-y-3">
            {content.whyChoosePoints?.map((pt: any, idx: number) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={pt.title}
                      onChange={(e) => handleWhyChooseChange(idx, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={pt.description}
                      onChange={(e) => handleWhyChooseChange(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeWhyChoosePoint(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 mt-5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Admission Call-to-Action Banner */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-montserrat">Admission CTA Banner</h3>
              <p className="text-xs text-slate-500">Displayed across bottom of courses and home pages</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Banner Heading</label>
              <input
                type="text"
                value={content.admissionCtaHeading || ''}
                onChange={(e) => setContent({ ...content, admissionCtaHeading: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Banner Description</label>
              <textarea
                rows={2}
                value={content.admissionCtaText || ''}
                onChange={(e) => setContent({ ...content, admissionCtaText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={fetchContent}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing Changes...' : 'Save & Publish Live Content'}</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
