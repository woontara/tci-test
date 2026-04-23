import type { TestResult, SharePlatform } from '../types';
import { SCALES } from '../data/scales';

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://tci-test.vercel.app';

/**
 * 공유 메시지 생성
 */
export const generateShareMessage = (result: TestResult): string => {
  const topScales = [...result.scales]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(s => `${SCALES[s.scale].name} ${s.percentage}%`)
    .join(', ');

  return `나의 TCI 기질 및 성격 검사 결과\n${result.temperamentProfile}\n\n상위 척도: ${topScales}\n\n나도 테스트 해보기`;
};

/**
 * 결과 요약 생성 (OG 이미지용)
 */
export const generateResultSummary = (result: TestResult): string => {
  return `${result.temperamentProfile} | ${result.characterProfile}`;
};

/**
 * URL 복사
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * 카카오톡 공유
 */
export const shareToKakao = (result: TestResult): void => {
  // Kakao SDK가 로드되어 있다면 사용
  if (typeof window !== 'undefined' && (window as unknown as { Kakao?: { Share?: { sendDefault: (options: unknown) => void } } }).Kakao?.Share) {
    const Kakao = (window as unknown as { Kakao: { Share: { sendDefault: (options: unknown) => void } } }).Kakao;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'TCI 기질 및 성격 검사 결과',
        description: generateShareMessage(result),
        imageUrl: `${SITE_URL}/og-image.png`,
        link: {
          mobileWebUrl: SITE_URL,
          webUrl: SITE_URL,
        },
      },
      buttons: [
        {
          title: '테스트 하기',
          link: {
            mobileWebUrl: SITE_URL,
            webUrl: SITE_URL,
          },
        },
      ],
    });
  } else {
    // Kakao SDK 없으면 링크 복사로 대체
    const message = generateShareMessage(result);
    copyToClipboard(`${message}\n${SITE_URL}`);
    alert('카카오톡 공유 기능을 사용하려면 SDK가 필요합니다. 대신 내용이 클립보드에 복사되었습니다.');
  }
};

/**
 * 트위터(X) 공유
 */
export const shareToTwitter = (result: TestResult): void => {
  const message = generateShareMessage(result);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(SITE_URL)}`;
  window.open(url, '_blank', 'width=550,height=420');
};

/**
 * 페이스북 공유
 */
export const shareToFacebook = (): void => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;
  window.open(url, '_blank', 'width=550,height=420');
};

/**
 * 링크 복사
 */
export const shareLinkCopy = async (): Promise<boolean> => {
  return copyToClipboard(SITE_URL);
};

/**
 * Web Share API 사용 가능 여부 확인
 */
export const canUseWebShare = (): boolean => {
  return typeof navigator !== 'undefined' && !!navigator.share;
};

/**
 * Web Share API로 공유
 */
export const shareViaWebAPI = async (result: TestResult): Promise<boolean> => {
  if (!canUseWebShare()) return false;

  try {
    await navigator.share({
      title: 'TCI 기질 및 성격 검사 결과',
      text: generateShareMessage(result),
      url: SITE_URL,
    });
    return true;
  } catch (error) {
    // User cancelled or error
    console.error('Share failed:', error);
    return false;
  }
};

/**
 * 플랫폼별 공유 실행
 */
export const share = async (platform: SharePlatform, result: TestResult): Promise<boolean> => {
  switch (platform) {
    case 'kakao':
      shareToKakao(result);
      return true;
    case 'twitter':
      shareToTwitter(result);
      return true;
    case 'facebook':
      shareToFacebook();
      return true;
    case 'link':
      return shareLinkCopy();
    default:
      return false;
  }
};
