'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-16 bg-[#D4D0C8] border-t-2 border-[#FFFFFF] flex items-center justify-between px-1 sm:px-2 shadow-lg z-40">
      <Link href="/">
        <button className="win2k-button h-16 sm:h-12 px-4 sm:px-5 flex items-center gap-2 font-bold text-lg sm:text-base">
          <img src="/favicon.ico" alt="Windows" className="w-7 h-7 sm:w-6 sm:h-6" />
          <span>Start</span>
        </button>
      </Link>
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
}
