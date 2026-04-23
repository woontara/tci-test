import type { ScaleCode, Level } from '../types';

// 조합 타입 (두 사람의 수준 조합)
export type LevelCombination = 'high-high' | 'high-low' | 'low-high' | 'low-low' | 'similar' | 'different';

// 척도별 커플 해석
export interface CoupleScaleInterpretation {
  scale: ScaleCode;
  combinations: {
    'high-high': string;
    'high-low': string;
    'low-high': string;
    'low-low': string;
  };
  complementary: string;  // 상호보완적일 때 조언
  similar: string;        // 유사할 때 조언
}

// 전체 궁합 해석
export interface CompatibilityInterpretation {
  type: 'complementary' | 'similar' | 'balanced';
  title: string;
  description: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
}

// 척도별 커플 해석 데이터
export const COUPLE_SCALE_INTERPRETATIONS: Record<ScaleCode, CoupleScaleInterpretation> = {
  NS: {
    scale: 'NS',
    combinations: {
      'high-high': '두 분 모두 새로운 경험을 추구하는 모험적인 커플입니다. 함께 여행하고 새로운 활동을 시도하는 것을 즐기지만, 때로는 안정적인 시간도 필요할 수 있습니다.',
      'high-low': '한 분은 새로운 자극을, 다른 분은 안정을 추구합니다. 서로의 페이스를 존중하면서 때로는 새로운 경험을, 때로는 편안한 일상을 함께 누리세요.',
      'low-high': '한 분은 안정을, 다른 분은 새로운 자극을 추구합니다. 이 조합은 균형을 이룰 수 있으며, 서로에게 새로운 관점을 제시할 수 있습니다.',
      'low-low': '두 분 모두 안정적이고 익숙한 것을 선호하는 편안한 커플입니다. 가끔 작은 변화를 시도하면 관계에 새로운 활력을 줄 수 있습니다.',
    },
    complementary: '서로의 다른 추구 방식이 관계에 균형을 가져다줍니다. 안정적인 파트너는 기반을, 모험적인 파트너는 새로움을 제공합니다.',
    similar: '비슷한 에너지 수준으로 함께하는 활동에 대한 기대치가 맞아 갈등이 적습니다.',
  },
  HA: {
    scale: 'HA',
    combinations: {
      'high-high': '두 분 모두 신중하고 조심스러운 성향입니다. 서로의 걱정을 이해하지만, 때로는 함께 용기를 내어 새로운 시도를 해보세요.',
      'high-low': '한 분은 신중하게, 다른 분은 대담하게 상황에 접근합니다. 결정을 내릴 때 서로의 관점을 경청하면 더 균형 잡힌 선택을 할 수 있습니다.',
      'low-high': '한 분은 도전적이고, 다른 분은 신중합니다. 중요한 결정에서 두 시각을 모두 고려하면 현명한 선택이 가능합니다.',
      'low-low': '두 분 모두 낙관적이고 도전적입니다. 함께 큰 그림을 그릴 수 있지만, 때로는 신중한 검토도 필요합니다.',
    },
    complementary: '조심성과 대담함의 조합은 서로를 보완합니다. 위험을 평가하면서도 기회를 놓치지 않는 균형을 찾으세요.',
    similar: '비슷한 위험 감수 성향으로 중요한 결정에서 갈등이 적지만, 다른 시각의 검토도 고려해보세요.',
  },
  RD: {
    scale: 'RD',
    combinations: {
      'high-high': '두 분 모두 따뜻하고 사회적이며 인정을 중요시합니다. 서로에게 충분한 애정 표현을 하고, 개인 시간도 존중해주세요.',
      'high-low': '한 분은 더 많은 소통과 인정을 원하고, 다른 분은 독립적입니다. 서로의 사랑 표현 방식을 이해하고 조율하는 것이 중요합니다.',
      'low-high': '한 분은 독립적이고, 다른 분은 더 많은 친밀감을 원합니다. 각자의 방식으로 사랑을 표현하고 있음을 이해해주세요.',
      'low-low': '두 분 모두 독립적이고 개인 공간을 중시합니다. 서로의 자유를 존중하면서도 정기적인 연결의 시간을 가지세요.',
    },
    complementary: '사회성의 차이는 관계에 다양성을 더합니다. 친밀감의 필요와 개인 공간의 균형을 찾으세요.',
    similar: '비슷한 관계 욕구로 기대치가 맞습니다. 서로에게 원하는 것을 명확히 소통하세요.',
  },
  P: {
    scale: 'P',
    combinations: {
      'high-high': '두 분 모두 끈기 있고 목표 지향적입니다. 함께 장기 계획을 세우고 달성해나갈 수 있지만, 유연성도 필요할 때가 있습니다.',
      'high-low': '한 분은 끈기 있게 밀고 나가고, 다른 분은 유연하게 방향을 전환합니다. 각자의 강점을 인정하고 팀으로 협력하세요.',
      'low-high': '한 분은 유연하고, 다른 분은 끈기 있습니다. 서로 다른 접근 방식이 다양한 상황에서 도움이 됩니다.',
      'low-low': '두 분 모두 유연하고 다양한 관심사를 가집니다. 함께 목표를 정하고 서로 격려하며 나아가세요.',
    },
    complementary: '끈기와 유연성의 조합은 강력합니다. 목표를 향해 나아가면서도 필요할 때 방향을 조정할 수 있습니다.',
    similar: '비슷한 인내력 수준으로 프로젝트를 함께 진행하기 좋습니다.',
  },
  SD: {
    scale: 'SD',
    combinations: {
      'high-high': '두 분 모두 자기주도적이고 독립적입니다. 각자의 목표를 존중하면서 커플로서의 공동 목표도 세워보세요.',
      'high-low': '한 분은 자기주도적이고, 다른 분은 지원과 가이드를 선호합니다. 결정에서 균형을 찾고 서로를 이끌어주세요.',
      'low-high': '한 분은 구조화된 환경을 선호하고, 다른 분은 독립적입니다. 서로의 필요를 이해하고 지지해주세요.',
      'low-low': '두 분 모두 함께 결정하고 서로에게 의지하는 것을 좋아합니다. 함께 목표를 세우고 서로 격려하세요.',
    },
    complementary: '자율성의 차이는 서로를 성장시킵니다. 독립적인 파트너는 새로운 도전을, 협조적인 파트너는 안정감을 제공합니다.',
    similar: '비슷한 자율성 수준으로 일상의 결정에서 갈등이 적습니다.',
  },
  CO: {
    scale: 'CO',
    combinations: {
      'high-high': '두 분 모두 협력적이고 공감 능력이 높습니다. 서로를 깊이 이해하고 지지하며, 조화로운 관계를 유지합니다.',
      'high-low': '한 분은 협력적이고, 다른 분은 개인주의적입니다. 서로의 방식을 존중하고 중간 지점을 찾아보세요.',
      'low-high': '한 분은 독립적이고, 다른 분은 함께하는 것을 좋아합니다. 각자의 시간과 함께하는 시간의 균형을 찾으세요.',
      'low-low': '두 분 모두 독립적이고 자기 방식을 중시합니다. 관계에서 타협하고 양보하는 연습을 해보세요.',
    },
    complementary: '협력성의 차이는 관계에 다양한 관점을 가져옵니다. 함께할 때와 각자 있을 때의 균형을 찾으세요.',
    similar: '비슷한 협력 성향으로 갈등 해결 방식이 비슷합니다.',
  },
  ST: {
    scale: 'ST',
    combinations: {
      'high-high': '두 분 모두 삶의 의미와 영적 측면을 중요시합니다. 깊은 대화와 함께 성장하는 경험을 공유하세요.',
      'high-low': '한 분은 의미를 추구하고, 다른 분은 실용적입니다. 서로의 관점이 삶에 균형을 가져다줍니다.',
      'low-high': '한 분은 실용적이고, 다른 분은 영적입니다. 각자의 관점을 존중하고 서로에게서 배우세요.',
      'low-low': '두 분 모두 현실적이고 실용적입니다. 가끔 삶의 큰 그림에 대해 함께 이야기해보세요.',
    },
    complementary: '현실과 이상의 조합은 삶에 깊이를 더합니다. 서로의 관점을 존중하세요.',
    similar: '비슷한 가치관으로 중요한 결정에서 의견이 맞습니다.',
  },
};

