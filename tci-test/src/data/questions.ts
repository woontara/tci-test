import type { Question } from '../types';

/**
 * TCI (기질 및 성격검사) 전문가 수준 문항
 *
 * 이론적 기반:
 * - Cloninger, C. R., Svrakic, D. M., & Przybeck, T. R. (1993). A psychobiological model of temperament and character.
 * - 민병배, 오현숙, 이주영 (2007). 기질 및 성격검사(TCI) 매뉴얼. 마음사랑.
 *
 * 각 척도별 14문항, 총 98문항
 * 하위요인(facet)을 균형있게 반영
 * 역채점 문항 포함으로 묵종 반응 방지 (척도당 4문항, 총 28문항)
 */

// NS (자극추구, Novelty Seeking) - 14문항
// 하위요인: NS1 탐색적 흥분, NS2 충동성, NS3 무절제, NS4 무질서
const NS_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 1,
    scale: 'NS',
    text: '평소에 가보지 않은 새로운 장소를 탐험하는 것이 즐겁다.',
    isReverse: false
  },
  {
    id: 2,
    scale: 'NS',
    text: '결과를 충분히 생각하기 전에 행동으로 옮기는 경우가 많다.',
    isReverse: false
  },
  {
    id: 3,
    scale: 'NS',
    text: '마음에 드는 것이 있으면 가격에 상관없이 구매하는 편이다.',
    isReverse: false
  },
  {
    id: 4,
    scale: 'NS',
    text: '정해진 규칙이나 일정을 따르는 것이 편하다.',
    isReverse: true
  },
  {
    id: 5,
    scale: 'NS',
    text: '한 가지 일에 오래 집중하기보다 여러 가지 일을 동시에 하는 것이 좋다.',
    isReverse: false
  },
  {
    id: 6,
    scale: 'NS',
    text: '일을 시작할 때 세부 계획을 먼저 세운다.',
    isReverse: true
  },
  {
    id: 7,
    scale: 'NS',
    text: '예상치 못한 상황이 생기면 오히려 흥미를 느낀다.',
    isReverse: false
  },
  // 추가 7문항
  {
    id: 8,
    scale: 'NS',
    text: '익숙한 음식보다 한 번도 먹어보지 않은 음식을 시도하는 것이 재미있다.',
    isReverse: false
  },
  {
    id: 9,
    scale: 'NS',
    text: '중요한 결정을 내릴 때 직감에 따르는 편이다.',
    isReverse: false
  },
  {
    id: 10,
    scale: 'NS',
    text: '기분에 따라 원래 계획을 바꾸는 경우가 자주 있다.',
    isReverse: false
  },
  {
    id: 11,
    scale: 'NS',
    text: '매일 같은 루틴을 따르는 것이 마음이 편하다.',
    isReverse: true
  },
  {
    id: 12,
    scale: 'NS',
    text: '지금 당장 하고 싶은 일이 있으면 다른 것을 미루더라도 먼저 한다.',
    isReverse: false
  },
  {
    id: 13,
    scale: 'NS',
    text: '물건을 살 때 신중하게 여러 가지를 비교한 후에 결정한다.',
    isReverse: true
  },
  {
    id: 14,
    scale: 'NS',
    text: '특별한 계획 없이 즉흥적으로 여행을 떠나는 것이 좋다.',
    isReverse: false
  },
];

