/**
 * 커플 코드 생성 유틸리티
 */

import { prisma } from './prisma.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CODE_LENGTH = 8;
const MAX_ATTEMPTS = 10;

/**
 * 고유한 커플 코드 생성
 * 형식: TCI-XXXX-XXXX
 */
export const generateCoupleCode = async (): Promise<string> => {
  let code: string;
  let attempts = 0;

  do {
    let rawCode = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * CHARS.length);
      rawCode += CHARS[randomIndex];
    }
    code = `TCI-${rawCode.slice(0, 4)}-${rawCode.slice(4, 8)}`;

    // 중복 확인
    const existing = await prisma.coupleSession.findUnique({
      where: { code },
      select: { id: true },
    });

    if (!existing) {
      return code;
    }

    attempts++;
  } while (attempts < MAX_ATTEMPTS);

  throw new Error('Failed to generate unique couple code after maximum attempts');
};

/**
 * 커플 코드 유효성 검사
 * @param code - 검사할 코드
 * @returns 유효한 형식인지 여부
 */
export const isValidCoupleCode = (code: string): boolean => {
  const pattern = /^TCI-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(code.toUpperCase());
};

/**
 * 커플 코드 정규화
 * 다양한 입력 형식을 표준 형식으로 변환
 * @param code - 정규화할 코드
 * @returns 정규화된 코드
 */
export const normalizeCoupleCode = (code: string): string => {
  // 알파벳과 숫자만 추출하고 대문자로 변환
  const cleaned = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // TCI로 시작하는 11자리 (TCI + 8자리)
  if (cleaned.startsWith('TCI') && cleaned.length === 11) {
    return `TCI-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }

  // 8자리만 입력한 경우
  if (cleaned.length === 8) {
    return `TCI-${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`;
  }

  // 이미 올바른 형식이면 그대로 반환
  return code.toUpperCase();
};
