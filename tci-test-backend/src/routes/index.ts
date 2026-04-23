/**
 * 라우트 통합
 */

import { Router } from 'express';
import { coupleRouter } from './couple.js';

const router = Router();

// 커플 관련 라우트
router.use('/couple', coupleRouter);

export { router as apiRouter };