// HA (위험회피, Harm Avoidance) - 14문항
// 하위요인: HA1 예기 걱정, HA2 불확실성 두려움, HA3 낯선 것 두려움, HA4 쉬운 피로
const HA_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 15,
    scale: 'HA',
    text: '앞으로 일어날 수 있는 나쁜 일에 대해 자주 걱정한다.',
    isReverse: false
  },
  {
    id: 16,
    scale: 'HA',
    text: '결과가 어떻게 될지 모르는 상황에서 긴장감을 느낀다.',
    isReverse: false
  },
  {
    id: 17,
    scale: 'HA',
    text: '처음 보는 사람들 앞에서 말하거나 행동하는 것이 어렵지 않다.',
    isReverse: true
  },
  {
    id: 18,
    scale: 'HA',
    text: '스트레스를 받으면 금방 지치고 피곤해진다.',
    isReverse: false
  },
  {
    id: 19,
    scale: 'HA',
    text: '실패할 가능성이 있으면 시도 자체를 꺼리게 된다.',
    isReverse: false
  },
  {
    id: 20,
    scale: 'HA',
    text: '낯선 환경에서도 편안하게 적응하는 편이다.',
    isReverse: true
  },
  {
    id: 21,
    scale: 'HA',
    text: '비판을 받으면 한동안 마음이 불편하다.',
    isReverse: false
  },
  // 추가 7문항
  {
    id: 22,
    scale: 'HA',
    text: '작은 실수도 오래 신경 쓰이고 후회가 된다.',
    isReverse: false
  },
  {
    id: 23,
    scale: 'HA',
    text: '중요한 발표나 면접을 앞두고 잠을 설치는 경우가 많다.',
    isReverse: false
  },
  {
    id: 24,
    scale: 'HA',
    text: '새로운 모임에 가면 어색함 없이 자연스럽게 어울린다.',
    isReverse: true
  },
  {
    id: 25,
    scale: 'HA',
    text: '힘든 일을 겪고 나면 회복하는 데 시간이 오래 걸린다.',
    isReverse: false
  },
  {
    id: 26,
    scale: 'HA',
    text: '무언가 잘못될 수 있다는 생각에 미리 대비하는 편이다.',
    isReverse: false
  },
  {
    id: 27,
    scale: 'HA',
    text: '예상치 못한 변화가 생겨도 당황하지 않고 침착하게 대처한다.',
    isReverse: true
  },
  {
    id: 28,
    scale: 'HA',
    text: '사소한 걱정거리도 머릿속에서 떨쳐버리기 어렵다.',
    isReverse: false
  },
];

// RD (사회적 민감성, Reward Dependence) - 14문항
// 하위요인: RD1 정서적 민감성, RD2 애착, RD3 의존성
const RD_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 29,
    scale: 'RD',
    text: '다른 사람의 감정 변화를 빠르게 알아차린다.',
    isReverse: false
  },
  {
    id: 30,
    scale: 'RD',
    text: '혼자 있는 것보다 사람들과 함께 있을 때 에너지를 얻는다.',
    isReverse: false
  },
  {
    id: 31,
    scale: 'RD',
    text: '주변 사람들의 인정과 칭찬이 나에게 큰 힘이 된다.',
    isReverse: false
  },
  {
    id: 32,
    scale: 'RD',
    text: '다른 사람의 기대에 부응하지 못하면 마음이 불편하다.',
    isReverse: false
  },
  {
    id: 33,
    scale: 'RD',
    text: '감동적인 영화나 음악에 쉽게 눈물이 난다.',
    isReverse: false
  },
  {
    id: 34,
    scale: 'RD',
    text: '친밀한 관계보다 독립적인 생활을 선호한다.',
    isReverse: true
  },
  {
    id: 35,
    scale: 'RD',
    text: '타인의 의견에 크게 좌우되지 않고 나만의 판단을 따른다.',
    isReverse: true
  },
  // 추가 7문항
  {
    id: 36,
    scale: 'RD',
    text: '주변 사람이 힘들어하면 나까지 마음이 무거워진다.',
    isReverse: false
  },
  {
    id: 37,
    scale: 'RD',
    text: '오랜만에 친구를 만나면 마음이 따뜻해지고 기분이 좋아진다.',
    isReverse: false
  },
  {
    id: 38,
    scale: 'RD',
    text: '존경하는 사람의 조언은 나의 결정에 큰 영향을 미친다.',
    isReverse: false
  },
  {
    id: 39,
    scale: 'RD',
    text: '다른 사람이 나를 어떻게 생각하는지 별로 신경 쓰지 않는다.',
    isReverse: true
  },
  {
    id: 40,
    scale: 'RD',
    text: '동물이나 아이들을 보면 저절로 미소가 지어진다.',
    isReverse: false
  },
  {
    id: 41,
    scale: 'RD',
    text: '가까운 사람과 떨어져 있으면 자주 연락하고 싶어진다.',
    isReverse: false
  },
  {
    id: 42,
    scale: 'RD',
    text: '혼자만의 시간이 많아도 외롭거나 허전하지 않다.',
    isReverse: true
  },
];

