/**
 * 날짜 유틸리티
 */

/**
 * 현재 시각에서 지정된 일수 후의 날짜 반환
 * @param days - 추가할 일수
 * @returns 계산된 날짜
 */
export function addDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * 날짜가 현재 시각 이전인지 확인 (만료 여부)
 * @param date - 확인할 날짜
 * @returns 만료 여부
 */
export function isExpired(date: Date): boolean {
  return new Date() > date;
}

/**
 * Date 객체를 ISO 문자열로 변환
 * @param date - 변환할 날짜
 * @returns ISO 8601 형식 문자열
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * 세션 기본 만료 일수
 */
export const DEFAULT_EXPIRY_DAYS = 30;
