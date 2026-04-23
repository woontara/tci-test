/**
 * TCI Test Backend - Entry Point
 */

import { app } from './app.js';
import { prisma, disconnectPrisma } from './lib/prisma.js';

const PORT = process.env.PORT || 3000;

/**
 * 서버 시작
 */
async function start(): Promise<void> {
  try {
    // Prisma 연결 확인
    await prisma.$connect();
    console.log('Database connected successfully');

    // 서버 시작
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        console.log('HTTP server closed');
        await disconnectPrisma();
        console.log('Database disconnected');
        process.exit(0);
      });

      // 10초 후 강제 종료
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// 서버 시작
start();
