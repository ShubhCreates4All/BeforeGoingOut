import React, { useState, useEffect } from 'react';
import { Search, Navigation, ThumbsUp, ThumbsDown, Loader2, Settings2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import OutfitGrid from './components/OutfitGrid';
import ShopCarousel from './components/ShopCarousel';
import SettingsModal from './components/SettingsModal';
import { fetchDashboardData } from './services/geminiService';
import { DashboardData, LocationState, Timeframe, UserProfile } from './types';

const App = () => {
  // --- Analytics Hook (Mock) ---
  useEffect(() => {
    // In a real app, this would initialize Google Analytics or Mixpanel
    console.log(`[Analytics] Session Started: ${new Date().toISOString()}`);
    console.log(`[Analytics] Tracking View: Dashboard`);
  }, []);

  // --- State Management ---
  const [location, setLocation] = useState<LocationState>({
    mode: 'GPS',
    city: 'New York', 
    coords: null,
  });
  const [inputValue, setInputValue] = useState('New York');
  const [timeframe, setTimeframe] = useState<Timeframe>('Today');
  
  // New: Personalization Profile
  const [profile, setProfile] = useState<UserProfile>({
    gender: 'Unisex',
    ageGroup: 'Young Adult (20s)',
    style: 'Casual',
    unitSystem: 'imperial'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // --- Handlers ---
  const handleGPSClick = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          mode: 'GPS',
          city: 'Current Location',
          coords: { lat: pos.coords.latitude, lng: pos.coords.longitude }
        });
        setInputValue('Current Location');
        setLoading(false);
      },
      (err) => {
        setError("Location access denied. Please enter a city manually.");
        setLoading(false);
      }
    );
  };

  const handleCitySearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLocation({ mode: 'Travel', city: inputValue, coords: null });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setHasVoted(false);
    
    try {
      // Pass the profile to the API
      const result = await fetchDashboardData(
        location.city, 
        timeframe, 
        profile,
        location.coords || undefined
      );
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger fetch on changes (location, timeframe, or profile updates)
  useEffect(() => {
    if (location.city || location.coords) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.city, location.coords, timeframe, profile]); // Re-fetch when profile changes

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-100">
      
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-16">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  BeforeGoingOut
                </h1>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Lifestyle Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               {/* Timeframe Segmented Control */}
               <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
                 {(['Today', 'Tomorrow'] as Timeframe[]).map((t) => (
                   <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      timeframe === t 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                   >
                     {t}
                   </button>
                 ))}
               </div>

               {/* Settings Button */}
               <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm group"
                title="Personalization Settings"
               >
                 <Settings2 size={18} className="group-hover:rotate-45 transition-transform duration-300" />
               </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleCitySearch} className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-slate-400" size={20} />
              </div>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Where are you going?"
                className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-medium text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button
                  type="button"
                  onClick={handleGPSClick}
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Use Current Location"
                >
                  <Navigation size={20} />
                </button>
              </div>
            </form>
            <div className="text-center mt-2">
               <span className="text-[10px] text-slate-400 font-medium">
                 Curating for: {profile.gender} • {profile.ageGroup} • {profile.style}
               </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={16} className="text-blue-600 animate-pulse" />
                </div>
              </div>
              <p className="mt-6 text-slate-500 font-medium animate-pulse">Consulting the style algorithm...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-red-100 shadow-xl text-center"
            >
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Oops!</h3>
              <p className="text-slate-500 mb-6">{error}</p>
              <button 
                onClick={fetchData} 
                className="px-6 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : data ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <WeatherCard data={data.weather} unitSystem={profile.unitSystem} />
              <OutfitGrid items={data.outfit} />
              <ShopCarousel products={data.shop} />
              
              {/* Feedback Loop */}
              <div className="flex flex-col items-center justify-center pt-16 pb-8 gap-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Was this helpful?</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setHasVoted(true);
                      console.log('[Analytics] Feedback: Positive');
                    }}
                    disabled={hasVoted}
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      hasVoted 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <ThumbsUp size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      setHasVoted(true);
                      console.log('[Analytics] Feedback: Negative');
                    }}
                    disabled={hasVoted}
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      hasVoted 
                        ? 'bg-slate-50 border-slate-200 text-slate-300' 
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <ThumbsDown size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <SettingsModal 
              isOpen={isSettingsOpen} 
              onClose={() => setIsSettingsOpen(false)}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;