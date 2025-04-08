# 1. 베이스 이미지 선택 (Node.js LTS 버전)
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 파일 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 4. 프로젝트 코드 복사
COPY . .

# 5. Next.js 빌드
RUN npm run build

# 6. 포트 설정 및 실행 명령어
EXPOSE 3000
CMD ["npm", "run", "start"]
