'use client';

import { useState, useEffect } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  url: string;
}

const DesktopIcon = ({ icon, label, url }: DesktopIconProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="desktop-icon flex flex-col items-center justify-center w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 cursor-pointer text-white hover:bg-blue-800/30 rounded p-2"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2">{icon}</div>
      <div className="text-[10px] sm:text-xs md:text-sm text-center font-bold text-shadow break-words max-w-full">
        {label}
      </div>
    </div>
  );
};

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 sm:h-12 bg-[#D4D0C8] border-t-2 border-[#FFFFFF] flex items-center justify-between px-1 sm:px-2 shadow-lg z-50">
      <button className="win2k-button h-8 sm:h-9 px-2 sm:px-4 flex items-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm">
        <span className="text-base sm:text-xl">🪟</span>
        <span className="hidden sm:inline">Start</span>
      </button>
      <div className="win2k-button h-8 sm:h-9 px-2 sm:px-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
        <span className="text-sm sm:text-base">🕐</span>
        <span className="hidden sm:inline">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="sm:hidden">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

const InfoWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="win2k-window w-full max-w-md sm:max-w-lg rounded overflow-hidden">
        <div className="bg-gradient-to-r from-[#0054E3] to-[#0099E3] text-white px-2 sm:px-3 py-1 sm:py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg">ℹ️</span>
            <span className="font-bold text-xs sm:text-sm">About aistartupfren</span>
          </div>
          <button
            onClick={onClose}
            className="win2k-button px-2 py-0 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold hover:bg-red-500"
          >
            ✕
          </button>
        </div>
        <div className="bg-[#D4D0C8] p-4 sm:p-6">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="text-4xl sm:text-6xl">👤</div>
            <h2 className="text-lg sm:text-xl font-bold text-center">aistartupfren</h2>
            <p className="text-xs sm:text-sm text-center">Your AI founder fren</p>
            <div className="w-full h-px bg-gray-400 my-2"></div>
            <p className="text-[10px] sm:text-xs text-center leading-relaxed">
              Welcome to my Windows 2000-style portfolio! Click on any icon to visit my various platforms and resources.
              I share AI startup tips, SEO guides, and offer consulting services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  const icons: DesktopIconProps[] = [
    { icon: '🎵', label: 'TikTok', url: 'https://tiktok.com/@aistartupfren' },
    { icon: '🐦', label: 'Twitter', url: 'https://twitter.com/aistartupfren' },
    { icon: '▶️', label: 'YouTube', url: 'https://www.youtube.com/@aistartupfren' },
    { icon: '💬', label: 'Discord', url: 'https://discord.gg/MbYtAf5Ykv' },
    { icon: '📚', label: 'AI SEO Guide', url: 'https://www.heyemmett.com/blog/48-Hour-AI-SEO-AEO-GEO-LLMO-Guide' },
    { icon: '📅', label: 'Consulting', url: 'https://calendar.app.google/urxPrTA9XQ8W4G1w5' },
    { icon: '🛒', label: 'SaaS Promo Store', url: 'https://shop.beacons.ai/aistartupfren/04a0f980-20f7-4f2c-a956-2699f542ace2' },
    { icon: '🤖', label: 'Assembo.ai', url: 'https://assembo.ai/' },
  ];

  return (
    <main className="relative min-h-screen w-full bg-[#008080] overflow-hidden">
      {/* Windows 2000 Bliss-style background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5DADE2] via-[#5DADE2] to-[#229954] opacity-80"></div>
      
      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-3 sm:p-6 md:p-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4 pb-16 sm:pb-20">
        {icons.map((icon, index) => (
          <DesktopIcon key={index} {...icon} />
        ))}
        
        {/* Info Icon */}
        <div
          onClick={() => setShowInfo(true)}
          className="desktop-icon flex flex-col items-center justify-center w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 cursor-pointer text-white hover:bg-blue-800/30 rounded p-2"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2">ℹ️</div>
          <div className="text-[10px] sm:text-xs md:text-sm text-center font-bold text-shadow break-words max-w-full">
            About Me
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar />

      {/* Info Window */}
      <InfoWindow isOpen={showInfo} onClose={() => setShowInfo(false)} />

      {/* Add text shadow effect */}
      <style jsx global>{`
        .text-shadow {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </main>
  );
}
