/**
 * Express 앱 설정
 */

import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/index.js';

const app = express();

// 보안 미들웨어
app.use(helmet());

// CORS 설정
app.use(corsMiddleware);

// JSON 파싱
app.use(express.json({ limit: '1mb' }));

// 헬스체크 엔드포인트
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API 라우트
app.use('/api', apiRouter);

// 404 핸들러
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: '요청한 리소스를 찾을 수 없습니다.',
    },
  });
});

// 전역 에러 핸들러
app.use(errorHandler);

export { app };
