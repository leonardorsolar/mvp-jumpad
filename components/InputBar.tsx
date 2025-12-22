
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

type InteractionMode = 'conversar' | 'executar';

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<InteractionMode>('conversar');
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="shrink-0 px-4 pb-6 pt-2">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
        <div className="bg-white border border-[#e5e7eb] rounded-[1.8rem] p-4 flex flex-col gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <input 
            ref={inputRef}
            className="w-full bg-transparent border-none text-[17px] text-[#2c3137] placeholder:text-[#9ca3af] px-2 py-1 focus:ring-0" 
            placeholder="Digite / para comandos" 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          
          <div className="flex items-center justify-between">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1 text-[14px] text-[#4b5a67] hover:bg-slate-50 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {mode === 'conversar' ? 'pan_tool' : 'fast_forward'}
                </span>
                <span className="font-normal">
                  {mode === 'conversar' ? 'Modo conversar' : 'Modo executar ações'}
                </span>
                <span className={`material-symbols-outlined text-[18px] opacity-40 transition-transform ${isModeDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Interaction Mode Dropdown */}
              {isModeDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button 
                    onClick={() => { setMode('conversar'); setIsModeDropdownOpen(false); }}
                    className="w-full flex items-start gap-3 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#4b5a67] mt-0.5">pan_tool</span>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium text-[#1a1a1a]">Modo conversar</span>
                        {mode === 'conversar' && <span className="material-symbols-outlined text-[18px] text-[#2563eb]">check</span>}
                      </div>
                      <span className="text-[13px] text-[#6b7280] leading-tight mt-0.5">Jumpad alinha sua abordagem antes de realizar ações</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => { setMode('executar'); setIsModeDropdownOpen(false); }}
                    className="w-full flex items-start gap-3 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#4b5a67] mt-0.5">fast_forward</span>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium text-[#1a1a1a]">Modo executar ações</span>
                        {mode === 'executar' && <span className="material-symbols-outlined text-[18px] text-[#2563eb]">check</span>}
                      </div>
                      <span className="text-[13px] text-[#6b7280] leading-tight mt-0.5">Jumpad executa ações sem pedir permissão</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#7b8a97] hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[22px]">auto_awesome_motion</span>
              </button>
              <button className="p-2 text-[#7b8a97] hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[22px]">add</span>
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || disabled}
                className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() && !disabled 
                    ? 'bg-[#eeb0a1] text-white' 
                    : 'bg-[#f3f4f6] text-[#d1d5db]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] font-bold">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-[12px] text-[#7b8a97] text-center px-4 leading-snug">
          Jumpad é uma IA e pode cometer erros. Verifique as respostas.
        </p>
      </div>
    </footer>
  );
};

export default InputBar;
