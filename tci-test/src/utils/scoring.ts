import type { Question, AnswerValue, ScaleCode, ScaleResult, Level, TestResult } from '../types';
import { SCALES } from '../data/scales';
import { INTERPRETATIONS, TEMPERAMENT_PROFILES, CHARACTER_PROFILES } from '../data/interpretations';

/**
 * 역채점 처리
 * 역채점 문항은 6 - 응답값 (1<->5, 2<->4, 3<->3)
 */
export const getScoreForAnswer = (value: AnswerValue, isReverse: boolean): number => {
  return isReverse ? 6 - value : value;
};

/**
 * 특정 척도의 점수 계산
 */
export const calculateScaleScore = (
  questions: Question[],
  answers: Map<number, AnswerValue>,
  scaleCode: ScaleCode
): number => {
  const scaleQuestions = questions.filter(q => q.scale === scaleCode);

  return scaleQuestions.reduce((total, question) => {
    const answerValue = answers.get(question.id);
    if (!answerValue) return total;

    const score = getScoreForAnswer(answerValue, question.isReverse);
    return total + score;
  }, 0);
};

/**
 * 백분율 계산
 */
export const calculatePercentage = (rawScore: number, maxScore: number): number => {
  // 최소 점수(모두 1점)를 0%, 최대 점수(모두 5점)를 100%로 환산
  const minScore = maxScore / 5; // 문항 수 (각 문항 최소 1점)
  const range = maxScore - minScore;
  const adjustedScore = rawScore - minScore;
  return Math.round((adjustedScore / range) * 100);
};

/**
 * 수준 판정 (low/medium/high)
 */
export const determineLevel = (percentage: number): Level => {
  if (percentage < 40) return 'low';
  if (percentage < 60) return 'medium';
  return 'high';
};

/**
 * 해석 문구 가져오기
 */
export const getInterpretation = (scaleCode: ScaleCode, level: Level): string => {
  const interpretation = INTERPRETATIONS[scaleCode];
  return interpretation[level];
};

/**
 * 단일 척도 결과 계산
 */
export const calculateSingleScaleResult = (
  questions: Question[],
  answers: Map<number, AnswerValue>,
  scaleCode: ScaleCode
): ScaleResult => {
  const scale = SCALES[scaleCode];
  const rawScore = calculateScaleScore(questions, answers, scaleCode);
  const percentage = calculatePercentage(rawScore, scale.maxScore);
  const level = determineLevel(percentage);
  const interpretation = getInterpretation(scaleCode, level);

  return {
    scale: scaleCode,
    rawScore,
    maxScore: scale.maxScore,
    percentage,
    level,
    interpretation,
  };
};

/**
 * 기질 프로필 생성
 */
export const generateTemperamentProfile = (scales: ScaleResult[]): string => {
  const ns = scales.find(s => s.scale === 'NS');
  const ha = scales.find(s => s.scale === 'HA');
  const rd = scales.find(s => s.scale === 'RD');
  const p = scales.find(s => s.scale === 'P');

  if (!ns || !ha || !rd || !p) return TEMPERAMENT_PROFILES.default;

  // NS + HA 조합
  const nsHaKey = `NS_${ns.level === 'high' ? 'high' : 'low'}_HA_${ha.level === 'high' ? 'high' : 'low'}`;
  if (TEMPERAMENT_PROFILES[nsHaKey]) {
    return TEMPERAMENT_PROFILES[nsHaKey];
  }

  // RD + P 조합
  const rdPKey = `RD_${rd.level === 'high' ? 'high' : 'low'}_P_${p.level === 'high' ? 'high' : 'low'}`;
  if (TEMPERAMENT_PROFILES[rdPKey]) {
    return TEMPERAMENT_PROFILES[rdPKey];
  }

  return TEMPERAMENT_PROFILES.default;
};

/**
 * 성격 프로필 생성
 */
export const generateCharacterProfile = (scales: ScaleResult[]): string => {
  const sd = scales.find(s => s.scale === 'SD');
  const co = scales.find(s => s.scale === 'CO');
  const st = scales.find(s => s.scale === 'ST');

  if (!sd || !co || !st) return CHARACTER_PROFILES.default;

  // ST가 높으면 우선
  if (st.level === 'high') {
    return CHARACTER_PROFILES.ST_high;
  }

  // SD + CO 조합
  const sdCoKey = `SD_${sd.level === 'high' ? 'high' : 'low'}_CO_${co.level === 'high' ? 'high' : 'low'}`;
  if (CHARACTER_PROFILES[sdCoKey]) {
    return CHARACTER_PROFILES[sdCoKey];
  }

  if (st.level === 'low') {
    return CHARACTER_PROFILES.ST_low;
  }

  return CHARACTER_PROFILES.default;
};

/**
 * 전체 테스트 결과 계산
 */
export const calculateTestResult = (
  questions: Question[],
  answers: Map<number, AnswerValue>
): TestResult => {
  const scaleCodes: ScaleCode[] = ['NS', 'HA', 'RD', 'P', 'SD', 'CO', 'ST'];

  const scales = scaleCodes.map(code =>
    calculateSingleScaleResult(questions, answers, code)
  );

  const temperamentProfile = generateTemperamentProfile(scales);
  const characterProfile = generateCharacterProfile(scales);

  return {
    completedAt: new Date(),
    scales,
    temperamentProfile,
    characterProfile,
  };
};

/**
 * 결과를 sessionStorage에 저장
 */
export const saveResultToStorage = (result: TestResult): void => {
  try {
    const serialized = JSON.stringify({
      ...result,
      completedAt: result.completedAt.toISOString(),
    });
    sessionStorage.setItem('tci-test-result', serialized);
  } catch (error) {
    console.error('Failed to save result to storage:', error);
  }
};

/**
 * sessionStorage에서 결과 불러오기
 */
export const loadResultFromStorage = (): TestResult | null => {
  try {
    const serialized = sessionStorage.getItem('tci-test-result');
    if (!serialized) return null;

    const parsed = JSON.parse(serialized);
    return {
      ...parsed,
      completedAt: new Date(parsed.completedAt),
    };
  } catch (error) {
    console.error('Failed to load result from storage:', error);
    return null;
  }
};

/**
 * 응답 데이터를 sessionStorage에 저장
 */
export const saveAnswersToStorage = (answers: Map<number, AnswerValue>, currentStep: number): void => {
  try {
    const obj: Record<number, AnswerValue> = {};
    answers.forEach((value, key) => {
      obj[key] = value;
    });
    sessionStorage.setItem('tci-test-answers', JSON.stringify({ answers: obj, currentStep }));
  } catch (error) {
    console.error('Failed to save answers to storage:', error);
  }
};

/**
 * sessionStorage에서 응답 데이터 불러오기
 */
export const loadAnswersFromStorage = (): { answers: Map<number, AnswerValue>; currentStep: number } | null => {
  try {
    const serialized = sessionStorage.getItem('tci-test-answers');
    if (!serialized) return null;

    const parsed = JSON.parse(serialized);
    const answers = new Map<number, AnswerValue>();
    Object.entries(parsed.answers).forEach(([key, value]) => {
      answers.set(Number(key), value as AnswerValue);
    });

    return { answers, currentStep: parsed.currentStep };
  } catch (error) {
    console.error('Failed to load answers from storage:', error);
    return null;
  }
};

/**
 * 저장된 데이터 삭제
 */
export const clearStorage = (): void => {
  sessionStorage.removeItem('tci-test-result');
  sessionStorage.removeItem('tci-test-answers');
};
