/**
 * 전역 에러 핸들러 미들웨어
 */

import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ErrorResponse } from '../types/couple.js';

/**
 * 전역 에러 핸들러
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Error:', err);

  // Zod 검증 에러
  if (err instanceof ZodError) {
    const firstError = err.errors[0];
    const message = firstError
      ? `${firstError.path.join('.')}: ${firstError.message}`
      : '요청 데이터가 올바르지 않습니다.';

    const response: ErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message,
      },
    };

    res.status(400).json(response);
    return;
  }

  // SyntaxError (JSON 파싱 에러)
  if (err instanceof SyntaxError && 'body' in err) {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '올바른 JSON 형식이 아닙니다.',
      },
    };

    res.status(400).json(response);
    return;
  }

  // 기타 에러
  const response: ErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development'
        ? err.message || '서버 내부 오류가 발생했습니다.'
        : '서버 내부 오류가 발생했습니다.',
    },
  };

  res.status(500).json(response);
};
