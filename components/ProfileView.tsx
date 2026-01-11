
import React from 'react';
import { MOCK_APPLICATIONS } from '../constants';

const ProfileView: React.FC = () => {
  return (
    <div className="flex flex-col pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-white dark:bg-background-dark/80 backdrop-blur-md">
        <div className="size-12 flex items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center">个人中心</h2>
        <div className="size-12 flex items-center justify-end">
          <button className="h-12 bg-transparent text-[#111813] dark:text-white">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 flex flex-col items-center gap-4 bg-white dark:bg-transparent">
        <div className="relative">
          <div 
            className="aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary/20" 
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjcOEd27WlMbXTwsOlhaYUOoM9_lMYvxJNRGbH8OsWLIYSc6b8wmLnnIpG-eQnVL1X4WGChJ0j4r7ZLT7IHixNI211BAA55oPRDsRP8-XjThF7EU-kCd81nWh2DSOKjsXjidSgTKUovbHUYxnwpFEswa-KY-TPIOwQs7PGP1Vz1_XHXju5Q-s9tJtrNwjrpfA7VK3anJe0pR-MJwzuk9UhQ223hck6uj2eb-v6x5nSZTtjCovb17r8-MWZh_aDqp_n2AOKpwQZVY1T")` }}
          ></div>
          <div className="absolute bottom-1 right-1 bg-primary p-1.5 rounded-full border-2 border-white dark:border-[#0a140d]">
            <span className="material-symbols-outlined text-white text-xs">edit</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[22px] font-bold tracking-tight">张小萌</p>
          <p className="text-[#61896f] dark:text-[#a0c4ae] text-base font-medium">资深爱宠人士 · 2022年加入</p>
          <div className="flex items-center gap-1 mt-1 text-[#61896f] dark:text-[#a0c4ae]">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <p className="text-sm">上海市 · 浦东新区</p>
          </div>
        </div>
      </div>

      {/* My Pets Horizontal List */}
      <div className="px-4 pb-2 pt-6 flex justify-between items-end">
        <h3 className="text-lg font-bold">我的宠物</h3>
        <p className="text-primary text-sm font-bold cursor-pointer">查看全部</p>
      </div>
      <div className="flex overflow-x-auto px-4 py-3 no-scrollbar gap-5">
        <MyPetItem name="Luna" image="https://picsum.photos/id/237/100/100" />
        <MyPetItem name="Buster" image="https://picsum.photos/id/1025/100/100" />
        <MyPetItem name="Daisy" image="https://picsum.photos/id/1062/100/100" />
        <div className="flex flex-col justify-center gap-2 w-16 text-center shrink-0">
          <div className="w-16 h-16 flex items-center justify-center bg-background-light dark:bg-[#1a2e1e] rounded-full border-2 border-dashed border-[#61896f]">
            <span className="material-symbols-outlined text-[#61896f]">add</span>
          </div>
          <p className="text-[#61896f] text-[13px] font-normal">添加</p>
        </div>
      </div>

      {/* Application Status */}
      <div className="px-4 pb-4 pt-6">
        <h3 className="text-lg font-bold">申请进度</h3>
      </div>
      <div className="px-4 flex flex-col gap-4">
        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl bg-background-light dark:bg-[#1a2e1e] border border-black/5">
            <div 
              className="w-20 h-20 bg-center bg-cover rounded-lg shrink-0" 
              style={{ backgroundImage: `url("${app.petImageUrl}")` }}
            ></div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-base">{app.petName}</p>
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  app.status === '审核中' ? 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' : 'text-primary bg-primary/20'
                }`}>
                  {app.status}
                </span>
              </div>
              <p className="text-[#61896f] dark:text-[#a0c4ae] text-sm">{app.petBreed} · {app.petAge}</p>
              <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${app.status === '审核中' ? 'bg-orange-500' : 'bg-primary'}`} 
                  style={{ width: `${app.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Options */}
      <div className="mt-8 px-4 flex flex-col gap-2">
        <MenuButton icon="favorite" label="收藏夹" iconColor="bg-red-100 text-red-600" />
        <MenuButton icon="chat_bubble" label="消息中心" iconColor="bg-blue-100 text-blue-600" badge={3} />
        <MenuButton icon="settings" label="设置" iconColor="bg-primary/20 text-primary" />
      </div>
    </div>
  );
};

const MyPetItem: React.FC<{ name: string; image: string }> = ({ name, image }) => (
  <div className="flex flex-col justify-center gap-2 w-16 text-center shrink-0">
    <div 
      className="w-16 h-16 bg-center bg-cover rounded-full ring-2 ring-primary ring-offset-2 dark:ring-offset-[#102216]" 
      style={{ backgroundImage: `url("${image}")` }}
    ></div>
    <p className="text-[13px] font-semibold">{name}</p>
  </div>
);

const MenuButton: React.FC<{ icon: string; label: string; iconColor: string; badge?: number }> = ({ icon, label, iconColor, badge }) => (
  <button className="flex items-center justify-between p-4 bg-white dark:bg-[#1a2e1e] border border-black/5 dark:border-white/5 rounded-xl group active:bg-primary/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`size-10 flex items-center justify-center rounded-full ${iconColor}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <span className="font-bold">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</div>}
      <span className="material-symbols-outlined text-[#61896f]">chevron_right</span>
    </div>
  </button>
);

export default ProfileView;
