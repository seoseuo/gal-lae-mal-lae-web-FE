# Node.js 20 버전 사용 (Next.js 지원 버전)
FROM node:20-alpine

# 명시적으로 /app 디렉토리 생성
RUN mkdir -p /app
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# .env.local 파일 복사 (GitHub Actions에서 생성한 파일)
# COPY .env.local /app/.env.local

# # 📝 .env.local 파일이 제대로 복사되었는지 확인
# RUN ls -la /app
# RUN cat /app/.env.local

# # 애플리케이션 파일 복사
# COPY . .

# 📝 환경 변수 로그 찍기
# RUN echo "NEXT_PUBLIC_SPRINGBOOT_URL=http://54.180.124.87"
# RUN echo "NEXT_PUBLIC_S3_URL=https://wannagobucket.s3.ap-northeast-2.amazonaws.com"
# RUN echo "NEXT_PUBLIC_WEBSOCKET_URL=http://54.180.124.87/ws"

# 애플리케이션 빌드
RUN npm run build

# 프로덕션 환경에서 서버 실행
CMD ["npm", "run", "start"]

# 컨테이너가 3000 포트를 리스닝하도록 설정
EXPOSE 3000
