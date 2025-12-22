
import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="shrink-0 bg-transparent text-slate-900 dark:text-white z-20">
      <div className="flex items-center justify-between px-4 py-3 h-[72px]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight leading-none">Jumpad</h1>
            <span className="text-[11px] text-primary font-bold uppercase tracking-wider mt-0.5">Flash 2.5</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
