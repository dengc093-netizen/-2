
import React, { useState, useMemo } from 'react';
import { Pet, PetCategory } from '../types';
import { MOCK_PETS } from '../constants';

interface HomeViewProps {
  onPetSelect: (pet: Pet) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onPetSelect }) => {
  const [activeCategory, setActiveCategory] = useState<PetCategory>('狗狗');

  const filteredPets = useMemo(() => {
    return MOCK_PETS.filter(pet => pet.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col animate-in fade-in duration-500 bg-background-dark min-h-screen">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <p className="text-sm font-medium text-gray-400">上海市, 静安区</p>
            </div>
            <h2 className="text-[32px] font-bold leading-tight tracking-tight text-white">寻找新朋友</h2>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5 overflow-hidden">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBd0C2EvynNroD0PUGT4K3rlz1rrJytPVYLXgVrbnaYXFmkNX3_kr8v-TrLi8h8En1tX35DTaYxEV_3aDHX7DW9BYDVFYIczATyVwPJxk8JWDXjgq8TOgfwf2tjJspobKfi9VynZ40YRywSbBF1QMUknMVHt16VjO9EZkrIcIGq9NCelPijUHZwK0JRjEaANo41mDoGMSQg-ZqdF0CKL6D4u5RcjlJVc0U5rNNKMB-LQxCFnX9Lj9Fe9yOsPt1xGrtS05xSzjuW5vjc')` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-4">
        <div className="flex gap-4">
          <div className="flex flex-1 items-center rounded-[20px] bg-white/5 border border-white/10 h-[56px] px-5">
            <span className="material-symbols-outlined text-gray-500 text-[24px]">search</span>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-base text-white placeholder:text-gray-500 ml-3" 
              placeholder="搜索宠物..." 
            />
          </div>
          <button className="bg-primary text-white w-[56px] h-[56px] rounded-[20px] flex items-center justify-center shadow-lg shadow-primary/10 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 px-5 py-4 overflow-x-auto no-scrollbar">
        <CategoryItem 
          icon="pets" 
          label="狗狗" 
          active={activeCategory === '狗狗'} 
          onClick={() => setActiveCategory('狗狗')} 
        />
        <CategoryItem 
          icon="pets" 
          label="猫猫" 
          active={activeCategory === '猫猫'} 
          onClick={() => setActiveCategory('猫猫')} 
          color="text-accent-orange" 
        />
        <CategoryItem 
          icon="flutter_dash" 
          label="小鸟" 
          active={activeCategory === '小鸟'} 
          onClick={() => setActiveCategory('小鸟')} 
          color="text-blue-400" 
        />
        <CategoryItem 
          icon="pets" 
          label="小动物" 
          active={activeCategory === '小动物'} 
          onClick={() => setActiveCategory('小动物')} 
          color="text-purple-400" 
        />
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between px-5 pb-2 pt-6">
        <h3 className="text-[20px] font-bold text-white tracking-tight">附近的宠物</h3>
        <p className="text-primary text-sm font-bold">查看全部</p>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 p-5">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet, index) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              index={index} 
              onClick={() => onPetSelect(pet)} 
            />
          ))
        ) : (
          <div className="col-span-2 py-20 text-center opacity-40">
            <p className="text-lg text-white">暂无{activeCategory}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryItem: React.FC<{ icon: string; label: string; active?: boolean; onClick: () => void; color?: string }> = ({ icon, label, active, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`flex h-[50px] shrink-0 items-center justify-center gap-x-3 rounded-[20px] px-6 shadow-sm transition-all active:scale-95 ${
      active ? 'bg-primary text-white border-transparent' : 'bg-white/5 border border-white/10'
    }`}
  >
    <span className={`material-symbols-outlined text-xl ${active ? '' : color || 'text-gray-400'}`}>
      {icon}
    </span>
    <p className={`text-[15px] font-bold ${active ? '' : 'text-gray-300'}`}>{label}</p>
  </button>
);

const PetCard: React.FC<{ pet: Pet; index: number; onClick: () => void }> = ({ pet, index, onClick }) => {
  const isOffset = index % 2 !== 0;
  
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col gap-3 group cursor-pointer ${isOffset ? 'mt-12' : 'mt-0'} animate-in slide-in-from-bottom duration-700`}
    >
      <div className={`relative w-full overflow-hidden rounded-[28px] ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/6]'}`}>
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110" 
          style={{ backgroundImage: `url("${pet.imageUrl}")` }}
        ></div>
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-full border border-white/30 text-white">
          <span className={`material-symbols-outlined text-[20px] leading-none ${pet.isFavorite ? 'fill-1' : ''}`}>
            favorite
          </span>
        </div>
        {pet.isNew && (
          <div className="absolute bottom-4 left-4 bg-primary text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
            最新
          </div>
        )}
      </div>
      <div className="px-1">
        <p className="text-white text-[18px] font-bold tracking-tight">{pet.name}</p>
        <p className="text-gray-400 text-sm font-medium mt-0.5">年龄 {pet.age} · {pet.gender}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="material-symbols-outlined text-primary text-[14px]">near_me</span>
          <p className="text-gray-400 text-xs font-bold">距离 {pet.distance}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
