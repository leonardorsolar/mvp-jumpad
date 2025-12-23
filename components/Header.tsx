
import React, { useState, useRef, useEffect } from 'react';
import ModelSelector from './ModelSelector';
import { ViewState } from '../types';

interface HeaderProps {
  onNewChat: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  title?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNewChat, 
  selectedModel, 
  onModelChange, 
  currentView, 
  onViewChange,
  title,
  onBack
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button onClick={onBack} className="mr-2 p-1 hover:bg-black/5 rounded-full shrink-0 transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
        )}
        <div className="flex flex-col min-w-0">
          {currentView === 'AI' ? (
            <button 
              onClick={() => setIsModelSelectorOpen(true)}
              className="flex items-center gap-1 group"
            >
              <span className="text-[#4b5a67] text-[17px] font-medium tracking-tight group-hover:text-slate-900 transition-colors truncate">
                {selectedModel}
              </span>
              <span className="material-symbols-outlined text-[#7b8a97] text-[18px] transition-transform group-hover:translate-y-0.5 shrink-0">
                expand_more
              </span>
            </button>
          ) : (
            <span className="text-[#1a1a1a] text-[20px] font-bold tracking-tight truncate">
              {title || (currentView === 'PEOPLE_LIST' ? 'Conversas' : 'Chat')}
            </span>
          )}
        </div>
      </div>
      
      {/* Menu de Ícones Reorganizado */}
      <div className="flex items-center gap-2 text-[#7b8a97] shrink-0">
        
        {/* Ícone 1: Novo Chat ou Voltar para IA (Agora à Esquerda do grupo) */}
        <button 
          onClick={() => {
            if (currentView === 'AI') {
              onNewChat();
            } else {
              onViewChange('AI');
            }
          }} 
          className="p-1.5 hover:bg-black/5 active:scale-90 rounded-full transition-all flex items-center justify-center"
          title={currentView === 'AI' ? "Novo Chat" : "Voltar para IA"}
        >
          <span className="material-symbols-outlined text-[24px]">
            {currentView === 'AI' ? 'add_comment' : 'chat'}
          </span>
        </button>

        {/* Ícone 2: Pessoas / Departamentos */}
        <button 
          onClick={() => {
            if (currentView === 'AI') onViewChange('PEOPLE_LIST');
          }}
          disabled={currentView !== 'AI'}
          className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
            currentView !== 'AI' 
              ? 'opacity-20 cursor-default' 
              : 'hover:bg-black/5 active:scale-90'
          }`}
          title="Pessoas e Departamentos"
        >
          <span className="material-symbols-outlined text-[24px]">group</span>
        </button>

        {/* Ícone 3: Meet Track (Gravação em Vídeo) - NOVO */}
        <button 
          className="p-1.5 hover:bg-black/5 active:scale-90 rounded-full transition-all flex items-center justify-center"
          title="Meet Track - Gravação em Vídeo"
        >
          <span className="material-symbols-outlined text-[24px]">videocam</span>
        </button>

        {/* Ícone 4: Menu de Mais Opções */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-1.5 rounded-full transition-all active:scale-90 ${isMenuOpen ? 'bg-black/5 text-slate-900' : 'hover:bg-black/5'}`}
          >
            <span className="material-symbols-outlined text-[24px]">more_vert</span>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 animate-in fade-in zoom-in duration-200 origin-top-right">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#f7f6f2] text-[#1a1a1a] rounded-xl transition-colors text-left">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="text-[15px] font-medium flex-1">Configurações</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left">
                <span className="material-symbols-outlined text-[20px] text-[#6b7280]">language</span>
                <span className="text-[15px] flex-1">Idioma</span>
                <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <ModelSelector 
        isOpen={isModelSelectorOpen}
        onClose={() => setIsModelSelectorOpen(false)}
        currentModel={selectedModel}
        // Use onModelChange from props instead of the missing onSelectModel
        onSelectModel={onModelChange}
      />
    </header>
  );
};

export default Header;
