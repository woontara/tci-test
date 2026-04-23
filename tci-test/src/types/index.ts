// 척도 코드 타입
export type ScaleCode = 'NS' | 'HA' | 'RD' | 'P' | 'SD' | 'CO' | 'ST';

// 척도 카테고리
export type ScaleCategory = 'temperament' | 'character';

// 척도 정의
export interface Scale {
  code: ScaleCode;
  name: string;           // 한글명
  fullName: string;       // 영문 전체명
  category: ScaleCategory;  // 기질/성격 분류
  description: string;    // 척도 설명
  maxScore: number;       // 최대 점수 (문항 수 * 5)
}

// 문항 정의
export interface Question {
  id: number;
  scale: ScaleCode;       // 해당 척도
  text: string;           // 문항 내용
  isReverse: boolean;     // 역채점 여부
}

// 5점 리커트 척도 응답값
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

// 응답 정의
export interface Answer {
  questionId: number;
  value: AnswerValue;
}

// 수준 타입
export type Level = 'low' | 'medium' | 'high';

// 척도별 결과
export interface ScaleResult {
  scale: ScaleCode;
  rawScore: number;       // 원점수
  maxScore: number;       // 해당 척도 최대 점수
  percentage: number;     // 백분율 (0-100)
  level: Level;           // 수준
  interpretation: string; // 해석 문구
}

// 테스트 전체 결과
export interface TestResult {
  completedAt: Date;
  scales: ScaleResult[];
  temperamentProfile: string;  // 기질 유형 프로필
  characterProfile: string;    // 성격 유형 프로필
}

// 해석 데이터 구조
export interface Interpretation {
  scale: ScaleCode;
  low: string;     // 40% 미만
  medium: string;  // 40-60%
  high: string;    // 60% 이상
}

// 테스트 상태
export interface TestState {
  currentStep: number;        // 현재 문항 인덱스
  answers: Map<number, AnswerValue>;  // 문항ID -> 응답
  isCompleted: boolean;
  result: TestResult | null;
}

// 테스트 액션 타입
export type TestAction =
  | { type: 'SET_ANSWER'; questionId: number; value: AnswerValue }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'COMPLETE_TEST'; result: TestResult }
  | { type: 'RESET' }
  | { type: 'LOAD_STATE'; state: Partial<TestState> };

// 리커트 척도 옵션
export interface LikertOption {
  value: AnswerValue;
  label: string;
}

// 공유 타입
export type SharePlatform = 'kakao' | 'twitter' | 'facebook' | 'link';
