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
      className="desktop-icon flex flex-col items-center justify-center w-36 h-40 sm:w-28 sm:h-32 md:w-28 md:h-32 cursor-pointer text-white hover:bg-blue-800/30 rounded p-2"
    >
      <div className="text-7xl sm:text-5xl md:text-5xl mb-2">{icon}</div>
      <div className="text-base sm:text-xs md:text-xs text-center font-bold text-shadow break-words max-w-full leading-tight">
        {label}
      </div>
    </div>
  );
};

const Taskbar = ({ onStartClick }: { onStartClick: () => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-16 bg-[#D4D0C8] border-t-2 border-[#FFFFFF] flex items-center justify-between px-1 sm:px-2 shadow-lg z-50">
      <button 
        onClick={onStartClick}
        className="win2k-button h-16 sm:h-12 px-4 sm:px-5 flex items-center gap-2 font-bold text-lg sm:text-base"
      >
        <img src="/favicon.ico" alt="Windows" className="w-7 h-7 sm:w-6 sm:h-6" />
        <span>Start</span>
      </button>
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={() => window.open('https://tiktok.com/@aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="TikTok"
        >
          🎵 <span className="hidden sm:inline ml-1">TikTok</span>
        </button>
        <button 
          onClick={() => window.open('https://instagram.com/aistartup.fren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Instagram"
        >
          📷 <span className="hidden sm:inline ml-1">Instagram</span>
        </button>
        <button 
          onClick={() => window.open('https://twitter.com/aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Twitter"
        >
          🐦 <span className="hidden sm:inline ml-1">X</span>
        </button>
        <button 
          onClick={() => window.open('https://www.youtube.com/@aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="YouTube"
        >
          ▶️ <span className="hidden sm:inline ml-1">YouTube</span>
        </button>
        <button 
          onClick={() => window.open('https://xhslink.com/m/77Ve3SZLW0n', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Xiaohongshu"
        >
          📕 <span className="hidden sm:inline ml-1">Xiaohongshu</span>
        </button>
        <div className="hidden sm:flex win2k-button h-12 sm:h-12 px-2 sm:px-3 items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <span className="text-base sm:text-md">🕐</span>
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
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
            <span className="text-base sm:text-md">ℹ️</span>
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
            <img src="/favicon.png" alt="aistartupfren" className="w-16 h-16 sm:w-20 sm:h-20" />
            <h2 className="text-md sm:text-md font-bold text-center">Lan 🌊 AI startup fren</h2>
            {/* <div className="w-full h-px bg-gray-400 my-2"></div> */}
            <p className="text-[10px] sm:text-xs text-center leading-relaxed">
              Hi fren! 
              I share AI startup tips, SEO/AEO/GEO guides, and offer startup consulting services.
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
    { icon: '💬', label: 'AEO GEO Discord Group', url: 'https://discord.gg/MbYtAf5Ykv' },
    { icon: '📚', label: 'AEO GEO in 48 hrs Guide', url: 'https://www.heyemmett.com/blogs/48-Hour-AI-SEO-AEO-GEO-LLMO-Guide' },
    { icon: '🤝', label: '1:1 Startup Consulting', url: 'https://calendar.app.google/urxPrTA9XQ8W4G1w5' },
    { icon: '🍮', label: 'My Current Startup HeyEmmett', url: 'https://heyemmett.com' },
    { icon: '🖼️', label: 'My Prev Startup Assembo', url: 'https://assembo.ai/' },
    { icon: '✍️', label: 'My Blogs', url: '/blogs' },
    { icon: '📧', label: 'aistartupfren@gmail.com', url: 'mailto:aistartupfren@gmail.com' },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.webp)',
        }}
      ></div>
      
      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-3 sm:p-6 md:p-8 pb-24 sm:pb-28">
        <div className="grid grid-cols-2 gap-3 sm:gap-2 md:gap-3 w-fit">
          {icons.map((icon, index) => (
            <DesktopIcon key={index} {...icon} />
          ))}
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar onStartClick={() => setShowInfo(true)} />

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
