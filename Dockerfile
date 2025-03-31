# Node.js 이미지를 베이스로 사용
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# .env.local 파일 복사 (GitHub Actions에서 생성한 파일)
COPY .env.local .    # 루트 디렉토리로 복사 (컨테이너의 /app)

# 애플리케이션 파일 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 프로덕션 환경에서 서버 실행
CMD ["npm", "run", "start"]

# 컨테이너가 3000 포트를 리스닝하도록 설정
EXPOSE 3000
