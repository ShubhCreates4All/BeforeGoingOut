import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData, UnitSystem } from '../types';
import { WeatherIcon } from './Icons';
import { Wind, Droplets, Thermometer } from 'lucide-react';

interface Props {
  data: WeatherData;
  unitSystem: UnitSystem;
}

const WeatherCard: React.FC<Props> = ({ data, unitSystem }) => {
  const getGradient = () => {
    const c = data.condition.toLowerCase();
    if (c.includes('rain')) return 'from-blue-100 to-indigo-100 border-blue-200';
    if (c.includes('sunny') || c.includes('clear')) return 'from-amber-50 to-orange-100 border-orange-200';
    if (c.includes('snow')) return 'from-cyan-50 to-blue-50 border-cyan-100';
    return 'from-slate-100 to-gray-200 border-gray-200';
  };

  // Conversion Helpers
  const displayTemp = unitSystem === 'metric' 
    ? Math.round((data.temp - 32) * (5/9)) 
    : Math.round(data.temp);

  const displayFeelsLike = unitSystem === 'metric'
    ? Math.round((data.feelsLike - 32) * (5/9))
    : Math.round(data.feelsLike);

  const displayWind = unitSystem === 'metric'
    ? Math.round(data.windSpeed * 1.60934)
    : Math.round(data.windSpeed);

  const windUnit = unitSystem === 'metric' ? 'kph' : 'mph';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full rounded-[2rem] p-8 shadow-xl overflow-hidden bg-gradient-to-br border ${getGradient()}`}
    >
      {/* Decorative Circles */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-white/40 rounded-full blur-2xl pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Main Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-white/50 border border-black/5 text-xs font-semibold text-slate-600 tracking-wide uppercase shadow-sm">
              Live Forecast
            </span>
          </div>
          <h2 className="text-7xl font-bold text-slate-800 tracking-tighter">
            {displayTemp}°
          </h2>
          <p className="text-2xl text-slate-700 font-medium mt-1">{data.condition}</p>
          <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed font-medium">
            "{data.description}"
          </p>
        </div>

        {/* Visual & Stats */}
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 bg-white/40 rounded-full backdrop-blur-sm shadow-sm ring-1 ring-black/5">
            <WeatherIcon condition={data.condition} />
          </div>
          
          <div className="grid grid-cols-3 gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm">
            <div className="flex flex-col items-center gap-1">
              <Thermometer size={18} className="text-slate-400" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Feels</span>
              <span className="text-sm font-bold text-slate-700">{displayFeelsLike}°</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-l border-slate-200 pl-4">
              <Droplets size={18} className="text-blue-400" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Humid</span>
              <span className="text-sm font-bold text-slate-700">{data.humidity}%</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-l border-slate-200 pl-4">
              <Wind size={18} className="text-teal-400" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Wind</span>
              <span className="text-sm font-bold text-slate-700">{displayWind} <span className="text-[10px] font-normal text-slate-500">{windUnit}</span></span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;