/**
 * 커플 세션 비즈니스 로직 서비스
 */

import { prisma } from '../lib/prisma.js';
import { generateCoupleCode, normalizeCoupleCode } from '../lib/codeGenerator.js';
import { addDays, isExpired, DEFAULT_EXPIRY_DAYS } from '../utils/dateUtils.js';
import type { CreateCoupleInput, AddPartnerInput } from '../validators/couple.validator.js';
import type {
  PersonData,
  CoupleStatus,
  CompatibilityInfo,
  ErrorCode
} from '../types/couple.js';
import type { TestResult } from '../types/test.js';

// 서비스 응답 타입
interface ServiceResult<T> {
  success: true;
  data: T;
}

interface ServiceError {
  success: false;
  error: ErrorCode;
}

type ServiceResponse<T> = ServiceResult<T> | ServiceError;

/**
 * 커플 세션 서비스 클래스
 */
export class CoupleService {
  /**
   * 커플 세션 생성
   */
  async createSession(input: CreateCoupleInput): Promise<ServiceResponse<{
    code: string;
    expiresAt: Date;
  }>> {
    try {
      const code = await generateCoupleCode();
      const expiresAt = addDays(DEFAULT_EXPIRY_DAYS);

      const session = await prisma.coupleSession.create({
        data: {
          code,
          person1Name: input.name,
          person1Result: JSON.stringify(input.result),
          person1At: new Date(),
          expiresAt,
        },
      });

      return {
        success: true,
        data: {
          code: session.code,
          expiresAt: session.expiresAt,
        },
      };
    } catch (error) {
      console.error('Error creating couple session:', error);
      return {
        success: false,
        error: 'INTERNAL_ERROR',
      };
    }
  }

  /**
   * 커플 세션 조회
   */
  async getSession(code: string): Promise<ServiceResponse<{
    code: string;
    status: CoupleStatus;
    person1: PersonData;
    person2: PersonData | null;
    createdAt: string;
    expiresAt: string;
  }>> {
    try {
      const normalizedCode = normalizeCoupleCode(code);

      const session = await prisma.coupleSession.findUnique({
        where: { code: normalizedCode },
      });

      if (!session) {
        return {
          success: false,
          error: 'SESSION_NOT_FOUND',
        };
      }

      // 만료 확인
      if (isExpired(session.expiresAt)) {
        return {
          success: false,
          error: 'SESSION_EXPIRED',
        };
      }

      return {
        success: true,
        data: {
          code: session.code,
          status: session.status as CoupleStatus,
          person1: {
            name: session.person1Name,
            result: JSON.parse(session.person1Result) as TestResult,
            completedAt: session.person1At.toISOString(),
          },
          person2: session.person2Result ? {
            name: session.person2Name,
            result: JSON.parse(session.person2Result) as TestResult,
            completedAt: session.person2At?.toISOString() || '',
          } : null,
          createdAt: session.createdAt.toISOString(),
          expiresAt: session.expiresAt.toISOString(),
        },
      };
    } catch (error) {
      console.error('Error getting couple session:', error);
      return {
        success: false,
        error: 'INTERNAL_ERROR',
      };
    }
  }

  /**
   * 파트너 결과 추가
   */
  async addPartner(code: string, input: AddPartnerInput): Promise<ServiceResponse<{
    code: string;
  }>> {
    try {
      const normalizedCode = normalizeCoupleCode(code);

      const session = await prisma.coupleSession.findUnique({
        where: { code: normalizedCode },
      });

      if (!session) {
        return {
          success: false,
          error: 'SESSION_NOT_FOUND',
        };
      }

      if (isExpired(session.expiresAt)) {
        return {
          success: false,
          error: 'SESSION_EXPIRED',
        };
      }

      if (session.person2Result) {
        return {
          success: false,
          error: 'PARTNER_ALREADY_EXISTS',
        };
      }

      const updated = await prisma.coupleSession.update({
        where: { code: normalizedCode },
        data: {
          person2Name: input.name,
          person2Result: JSON.stringify(input.result),
          person2At: new Date(),
          status: 'completed',
        },
      });

      return {
        success: true,
        data: {
          code: updated.code,
        },
      };
    } catch (error) {
      console.error('Error adding partner:', error);
      return {
        success: false,
        error: 'INTERNAL_ERROR',
      };
    }
  }

  /**
   * 커플 비교 결과 조회
   */
  async getResult(code: string): Promise<ServiceResponse<{
    code: string;
    person1: PersonData;
    person2: PersonData;
    compatibility: CompatibilityInfo;
    createdAt: string;
  }>> {
    try {
      const normalizedCode = normalizeCoupleCode(code);

      const session = await prisma.coupleSession.findUnique({
        where: { code: normalizedCode },
      });

      if (!session) {
        return {
          success: false,
          error: 'SESSION_NOT_FOUND',
        };
      }

      if (!session.person2Result) {
        return {
          success: false,
          error: 'INCOMPLETE_SESSION',
        };
      }

      const person1Result = JSON.parse(session.person1Result) as TestResult;
      const person2Result = JSON.parse(session.person2Result) as TestResult;

      // 궁합 유형 계산
      const compatibility = this.calculateCompatibility(person1Result, person2Result);

      return {
        success: true,
        data: {
          code: session.code,
          person1: {
            name: session.person1Name,
            result: person1Result,
            completedAt: session.person1At.toISOString(),
          },
          person2: {
            name: session.person2Name,
            result: person2Result,
            completedAt: session.person2At?.toISOString() || '',
          },
          compatibility,
          createdAt: session.createdAt.toISOString(),
        },
      };
    } catch (error) {
      console.error('Error getting couple result:', error);
      return {
        success: false,
        error: 'INTERNAL_ERROR',
      };
    }
  }

  /**
   * 만료된 세션 정리
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const result = await prisma.coupleSession.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      return result.count;
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      return 0;
    }
  }

  /**
   * 궁합 유형 계산
   * 두 사람의 테스트 결과를 바탕으로 궁합 유형 결정
   */
  private calculateCompatibility(
    r1: TestResult,
    r2: TestResult
  ): CompatibilityInfo {

    // 척도별 차이 계산
    const differences: number[] = [];

    if (r1.scales && r2.scales) {
      for (let i = 0; i < r1.scales.length; i++) {
        const diff = Math.abs(r1.scales[i].percentage - r2.scales[i].percentage);
        differences.push(diff);
      }
    }

    const avgDifference = differences.length > 0
      ? differences.reduce((a, b) => a + b, 0) / differences.length
      : 50;

    // 궁합 유형 결정
    if (avgDifference <= 15) {
      return {
        type: 'similar',
        title: '동질형 커플',
        description: '비슷한 성향으로 서로를 잘 이해하는 관계입니다.',
      };
    } else if (avgDifference <= 30) {
      return {
        type: 'balanced',
        title: '균형형 커플',
        description: '적절한 유사성과 차이점을 가진 균형 잡힌 관계입니다.',
      };
    } else {
      return {
        type: 'complementary',
        title: '상호보완형 커플',
        description: '서로 다른 강점으로 보완하는 관계입니다.',
      };
    }
  }
}

// 싱글톤 인스턴스 export
export const coupleService = new CoupleService();
