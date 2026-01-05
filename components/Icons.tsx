import React from 'react';
import { 
  Shirt, 
  Umbrella, 
  Glasses, 
  Footprints, 
  Wind, 
  ThermometerSnowflake, 
  Sun,
  CloudRain,
  Cloud,
  Briefcase,
  Watch,
  User,
  Layers,
  ShoppingBag
} from 'lucide-react';

export const WeatherIcon = ({ condition }: { condition: string }) => {
  const c = condition.toLowerCase();
  // Using more vibrant/darker colors for light mode visibility
  if (c.includes('rain') || c.includes('drizzle')) return <CloudRain className="w-12 h-12 text-blue-500" />;
  if (c.includes('snow')) return <ThermometerSnowflake className="w-12 h-12 text-cyan-500" />;
  if (c.includes('cloud')) return <Cloud className="w-12 h-12 text-slate-400" />;
  if (c.includes('wind')) return <Wind className="w-12 h-12 text-teal-500" />;
  return <Sun className="w-12 h-12 text-amber-500" />;
};

export const OutfitIcon = ({ type }: { type: string }) => {
  const className = "w-6 h-6 text-slate-700";
  switch (type) {
    case 'head': return <Sun className={className} />; 
    case 'body': return <Shirt className={className} />;
    case 'outer': return <Layers className={className} />;
    case 'legs': return <User className={className} />;
    case 'feet': return <Footprints className={className} />;
    case 'accessory': return <Watch className={className} />;
    default: return <ShoppingBag className={className} />;
  }
};