// 수준 조합 판단
export const getLevelCombination = (level1: Level, level2: Level): LevelCombination => {
  if (level1 === 'high' && level2 === 'high') return 'high-high';
  if (level1 === 'high' && level2 === 'low') return 'high-low';
  if (level1 === 'low' && level2 === 'high') return 'low-high';
  if (level1 === 'low' && level2 === 'low') return 'low-low';
  // medium 포함 시 유사성으로 판단
  return 'similar';
};

// 전체 궁합 타입 판단
export const determineCompatibilityType = (
  person1Scales: { scale: ScaleCode; level: Level }[],
  person2Scales: { scale: ScaleCode; level: Level }[]
): 'complementary' | 'similar' | 'balanced' => {
  let similarCount = 0;
  let differentCount = 0;

  person1Scales.forEach(p1Scale => {
    const p2Scale = person2Scales.find(s => s.scale === p1Scale.scale);
    if (!p2Scale) return;

    if (p1Scale.level === p2Scale.level) {
      similarCount++;
    } else if (
      (p1Scale.level === 'high' && p2Scale.level === 'low') ||
      (p1Scale.level === 'low' && p2Scale.level === 'high')
    ) {
      differentCount++;
    }
  });

  if (similarCount >= 5) return 'similar';
  if (differentCount >= 4) return 'complementary';
  return 'balanced';
};

