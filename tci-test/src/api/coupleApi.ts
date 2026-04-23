import type { TestResult, ScaleCode, Level } from '../types';

// API 기본 URL (환경 변수에서 가져옴)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// API 응답 타입
export interface ApiCoupleData {
  code: string;
  person1: {
    name?: string | null;
    result: {
      completedAt: string;
      scales: Array<{
        scale: ScaleCode;
        rawScore: number;
        maxScore: number;
        percentage: number;
        level: Level;
        interpretation?: string;
      }>;
      temperamentProfile: string;
      characterProfile: string;
    };
    completedAt: string;
  };
  person2?: {
    name?: string | null;
    result: {
      completedAt: string;
      scales: Array<{
        scale: ScaleCode;
        rawScore: number;
        maxScore: number;
        percentage: number;
        level: Level;
        interpretation?: string;
      }>;
      temperamentProfile: string;
      characterProfile: string;
    };
    completedAt: string;
  } | null;
  status: 'waiting' | 'completed';
  createdAt: string;
  expiresAt: string;
}

// API 에러 응답 타입
export interface ApiError {
  error: string;
  message: string;
}

// API 에러 클래스
export class CoupleApiError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string
  ) {
    super(message);
    this.name = 'CoupleApiError';
  }
}

/**
 * 네트워크 에러 클래스
 */
export class NetworkError extends Error {
  constructor(message: string = '네트워크 연결을 확인해주세요.') {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * JSON 파싱 에러 클래스
 */
export class JsonParseError extends Error {
  constructor(message: string = '서버 응답을 처리할 수 없습니다.') {
    super(message);
    this.name = 'JsonParseError';
  }
}

/**
 * API 요청 헬퍼 함수
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
  } catch (error) {
    // 네트워크 에러 감지: TypeError 또는 오프라인 상태
    if (error instanceof TypeError || !navigator.onLine) {
      throw new NetworkError('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
    }
    throw error;
  }

  // JSON 파싱 에러 처리
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new JsonParseError('서버 응답을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }

  if (!response.ok) {
    // 백엔드 에러 응답 형식: { success: false, error: { code, message } }
    const errorData = data as { success: false; error: { code: string; message: string } };
    throw new CoupleApiError(
      response.status,
      errorData.error?.code || 'UNKNOWN_ERROR',
      errorData.error?.message || '알 수 없는 오류가 발생했습니다.'
    );
  }

  // 백엔드 성공 응답 형식: { success: true, data: {...} } 또는 { success: true, ...fields }
  // data 필드가 있으면 추출, 없으면 success 제외한 나머지 반환
  const responseData = data as { success?: boolean; data?: unknown };
  if (responseData.success && responseData.data !== undefined) {
    return responseData.data as T;
  }

  // data 필드가 없는 경우 (예: createCoupleSession 응답)
  if (responseData.success) {
    const { success, ...rest } = responseData;
    return rest as T;
  }

  return data as T;
}

/**
 * TestResult를 API 전송용 형식으로 변환
 */
function serializeResult(result: TestResult) {
  return {
    completedAt: result.completedAt instanceof Date
      ? result.completedAt.toISOString()
      : result.completedAt,
    scales: result.scales,
    temperamentProfile: result.temperamentProfile,
    characterProfile: result.characterProfile,
  };
}

/**
 * API 응답을 TestResult로 변환
 */
function deserializeResult(data: ApiCoupleData['person1']['result']): TestResult {
  return {
    completedAt: new Date(data.completedAt),
    scales: data.scales.map(s => ({
      ...s,
      interpretation: s.interpretation ?? '',
    })),
    temperamentProfile: data.temperamentProfile,
    characterProfile: data.characterProfile,
  };
}

/**
 * 커플 세션 생성 (POST /couple)
 * - 첫 번째 사람의 결과로 커플 세션을 생성하고 코드를 반환
 */
export async function createCoupleSession(
  result: TestResult,
  name?: string
): Promise<{ code: string; expiresAt: string }> {
  const response = await apiRequest<{ code: string; expiresAt: string }>('/couple', {
    method: 'POST',
    body: JSON.stringify({
      name,
      result: serializeResult(result),
    }),
  });

  return response;
}

/**
 * 커플 데이터 조회 (GET /couple/:code)
 * - 커플 코드로 데이터 조회
 */
export async function getCoupleData(code: string): Promise<{
  coupleData: ApiCoupleData;
  person1Result: TestResult;
  person1Name: string | null;
  person2Result: TestResult | null;
  person2Name: string | null;
}> {
  const response = await apiRequest<ApiCoupleData>(`/couple/${code}`);

  return {
    coupleData: response,
    person1Result: deserializeResult(response.person1.result),
    person1Name: response.person1.name ?? null,
    person2Result: response.person2
      ? deserializeResult(response.person2.result)
      : null,
    person2Name: response.person2?.name ?? null,
  };
}

/**
 * 파트너 결과 추가 (POST /couple/:code/partner)
 * - 두 번째 사람의 결과를 커플 세션에 추가
 * - 반환: { resultUrl: string } - 커플 결과 페이지 URL
 */
export async function addPartnerResult(
  code: string,
  result: TestResult,
  name?: string
): Promise<{ resultUrl: string }> {
  const response = await apiRequest<{ resultUrl: string }>(`/couple/${code}/partner`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      result: serializeResult(result),
    }),
  });

  return response;
}

/**
 * 에러 메시지를 사용자 친화적으로 변환
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof CoupleApiError) {
    switch (error.errorCode) {
      case 'SESSION_NOT_FOUND':
        return '존재하지 않는 커플 코드입니다.';
      case 'SESSION_EXPIRED':
        return '만료된 커플 코드입니다. 새로운 커플 분석을 시작해주세요.';
      case 'PARTNER_ALREADY_EXISTS':
        return '이미 파트너가 테스트를 완료했습니다.';
      case 'VALIDATION_ERROR':
        return '입력 데이터가 올바르지 않습니다.';
      case 'INCOMPLETE_SESSION':
        return '아직 파트너가 테스트를 완료하지 않았습니다.';
      default:
        return error.message;
    }
  }

  // 네트워크 에러 처리
  if (error instanceof NetworkError) {
    return error.message;
  }

  // JSON 파싱 에러 처리
  if (error instanceof JsonParseError) {
    return error.message;
  }

  if (error instanceof Error) {
    // TypeError는 네트워크 에러일 가능성이 높음
    if (error instanceof TypeError || !navigator.onLine) {
      return '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
    }
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}
