'use client';

interface DesktopIconProps {
  icon: string;
  label: string;
  url: string;
}

export default function DesktopIcon({ icon, label, url }: DesktopIconProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!url.startsWith('/')) {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a 
      href={url}
      onClick={handleClick}
      className="desktop-icon flex flex-col items-center justify-center w-36 h-40 sm:w-28 sm:h-32 md:w-28 md:h-32 cursor-pointer text-white hover:bg-blue-800/30 rounded p-2"
    >
      <div className="text-7xl sm:text-5xl md:text-5xl mb-2">{icon}</div>
      <div className="text-base sm:text-xs md:text-xs text-center font-bold text-shadow break-words max-w-full leading-tight">
        {label}
      </div>
    </a>
  );
}
