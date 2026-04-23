/**
 * 응답 헬퍼 유틸리티
 */

import type { Response } from 'express';
import type { ErrorCode, ErrorResponse } from '../types/couple.js';
import { ERROR_MESSAGES } from '../types/couple.js';

// HTTP 상태 코드 맵
const ERROR_STATUS_CODES: Record<ErrorCode, number> = {
  INVALID_RESULT: 400,
  INVALID_CODE_FORMAT: 400,
  INCOMPLETE_SESSION: 400,
  VALIDATION_ERROR: 400,
  INVALID_SCALES_FORMAT: 400,
  INVALID_PERIOD: 400,
  SESSION_NOT_FOUND: 404,
  PARTNER_ALREADY_EXISTS: 409,
  SESSION_EXPIRED: 410,
  INTERNAL_ERROR: 500,
  STATISTICS_CALCULATION_ERROR: 500,
  INSUFFICIENT_DATA: 422,
};

/**
 * 성공 응답 전송
 */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  res.status(statusCode).json({
    success: true,
    ...data,
  });
}

/**
 * 에러 응답 전송
 */
export function sendError(
  res: Response,
  errorCode: ErrorCode,
  customMessage?: string
): void {
  const statusCode = ERROR_STATUS_CODES[errorCode] || 500;
  const message = customMessage || ERROR_MESSAGES[errorCode];

  const response: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
    },
  };

  res.status(statusCode).json(response);
}

/**
 * Validation 에러 응답 전송
 */
export function sendValidationError(res: Response, message: string): void {
  const response: ErrorResponse = {
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message,
    },
  };

  res.status(400).json(response);
}
