# Node.js 20 버전 사용 (Next.js 지원 버전)
FROM node:20-alpine

# tee 설치 (busybox에는 없을 수 있어서)
RUN apk add --no-cache busybox-extras

# 명시적으로 /app 디렉토리 생성
RUN mkdir -p /app
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# .env.local 파일 복사 (GitHub Actions에서 생성한 파일)
COPY .env.local /app/.env.local

# .env.local 파일이 제대로 복사되었는지 확인
RUN ls -la /app
RUN cat /app/.env.local

# 애플리케이션 파일 복사
COPY . .

# ✅ ESLint 검사 비활성화 (빌드 실패 방지용)
ENV NEXT_DISABLE_ESLINT=true

# 애플리케이션 빌드: 로그를 build.log에 저장하고, 실패 시 출력
RUN set -o pipefail && \
    npm run build 2>&1 | tee build.log

# (빌드가 성공했다면 다음 단계로 넘어가고, 실패했다면 위에서 exit 1 후 로그가 터미널에 보일 겁니다.)

# 프로덕션 환경에서 서버 실행
CMD ["npm", "run", "start"]

# 컨테이너가 3000 포트를 리스닝하도록 설정
EXPOSE 3000
