/**
 * 요청 검증 미들웨어
 */

import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ZodSchema } from 'zod';
import { sendValidationError } from '../utils/response.js';

/**
 * 요청 본문 검증 미들웨어 생성
 * @param schema - Zod 스키마
 * @returns Express 미들웨어
 */
export function validateBody<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.errors[0];
      const message = firstError
        ? `${firstError.path.join('.')}: ${firstError.message}`
        : '요청 데이터가 올바르지 않습니다.';

      sendValidationError(res, message);
      return;
    }

    // 검증된 데이터로 body 교체
    req.body = result.data;
    next();
  };
}

/**
 * 요청 파라미터 검증 미들웨어 생성
 * @param schema - Zod 스키마
 * @returns Express 미들웨어
 */
export function validateParams<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const firstError = result.error.errors[0];
      const message = firstError
        ? `${firstError.path.join('.')}: ${firstError.message}`
        : '요청 파라미터가 올바르지 않습니다.';

      sendValidationError(res, message);
      return;
    }

    next();
  };
}

/**
 * 쿼리 스트링 검증 미들웨어 생성
 * @param schema - Zod 스키마
 * @returns Express 미들웨어
 */
export function validateQuery<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const firstError = result.error.errors[0];
      const message = firstError
        ? `${firstError.path.join('.')}: ${firstError.message}`
        : '쿼리 파라미터가 올바르지 않습니다.';

      sendValidationError(res, message);
      return;
    }

    next();
  };
}
