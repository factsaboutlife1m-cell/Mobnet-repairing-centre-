import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualShowcase } from '../components/VisualShowcase';
import { COURSES_DATA, getCourseBySlug } from '../data/coursesData';
import {
  Clock,
  Wrench,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  LifeBuoy,
  Cpu,
  Layers,
  GraduationCap,
  ShieldCheck,
  PhoneCall,
  BookOpen
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | MOBNET International`;
      window.scrollTo(0, 0);
    }
  }, [course]);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  // Related courses (excluding the current one)
  const relatedCourses = COURSES_DATA.filter((c) => c.id !== course.id).slice(0, 3);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <Breadcrumb
          items={[
            { label: 'Courses', path: '/courses' },
            { label: course.title }
          ]}
        />

        {/* 2. COURSE TITLE & INTRODUCTORY HERO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span>{course.category.toUpperCase()} PROGRAM</span>
                <span aria-hidden="true">&middot;</span>
                <span>{course.level}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight font-heading leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
                {course.shortDescription}
              </p>

              {/* 4. CONFIRMED DURATION & COURSE METRICS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
                    <Clock className="w-4 h-4 text-[#D9272E]" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Duration</span>
                  </div>
                  <strong className="text-[#292F91] text-sm block">
                    {course.hasConfirmedDuration ? `${course.duration} (Confirmed)` : course.duration}
                  </strong>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
                    <Wrench className="w-4 h-4 text-[#292F91]" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Practical Bench</span>
                  </div>
                  <strong className="text-[#333333] text-sm block">
                    {course.practicalRatio}
                  </strong>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Level</span>
                  </div>
                  <strong className="text-[#333333] text-sm block truncate">
                    {course.level}
                  </strong>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  to={`/admission?course=${course.id}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                    course.title
                  )}.%20Please%20share%20the%20upcoming%20batch%20dates%20and%20fee%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white hover:bg-slate-100 border border-blue-200 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* 3. RELEVANT TECHNICAL IMAGE */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg">
                <VisualShowcase
                  type={course.visualType}
                  title={course.title}
                  badge={course.category.toUpperCase()}
                  className="h-72 sm:h-80"
                />
                <div className="p-4 bg-slate-900 text-white text-xs flex items-center justify-between border-t border-white/10">
                  <span>Dhanbad Practical Training Lab</span>
                  <span className="text-emerald-400 font-mono">Verified Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED OVERVIEW */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Course Overview
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
              Comprehensive Practical Curriculum
            </h2>

            <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
              {course.fullOverview}
            </p>

            {/* Key Syllabus Highlights */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#292F91] mb-3">
                Key Highlights:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F5F7FB] border border-[#E5E7EB]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#333333]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILLS AND TOPICS COVERED */}
      <section className="py-14 lg:py-18 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Modules List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                    Step-by-Step Training
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#292F91] font-heading">
                  Syllabus Modules
                </h3>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#292F91] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#333333] leading-snug">
                      {module}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Tools Covered */}
            <div className="lg:col-span-5 space-y-6">
              {/* Practical Skills Learned */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  <Cpu className="w-4 h-4 text-[#D9272E]" />
                  <span>Skills You Will Master</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#333333]">
                  {course.skillsLearned.map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#292F91] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Equipment */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  <Wrench className="w-4 h-4 text-[#292F91]" />
                  <span>Hardware Tools Practiced</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {course.toolsCovered.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#F5F7FB] border border-[#E5E7EB] text-[#333333] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRACTICAL LEARNING APPROACH & 7. AVAILABLE SUPPORT AND DEMO */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Practical Approach Card */}
            <div className="bg-[#F5F7FB] p-8 rounded-2xl border border-[#E5E7EB] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#292F91]">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#292F91] font-heading">
                Practical Learning Approach
              </h3>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                {course.practicalApproach}
              </p>
              <div className="pt-2 text-xs text-[#6B7280] space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% individual workstation for every student</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Practice directly on live motherboards</span>
                </div>
              </div>
            </div>

            {/* Support & Demo Information Card */}
            <div className="bg-[#F5F7FB] p-8 rounded-2xl border border-[#E5E7EB] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#D9272E]">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#292F91] font-heading">
                Free Demo &amp; Continued Support
              </h3>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                Attend a free demo class at our Bank More, Dhanbad campus before enrolling to inspect the laboratory and teaching style. After completing the course, benefit from lifetime online and offline backup support whenever tackling complex customer handset faults.
              </p>
              <div className="pt-2 text-xs text-[#6B7280] space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Free in-person demo classes available</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#292F91]" />
                  <span>Lifetime technical consultation for tricky faults</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSION ENQUIRY CTA */}
      <section className="py-14 bg-[#292F91] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Enrollment Open in Dhanbad</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
            Apply for {course.title}
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Reserve your seat for the upcoming practical batch. Fill in the online admission form or connect directly with our admissions counselor on WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to={`/admission?course=${course.id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20would%20like%20to%20enquire%20about%20fees%20and%20batches%20for%20${encodeURIComponent(
                course.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white hover:bg-slate-100 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ WITH VERIFIED ANSWERS */}
      <section className="py-14 lg:py-18 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Course Queries
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
              Verified institute policies regarding duration, prerequisites, demo sessions, and admissions.
            </p>
          </div>

          <div className="space-y-3">
            {course.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#292F91] font-heading hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D9272E] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#333333] leading-relaxed border-t border-[#E5E7EB]/50 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. RELATED COURSES */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Explore More
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                Related Training Programs
              </h3>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#292F91] hover:text-[#D9272E] transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((related) => (
              <div
                key={related.id}
                className="bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-300 shadow-xs flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#6B7280] pb-2 border-b border-[#E5E7EB]">
                    <span className="font-semibold uppercase tracking-wider text-[#292F91]">
                      {related.category}
                    </span>
                    <span>{related.level}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#292F91] font-heading leading-snug">
                    {related.title}
                  </h4>

                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                    {related.shortDescription}
                  </p>
                </div>

                <div className="p-4 bg-[#F5F7FB] border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                  <Link
                    to={`/courses/${related.slug}`}
                    className="text-xs font-semibold text-[#292F91] hover:underline"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/admission?course=${related.id}`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
