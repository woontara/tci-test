import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AdInterstitialProps {
  onClose: () => void;
  delay?: number; // 닫기 버튼 활성화까지 대기 시간 (초)
}

const AdInterstitial: React.FC<AdInterstitialProps> = ({
  onClose,
  delay = 3,
}) => {
  const [countdown, setCountdown] = useState(delay);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        {/* 닫기 버튼 */}
        <button
          onClick={canClose ? onClose : undefined}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            canClose
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!canClose}
        >
          {canClose ? (
            <X className="w-5 h-5" />
          ) : (
            <span className="text-sm font-medium">{countdown}</span>
          )}
        </button>

        {/* 광고 콘텐츠 영역 */}
        <div className="mt-6">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="font-medium">전면 광고</p>
              <p className="text-sm">Interstitial Ad</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          {canClose ? '닫기 버튼을 눌러 결과를 확인하세요' : `${countdown}초 후 닫을 수 있습니다`}
        </p>
      </div>
    </div>
  );
};

export default AdInterstitial;
