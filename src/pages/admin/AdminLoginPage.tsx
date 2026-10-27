import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { BrandLogo } from '../../components/BrandLogo';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, HelpCircle, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@mobnetinternational.com');
  const [password, setPassword] = useState('Mobnet@Admin2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login | MOBNET International';
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email.trim(), password, rememberMe);
    setIsSubmitting(false);

    if (result.success) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Return to website link */}
      <div className="absolute top-6 left-6 sm:left-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#292F91] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
            <BrandLogo />
          </div>
          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Institute Administration Portal</span>
          </div>
          <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-slate-900 font-montserrat">
            Admin Login
          </h2>
          <p className="mt-1 text-center text-xs text-slate-500 max-w-xs">
            Restricted access for MOBNET International authorized faculty, counselors, and directors.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-2xl border border-slate-200">
          {/* Default Credentials Callout */}
          <div className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700">
            <div className="flex items-center gap-2 font-semibold text-[#292F91] mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#292F91]" />
              <span>Dhanbad Campus Pre-Configured Access:</span>
            </div>
            <div className="font-mono text-[11px] text-slate-600 space-y-0.5 mt-1 bg-white p-2 rounded border border-blue-100">
              <div><strong className="text-slate-800">Email:</strong> admin@mobnetinternational.com</div>
              <div><strong className="text-slate-800">Password:</strong> Mobnet@Admin2026!</div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              (You can change your password anytime inside Admin Settings)
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication Failed</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Administrator Email
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91] focus:border-transparent text-slate-900"
                  placeholder="admin@mobnetinternational.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#292F91] focus:border-transparent text-slate-900"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded text-[#292F91] border-slate-300 focus:ring-[#292F91]"
                />
                <span className="text-xs text-slate-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-medium text-[#292F91] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#292F91] hover:bg-[#1f2473] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#292F91] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <span>Log In to Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center text-center">
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-slate-400" />
              <span>Protected by cryptographic scrypt hashing &amp; IP rate-limiting</span>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#292F91] flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Administrator Password Recovery</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              For campus security compliance, administrator credentials cannot be reset via unverified public emails.
            </p>
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-700">
              <p className="font-semibold text-slate-900">Verification Steps:</p>
              <p>1. Contact the Managing Director desk at Dhanbad campus:</p>
              <p className="font-mono text-[#292F91] font-semibold">📞 96616 11350 / 70048 38409</p>
              <p>2. Provide your employee ID / registered authorization key.</p>
              <p>3. Direct physical reset will be performed on the server database.</p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-[#292F91] text-white text-xs font-semibold rounded-lg hover:bg-[#1f2473]"
              >
                Understood, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
