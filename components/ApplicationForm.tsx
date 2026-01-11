
import React, { useState } from 'react';

interface ApplicationFormProps {
  onBack: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    housing: 'apartment'
  });

  return (
    <div className="flex flex-col min-h-screen animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-white flex size-12 items-center justify-center cursor-pointer active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center pr-12">领养申请表单</h2>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-900 dark:text-white text-base font-semibold">1. 个人信息</p>
          <p className="text-slate-900 dark:text-white text-sm font-medium bg-primary/20 px-3 py-1 rounded-full">第 {step}/3 步</p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden h-2.5">
          <div 
            className="h-full rounded-full bg-primary transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">navigate_next</span>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">下一步: 养宠经验</p>
        </div>
      </div>

      <div className="px-4">
        <div className="h-[1px] bg-slate-200 dark:bg-slate-800 w-full mb-4"></div>
      </div>

      {/* Form Content */}
      <div className="flex flex-col px-4 pt-4 pb-2">
        <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">请介绍一下您的情况</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">我们希望确保每一只宠物都能找到最合适的温暖家园。</p>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <div className="px-4 py-3">
          <label className="flex flex-col">
            <p className="text-slate-900 dark:text-white text-sm font-semibold pb-2 ml-1">姓名</p>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input w-full rounded-full text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-14 px-6 focus:ring-primary focus:border-primary" 
              placeholder="请输入真实姓名" 
            />
          </label>
        </div>

        <div className="px-4 py-3">
          <label className="flex flex-col">
            <p className="text-slate-900 dark:text-white text-sm font-semibold pb-2 ml-1">电话</p>
            <div className="flex items-stretch rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-primary/50">
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="form-input flex-1 border-none bg-transparent h-14 text-slate-900 dark:text-white px-6 focus:ring-0" 
                placeholder="请输入手机号码" 
              />
              <div className="text-slate-400 flex items-center justify-center pr-6">
                <span className="material-symbols-outlined">call</span>
              </div>
            </div>
          </label>
        </div>

        <div className="px-4 py-3">
          <p className="text-slate-900 dark:text-white text-sm font-semibold pb-3 ml-1">住房类型</p>
          <div className="grid grid-cols-2 gap-4">
            <HousingOption 
              id="apartment" 
              label="公寓" 
              icon="apartment" 
              selected={formData.housing === 'apartment'} 
              onSelect={() => setFormData({...formData, housing: 'apartment'})}
            />
            <HousingOption 
              id="house" 
              label="带院子住宅" 
              icon="house" 
              selected={formData.housing === 'house'} 
              onSelect={() => setFormData({...formData, housing: 'house'})}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow min-h-[100px]"></div>

      <div className="p-4 pb-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky bottom-0 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => alert("申请已提交！审核可能需要 3-5 个工作日。")}
          className="w-full bg-primary hover:bg-primary/90 text-black h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          <span>提交申请</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

const HousingOption: React.FC<{ id: string; label: string; icon: string; selected: boolean; onSelect: () => void }> = ({ id, label, icon, selected, onSelect }) => (
  <div onClick={onSelect} className="cursor-pointer">
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
      selected ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
    }`}>
      <span className={`material-symbols-outlined text-3xl mb-2 ${selected ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
        {icon}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
    </div>
  </div>
);

export default ApplicationForm;
