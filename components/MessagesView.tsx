
import React from 'react';
import { MOCK_CHATS } from '../constants';

const MessagesView: React.FC = () => {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-4">
        <h2 className="text-2xl font-bold leading-tight tracking-tight">消息</h2>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-4 px-4 py-2 mb-2">
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </div>
          <span className="text-xs font-semibold">通知</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
          </div>
          <span className="text-xs font-semibold">互动</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">campaign</span>
          </div>
          <span className="text-xs font-semibold">公告</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <h3 className="text-sm font-bold text-[#61896f] dark:text-gray-400 mb-4">最近联系人</h3>
        <div className="flex flex-col gap-1">
          {MOCK_CHATS.map((chat, index) => (
            <div 
              key={chat.id} 
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer group animate-in slide-in-from-right duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative shrink-0">
                <div 
                  className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-transparent group-hover:border-primary/30 transition-colors" 
                  style={{ backgroundImage: `url("${chat.avatar}")` }}
                ></div>
                {chat.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-background-light dark:border-background-dark">
                    {chat.unreadCount}
                  </div>
                )}
                {chat.isShelter && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-black p-0.5 rounded-full border-2 border-background-light dark:border-background-dark">
                    <span className="material-symbols-outlined text-[10px] font-bold">verified</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-base truncate">{chat.name}</h4>
                  <span className="text-[10px] text-[#61896f] dark:text-gray-400">{chat.time}</span>
                </div>
                <p className="text-sm text-[#61896f] dark:text-gray-400 truncate pr-4">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
