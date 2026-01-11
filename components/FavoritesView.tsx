
import React from 'react';
import { Pet } from '../types';
import { MOCK_PETS } from '../constants';

interface FavoritesViewProps {
  onPetSelect: (pet: Pet) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ onPetSelect }) => {
  const favoritePets = MOCK_PETS.filter(p => p.isFavorite);

  return (
    <div className="flex flex-col p-4 animate-in fade-in duration-500">
      <div className="flex flex-col mb-6 pt-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight">我的收藏</h2>
        <p className="text-sm text-[#61896f] dark:text-gray-400">你心仪的小伙伴都在这里</p>
      </div>

      {favoritePets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {favoritePets.map((pet, index) => (
            <div 
              key={pet.id} 
              onClick={() => onPetSelect(pet)}
              className="flex gap-4 p-3 rounded-2xl bg-white dark:bg-[#1a2e1e] border border-black/5 dark:border-white/5 shadow-sm active:scale-[0.98] transition-all cursor-pointer group animate-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0 overflow-hidden" 
                style={{ backgroundImage: `url("${pet.imageUrl}")` }}
              >
                <div className="w-full h-full bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{pet.name}</h3>
                  <span className="material-symbols-outlined text-primary fill-1">favorite</span>
                </div>
                <p className="text-sm text-[#61896f] dark:text-gray-400">{pet.breed} · {pet.age}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs">near_me</span>
                  <p className="text-xs text-[#61896f] dark:text-gray-400">{pet.distance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
          <span className="material-symbols-outlined text-6xl mb-4">heart_broken</span>
          <p className="text-lg font-medium">还没有收藏任何宠物哦</p>
          <p className="text-sm">快去首页逛逛吧！</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