// P (인내력, Persistence) - 14문항
// 하위요인: PS1 노력의 열의, PS2 근면성, PS3 야망, PS4 완벽주의
const P_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 43,
    scale: 'P',
    text: '당장 결과가 보이지 않아도 꾸준히 노력을 지속한다.',
    isReverse: false
  },
  {
    id: 44,
    scale: 'P',
    text: '어려운 과제를 만나면 더 도전 의식이 생긴다.',
    isReverse: false
  },
  {
    id: 45,
    scale: 'P',
    text: '내가 설정한 목표는 반드시 달성하고자 한다.',
    isReverse: false
  },
  {
    id: 46,
    scale: 'P',
    text: '일을 완벽하게 마무리하기 전까지 만족하지 못한다.',
    isReverse: false
  },
  {
    id: 47,
    scale: 'P',
    text: '반복적이고 지루한 작업은 오래 하지 못한다.',
    isReverse: true
  },
  {
    id: 48,
    scale: 'P',
    text: '한 번 시작한 일은 어떻게든 끝을 본다.',
    isReverse: false
  },
  {
    id: 49,
    scale: 'P',
    text: '조금만 어려워져도 다른 방법을 찾아본다.',
    isReverse: true
  },
  // 추가 7문항
  {
    id: 50,
    scale: 'P',
    text: '실패를 경험해도 다시 도전하는 것이 당연하다고 생각한다.',
    isReverse: false
  },
  {
    id: 51,
    scale: 'P',
    text: '남들보다 더 높은 수준에 도달하고 싶은 욕구가 있다.',
    isReverse: false
  },
  {
    id: 52,
    scale: 'P',
    text: '하던 일이 잘 안 풀리면 쉽게 흥미를 잃는다.',
    isReverse: true
  },
  {
    id: 53,
    scale: 'P',
    text: '작은 부분까지 꼼꼼하게 신경 써서 일을 처리한다.',
    isReverse: false
  },
  {
    id: 54,
    scale: 'P',
    text: '장기적인 보상을 위해 현재의 즐거움을 미룰 수 있다.',
    isReverse: false
  },
  {
    id: 55,
    scale: 'P',
    text: '노력해도 성과가 없으면 빨리 포기하는 것이 현명하다고 생각한다.',
    isReverse: true
  },
  {
    id: 56,
    scale: 'P',
    text: '목표를 이루기 위해 불편함이나 어려움을 감수할 수 있다.',
    isReverse: false
  },
];

// SD (자율성, Self-Directedness) - 14문항
// 하위요인: SD1 책임감, SD2 목적의식, SD3 자기 효능감, SD4 자기 수용, SD5 자아 통합
const SD_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 57,
    scale: 'SD',
    text: '내 삶에서 일어나는 일들은 대부분 내 선택의 결과이다.',
    isReverse: false
  },
  {
    id: 58,
    scale: 'SD',
    text: '내 인생의 명확한 목표와 방향이 있다.',
    isReverse: false
  },
  {
    id: 59,
    scale: 'SD',
    text: '문제가 생기면 스스로 해결책을 찾아낼 수 있다.',
    isReverse: false
  },
  {
    id: 60,
    scale: 'SD',
    text: '나의 장점과 단점을 있는 그대로 받아들인다.',
    isReverse: false
  },
  {
    id: 61,
    scale: 'SD',
    text: '상황에 따라 내 생각이나 행동이 자주 흔들린다.',
    isReverse: true
  },
  {
    id: 62,
    scale: 'SD',
    text: '나에게 일어나는 일은 운이나 다른 사람 탓인 경우가 많다.',
    isReverse: true
  },
  {
    id: 63,
    scale: 'SD',
    text: '내가 가진 능력으로 원하는 것을 이룰 수 있다고 믿는다.',
    isReverse: false
  },
  // 추가 7문항
  {
    id: 64,
    scale: 'SD',
    text: '내가 한 약속은 어떤 상황에서도 지키려고 노력한다.',
    isReverse: false
  },
  {
    id: 65,
    scale: 'SD',
    text: '매일의 작은 행동들이 나의 미래를 만든다고 생각한다.',
    isReverse: false
  },
  {
    id: 66,
    scale: 'SD',
    text: '어려운 상황에서도 포기하지 않고 방법을 찾아낸다.',
    isReverse: false
  },
  {
    id: 67,
    scale: 'SD',
    text: '나 자신에 대해 자주 불만족스럽거나 부끄럽게 느껴진다.',
    isReverse: true
  },
  {
    id: 68,
    scale: 'SD',
    text: '내 가치관이나 신념은 상황에 따라 쉽게 바뀌지 않는다.',
    isReverse: false
  },
  {
    id: 69,
    scale: 'SD',
    text: '내 삶의 방향을 스스로 결정하기보다 상황에 맡기는 편이다.',
    isReverse: true
  },
  {
    id: 70,
    scale: 'SD',
    text: '나의 부족한 점도 나의 일부로 받아들일 수 있다.',
    isReverse: false
  },
];

