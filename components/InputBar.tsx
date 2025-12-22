
import React, { useState, useRef, KeyboardEvent } from 'react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
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

  return (
    <footer className="shrink-0 bg-transparent px-4 pb-6 pt-2 z-20">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-2">
        <div className="bg-white dark:bg-[#2a1e36] rounded-[2rem] p-4 flex flex-col gap-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 relative shadow-sm min-h-[140px] border border-slate-200 dark:border-white/5">
          <input 
            ref={inputRef}
            aria-label="Message input" 
            className="w-full bg-transparent border-none text-lg text-slate-700 dark:text-slate-100 placeholder:text-slate-400 px-2 py-2 focus:ring-0 focus:outline-none" 
            placeholder="Digite / para comandos" 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <div className="flex items-end justify-between px-1 mt-auto">
            <div className="flex items-center">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors group">
                <span className="material-symbols-outlined text-[18px]">pan_tool_alt</span>
                <span className="truncate">Perguntar antes de agir</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-slate-600">expand_more</span>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || disabled}
                className={`ml-1 shrink-0 size-9 rounded-lg flex items-center justify-center transition-all ${
                  input.trim() && !disabled 
                    ? 'bg-primary/20 dark:bg-primary/40 text-primary dark:text-purple-300 hover:bg-primary/30 dark:hover:bg-primary/50 cursor-pointer shadow-sm' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-4 text-center">
          <p className="text-[11px] text-slate-400/80 dark:text-slate-500/80 font-medium uppercase tracking-wider">
            Jumpad é uma IA e pode cometer erros. Verifique as respostas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default InputBar;
