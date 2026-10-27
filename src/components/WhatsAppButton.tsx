import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-5 right-5 z-40">
      <a
        href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20would%20like%20to%20know%20more%20about%20your%20mobile%20repairing%20batches%20and%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        aria-label="Chat directly on WhatsApp with MOBNET International admissions desk"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline whitespace-nowrap">
          WhatsApp Enquiry
        </span>
      </a>
    </aside>
  );
};
