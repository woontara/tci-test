/**
 * 커플 세션 관련 타입 정의
 */

import type { TestResult } from './test.js';

// 커플 세션 상태
export type CoupleStatus = 'waiting' | 'completed';

// 개인 데이터
export interface PersonData {
  name?: string | null;
  result: TestResult;
  completedAt: string;
}

// 궁합 정보
export interface CompatibilityInfo {
  type: string;
  title: string;
  description: string;
}

// === API 요청 타입 ===

// 커플 세션 생성 요청
export interface CreateCoupleRequest {
  name?: string;
  result: TestResult;
}

// 파트너 결과 추가 요청
export interface AddPartnerRequest {
  name?: string;
  result: TestResult;
}

// === API 응답 타입 ===

// 커플 세션 생성 응답
export interface CreateCoupleResponse {
  success: true;
  code: string;          // TCI-XXXX-XXXX
  shareUrl: string;
  expiresAt: string;
}

// 커플 세션 조회 응답
export interface GetCoupleResponse {
  success: true;
  data: {
    code: string;
    status: CoupleStatus;
    person1: PersonData;
    person2: PersonData | null;
    createdAt: string;
    expiresAt: string;
  };
}

// 파트너 결과 추가 응답
export interface AddPartnerResponse {
  success: true;
  resultUrl: string;
}

// 커플 비교 결과 응답
export interface CoupleResultResponse {
  success: true;
  data: {
    code: string;
    person1: PersonData;
    person2: PersonData;
    compatibility: CompatibilityInfo;
    createdAt: string;
  };
}

// === 에러 응답 타입 ===

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// 에러 코드
export type ErrorCode =
  | 'INVALID_RESULT'
  | 'INVALID_CODE_FORMAT'
  | 'INCOMPLETE_SESSION'
  | 'SESSION_NOT_FOUND'
  | 'PARTNER_ALREADY_EXISTS'
  | 'SESSION_EXPIRED'
  | 'INTERNAL_ERROR'
  | 'VALIDATION_ERROR'
  | 'INVALID_SCALES_FORMAT'
  | 'INVALID_PERIOD'
  | 'STATISTICS_CALCULATION_ERROR'
  | 'INSUFFICIENT_DATA';

// 에러 메시지 맵
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  INVALID_RESULT: '유효하지 않은 테스트 결과입니다.',
  INVALID_CODE_FORMAT: '유효하지 않은 커플 코드 형식입니다.',
  INCOMPLETE_SESSION: '파트너가 아직 테스트를 완료하지 않았습니다.',
  SESSION_NOT_FOUND: '커플 코드를 찾을 수 없습니다.',
  PARTNER_ALREADY_EXISTS: '이미 파트너가 테스트를 완료했습니다.',
  SESSION_EXPIRED: '만료된 커플 세션입니다.',
  INTERNAL_ERROR: '서버 내부 오류가 발생했습니다.',
  VALIDATION_ERROR: '요청 데이터가 올바르지 않습니다.',
  INVALID_SCALES_FORMAT: '척도 점수 형식이 올바르지 않습니다. 예: NS:65,HA:42,...',
  INVALID_PERIOD: '유효하지 않은 기간입니다. 1-365 사이의 값을 입력하세요.',
  STATISTICS_CALCULATION_ERROR: '통계 계산 중 오류가 발생했습니다.',
  INSUFFICIENT_DATA: '통계를 계산하기에 데이터가 부족합니다.',
};
