import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 lg:mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
          <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
            {kicker}
          </span>
        </div>
      )}
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] tracking-tight leading-tight font-heading"
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-[#6B7280] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
