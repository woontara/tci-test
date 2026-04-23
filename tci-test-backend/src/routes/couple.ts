/**
 * 커플 관련 API 라우트
 */

import { Router } from 'express';
import {
  createCoupleSession,
  getCoupleSession,
  addPartner,
  getCoupleResult,
} from '../controllers/couple.controller.js';
import { validateBody } from '../middleware/validator.js';
import {
  CreateCoupleSchema,
  AddPartnerSchema,
} from '../validators/couple.validator.js';

const router = Router();

/**
 * POST /api/couple
 * 커플 세션 생성 (첫 번째 사람 결과 저장)
 */
router.post(
  '/',
  validateBody(CreateCoupleSchema),
  createCoupleSession
);

/**
 * GET /api/couple/:code
 * 커플 데이터 조회
 */
router.get('/:code', getCoupleSession);

/**
 * POST /api/couple/:code/partner
 * 파트너 결과 추가
 */
router.post(
  '/:code/partner',
  validateBody(AddPartnerSchema),
  addPartner
);

/**
 * GET /api/couple/:code/result
 * 커플 비교 결과 조회
 */
router.get('/:code/result', getCoupleResult);

export { router as coupleRouter };
