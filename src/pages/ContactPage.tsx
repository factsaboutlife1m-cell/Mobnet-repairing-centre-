import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Navigation,
  Compass,
  Train,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact Us | MOBNET International Dhanbad';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<{
    referenceId: string;
    name: string;
    phone: string;
    message: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    if (!formData.consent) {
      errs.consent = 'Please agree to the privacy notice to submit.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setServerError(result.error || 'Server validation failed.');
        }
        setSubmitting(false);
        return;
      }

      const record = {
        referenceId: result.inquiryId,
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      };

      try {
        const stored = JSON.parse(localStorage.getItem('mobnet_contact_inquiries') || '[]');
        stored.unshift(record);
        localStorage.setItem('mobnet_contact_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.error('Storage error', err);
      }

      setSubmittedMessage(record);
      setSubmitting(false);
    } catch (err) {
      console.error('Network request failed', err);
      setServerError('Unable to reach institute server. Please message our admissions desk directly on WhatsApp.');
      setSubmitting(false);
    }
  };

  const staffTeam = [
    {
      name: 'Md Noshad Khan',
      role: 'Managing Director',
      initials: 'NK',
      note: 'Institute Administration & Admissions',
    },
    {
      name: 'Md. Imamuddin (Imam)',
      role: 'Director',
      initials: 'MI',
      note: 'Curriculum & Student Support',
    },
    {
      name: 'Manmat Kumar (Mahi)',
      role: 'Senior Faculty',
      initials: 'MK',
      note: 'Chip-Level & Micro-Soldering',
    },
    {
      name: 'Rashid Khan',
      role: 'Senior Faculty',
      initials: 'RK',
      note: 'Software & Diagnostics',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — HERO */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <Breadcrumb items={[{ label: 'Contact' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span>Admissions &amp; Enquiries</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight font-heading">
              Contact Us
            </h1>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-medium">
              Have a question about the course or admission? Visit us, call, or message us on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2 — CONTACT INFORMATION (Three Clear Cards) */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1: PHONE */}
            <div className="bg-[#F5F7FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#292F91] shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                  Phone Numbers
                </h3>
                <div className="space-y-1.5 text-base font-bold text-[#333333]">
                  <a href="tel:9661611350" className="block hover:text-[#D9272E] transition-colors">
                    96616 11350
                  </a>
                  <a href="tel:7004838409" className="block hover:text-[#D9272E] transition-colors">
                    70048 38409
                  </a>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Mon – Sat: 9:30 AM to 6:30 PM (Direct calling helpline).
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <a
                  href="tel:9661611350"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#292F91] hover:bg-[#1f2473] transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* CARD 2: WHATSAPP */}
            <div className="bg-[#F5F7FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-emerald-600 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                  WhatsApp Support
                </h3>
                <div className="text-base font-bold text-[#333333]">
                  +91 96616 11350
                </div>
                <p className="text-xs text-[#6B7280]">
                  Official international WhatsApp chat link for instant fee structures and syllabus questions.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20have%20an%20enquiry%20regarding%20mobile%20repairing%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* CARD 3: ADDRESS */}
            <div className="bg-[#F5F7FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#D9272E] shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                  Campus Address
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#333333] leading-relaxed">
                  109, 1st Floor, Urmila Tower,
                  <br />
                  Bank More, Dhanbad – 826001,
                  <br />
                  Jharkhand, India.
                </p>
                <p className="text-xs text-[#6B7280]">
                  A Division of SMTM Pvt. Ltd. (Near Dhanbad Junction).
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <a
                  href="https://maps.google.com/?q=Urmila+Tower+Bank+More+Dhanbad+Jharkhand+826001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white border border-[#292F91] hover:bg-blue-50 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CONTACT FORM */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 sm:p-10 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#292F91] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span>Online Inquiry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                We usually reply as soon as possible.
              </p>
            </div>

            {submittedMessage ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 space-y-4 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#292F91] font-heading">
                      Message Delivered &amp; Verified (Ref: {submittedMessage.referenceId})
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Your enquiry has been received and verified by the institute backend database. Our admissions coordinator at Bank More, Dhanbad will contact you shortly on <strong>{submittedMessage.phone}</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#333333] space-y-1">
                  <div><strong>From:</strong> {submittedMessage.name} ({submittedMessage.phone})</div>
                  <div><strong>Message:</strong> {submittedMessage.message}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20sent%20an%20enquiry%20(Ref:%20${encodeURIComponent(
                      submittedMessage.referenceId
                    )}):%20${encodeURIComponent(
                      submittedMessage.message
                    )}%20(Name:%20${encodeURIComponent(
                      submittedMessage.name
                    )},%20Phone:%20${encodeURIComponent(submittedMessage.phone)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Also Connect on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedMessage(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        message: '',
                        consent: false,
                      });
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#292F91] hover:underline"
                  >
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot Spam Protection */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="_fax"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {serverError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#333333] mb-1">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#333333] mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#333333] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#333333] mb-1">
                    Your Message * (Minimum 10 characters)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about course syllabi, upcoming batch schedules, or fee payment options..."
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                </div>

                {/* Consent Checkbox & Privacy Notice */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 text-[#292F91] rounded border-slate-300 focus:ring-[#292F91] mt-0.5"
                    />
                    <span className="text-xs text-[#6B7280] leading-snug">
                      I agree to be contacted by MOBNET International regarding my course enquiry. We respect your privacy and never share your contact details.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>}
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] disabled:opacity-50 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Sending Message...' : 'Submit Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4 — TALK TO OUR TEAM (Official Published Numbers Only) */}
      <section className="py-14 lg:py-18 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Leadership &amp; Faculty
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
              Talk to Our Team
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
              Reach out to our leadership and senior training faculty via the official institute helpline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffTeam.map((staff, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center space-y-4 shadow-xs"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#292F91] text-white flex items-center justify-center font-bold text-lg font-heading shadow-xs">
                  {staff.initials}
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#333333] font-heading">
                    {staff.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D9272E] uppercase tracking-wider mt-0.5">
                    {staff.role}
                  </p>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {staff.note}
                  </p>
                </div>

                {/* Strict policy: official published helpline numbers only */}
                <div className="pt-3 border-t border-[#E5E7EB] text-xs space-y-1">
                  <span className="text-[#6B7280] block text-[11px]">Institute Contact Line:</span>
                  <a
                    href="tel:9661611350"
                    className="font-semibold text-[#292F91] hover:text-[#D9272E] block"
                  >
                    +91 96616 11350
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FIND US (Visit Our Centre) */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Location Info */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Campus Directions
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                Visit Our Centre
              </h2>

              <div className="p-4 rounded-xl bg-[#F5F7FB] border border-[#E5E7EB] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Full Campus Address:
                </h4>
                <p className="text-sm font-medium text-[#333333] leading-relaxed">
                  109, 1st Floor, Urmila Tower,
                  <br />
                  Bank More, Dhanbad – 826001,
                  <br />
                  Jharkhand, India.
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#6B7280]">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#292F91] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rail Transit:</strong> Approximately 1.5 km from Dhanbad Railway Station (5–7 minutes via auto-rickshaw or e-rickshaw).
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-[#292F91] shrink-0 mt-0.5" />
                  <span>
                    <strong>Landmark:</strong> Urmila Tower is a well-known commercial landmark in Bank More market.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#292F91] shrink-0 mt-0.5" />
                  <span>
                    <strong>Hours:</strong> Monday through Saturday, 9:30 AM to 6:30 PM.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Urmila+Tower+Bank+More+Dhanbad+Jharkhand+826001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#292F91] hover:bg-[#1f2473] transition-colors shadow-xs"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Map Canvas Embed / Link Component */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md bg-slate-100 h-80 sm:h-96 flex flex-col justify-between">
                {/* Embedded Responsive Map */}
                <iframe
                  title="MOBNET International Dhanbad Campus Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0892398505527!2d86.42398437604473!3d23.791557087610115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6bb777f9e8a71%3A0x6b77242c7e0f2f35!2sUrmila%20Tower%2C%20Bank%20More%2C%20Dhanbad%2C%20Jharkhand%20826001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing location of Urmila Tower Bank More Dhanbad"
                />

                {/* Mobile Fallback Overlay Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs p-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#333333]">
                  <span className="font-semibold text-[#292F91] truncate">
                    Urmila Tower, Bank More, Dhanbad
                  </span>
                  <a
                    href="https://maps.google.com/?q=Urmila+Tower+Bank+More+Dhanbad+Jharkhand+826001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D9272E] font-bold hover:underline shrink-0 ml-2"
                  >
                    View Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#292F91] rounded-2xl text-white p-8 sm:p-12 shadow-md relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Guidance &amp; Admissions</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Need Help Choosing a Course?
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Connect with our counselors to find the ideal program for your skill level, career plans, and batch schedule.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  <span>Apply for Admission</span>
                </Link>

                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20need%20guidance%20in%20choosing%20the%20right%20course."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-950 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
