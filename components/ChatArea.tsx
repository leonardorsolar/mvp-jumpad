
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderMarkdown = (text: string) => {
    return { __html: marked.parse(text) };
  };

  return (
    <main 
      ref={scrollRef}
      className="flex-1 overflow-y-auto w-full p-4 md:p-6 flex flex-col gap-6"
    >
      {messages.length === 0 ? (
        <div className="flex-1"></div>
      ) : (
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-8 pb-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[92%] px-1 ${
                  msg.role === Role.USER 
                    ? 'text-slate-800' 
                    : 'text-slate-700'
                }`}
              >
                {msg.role === Role.USER ? (
                  <div className="bg-[#f0f2f5] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[16px]">
                    {msg.text}
                  </div>
                ) : (
                  <div 
                    className="prose prose-slate max-w-none text-[16px] leading-relaxed"
                    dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                  />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 px-2 opacity-40">
              <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ChatArea;
