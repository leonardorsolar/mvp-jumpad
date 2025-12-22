
import React, { useEffect, useRef } from 'react';
import { Message, Role } from '../types';
import { marked } from 'marked';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const renderMarkdown = (text: string) => {
    return { __html: marked.parse(text) };
  };

  return (
    <main 
      ref={scrollRef}
      className="flex-1 overflow-y-auto w-full relative p-4 md:p-8 flex flex-col gap-6"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10"></div>
      
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
           <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
              <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
           </div>
           <h2 className="text-2xl font-bold mb-2">Boas-vindas ao Jumpad</h2>
           <p className="text-slate-500 dark:text-slate-400">
             Eu sou seu assistente inteligente. Como posso facilitar o seu trabalho hoje?
           </p>
           <div className="grid grid-cols-2 gap-3 mt-8 w-full">
              {['Explique física quântica', 'Crie um roteiro de viagem', 'Escreva um código React', 'Dicas de produtividade'].map((hint) => (
                <button key={hint} className="p-3 text-xs font-medium bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:border-primary transition-colors text-left">
                  {hint}
                </button>
              ))}
           </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-8 pb-10">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[90%] md:max-w-[85%] px-1 ${
                  msg.role === Role.USER 
                    ? 'text-slate-800 dark:text-slate-100' 
                    : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {msg.role === Role.USER ? (
                  <div className="bg-primary/10 dark:bg-primary/20 px-5 py-3 rounded-2xl rounded-tr-none text-lg">
                    {msg.text}
                  </div>
                ) : (
                  <div 
                    className="prose prose-slate dark:prose-invert max-w-none text-[17px] leading-relaxed"
                    dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                  />
                )}
              </div>
              <span className="text-[10px] mt-2 text-slate-400 font-medium px-2 uppercase tracking-tighter opacity-60">
                {msg.role === Role.USER ? 'Você' : 'Jumpad'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="flex items-center gap-2 text-primary opacity-60">
                <span className="material-symbols-outlined text-lg animate-spin">cyclone</span>
                <span className="text-xs font-bold uppercase tracking-widest">Pensando...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ChatArea;
