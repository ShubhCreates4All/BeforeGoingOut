import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Ruler, Palette, Thermometer } from 'lucide-react';
import { UserProfile, Gender, AgeGroup, FashionStyle, UnitSystem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose, profile, setProfile }) => {
  if (!isOpen) return null;

  const handleChange = (key: keyof UserProfile, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Personalization</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Gender */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <User size={16} /> Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => handleChange('gender', g)}
                  className={`py-2 rounded-xl text-sm font-medium transition-all ${
                    profile.gender === g 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Ruler size={16} /> Age Group
            </label>
            <select 
              value={profile.ageGroup}
              onChange={(e) => handleChange('ageGroup', e.target.value)}
              className="w-full p-3 bg-slate-50 rounded-xl border-r-8 border-transparent text-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Teen">Teen</option>
              <option value="Young Adult (20s)">Young Adult (20s)</option>
              <option value="Adult (30s-40s)">Adult (30s-40s)</option>
              <option value="Senior (50+)">Senior (50+)</option>
            </select>
          </div>

          {/* Style */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Palette size={16} /> Preferred Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Casual', 'Smart Casual', 'Streetwear', 'Sporty', 'Minimalist', 'Formal'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleChange('style', s)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-left truncate ${
                    profile.style === s 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Units */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Thermometer size={16} /> Units
            </label>
            <div className="flex gap-2">
               <button
                  onClick={() => handleChange('unitSystem', 'imperial')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    profile.unitSystem === 'imperial' 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Imperial (°F)
                </button>
                <button
                  onClick={() => handleChange('unitSystem', 'metric')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    profile.unitSystem === 'metric' 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Metric (°C)
                </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-[0.98]"
          >
            Update Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;