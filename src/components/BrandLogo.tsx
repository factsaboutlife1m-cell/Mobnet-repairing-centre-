import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  showSubtitle = true,
  className = '',
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  const badgeSize =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
      ? 'w-14 h-14'
      : 'w-12 h-12';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official MOBNET Circular Brand Emblem */}
      <div
        className={`relative flex items-center justify-center ${badgeSize} rounded-full bg-white shadow-sm shrink-0 overflow-hidden border ${
          isDark ? 'border-white/20 ring-1 ring-white/10' : 'border-slate-200 ring-1 ring-black/5'
        }`}
      >
        <img
          src="/assets/aistudio/file_00000000b6c082079855466352462f22_6c4f41be.png"
          alt="MOBNET International Logo"
          className="w-full h-full object-contain p-0.5"
          loading="eager"
        />
      </div>

      {/* Brand Text Lockup */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center tracking-tight">
          <span
            className={`font-black text-xl tracking-tight ${
              isDark ? 'text-white' : 'text-[#292F91]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            MOBNET
          </span>
          <span
            className="font-bold text-xs uppercase tracking-widest ml-1.5 px-1.5 py-0.5 rounded text-white bg-[#D9272E]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            INTL
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`text-[10px] tracking-wide font-medium ${
              isDark ? 'text-slate-300' : 'text-[#6B7280]'
            }`}
          >
            A Division of SMTM Pvt. Ltd.
          </span>
        )}
      </div>
    </div>
  );
};
