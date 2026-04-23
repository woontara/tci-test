/**
 * CORS 설정 미들웨어
 */

import cors from 'cors';
import type { CorsOptions } from 'cors';

/**
 * 허용된 오리진 목록 가져오기
 */
function getAllowedOrigins(): string[] {
  const envOrigins = process.env.CORS_ORIGIN || '';
  const origins = envOrigins.split(',').map(o => o.trim()).filter(Boolean);

  // 기본 허용 오리진
  const defaultOrigins = [
    'http://localhost:5173',      // Vite 개발 서버
    'http://localhost:3000',      // 로컬 테스트
    'https://tci-test.vercel.app', // 프로덕션
  ];

  return [...new Set([...defaultOrigins, ...origins])];
}

/**
 * CORS 옵션 생성
 */
export function createCorsOptions(): CorsOptions {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin: (origin, callback) => {
      // origin이 없는 경우 (같은 출처 요청 또는 서버 간 통신)
      if (!origin) {
        callback(null, true);
        return;
      }

      // 허용된 오리진인지 확인
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // 개발 환경에서는 localhost 계열 모두 허용
      if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24시간
  };
}

/**
 * CORS 미들웨어 export
 */
export const corsMiddleware = cors(createCorsOptions());
