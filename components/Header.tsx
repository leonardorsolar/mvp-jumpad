
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative shrink-0 bg-transparent px-6 py-4 flex items-center justify-between z-50">
      <div className="flex flex-col">
        <span className="text-[#4b5a67] text-[17px] font-medium tracking-tight">Haiku 4.5</span>
      </div>
      
      <div className="flex items-center gap-4 text-[#7b8a97]">
        <button 
          onClick={onNewChat} 
          className="p-1 hover:bg-black/5 rounded-full transition-colors"
          title="Novo Chat"
        >
          <span className="material-symbols-outlined text-[22px]">add_comment</span>
        </button>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-1 rounded-full transition-colors ${isMenuOpen ? 'bg-black/5 text-slate-900' : 'hover:bg-black/5'}`}
          >
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>

          {/* Dropdown Menu conforme imagem */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 animate-in fade-in zoom-in duration-200 origin-top-right">
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left group">
                <span className="material-symbols-outlined text-[20px] text-[#6b7280]">schedule</span>
                <span className="text-[15px] flex-1">Converter em tarefa</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#f7f6f2] text-[#1a1a1a] rounded-xl transition-colors text-left">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="text-[15px] font-medium flex-1">Configurações</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left group">
                <span className="material-symbols-outlined text-[20px] text-[#6b7280]">language</span>
                <span className="text-[15px] flex-1">Idioma</span>
                <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">chevron_right</span>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
