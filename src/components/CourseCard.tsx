import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Clock, Wrench, CheckCircle2, ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, featured = false }) => {
  const [expanded, setExpanded] = useState(false);

  const getCategoryColor = (cat: Course['category']) => {
    switch (cat) {
      case 'chip-level':
        return 'text-[#D9272E]';
      case 'software':
        return 'text-[#292F91]';
      case 'master':
        return 'text-[#1E2368] font-bold';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <article
      className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        featured
          ? 'border-[#292F91] shadow-md ring-1 ring-[#292F91]/20'
          : 'border-[#E5E7EB] hover:border-slate-300 shadow-xs'
      }`}
    >
      <div className="p-6">
        {/* Unboxed Metadata Header (Zero-Pill Compliance) */}
        <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3 pb-3 border-b border-[#E5E7EB]">
          <span className={`font-semibold uppercase tracking-wider ${getCategoryColor(course.category)}`}>
            {course.category.toUpperCase()}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{course.level}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#292F91] font-heading leading-snug">
          <Link
            to={`/courses/${course.slug}`}
            className="hover:text-[#D9272E] transition-colors"
          >
            {course.title}
          </Link>
        </h3>

        {/* Course Meta: Duration & Practical Bench Ratio */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#333333] bg-[#F5F7FB] p-3 rounded-lg border border-[#E5E7EB]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D9272E] shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#292F91] shrink-0" />
            <span className="truncate">{course.practicalRatio}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Key Highlights */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]/70">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-2.5">
            Syllabus Highlights:
          </h4>
          <ul className="space-y-1.5 text-xs text-[#333333]">
            {course.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Full Module Breakdown */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-4 animate-in fade-in duration-200">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#292F91] mb-2">
                All Course Modules:
              </h5>
              <ul className="space-y-1.5 text-xs text-[#333333]">
                {course.modules.map((module, i) => (
                  <li key={i} className="pl-2 border-l-2 border-blue-200 py-0.5">
                    {module}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#292F91] mb-2">
                Practical Equipment Used:
              </h5>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-[#6B7280]">
                {course.toolsCovered.map((tool, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 bg-slate-50/80 border-t border-[#E5E7EB] flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#292F91] hover:text-[#1a1f5e] transition-colors py-1.5 px-2 rounded hover:bg-slate-100"
          >
            <span>{expanded ? 'Hide Modules' : 'View Full Modules'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <a
            href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20please%20send%20fee%20structure%20and%20details%20for%20${encodeURIComponent(
              course.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors py-1.5 px-2"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ask Fee</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-semibold text-[#292F91] bg-white border border-[#292F91] hover:bg-blue-50 transition-colors"
          >
            <span>View Details</span>
          </Link>

          <Link
            to={`/admission?course=${course.id}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
