import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Settings, Shield, Lock, Save, CheckCircle2, AlertCircle, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { authFetch, admin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>({
    instituteName: '',
    divisionInfo: '',
    regNumber: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    whatsappNumber: '',
    email: '',
    officeHours: '',
    googleMapsUrl: '',
    siteTitle: '',
    metaDescription: ''
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Institute Settings & Profile | MOBNET Admin';
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await authFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setToast({ type: 'success', message: 'Campus settings and SEO metadata saved successfully.' });
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to update settings.' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setChangingPassword(true);
    try {
      const res = await authFetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordSuccess('Administrator password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.error || 'Failed to change password.');
      }
    } catch (err) {
      setPasswordError('Network error while changing password.');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <AdminLayout title="Institute Settings &amp; Security" subtitle="Configure campus contact details, official verified numbers, and admin credentials">
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2 ${
            toast.type === 'success' ? 'bg-[#292F91]' : 'bg-red-700'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-white" />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
        {/* Left 2 Cols: Institute Contact & SEO Settings */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Institute Identity & Address */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 font-montserrat pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#292F91]" />
                <span>Institute Identity &amp; Campus Location</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institute Name</label>
                  <input
                    type="text"
                    required
                    value={settings.instituteName || ''}
                    onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Division / Legal Entity</label>
                  <input
                    type="text"
                    value={settings.divisionInfo || ''}
                    onChange={(e) => setSettings({ ...settings, divisionInfo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Govt Registration / ISO Notice</label>
                  <input
                    type="text"
                    value={settings.regNumber || ''}
                    onChange={(e) => setSettings({ ...settings, regNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Office Hours</label>
                  <input
                    type="text"
                    value={settings.officeHours || ''}
                    onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Physical Campus Address</label>
                  <input
                    type="text"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Google Maps Directions URL</label>
                  <input
                    type="text"
                    value={settings.googleMapsUrl || ''}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>
              </div>
            </div>

            {/* Official Contact Numbers */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 font-montserrat pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Verified Official Contact &amp; WhatsApp Lines</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={settings.primaryPhone || ''}
                    onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Secondary Phone</label>
                  <input
                    type="text"
                    value={settings.secondaryPhone || ''}
                    onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp Verified Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg font-mono font-bold text-emerald-800 bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* SEO Metadata */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 font-montserrat pb-3 mb-4 border-b border-slate-100">
                Search Engine Optimization (SEO) &amp; Social Previews
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default HTML Page Title</label>
                  <input
                    type="text"
                    value={settings.siteTitle || ''}
                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={settings.metaDescription || ''}
                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473] shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'Saving Settings...' : 'Save Institute Settings'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Admin Password Change & Security */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-montserrat pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#292F91]" />
              <span>Admin Profile &amp; Security</span>
            </h3>

            <div className="mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-full bg-[#292F91] text-white font-bold flex items-center justify-center text-xs">
                  {admin?.name?.substring(0, 2).toUpperCase() || 'AD'}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{admin?.name}</p>
                  <p className="text-[11px] text-slate-500">{admin?.email}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                <span>Role: <strong className="text-[#292F91]">{admin?.role}</strong></span>
                <span>Active Session</span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Change Admin Password
            </h4>

            {passwordError && (
              <div className="mb-3 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-3 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password (min 8 chars)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 pr-9 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F91]"
                />
              </div>

              <button
                type="submit"
                disabled={changingPassword || !currentPassword || !newPassword}
                className="w-full mt-2 py-2.5 px-4 bg-[#292F91] text-white rounded-lg font-semibold hover:bg-[#1f2473] disabled:opacity-50 transition-colors shadow-xs"
              >
                {changingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
