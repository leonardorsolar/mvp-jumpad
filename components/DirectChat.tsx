
import React, { useEffect, useRef } from 'react';
import { Conversation, Message, Role } from '../types';

interface DirectChatProps {
  conversation: Conversation;
  messages: Message[];
}

const DirectChat: React.FC<DirectChatProps> = ({ conversation, messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-[#f0f2f5] p-4 flex flex-col gap-2"
      style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain' }}
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-3 py-2">
        
        {/* Exemplo de mensagem do sistema */}
        <div className="self-center bg-[#f7f9fa] text-[#54656f] px-3 py-1 rounded-lg text-[12px] uppercase tracking-wide font-medium shadow-sm mb-4">
          Ontem
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] px-2.5 py-1.5 rounded-xl shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative ${
                msg.role === Role.USER 
                  ? 'bg-[#dcf8c6] rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              {msg.role !== Role.USER && conversation.type === 'department' && (
                <span className="text-[13px] font-bold text-[#eeb0a1] block mb-0.5">
                  {msg.senderName || 'Colega'}
                </span>
              )}
              <div className="text-[14.5px] text-[#111b21] pr-10 whitespace-pre-wrap leading-tight">
                {msg.text}
              </div>
              <div className="absolute bottom-1 right-1.5 flex items-center gap-1">
                <span className="text-[10px] text-[#667781]">16:05</span>
                {msg.role === Role.USER && (
                  <span className="material-symbols-outlined text-[14px] text-[#53bdeb]">done_all</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectChat;
