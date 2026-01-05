import React from 'react';
import { motion } from 'framer-motion';
import { OutfitItem } from '../types';
import { OutfitIcon } from './Icons';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  items: OutfitItem[];
}

const OutfitGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Daily Fit</h3>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <CheckCircle2 size={14} />
          98% Match
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-slate-100 transition-all duration-300">
              <OutfitIcon type={item.iconType} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">{item.category}</span>
            <span className="text-sm font-semibold text-slate-800 text-center leading-tight px-1">{item.item}</span>
            
            {/* Context Tooltip */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-[2px] rounded-2xl flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <p className="text-xs font-medium text-white text-center leading-relaxed">"{item.reason}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OutfitGrid;