
import React, { useState } from 'react';
import { Conversation } from '../types';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'dept-rh',
    name: 'RH - Recursos Humanos',
    lastMessage: 'Favor enviar os documentos pendentes até amanhã.',
    time: '18:01',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100',
    unreadCount: 24,
    type: 'department'
  },
  {
    id: 'dept-dev',
    name: 'IA para Devs - Geral',
    lastMessage: '~ William Menezes: vou testar... usei o 4.6 achei engasgado.. obrigado m...',
    time: '18:01',
    avatar: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=100&h=100',
    unreadCount: 5,
    type: 'department'
  },
  {
    id: 'p-miguel',
    name: 'Família',
    lastMessage: 'Miguel: 📷 Foto',
    time: '15:31',
    avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=100&h=100',
    type: 'person'
  },
  {
    id: 'p-ben',
    name: 'Ben Henning',
    lastMessage: 'Qual o nome do programa que você comentou?',
    time: 'Agora',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
    type: 'person'
  },
  {
    id: 'dept-itap',
    name: 'Informes IFF Itaperuna',
    lastMessage: '~ Juliana Ladeira: Bom dia! Informo que devido ao período de férias leti...',
    time: '12:26',
    avatar: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=100&h=100',
    type: 'department'
  }
];

interface PeopleListProps {
  onSelectConversation: (conv: Conversation) => void;
}

const PeopleList: React.FC<PeopleListProps> = ({ onSelectConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filters = ['Todas', 'Não lidas', 'Favoritos', 'Departamentos'];

  const filtered = MOCK_CONVERSATIONS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'Departamentos') return matchesSearch && c.type === 'department';
    if (activeFilter === 'Não lidas') return matchesSearch && (c.unreadCount || 0) > 0;
    return matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Busca */}
      <div className="px-6 py-2">
        <div className="bg-[#f3f4f6] rounded-xl flex items-center px-4 py-2.5">
          <span className="material-symbols-outlined text-[#9ca3af] mr-2">search</span>
          <input 
            type="text" 
            placeholder="Pesquisar grupos e pessoas"
            className="bg-transparent border-none focus:ring-0 w-full text-[15px] p-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-[14px] whitespace-nowrap transition-colors border ${
              activeFilter === filter 
                ? 'bg-[#e7f3ef] border-[#a0c4b8] text-[#128c7e]' 
                : 'bg-[#f0f2f5] border-transparent text-[#54656f]'
            }`}
          >
            {filter} {filter === 'Não lidas' && '3'}
          </button>
        ))}
      </div>

      {/* Lista de Conversas */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv)}
            className="w-full flex items-center px-6 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
          >
            <div className="relative shrink-0">
              <img 
                src={conv.avatar} 
                className="size-12 rounded-full object-cover border border-slate-100" 
                alt={conv.name} 
              />
              {conv.type === 'department' && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-white size-5 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="material-symbols-outlined text-[12px]">work</span>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-1 flex flex-col items-start min-w-0">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-[#111b21] text-[16px] truncate">{conv.name}</span>
                <span className={`text-[12px] ${conv.unreadCount ? 'text-[#25d366] font-medium' : 'text-[#667781]'}`}>
                  {conv.time}
                </span>
              </div>
              <div className="flex items-center justify-between w-full mt-0.5">
                <p className="text-[#667781] text-[14px] truncate flex-1 text-left">
                  {conv.lastMessage}
                </p>
                {conv.unreadCount && (
                  <span className="bg-[#25d366] text-white text-[11px] font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ml-2">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
