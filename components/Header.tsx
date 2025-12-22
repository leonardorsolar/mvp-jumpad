
import React from 'react';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="shrink-0 bg-transparent px-6 py-4 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[#4b5a67] text-[17px] font-medium tracking-tight">Haiku 4.5</span>
      </div>
      
      <div className="flex items-center gap-4 text-[#7b8a97]">
        <button onClick={onNewChat} className="p-1 hover:bg-black/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-[22px]">add_comment</span>
        </button>
        <button className="p-1 hover:bg-black/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-[22px]">more_vert</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