// 궁합 유형별 해석
export const COMPATIBILITY_INTERPRETATIONS: Record<'complementary' | 'similar' | 'balanced', CompatibilityInterpretation> = {
  complementary: {
    type: 'complementary',
    title: '상호보완적 궁합',
    description: '두 분은 서로 다른 강점을 가지고 있어 서로를 보완해줄 수 있는 관계입니다. 각자의 특성이 상대방의 부족한 부분을 채워주며, 함께할 때 더 완전한 팀이 됩니다.',
    strengths: [
      '서로의 부족한 부분을 채워줄 수 있습니다',
      '다양한 관점으로 문제를 해결할 수 있습니다',
      '서로에게서 새로운 것을 배울 수 있습니다',
      '관계에서 성장의 기회가 많습니다',
    ],
    cautions: [
      '서로의 차이를 비판하지 않도록 주의하세요',
      '의사소통 방식의 차이를 이해하려고 노력하세요',
      '상대방의 방식도 유효함을 인정해주세요',
      '타협점을 찾는 연습이 필요합니다',
    ],
    tips: [
      '정기적으로 서로의 생각과 감정을 나누는 시간을 가지세요',
      '상대방의 관점에서 상황을 바라보는 연습을 하세요',
      '차이점을 갈등의 원인이 아닌 다양성으로 받아들이세요',
      '서로의 강점을 인정하고 칭찬해주세요',
    ],
  },
  similar: {
    type: 'similar',
    title: '유사성 높은 궁합',
    description: '두 분은 비슷한 성향과 가치관을 공유하고 있습니다. 서로를 잘 이해할 수 있어 소통이 편안하고, 비슷한 속도로 함께 나아갈 수 있습니다.',
    strengths: [
      '서로를 쉽게 이해할 수 있습니다',
      '비슷한 기대치로 갈등이 적습니다',
      '공감대가 넓어 대화가 편안합니다',
      '함께하는 활동의 만족도가 높습니다',
    ],
    cautions: [
      '비슷한 약점이 증폭될 수 있습니다',
      '다른 관점의 피드백이 부족할 수 있습니다',
      '너무 편안해 관계에 자극이 적을 수 있습니다',
      '서로를 당연시하지 않도록 주의하세요',
    ],
    tips: [
      '각자의 개성과 개인 공간을 유지하세요',
      '새로운 경험을 함께 시도해보세요',
      '서로에게 감사를 표현하는 습관을 만드세요',
      '공동의 목표를 세우고 함께 성장하세요',
    ],
  },
  balanced: {
    type: 'balanced',
    title: '균형 잡힌 궁합',
    description: '두 분은 일부에서는 비슷하고, 일부에서는 상호보완적인 특성을 보입니다. 공감할 수 있는 부분과 서로에게서 배울 수 있는 부분이 모두 있는 조화로운 관계입니다.',
    strengths: [
      '공감과 새로운 관점이 균형 있게 존재합니다',
      '유연하게 서로를 지지할 수 있습니다',
      '다양한 상황에 적응하기 좋은 조합입니다',
      '안정감과 자극 모두를 얻을 수 있습니다',
    ],
    cautions: [
      '어떤 부분에서 비슷하고 다른지 파악하세요',
      '다른 부분에서는 인내와 이해가 필요합니다',
      '비슷한 부분에서는 편안함에 안주하지 마세요',
      '관계의 강점을 의식적으로 활용하세요',
    ],
    tips: [
      '비슷한 점은 함께 즐기고, 다른 점은 서로 배우세요',
      '각자의 강점 영역에서 리드하는 역할 분담을 해보세요',
      '정기적으로 관계의 상태를 점검하고 대화하세요',
      '서로의 성장을 응원하고 축하해주세요',
    ],
  },
};

