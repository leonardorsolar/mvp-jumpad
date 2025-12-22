
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[280px] bg-sidebar-light dark:bg-sidebar-dark border-r border-slate-200 dark:border-white/5
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden'}
      `}>
        <div className="flex flex-col h-full p-4">
          <button 
            onClick={onNewChat}
            className="flex items-center gap-3 w-full p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all mb-6 group shadow-sm"
          >
            <span className="material-symbols-outlined text-primary group-hover:rotate-90 transition-transform">add</span>
            <span className="font-semibold text-sm">Novo chat</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">Recentes</h3>
            {['Explicação de React', 'Código Python para API', 'Dicas de Design UI/UX'].map((title, i) => (
              <button 
                key={i} 
                className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors text-left group"
              >
                <span className="material-symbols-outlined text-[18px] opacity-40 group-hover:opacity-100">chat_bubble</span>
                <span className="truncate flex-1">{title}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5">
            <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span>Minha Conta</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
