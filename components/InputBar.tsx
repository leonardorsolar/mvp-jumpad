
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
            <button className="flex items-center gap-2 px-3 py-1 text-[14px] text-[#4b5a67] hover:bg-slate-50 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[20px]">pan_tool</span>
              <span className="font-normal">Perguntar antes de agir</span>
              <span className="material-symbols-outlined text-[18px] opacity-40">expand_more</span>
            </button>
            
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
