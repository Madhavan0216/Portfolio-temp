import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface BackgroundVideoProps {
  src: string;
  overlayOpacity?: number;
  className?: string;
}

export default function BackgroundVideo({ src, overlayOpacity = 0.4, className = "" }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        style={{ pointerEvents: 'none' }}
      />
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none" 
        style={{ opacity: overlayOpacity }} 
      />
      {/* Top fade — blends into previous section's bg */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]" 
        style={{ height: '120px', background: 'linear-gradient(to bottom, hsl(0 0% 4%), transparent)' }} 
      />
      {/* Bottom fade — blends into next section's bg */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]" 
        style={{ height: '120px', background: 'linear-gradient(to top, hsl(0 0% 4%), transparent)' }} 
      />
    </div>
  );
}
