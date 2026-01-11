
import React, { useState } from 'react';
import { Pet } from '../types';
import { askGeminiAboutPet } from '../services/gemini';

interface PetDetailViewProps {
  pet: Pet;
  onBack: () => void;
  onApply: () => void;
}

const PetDetailView: React.FC<PetDetailViewProps> = ({ pet, onBack, onApply }) => {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    const response = await askGeminiAboutPet(pet.name, pet.breed, aiQuestion);
    setAiResponse(response || "暂时无法回答");
    setIsAiLoading(false);
  };

  return (
    <div className="relative flex flex-col w-full pb-32 animate-in slide-in-from-right duration-500">
      {/* Hero Header */}
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-4">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm text-[#111813] dark:text-white shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm text-[#111813] dark:text-white">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm text-[#111813] dark:text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div 
        className="w-full h-[400px] bg-cover bg-center flex flex-col justify-end"
        style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 40%), url("${pet.imageUrl}")` }}
      >
        <div className="flex justify-center gap-2 p-5">
          <div className="size-2 rounded-full bg-primary"></div>
          <div className="size-2 rounded-full bg-white opacity-50"></div>
          <div className="size-2 rounded-full bg-white opacity-50"></div>
          <div className="size-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      {/* Main Info */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight tracking-tight">
              {pet.name}
            </h1>
            <p className="text-[#61896f] dark:text-[#a1c4ad] text-lg font-medium">
              {pet.breed} • {pet.age} • {pet.gender}
            </p>
          </div>
          <div className="bg-primary/20 px-3 py-1 rounded-full">
            <p className="text-[#111813] dark:text-white text-xs font-bold">待领养</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#61896f] dark:text-[#a1c4ad]">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <p className="text-sm font-normal">上海市，徐汇区 (距离 {pet.distance})</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatBox label="体重" value={pet.weight || '--'} />
          <StatBox label="毛色" value={pet.color || '--'} />
          <StatBox label="体型" value={pet.size || '--'} />
        </div>

        {/* Traits */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {pet.traits?.map((trait, i) => (
            <div key={i} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f4f2] dark:bg-white/10 px-4 border border-transparent">
              <span className="material-symbols-outlined text-lg">
                {trait.includes('性格') ? 'mood' : trait.includes('活泼') ? 'bolt' : 'vaccines'}
              </span>
              <p className="text-[#111813] dark:text-white text-sm font-semibold">{trait}</p>
            </div>
          ))}
        </div>

        {/* AI Helper Section */}
        <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            AI 宠物管家解答
          </h3>
          <div className="flex gap-2">
            <input 
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="问问它的习惯？比如：它爱吃什么？"
              className="flex-1 text-xs bg-white dark:bg-black/20 rounded-lg border-none focus:ring-1 focus:ring-primary py-2 px-3"
            />
            <button 
              onClick={handleAiAsk}
              disabled={isAiLoading}
              className="bg-primary text-black px-4 py-2 rounded-lg text-xs font-bold active:scale-95 disabled:opacity-50"
            >
              {isAiLoading ? '思考中...' : '询问'}
            </button>
          </div>
          {aiResponse && (
            <div className="mt-3 p-3 bg-white/50 dark:bg-black/30 rounded-lg text-xs leading-relaxed animate-in fade-in duration-300">
              {aiResponse}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-[#111813] dark:text-white text-xl font-bold leading-tight pt-4 pb-2">
            关于 {pet.name.split(' ')[0]}的故事
          </h3>
          <p className="text-[#4a6b56] dark:text-[#c4d9cc] text-base leading-relaxed">
            {pet.description}
            <span className="text-primary font-bold cursor-pointer ml-1">查看更多</span>
          </p>
        </div>

        {/* Shelter Info */}
        <div className="p-4 rounded-xl bg-background-light dark:bg-white/5 border border-[#e0e8e2] dark:border-white/10 flex items-center gap-4">
          <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/64/200/200')` }}></div>
          <div className="flex-1">
            <p className="text-[#111813] dark:text-white font-bold text-sm">阳光爪爪救助中心</p>
            <p className="text-[#61896f] dark:text-[#a1c4ad] text-xs">动物救助机构 • 15 只宠物待领养</p>
          </div>
          <span className="material-symbols-outlined text-[#61896f]">chevron_right</span>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-[#e0e8e2] dark:border-white/10 p-4 flex gap-3 z-50">
        <button className="flex-1 h-14 rounded-full border-2 border-primary text-[#111813] dark:text-white font-bold text-base flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">mail</span>
          联系机构
        </button>
        <button 
          onClick={onApply}
          className="flex-[2] h-14 rounded-full bg-primary text-black font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">pets</span>
          申请领养
        </button>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-background-light dark:bg-white/5 p-3 rounded-2xl flex flex-col items-center justify-center border border-[#e0e8e2] dark:border-white/10">
    <span className="text-[#61896f] text-xs font-semibold">{label}</span>
    <span className="text-[#111813] dark:text-white font-bold">{value}</span>
  </div>
);

export default PetDetailView;
