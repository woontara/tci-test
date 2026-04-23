---
name: web-dev-orchestrator
description: "풀스택 웹 개발 에이전트 팀을 조율하는 오케스트레이터. 웹 애플리케이션 개발, 웹 앱 만들기, 웹사이트 구축, 풀스택 개발, React/Vue/Next.js 프로젝트 생성 요청 시 사용. 데이터 분석, 통계 기능, 대시보드, 리포트, 차트/그래프 추가 요청 시에도 사용. TCI 검사, 심리검사, 문항 개발, 척도 개선, 심리측정학적 검증 요청 시에도 사용. 후속 작업: 기능 추가, 버그 수정, 코드 수정, 리팩토링, 다시 개발, 업데이트, 프론트엔드만 수정, 백엔드만 수정, API 추가, 컴포넌트 추가, 데이터 분석 추가, 문항 수정, 테스트 다시 실행 요청 시에도 반드시 이 스킬 사용."
---

# Web Dev Orchestrator

풀스택 웹 개발 에이전트 팀을 조율하여 웹 애플리케이션을 개발하는 통합 스킬.

## 실행 모드: 에이전트 팀

## 에이전트 구성

| 팀원 | 에이전트 타입 | 역할 | 출력 |
|------|-------------|------|------|
| architect | 커스텀 | 요구사항 분석, 설계 | `_workspace/01_architect_design.md` |
| psychiatrist | 커스텀 | TCI 문항 개발, 심리학적 검증 | `_workspace/01_psychiatrist_items.md` |
| data-analyst | 커스텀 | 데이터 모델링, 분석 로직 | `_workspace/01_data_analysis.md` |
| frontend-dev | 커스텀 | 프론트엔드 구현 | 코드 + `_workspace/02_frontend_summary.md` |
| backend-dev | 커스텀 | 백엔드 구현 | 코드 + `_workspace/02_backend_summary.md` |
| qa-engineer | 커스텀 | 통합 검증 | `_workspace/03_qa_report.md` |

## 워크플로우

### Phase 0: 컨텍스트 확인

기존 산출물 존재 여부를 확인하여 실행 모드 결정:

1. `_workspace/` 디렉토리 존재 여부 확인
2. 실행 모드 결정:
   - **`_workspace/` 미존재** → 초기 실행. Phase 1로 진행
   - **`_workspace/` 존재 + 부분 수정 요청** → 부분 재실행
     - "프론트엔드만" → frontend-dev만 재호출
     - "백엔드만" → backend-dev만 재호출
     - "테스트만" → qa-engineer만 재호출
   - **`_workspace/` 존재 + 새 기능 요청** → 새 실행. 기존 `_workspace/`를 `_workspace_{timestamp}/`로 이동

### Phase 1: 준비

1. 사용자 입력 분석:
   - 프로젝트 이름, 목적
   - 기능 요구사항
   - 선호 기술 스택 (없으면 기본값 제안)
2. 작업 디렉토리에 `_workspace/` 생성
3. 입력 요약을 `_workspace/00_input.md`에 저장

### Phase 2: 설계 (architect + data-analyst)

**실행 방식:** architect 먼저, 데이터 분석 필요 시 data-analyst 후속

1. architect 에이전트 호출:
   ```
   Agent(
     subagent_type: "architect",
     model: "opus",
     prompt: "사용자 요구사항을 분석하고 웹 애플리케이션 설계를 수행하라.
              _workspace/00_input.md를 읽고 설계 결과를 _workspace/01_architect_design.md에 저장하라."
   )
   ```

2. 설계 산출물 확인:
   - 요구사항 명세
   - 기술 스택 결정
   - 데이터 모델/스키마
   - API 명세
   - 디렉토리 구조

3. 데이터 분석 기능 필요 시 data-analyst 호출:
   ```
   Agent(
     subagent_type: "data-analyst",
     model: "opus",
     prompt: "architect의 설계를 바탕으로 데이터 분석 로직을 설계하라.
              _workspace/01_architect_design.md를 읽고 분석 결과를 _workspace/01_data_analysis.md에 저장하라.
              포함 내용: 분석 알고리즘, 통계 함수, 시각화 데이터 구조, 성능 고려사항."
   )
   ```

4. data-analyst 산출물 (해당 시):
   - 분석 알고리즘 명세
   - 통계/집계 함수 설계
   - 차트/그래프 데이터 구조
   - 캐싱/성능 전략

