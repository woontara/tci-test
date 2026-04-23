import React, { useState } from 'react';
import { Share2, Link, Check } from 'lucide-react';
import type { TestResult, SharePlatform } from '../../types';
import { share, canUseWebShare, shareViaWebAPI } from '../../utils/share';
import { Button } from '../common';

interface ShareButtonsProps {
  result: TestResult;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: SharePlatform) => {
    const success = await share(platform, result);
    if (platform === 'link' && success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    await shareViaWebAPI(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 text-center">
        결과 공유하기
      </h3>

      <div className="flex flex-wrap justify-center gap-3">
        {/* 네이티브 공유 (모바일) */}
        {canUseWebShare() && (
          <Button
            variant="primary"
            onClick={handleNativeShare}
            className="flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span>공유하기</span>
          </Button>
        )}

        {/* 카카오톡 */}
        <button
          onClick={() => handleShare('kakao')}
          className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center hover:opacity-90 transition-opacity"
          title="카카오톡 공유"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C6.48 3 2 6.54 2 10.86c0 2.79 1.85 5.24 4.64 6.62-.16.55-.58 1.99-.66 2.3-.1.37.14.37.29.27.12-.08 1.87-1.27 2.63-1.78.7.1 1.43.16 2.17.16 5.52 0 10-3.54 10-7.9S17.52 3 12 3z"
              fill="#3C1E1E"
            />
          </svg>
        </button>

        {/* 트위터 */}
        <button
          onClick={() => handleShare('twitter')}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:opacity-90 transition-opacity"
          title="X(트위터) 공유"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* 페이스북 */}
        <button
          onClick={() => handleShare('facebook')}
          className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
          title="페이스북 공유"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* 링크 복사 */}
        <button
          onClick={() => handleShare('link')}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title="링크 복사"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <Link className="w-5 h-5" />
          )}
        </button>
      </div>

      {copied && (
        <p className="text-center text-sm text-green-600 font-medium">
          링크가 복사되었습니다!
        </p>
      )}
    </div>
  );
};

export default ShareButtons;
