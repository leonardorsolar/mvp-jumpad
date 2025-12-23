
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { WorkflowStep } from '../types';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
  onOpenVoice: () => void;
  onOpenWorkflow: (step: WorkflowStep) => void;
}

type InteractionMode = 'conversar' | 'executar';

interface Assistant {
  id: string;
  name: string;
  command: string;
  icon: string;
}

const MOCK_ASSISTANTS: Assistant[] = [
  { id: '1', name: 'Assistente de Copywriter', command: '/copywriter', icon: 'edit_note' },
  { id: '2', name: 'Assistente de Vendas', command: '/vendas', icon: 'trending_up' },
  { id: '3', name: 'Assistente de Tradução', command: '/traducao', icon: 'translate' },
];

const PLACEHOLDER_MESSAGES = [
  "Como posso ajudar você?",
  "digite / para executar seus assistentes"
];

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled, onOpenVoice, onOpenWorkflow }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<InteractionMode>('conversar');
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isWorkflowMenuOpen, setIsWorkflowMenuOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  
  // Estados para animação do placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isPlaceholderFading, setIsPlaceholderFading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const commandMenuRef = useRef<HTMLDivElement>(null);
  const workflowMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeAllMenus = () => {
    setIsWorkflowMenuOpen(false);
    setIsCommandMenuOpen(false);
    setIsAddMenuOpen(false);
    setIsModeDropdownOpen(false);
  };

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      setIsCommandMenuOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    
    if (val.endsWith('/')) {
      setIsCommandMenuOpen(true);
    } else if (!val.includes('/')) {
      setIsCommandMenuOpen(false);
    }
  };

  const selectAssistant = (assistant: Assistant) => {
    const lastSlashIndex = input.lastIndexOf('/');
    const newInput = input.substring(0, lastSlashIndex) + assistant.command + ' ';
    setInput(newInput);
    setIsCommandMenuOpen(false);
    inputRef.current?.focus();
  };

  const triggerWorkflow = (step: WorkflowStep) => {
    closeAllMenus();
    onOpenWorkflow(step);
  };

  const triggerVoice = () => {
    closeAllMenus();
    onOpenVoice();
  };

  // Efeito para alternar o placeholder com animação
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaceholderFading(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_MESSAGES.length);
        setIsPlaceholderFading(false);
      }, 500); // Tempo para o fade-out completar
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsModeDropdownOpen(false);
      }
      if (addMenuRef.current && !addMenuRef.current.contains(target)) {
        setIsAddMenuOpen(false);
      }
      if (commandMenuRef.current && !commandMenuRef.current.contains(target)) {
        setIsCommandMenuOpen(false);
      }
      if (workflowMenuRef.current && !workflowMenuRef.current.contains(target)) {
        setIsWorkflowMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="shrink-0 px-4 pb-6 pt-2 z-40 bg-transparent relative">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
        
        {/* Dropdown de Comandos '/' */}
        {isCommandMenuOpen && (
          <div 
            ref={commandMenuRef}
            className="absolute bottom-full left-4 right-4 mb-4 bg-white border border-[#e5e7eb] rounded-[1.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 z-[60]"
          >
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Assistentes de Trabalho</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1.5">
              {MOCK_ASSISTANTS.map((assistant) => (
                <button
                  key={assistant.id}
                  onClick={() => selectAssistant(assistant)}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                >
                  <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span className="material-symbols-outlined text-[22px]">{assistant.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-slate-800">{assistant.name}</span>
                    <span className="text-[12px] text-slate-400">{assistant.command}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-[#e5e7eb] rounded-[1.8rem] p-4 flex flex-col gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          
          <div className="flex items-center gap-2 relative">
            <div className="relative" ref={addMenuRef}>
              <button 
                onClick={() => {
                  const newState = !isAddMenuOpen;
                  closeAllMenus();
                  setIsAddMenuOpen(newState);
                }}
                className="flex items-center justify-center p-1 text-[#7b8a97] hover:text-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">add</span>
              </button>

              {isAddMenuOpen && (
                <div className="absolute bottom-full left-0 mb-3 w-64 bg-white border border-[#e5e7eb] rounded-[1.2rem] shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-1.5 z-[55] animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button 
                    disabled
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-[#d1d5db] cursor-not-allowed rounded-xl text-left"
                  >
                    <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                    <span className="text-[15px]">Tirar uma captura de tela</span>
                  </button>

                  <button 
                    onClick={() => setIsAddMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[22px]">image</span>
                    <span className="text-[15px]">Adicionar uma imagem</span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex-1 flex items-center">
              <input 
                ref={inputRef}
                className={`w-full bg-transparent border-none text-[17px] text-[#2c3137] px-2 py-1 focus:ring-0 transition-opacity duration-300 ${isPlaceholderFading && !input ? 'opacity-50' : 'opacity-100'}`} 
                placeholder={PLACEHOLDER_MESSAGES[placeholderIndex]} 
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
              />
              {/* Overlay invisível apenas para garantir que a classe 'placeholder:text' não conflite com nossa animação manual de opacidade se quisermos algo mais complexo no futuro */}
            </div>

            {input.trim() ? (
               <button 
                onClick={handleSend}
                disabled={disabled}
                className="size-10 rounded-full flex items-center justify-center transition-all bg-[#00a884] text-white"
              >
                <span className="material-symbols-outlined text-[24px] font-bold">send</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 text-[#7b8a97]">
                <span className="material-symbols-outlined text-[24px] cursor-pointer hover:text-slate-900">mic</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between border-t border-slate-50 pt-2">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => {
                  const newState = !isModeDropdownOpen;
                  closeAllMenus();
                  setIsModeDropdownOpen(newState);
                }}
                className="flex items-center gap-2 px-3 py-1 text-[13px] text-[#4b5a67] hover:bg-slate-50 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {mode === 'conversar' ? 'pan_tool' : 'fast_forward'}
                </span>
                <span className="font-normal">
                  {mode === 'conversar' ? 'Modo conversar' : 'Modo executar ações'}
                </span>
                <span className={`material-symbols-outlined text-[16px] opacity-40 transition-transform ${isModeDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {isModeDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-1.5 z-[55] animate-in fade-in slide-in-from-bottom-2 duration-200">
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
              <div className="relative" ref={workflowMenuRef}>
                <button 
                  onClick={() => {
                    const newState = !isWorkflowMenuOpen;
                    closeAllMenus();
                    setIsWorkflowMenuOpen(newState);
                  }}
                  className="group relative p-2 text-[#7b8a97] hover:text-[#007aff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                  {!isWorkflowMenuOpen && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Assistente de trabalho
                    </div>
                  )}
                </button>

                {isWorkflowMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-3 w-64 bg-white border border-[#e5e7eb] rounded-[1.2rem] shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-1.5 z-[55] animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <button 
                      onClick={() => triggerWorkflow('CREATE_MODAL')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[22px] text-slate-400">autorenew</span>
                      <span className="text-[14px]">Converter em Assistente</span>
                    </button>

                    <button 
                      onClick={() => triggerWorkflow('PERMISSION')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-[#374151] hover:bg-slate-50 rounded-xl transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[22px] text-slate-400">add_task</span>
                      <span className="text-[14px]">Criar Assistente de trabalho</span>
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={triggerVoice}
                className="p-2 text-[#7b8a97] hover:text-[#007aff] transition-colors"
                title="Conversa por Voz"
              >
                <span className="material-symbols-outlined text-[24px]">equalizer</span>
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
