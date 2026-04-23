import type { Scale, ScaleCode } from '../types';

export const SCALES: Record<ScaleCode, Scale> = {
  NS: {
    code: 'NS',
    name: '자극추구',
    fullName: 'Novelty Seeking',
    category: 'temperament',
    description: '새로운 자극과 경험을 추구하는 성향',
    maxScore: 70,
  },
  HA: {
    code: 'HA',
    name: '위험회피',
    fullName: 'Harm Avoidance',
    category: 'temperament',
    description: '위험하거나 불확실한 상황을 피하려는 성향',
    maxScore: 70,
  },
  RD: {
    code: 'RD',
    name: '사회적민감성',
    fullName: 'Reward Dependence',
    category: 'temperament',
    description: '사회적 보상과 타인의 인정에 대한 민감성',
    maxScore: 70,
  },
  P: {
    code: 'P',
    name: '인내력',
    fullName: 'Persistence',
    category: 'temperament',
    description: '어려움에도 불구하고 목표를 향해 지속하는 성향',
    maxScore: 70,
  },
  SD: {
    code: 'SD',
    name: '자율성',
    fullName: 'Self-Directedness',
    category: 'character',
    description: '자기주도적으로 목표를 설정하고 달성하는 능력',
    maxScore: 70,
  },
  CO: {
    code: 'CO',
    name: '연대감',
    fullName: 'Cooperativeness',
    category: 'character',
    description: '타인과 협력하고 공감하는 능력',
    maxScore: 70,
  },
  ST: {
    code: 'ST',
    name: '자기초월',
    fullName: 'Self-Transcendence',
    category: 'character',
    description: '더 큰 의미와 목적을 추구하는 성향',
    maxScore: 70,
  },
};

export const SCALE_LIST = Object.values(SCALES);

export const TEMPERAMENT_SCALES: ScaleCode[] = ['NS', 'HA', 'RD', 'P'];
export const CHARACTER_SCALES: ScaleCode[] = ['SD', 'CO', 'ST'];

export const SCALE_COLORS: Record<ScaleCode, string> = {
  NS: '#F59E0B', // amber
  HA: '#3B82F6', // blue
  RD: '#EC4899', // pink
  P: '#10B981',  // emerald
  SD: '#8B5CF6', // violet
  CO: '#06B6D4', // cyan
  ST: '#6366F1', // indigo
};
