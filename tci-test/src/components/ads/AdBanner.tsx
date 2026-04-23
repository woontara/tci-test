import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  slot = 'auto',
  format = 'auto',
  className = '',
}) => {
  // 개발 환경에서는 플레이스홀더 표시
  const isDevelopment = import.meta.env.DEV;

  if (isDevelopment) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 ${className}`}
        style={{ minHeight: format === 'horizontal' ? '90px' : '250px' }}
      >
        <div className="text-center p-4">
          <p className="font-medium">광고 배너</p>
          <p className="text-sm">Slot: {slot}</p>
        </div>
      </div>
    );
  }

  // 프로덕션 환경에서는 Google AdSense 코드 렌더링
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense ID로 교체 필요
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
