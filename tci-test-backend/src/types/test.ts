/**
 * TCI 테스트 관련 타입 정의
 * 프론트엔드와 공유되는 타입
 */

// 척도 코드
export type ScaleCode = 'NS' | 'HA' | 'RD' | 'P' | 'SD' | 'CO' | 'ST';

// 수준
export type Level = 'low' | 'medium' | 'high';

// 척도별 결과
export interface ScaleResult {
  scale: ScaleCode;
  rawScore: number;
  maxScore: number;
  percentage: number;
  level: Level;
}

// 테스트 결과
export interface TestResult {
  completedAt: string;  // ISO 8601 형식
  scales: ScaleResult[];
  temperamentProfile: string;
  characterProfile: string;
}

// 척도 정보
export interface ScaleInfo {
  code: ScaleCode;
  name: string;
  fullName: string;
  description: string;
}

// 모든 척도 정보
export const SCALES: ScaleInfo[] = [
  {
    code: 'NS',
    name: '자극추구',
    fullName: 'Novelty Seeking',
    description: '새로운 자극과 경험을 추구하는 성향',
  },
  {
    code: 'HA',
    name: '위험회피',
    fullName: 'Harm Avoidance',
    description: '위험하거나 불확실한 상황을 피하려는 성향',
  },
  {
    code: 'RD',
    name: '사회적 민감성',
    fullName: 'Reward Dependence',
    description: '사회적 보상에 민감하고 타인의 인정을 중시하는 성향',
  },
  {
    code: 'P',
    name: '인내력',
    fullName: 'Persistence',
    description: '어려움에도 불구하고 끈기있게 노력하는 성향',
  },
  {
    code: 'SD',
    name: '자율성',
    fullName: 'Self-Directedness',
    description: '목표를 설정하고 자기조절하는 능력',
  },
  {
    code: 'CO',
    name: '연대감',
    fullName: 'Cooperativeness',
    description: '타인과 협력하고 공감하는 능력',
  },
  {
    code: 'ST',
    name: '자기초월',
    fullName: 'Self-Transcendence',
    description: '영적이고 초월적인 경험에 대한 개방성',
  },
];
