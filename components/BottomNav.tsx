
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] bg-primary text-white h-[72px] rounded-full flex items-center justify-between px-8 shadow-2xl shadow-primary/30 z-[60]">
      <NavItem 
        icon="home" 
        label="首页" 
        active={activeView === View.HOME} 
        onClick={() => onViewChange(View.HOME)} 
      />
      <NavItem 
        icon="favorite" 
        label="收藏" 
        active={activeView === View.FAVORITES} 
        onClick={() => onViewChange(View.FAVORITES)} 
      />
      <NavItem 
        icon="chat_bubble" 
        label="消息" 
        active={activeView === View.MESSAGES} 
        onClick={() => onViewChange(View.MESSAGES)} 
      />
      <NavItem 
        icon="person" 
        label="我的" 
        active={activeView === View.PROFILE} 
        onClick={() => onViewChange(View.PROFILE)} 
      />
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 transition-all active:scale-90 ${
      active ? 'text-white' : 'text-black/30'
    }`}
  >
    <span className={`material-symbols-outlined text-[28px] ${active ? 'fill-1' : ''}`}>
      {icon}
    </span>
    <span className={`text-[11px] font-bold ${active ? 'opacity-100' : 'opacity-100'}`}>
      {label}
    </span>
  </button>
);

export default BottomNav;
