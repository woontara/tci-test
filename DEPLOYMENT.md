# TCI 테스트 배포 가이드

## 아키텍처

```
[Vercel - 프론트엔드]  ←→  [Railway/Render - 백엔드]  ←→  [PostgreSQL]
```

---

## 1. 백엔드 배포 (Railway 추천)

### Railway 배포

1. [Railway](https://railway.app) 가입 및 GitHub 연결

2. 새 프로젝트 생성
   - "Deploy from GitHub repo" 선택
   - `tci-test-backend` 폴더 선택

3. PostgreSQL 추가
   - "+ New" → "Database" → "PostgreSQL"
   - 자동으로 `DATABASE_URL` 환경변수 연결됨

4. 환경변수 설정 (Variables 탭)
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   CORS_ORIGIN=https://your-app.vercel.app
   ```

5. 배포 완료 후 도메인 확인
   - Settings → Domains에서 URL 확인
   - 예: `https://tci-test-api-production.up.railway.app`

### Render 배포 (대안)

1. [Render](https://render.com) 가입 및 GitHub 연결

2. "New" → "Blueprint" → GitHub 레포 연결
   - `render.yaml` 자동 인식

3. 환경변수 설정
   ```
   FRONTEND_URL=https://your-app.vercel.app
   CORS_ORIGIN=https://your-app.vercel.app
   ```

---

## 2. 프론트엔드 배포 (Vercel)

1. [Vercel](https://vercel.com) 가입 및 GitHub 연결

2. "Import Project" → GitHub 레포 선택

3. 설정
   - Framework Preset: Vite
   - Root Directory: `tci-test`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. 환경변수 설정
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

5. 배포 완료

---

## 3. 환경변수 정리

### 백엔드 (Railway/Render)

| 변수 | 설명 | 예시 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | 자동 설정됨 |
| `NODE_ENV` | 환경 | `production` |
| `PORT` | 서버 포트 | 자동 설정됨 |
| `FRONTEND_URL` | 프론트엔드 URL | `https://tci-test.vercel.app` |
| `CORS_ORIGIN` | CORS 허용 도메인 | `https://tci-test.vercel.app` |

### 프론트엔드 (Vercel)

| 변수 | 설명 | 예시 |
|------|------|------|
| `VITE_API_URL` | 백엔드 API URL | `https://tci-api.railway.app/api` |

---

## 4. 배포 체크리스트

- [ ] GitHub에 코드 푸시
- [ ] Railway/Render에서 백엔드 배포
- [ ] PostgreSQL 데이터베이스 연결 확인
- [ ] 백엔드 환경변수 설정
- [ ] 백엔드 Health Check 확인 (`/health`)
- [ ] Vercel에서 프론트엔드 배포
- [ ] 프론트엔드 환경변수 설정 (`VITE_API_URL`)
- [ ] 전체 플로우 테스트
  - [ ] 테스트 완료
  - [ ] 커플 세션 생성
  - [ ] 초대 링크 공유
  - [ ] 파트너 테스트 완료
  - [ ] 궁합 결과 확인

---

## 5. 문제 해결

### CORS 에러
- 백엔드 `CORS_ORIGIN`에 프론트엔드 URL 추가

### API 연결 실패
- 프론트엔드 `VITE_API_URL` 확인 (끝에 `/api` 포함)
- 백엔드 Health Check 확인

### 데이터베이스 에러
- Railway/Render에서 PostgreSQL 상태 확인
- `DATABASE_URL` 환경변수 확인