// 관계 조언 카테고리
export interface RelationshipTip {
  category: 'communication' | 'growth' | 'daily' | 'conflict';
  title: string;
  tips: string[];
}

// 일반적인 관계 조언
export const GENERAL_RELATIONSHIP_TIPS: RelationshipTip[] = [
  {
    category: 'communication',
    title: '소통 팁',
    tips: [
      '상대방의 말을 끝까지 들어주세요',
      '"나" 메시지로 감정을 표현하세요',
      '비언어적 신호도 주의 깊게 살펴보세요',
      '정기적으로 깊은 대화 시간을 가지세요',
    ],
  },
  {
    category: 'growth',
    title: '함께 성장하기',
    tips: [
      '공동의 목표를 세우고 함께 노력하세요',
      '서로의 꿈을 응원해주세요',
      '새로운 것을 함께 배워보세요',
      '서로에게서 배우려는 열린 자세를 유지하세요',
    ],
  },
  {
    category: 'daily',
    title: '일상의 작은 실천',
    tips: [
      '매일 감사를 표현하세요',
      '작은 친절을 베푸세요',
      '함께하는 루틴을 만들어보세요',
      '서로의 개인 시간도 존중해주세요',
    ],
  },
  {
    category: 'conflict',
    title: '갈등 해결',
    tips: [
      '문제와 사람을 분리해서 접근하세요',
      '감정이 격해질 때는 잠시 쉬어가세요',
      '승패가 아닌 해결책을 찾으세요',
      '사과와 용서를 연습하세요',
    ],
  },
];

// 점수 차이에 따른 상세 해석 생성
export const getScaleDifferenceInterpretation = (
  scale: ScaleCode,
  person1Percentage: number,
  person2Percentage: number
): string => {
  const difference = Math.abs(person1Percentage - person2Percentage);
  const interpretation = COUPLE_SCALE_INTERPRETATIONS[scale];

  if (difference <= 15) {
    return interpretation.similar;
  } else {
    return interpretation.complementary;
  }
};
