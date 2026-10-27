import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionHeading } from '../components/SectionHeading';
import { COURSES_DATA } from '../data/coursesData';
import { AdmissionApplication } from '../types';
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  MessageCircle,
  Printer,
  RotateCcw,
  ShieldCheck,
  Calendar,
  Building
} from 'lucide-react';

export const AdmissionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('course') || COURSES_DATA[0].id;

  useEffect(() => {
    document.title = 'Apply for Admission | MOBNET International';
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    phone: '',
    whatsapp: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    qualification: '12th Pass / Intermediate',
    selectedCourse: initialCourseId,
    preferredBatch: 'Morning (09:30 AM – 12:30 PM)',
    hostelRequired: false,
    address: '',
    city: 'Dhanbad',
    state: 'Jharkhand',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Sync course if URL param changes
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam && COURSES_DATA.some((c) => c.id === courseParam)) {
      setFormData((prev) => ({ ...prev, selectedCourse: courseParam }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's Name is required";
    
    // Clean Indian 10-digit phone
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Permanent address is required';
    }

    if (!formData.pincode.trim() || formData.pincode.length < 6) {
      newErrors.pincode = 'Valid 6-digit postal PIN code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/admission', {
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
          setServerError(result.error || 'Server validation error occurred.');
        }
        setSubmitting(false);
        return;
      }

      const applicationRecord: AdmissionApplication = {
        id: result.applicationId,
        ...formData,
        appliedDate: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        status: 'Received',
      };

      try {
        const stored = JSON.parse(localStorage.getItem('mobnet_admissions') || '[]');
        stored.unshift(applicationRecord);
        localStorage.setItem('mobnet_admissions', JSON.stringify(stored));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }

      setSubmittedApp(applicationRecord);
      setSubmitting(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('Network request failed', err);
      setServerError('Unable to reach institute server. Please message our admissions desk directly on WhatsApp.');
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedCourseObj = COURSES_DATA.find((c) => c.id === formData.selectedCourse);

  return (
    <div className="bg-[#F5F7FB] min-h-screen">
      <Breadcrumb items={[{ label: 'Apply for Admission' }]} />

      {/* Header */}
      <section className="bg-white border-b border-[#E5E7EB] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Session 2026 Batch Enrollment
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Application for Admission
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#333333] leading-relaxed">
              Register online for technical courses at MOBNET International. Upon submitting, you receive an official application reference number to complete verification at our Dhanbad campus or directly via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Submission Success State */}
          {submittedApp ? (
            <div className="bg-white rounded-2xl border border-[#292F91]/20 shadow-md p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
              <div className="flex items-start gap-4 pb-6 border-b border-[#E5E7EB]">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-700 shrink-0">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Application Registered Successfully
                  </span>
                  <h2 className="text-2xl font-bold text-[#292F91] font-heading">
                    Application ID: {submittedApp.id}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280]">
                    Submitted on {submittedApp.appliedDate}. Your candidate details have been logged for batch scheduling.
                  </p>
                </div>
              </div>

              {/* Application Summary Box */}
              <div className="bg-[#F5F7FB] rounded-xl p-6 border border-[#E5E7EB] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Applicant Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[#6B7280] block">Candidate Name:</span>
                    <strong className="text-[#333333] text-sm">{submittedApp.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">Father&apos;s Name:</span>
                    <strong className="text-[#333333] text-sm">{submittedApp.fatherName}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">Contact Phone:</span>
                    <strong className="text-[#333333] text-sm">{submittedApp.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">Selected Program:</span>
                    <strong className="text-[#292F91] text-sm">
                      {COURSES_DATA.find((c) => c.id === submittedApp.selectedCourse)?.title || submittedApp.selectedCourse}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">Batch Timing:</span>
                    <strong className="text-[#333333] text-sm">{submittedApp.preferredBatch}</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">Hostel Facility:</span>
                    <strong className="text-[#333333] text-sm">
                      {submittedApp.hostelRequired ? 'Requested' : 'Not Required'}
                    </strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#6B7280] block">Address:</span>
                    <span className="text-[#333333]">
                      {submittedApp.address}, {submittedApp.city}, {submittedApp.state} - {submittedApp.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps Guide */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#292F91] font-heading">
                  Next Steps to Confirm Your Seat:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#333333]">
                  <li>
                    Forward your application ID directly to the MOBNET Admissions Desk on WhatsApp using the button below for instant batch allocation.
                  </li>
                  <li>
                    Visit our Dhanbad campus with original ID proof (Aadhaar Card) and 2 passport-size photographs.
                  </li>
                  <li>
                    Campus location: <strong>109, 1st Floor, Urmila Tower, Bank More, Dhanbad – 826001</strong>.
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                <a
                  href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20have%20submitted%20my%20admission%20application.%20My%20Application%20ID%20is%20${encodeURIComponent(
                    submittedApp.id
                  )}%20for%20${encodeURIComponent(
                    formData.fullName
                  )}%20(Phone:%20${encodeURIComponent(formData.phone)}).%20Please%20confirm%20my%20batch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Details to WhatsApp Desk</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold text-[#333333] bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmittedApp(null)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold text-[#292F91] hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Submit Another Form</span>
                </button>
              </div>
            </div>
          ) : (
            /* Admission Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 sm:p-10 space-y-8"
            >
              {/* Spam Honeypot - hidden from human users */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="_website"
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

              {/* Section 1: Candidate Details */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5E7EB]">
                  <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                    1. Candidate Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-[#333333] mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Kumar Verma"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Father's Name */}
                  <div>
                    <label htmlFor="fatherName" className="block text-xs font-semibold text-[#333333] mb-1">
                      Father&apos;s Name *
                    </label>
                    <input
                      id="fatherName"
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      placeholder="e.g. Suresh Verma"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.fatherName ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.fatherName && <p className="text-[11px] text-red-600 mt-1">{errors.fatherName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#333333] mb-1">
                      Mobile Number (Calling) *
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

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-xs font-semibold text-[#333333] mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      maxLength={10}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="If different from calling number"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91]"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-[#333333] mb-1">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="text-[11px] text-red-600 mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Gender & Qualification */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="gender" className="block text-xs font-semibold text-[#333333] mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91] bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="qualification" className="block text-xs font-semibold text-[#333333] mb-1">
                        Qualification
                      </label>
                      <select
                        id="qualification"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91] bg-white"
                      >
                        <option value="10th Matric Pass">10th Matric Pass</option>
                        <option value="12th Pass / Intermediate">12th Pass / Intermediate</option>
                        <option value="ITI / Diploma in Electronics">ITI / Diploma</option>
                        <option value="Graduate / BA / B.Com / B.Sc">Graduate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Course & Batch Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5E7EB]">
                  <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                    2. Program &amp; Batch Preferences
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Course Dropdown */}
                  <div className="sm:col-span-2">
                    <label htmlFor="selectedCourse" className="block text-xs font-semibold text-[#333333] mb-1">
                      Choose Course Program *
                    </label>
                    <select
                      id="selectedCourse"
                      value={formData.selectedCourse}
                      onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91] bg-white font-medium"
                    >
                      {COURSES_DATA.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title} ({course.duration})
                        </option>
                      ))}
                    </select>

                    {selectedCourseObj && (
                      <p className="mt-1 text-[11px] text-[#6B7280]">
                        Curriculum: {selectedCourseObj.practicalRatio} &middot; {selectedCourseObj.level}
                      </p>
                    )}
                  </div>

                  {/* Batch Selection */}
                  <div>
                    <label htmlFor="preferredBatch" className="block text-xs font-semibold text-[#333333] mb-1">
                      Preferred Batch Timing
                    </label>
                    <select
                      id="preferredBatch"
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91] bg-white"
                    >
                      <option value="Morning (09:30 AM – 12:30 PM)">Morning (09:30 AM – 12:30 PM)</option>
                      <option value="Afternoon (01:30 PM – 04:30 PM)">Afternoon (01:30 PM – 04:30 PM)</option>
                      <option value="Evening (05:00 PM – 07:30 PM)">Evening (05:00 PM – 07:30 PM)</option>
                      <option value="Weekend / Fast-Track Intensive">Weekend / Fast-Track Intensive</option>
                    </select>
                  </div>

                  {/* Hostel Requirement */}
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-[#E5E7EB] hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.hostelRequired}
                        onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.checked })}
                        className="w-4 h-4 text-[#292F91] rounded border-slate-300 focus:ring-[#292F91]"
                      />
                      <span className="text-xs font-medium text-[#333333]">
                        I need Hostel / Lodging assistance in Dhanbad
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Address Details */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5E7EB]">
                  <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#292F91] font-heading">
                    3. Address &amp; Location
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-xs font-semibold text-[#333333] mb-1">
                      Permanent Postal Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Village / Mohalla, Landmark, Post Office"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.address ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-[#333333] mb-1">
                      City / District
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91]"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs font-semibold text-[#333333] mb-1">
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#292F91]"
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-xs font-semibold text-[#333333] mb-1">
                      PIN Code *
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="e.g. 826001"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none ${
                        errors.pincode ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] focus:border-[#292F91]'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#6B7280]">
                  * Required fields. All applications receive official reference numbers.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] disabled:opacity-50 transition-colors shadow-xs"
                >
                  {submitting ? 'Registering Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
