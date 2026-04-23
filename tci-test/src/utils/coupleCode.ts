import type { TestResult } from '../types';

// 커플 결과 저장 구조 (로컬 백업용)
export interface CoupleData {
  code: string;
  person1: {
    name?: string;
    result: TestResult;
    createdAt: string;
  };
  person2?: {
    name?: string;
    result: TestResult;
    createdAt: string;
  };
  status: 'waiting' | 'completed';
}

// 커플 코드 형식: TCI-XXXX-XXXX

/**
 * 커플 코드 유효성 검사
 */
export const isValidCoupleCode = (code: string): boolean => {
  const pattern = /^TCI-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(code.toUpperCase());
};

/**
 * 커플 코드 정규화 (대문자로 변환 및 형식 맞춤)
 */
export const normalizeCoupleCode = (code: string): string => {
  // 공백 및 특수문자 제거 후 대문자로 변환
  const cleaned = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // 이미 TCI로 시작하면 그대로 사용
  if (cleaned.startsWith('TCI') && cleaned.length === 11) {
    return `TCI-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }

  // 8자리 코드만 있으면 TCI 추가
  if (cleaned.length === 8) {
    return `TCI-${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`;
  }

  return code.toUpperCase();
};

/**
 * 공유 URL 생성 (초대 페이지)
 */
export const generateShareUrl = (code: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/couple/invite/${code}`;
};

/**
 * 결과 페이지 URL 생성
 */
export const generateResultUrl = (code: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/couple/result/${code}`;
};

/**
 * 현재 진행 중인 파트너 테스트 코드 저장 (테스트 페이지에서 사용)
 */
export const saveCurrentPartnerCode = (code: string): void => {
  sessionStorage.setItem('tci-current-partner-code', code);
};

/**
 * 현재 진행 중인 파트너 테스트 코드 가져오기
 */
export const getCurrentPartnerCode = (): string | null => {
  return sessionStorage.getItem('tci-current-partner-code');
};

/**
 * 현재 진행 중인 파트너 테스트 코드 삭제
 */
export const clearCurrentPartnerCode = (): void => {
  sessionStorage.removeItem('tci-current-partner-code');
};
