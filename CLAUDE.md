# Project: Web Development Harness

## 하네스: 웹 개발

**목표:** 풀스택 웹 애플리케이션을 에이전트 팀 협업으로 개발한다.

**트리거:** 웹 앱 개발, 웹사이트 구축, 풀스택 개발, React/Vue/Next.js 프로젝트 요청 시 `web-dev-orchestrator` 스킬을 사용하라. 단순 질문(기술 설명, 코드 리뷰 등)은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-04-23 | 초기 구성 | 전체 | - |
| 2026-04-23 | 커플 비교 기능 추가 | tci-test | 파트너와 함께 분석 기능 요청 |
| 2026-04-23 | Node.js + Express 백엔드 추가 | tci-test-backend | 커플 데이터 서버 저장 필요 |
| 2026-04-23 | API 응답 구조 불일치 수정 | tci-test | QA 검증 결과 반영 |
| 2026-04-23 | data-analyst 에이전트 추가 | agents/data-analyst.md | 데이터 분석/통계/리포트 기능 지원 |
| 2026-04-23 | 통계 기능 구현 | tci-test, tci-test-backend | 전체 통계 대시보드, 개인 비교 기능 |
| 2026-04-23 | psychiatrist 에이전트 추가 | agents/psychiatrist.md | TCI 전문가 수준 문항 개발 |
| 2026-04-23 | TCI 문항 전문가 수준 업그레이드 | tci-test/src/data/questions.ts | 98문항, Cloninger 원저 기반, 하위요인 반영 |