// CO (연대감, Cooperativeness) - 14문항
// 하위요인: CO1 사회적 수용, CO2 공감, CO3 이타성, CO4 자비심, CO5 도덕성
const CO_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 71,
    scale: 'CO',
    text: '나와 다른 생각을 가진 사람도 이해하려고 노력한다.',
    isReverse: false
  },
  {
    id: 72,
    scale: 'CO',
    text: '다른 사람의 입장에서 그 사람의 감정을 느낄 수 있다.',
    isReverse: false
  },
  {
    id: 73,
    scale: 'CO',
    text: '내가 손해를 보더라도 다른 사람을 돕는 것이 좋다.',
    isReverse: false
  },
  {
    id: 74,
    scale: 'CO',
    text: '나에게 잘못한 사람을 용서하기 어렵다.',
    isReverse: true
  },
  {
    id: 75,
    scale: 'CO',
    text: '공동의 이익을 위해 개인의 이익을 양보할 수 있다.',
    isReverse: false
  },
  {
    id: 76,
    scale: 'CO',
    text: '경쟁에서 이기는 것이 협력하는 것보다 중요하다.',
    isReverse: true
  },
  {
    id: 77,
    scale: 'CO',
    text: '어려운 처지에 있는 사람을 보면 마음이 아프다.',
    isReverse: false
  },
  // 추가 7문항
  {
    id: 78,
    scale: 'CO',
    text: '다양한 배경을 가진 사람들과 어울리는 것이 즐겁다.',
    isReverse: false
  },
  {
    id: 79,
    scale: 'CO',
    text: '누군가 슬퍼하거나 기뻐할 때 나도 함께 그 감정을 느낀다.',
    isReverse: false
  },
  {
    id: 80,
    scale: 'CO',
    text: '내 시간이나 자원을 들여서라도 필요한 사람을 돕고 싶다.',
    isReverse: false
  },
  {
    id: 81,
    scale: 'CO',
    text: '상대가 먼저 사과하지 않으면 관계를 회복하기 어렵다.',
    isReverse: true
  },
  {
    id: 82,
    scale: 'CO',
    text: '규칙이나 약속을 어기면 아무도 모르더라도 불편한 마음이 든다.',
    isReverse: false
  },
  {
    id: 83,
    scale: 'CO',
    text: '다른 사람의 성공을 진심으로 기뻐할 수 있다.',
    isReverse: false
  },
  {
    id: 84,
    scale: 'CO',
    text: '대부분의 사람들은 자기 이익만 챙긴다고 생각한다.',
    isReverse: true
  },
];

