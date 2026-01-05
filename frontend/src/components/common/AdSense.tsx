import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style = { display: 'block' },
  className = '',
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't render ads in development mode
  if (import.meta.env.DEV) {
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center ${className}`}
        style={style}
      >
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          📢 AdSense Ad Placeholder
          <br />
          <span className="text-xs">Slot: {adSlot}</span>
        </div>
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-ad-layout-key={adLayoutKey}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

// Predefined ad components for common placements
export const HeaderAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSense
    adSlot="1234567890" // Replace with your actual ad slot
    adFormat="horizontal"
    className={`w-full max-w-4xl mx-auto ${className}`}
    style={{ display: 'block', minHeight: '90px' }}
  />
);

export const SidebarAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSense
    adSlot="1234567891" // Replace with your actual ad slot
    adFormat="rectangle"
    className={`w-full max-w-xs ${className}`}
    style={{ display: 'block', minHeight: '250px' }}
  />
);

export const InContentAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSense
    adSlot="1234567892" // Replace with your actual ad slot
    adFormat="auto"
    className={`w-full ${className}`}
    style={{ display: 'block', minHeight: '100px' }}
  />
);

export const FooterAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSense
    adSlot="1234567893" // Replace with your actual ad slot
    adFormat="horizontal"
    className={`w-full max-w-4xl mx-auto ${className}`}
    style={{ display: 'block', minHeight: '90px' }}
  />
);
