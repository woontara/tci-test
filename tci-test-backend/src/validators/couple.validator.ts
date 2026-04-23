/**
 * Zod 검증 스키마 정의
 */

import { z } from 'zod';

// 척도 코드
const ScaleCodeSchema = z.enum(['NS', 'HA', 'RD', 'P', 'SD', 'CO', 'ST']);

// 수준
const LevelSchema = z.enum(['low', 'medium', 'high']);

// 척도별 결과
const ScaleResultSchema = z.object({
  scale: ScaleCodeSchema,
  rawScore: z.number().min(0).max(100),
  maxScore: z.number().min(0).max(100),
  percentage: z.number().min(0).max(100),
  level: LevelSchema,
});

// 테스트 결과
const TestResultSchema = z.object({
  completedAt: z.string().datetime({ message: '올바른 날짜 형식이 아닙니다.' }),
  scales: z.array(ScaleResultSchema).length(7, { message: '7개의 척도 결과가 필요합니다.' }),
  temperamentProfile: z.string().min(1).max(100),
  characterProfile: z.string().min(1).max(100),
});

// 커플 세션 생성 요청
export const CreateCoupleSchema = z.object({
  name: z.string().max(50, { message: '이름은 50자 이하로 입력해주세요.' }).optional(),
  result: TestResultSchema,
});

// 파트너 추가 요청
export const AddPartnerSchema = z.object({
  name: z.string().max(50, { message: '이름은 50자 이하로 입력해주세요.' }).optional(),
  result: TestResultSchema,
});

// 커플 코드 파라미터
export const CoupleCodeParamSchema = z.object({
  code: z.string().regex(/^TCI-[A-Z0-9]{4}-[A-Z0-9]{4}$/i, {
    message: '유효하지 않은 커플 코드 형식입니다.',
  }),
});

// 타입 추출
export type CreateCoupleInput = z.infer<typeof CreateCoupleSchema>;
export type AddPartnerInput = z.infer<typeof AddPartnerSchema>;
export type CoupleCodeParam = z.infer<typeof CoupleCodeParamSchema>;