// ST (자기초월, Self-Transcendence) - 14문항
// 하위요인: ST1 자기 망각, ST2 초월적 동일시, ST3 영적 수용
const ST_QUESTIONS: Question[] = [
  // 기존 7문항
  {
    id: 85,
    scale: 'ST',
    text: '어떤 활동에 깊이 몰입하면 시간 가는 줄 모른다.',
    isReverse: false
  },
  {
    id: 86,
    scale: 'ST',
    text: '자연 속에 있을 때 우주와 연결된 느낌을 받는다.',
    isReverse: false
  },
  {
    id: 87,
    scale: 'ST',
    text: '눈에 보이지 않는 영적인 세계가 존재한다고 느낀다.',
    isReverse: false
  },
  {
    id: 88,
    scale: 'ST',
    text: '삶에는 과학으로 설명할 수 없는 신비로운 면이 있다.',
    isReverse: false
  },
  {
    id: 89,
    scale: 'ST',
    text: '나 자신보다 더 큰 무언가의 일부라고 느낄 때가 있다.',
    isReverse: false
  },
  {
    id: 90,
    scale: 'ST',
    text: '직관이나 육감보다 논리적 분석을 더 신뢰한다.',
    isReverse: true
  },
  {
    id: 91,
    scale: 'ST',
    text: '눈에 보이는 물질적인 것만이 실재한다고 생각한다.',
    isReverse: true
  },
  // 추가 7문항
  {
    id: 92,
    scale: 'ST',
    text: '창작 활동이나 예술에 빠져들면 자아가 사라지는 느낌이 든다.',
    isReverse: false
  },
  {
    id: 93,
    scale: 'ST',
    text: '모든 생명체가 서로 연결되어 있다고 느낀다.',
    isReverse: false
  },
  {
    id: 94,
    scale: 'ST',
    text: '명상이나 기도가 마음의 평화를 가져다준다고 생각한다.',
    isReverse: false
  },
  {
    id: 95,
    scale: 'ST',
    text: '설명할 수 없는 우연이나 예감이 맞았던 경험이 있다.',
    isReverse: false
  },
  {
    id: 96,
    scale: 'ST',
    text: '증거가 없는 것은 믿지 않는 편이다.',
    isReverse: true
  },
  {
    id: 97,
    scale: 'ST',
    text: '때때로 일상에서 벗어나 더 깊은 의미를 찾고 싶어진다.',
    isReverse: false
  },
  {
    id: 98,
    scale: 'ST',
    text: '삶의 의미보다 현실적인 문제 해결에 더 관심이 있다.',
    isReverse: true
  },
];

// 전체 문항 (98문항)
export const ALL_QUESTIONS: Question[] = [
  ...NS_QUESTIONS,
  ...HA_QUESTIONS,
  ...RD_QUESTIONS,
  ...P_QUESTIONS,
  ...SD_QUESTIONS,
  ...CO_QUESTIONS,
  ...ST_QUESTIONS,
];

// 문항 순서 섞기 (테스트 시 척도별로 연속되지 않도록)
export const getShuffledQuestions = (): Question[] => {
  const shuffled = [...ALL_QUESTIONS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 문항 수
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

// 척도별 문항 수
export const QUESTIONS_PER_SCALE = 14;

// 리커트 척도 옵션
export const LIKERT_OPTIONS = [
  { value: 1 as const, label: '전혀 아니다' },
  { value: 2 as const, label: '아니다' },
  { value: 3 as const, label: '보통이다' },
  { value: 4 as const, label: '그렇다' },
  { value: 5 as const, label: '매우 그렇다' },
];

// 역채점 문항 번호 목록 (참조용) - 척도당 4문항, 총 28문항
export const REVERSE_SCORED_ITEMS = [
  // NS: 4, 6, 11, 13
  4, 6, 11, 13,
  // HA: 17, 20, 24, 27
  17, 20, 24, 27,
  // RD: 34, 35, 39, 42
  34, 35, 39, 42,
  // P: 47, 49, 52, 55
  47, 49, 52, 55,
  // SD: 61, 62, 67, 69
  61, 62, 67, 69,
  // CO: 74, 76, 81, 84
  74, 76, 81, 84,
  // ST: 90, 91, 96, 98
  90, 91, 96, 98,
];

// 척도별 문항 조회 함수
export const getQuestionsByScale = (scale: Question['scale']): Question[] => {
  return ALL_QUESTIONS.filter(q => q.scale === scale);
};
