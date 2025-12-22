
import React from 'react';

const TitleBar: React.FC = () => {
  return (
    <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-white border-b border-slate-100">
      <div className="flex items-center gap-3">
        {/* Logo similar ao da imagem */}
        <div className="size-6 bg-black rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[16px] scale-125">auto_awesome</span>
        </div>
        <span className="text-[15px] font-semibold text-[#1a1a1a] tracking-tight">
          Jumpad - AI Extension
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-[#7b8a97]">
        <button className="hover:text-slate-900 transition-colors">
          <span className="material-symbols-outlined text-[20px]">push_pin</span>
        </button>
        <button className="hover:text-slate-900 transition-colors">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
