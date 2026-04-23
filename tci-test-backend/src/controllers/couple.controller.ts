/**
 * 커플 API 컨트롤러
 */

import type { Request, Response } from 'express';
import { coupleService } from '../services/coupleService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { normalizeCoupleCode } from '../lib/codeGenerator.js';
import type { CreateCoupleInput, AddPartnerInput } from '../validators/couple.validator.js';

/**
 * 공유 URL 생성
 */
function getShareUrl(code: string): string {
  const baseUrl = process.env.FRONTEND_URL || 'https://tci-test.vercel.app';
  return `${baseUrl}/couple/invite/${code}`;
}

/**
 * 결과 URL 생성
 */
function getResultUrl(code: string): string {
  const baseUrl = process.env.FRONTEND_URL || 'https://tci-test.vercel.app';
  return `${baseUrl}/couple/result/${code}`;
}

/**
 * POST /api/couple
 * 커플 세션 생성
 */
export async function createCoupleSession(
  req: Request<object, object, CreateCoupleInput>,
  res: Response
): Promise<void> {
  const result = await coupleService.createSession(req.body);

  if (!result.success) {
    sendError(res, result.error);
    return;
  }

  sendSuccess(res, {
    code: result.data.code,
    shareUrl: getShareUrl(result.data.code),
    expiresAt: result.data.expiresAt.toISOString(),
  }, 201);
}

/**
 * GET /api/couple/:code
 * 커플 세션 조회
 */
export async function getCoupleSession(
  req: Request<{ code: string }>,
  res: Response
): Promise<void> {
  const normalizedCode = normalizeCoupleCode(req.params.code);
  const result = await coupleService.getSession(normalizedCode);

  if (!result.success) {
    sendError(res, result.error);
    return;
  }

  sendSuccess(res, {
    data: result.data,
  });
}

/**
 * POST /api/couple/:code/partner
 * 파트너 결과 추가
 */
export async function addPartner(
  req: Request<{ code: string }, object, AddPartnerInput>,
  res: Response
): Promise<void> {
  const normalizedCode = normalizeCoupleCode(req.params.code);
  const result = await coupleService.addPartner(normalizedCode, req.body);

  if (!result.success) {
    sendError(res, result.error);
    return;
  }

  sendSuccess(res, {
    resultUrl: getResultUrl(result.data.code),
  });
}

/**
 * GET /api/couple/:code/result
 * 커플 비교 결과 조회
 */
export async function getCoupleResult(
  req: Request<{ code: string }>,
  res: Response
): Promise<void> {
  const normalizedCode = normalizeCoupleCode(req.params.code);
  const result = await coupleService.getResult(normalizedCode);

  if (!result.success) {
    sendError(res, result.error);
    return;
  }

  sendSuccess(res, {
    data: result.data,
  });
}

/**
 * DELETE /api/couple/:code
 * 커플 세션 삭제 (선택적 기능)
 */
export async function deleteCoupleSession(
  _req: Request<{ code: string }>,
  res: Response
): Promise<void> {
  // 현재는 구현하지 않음 (향후 확장용)
  sendError(res, 'INTERNAL_ERROR', '이 기능은 아직 구현되지 않았습니다.');
}