### Phase 3: 구현 (frontend-dev + backend-dev 병렬)

**실행 방식:** 에이전트 팀

1. 팀 생성:
   ```
   TeamCreate(
     team_name: "dev-team",
     members: [
       { name: "frontend", agent_type: "frontend-dev", model: "opus",
         prompt: "architect의 설계를 바탕으로 프론트엔드를 구현하라." },
       { name: "backend", agent_type: "backend-dev", model: "opus",
         prompt: "architect의 설계를 바탕으로 백엔드를 구현하라." }
     ]
   )
   ```

2. 작업 등록:
   ```
   TaskCreate(tasks: [
     { title: "프론트엔드 기본 구조", assignee: "frontend" },
     { title: "백엔드 API 구현", assignee: "backend" },
     { title: "프론트-백 연동", depends_on: ["프론트엔드 기본 구조", "백엔드 API 구현"] }
   ])
   ```

3. 팀원 간 통신:
   - frontend ↔ backend: API 인터페이스 확인, 타입 동기화
   - 불일치 발견 시 즉시 SendMessage로 조율

4. 산출물:
   - 프론트엔드 코드 파일들
   - 백엔드 코드 파일들
   - `_workspace/02_frontend_summary.md`
   - `_workspace/02_backend_summary.md`

### Phase 4: 검증 (qa-engineer)

**실행 방식:** qa-engineer 단독 (팀 정리 후)

1. dev-team 정리: `TeamDelete`
2. qa-engineer 호출:
   ```
   Agent(
     subagent_type: "qa-engineer",
     model: "opus",
     prompt: "프론트엔드-백엔드 통합 정합성을 검증하라.
              _workspace/의 설계 및 구현 요약을 참조하고, 실제 코드를 교차 비교하라.
              결과를 _workspace/03_qa_report.md에 저장하라."
   )
   ```

3. QA 결과 확인:
   - PASS: Phase 5로 진행
   - FAIL: 해당 개발자에게 수정 요청 후 재검증 (최대 2회)

### Phase 5: 정리 및 보고

1. `_workspace/` 보존 (삭제하지 않음)
2. 사용자에게 결과 요약:
   - 생성된 파일 목록
   - 프로젝트 실행 방법
   - QA 결과 요약
   - 추가 개선 제안

## 데이터 흐름

```
[사용자 요청]
      ↓
[Phase 1: 준비] → _workspace/00_input.md
      ↓
[Phase 2: architect] → _workspace/01_architect_design.md
      ↓ (데이터 분석 필요 시)
[Phase 2: data-analyst] → _workspace/01_data_analysis.md
      ↓
[Phase 3: TeamCreate(dev-team)]
      ├── frontend-dev ←SendMessage→ backend-dev
      │        ↓                          ↓
      │   프론트 코드                백엔드 코드
      │   (차트/시각화 포함)          (분석 API 포함)
      │        ↓                          ↓
      │   02_frontend_summary.md    02_backend_summary.md
      ↓
[Phase 4: qa-engineer] → _workspace/03_qa_report.md
      ↓
[Phase 5: 결과 보고]
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| architect 실패 | 1회 재시도. 재실패 시 사용자에게 요구사항 명확화 요청 |
| 개발자 1명 실패 | 해당 에이전트 재시작. 재실패 시 다른 개발자에게 도움 요청 |
| 양쪽 개발자 실패 | 사용자에게 알리고 진행 여부 확인 |
| QA 실패 발견 | 담당 개발자에게 수정 요청, 재검증 (최대 2회) |
| 타입 불일치 | 양쪽 개발자가 합의하여 수정, architect에게 설계 변경 필요 시 알림 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 "할 일 목록 앱 만들어줘" 요청
2. Phase 1: 요구사항 파악 (CRUD 기능, 기본 UI)
3. Phase 2: architect가 React + Express 스택으로 설계
4. Phase 3: frontend-dev, backend-dev가 병렬 구현, API 인터페이스 조율
5. Phase 4: qa-engineer가 통합 검증 → PASS
6. Phase 5: 프로젝트 파일 + 실행 가이드 제공

### 에러 흐름
1. Phase 4에서 qa-engineer가 API 응답 타입 불일치 발견
2. backend-dev에게 수정 요청
3. backend-dev 수정 완료
4. qa-engineer 재검증 → PASS
5. Phase 5 진행
