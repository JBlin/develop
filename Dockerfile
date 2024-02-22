FROM node:18-alpine as builder
RUN apk update

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install --force
RUN npm run build:dev

FROM nginx:1.22.0
RUN apt-get update -y
# docker 내에서 image경로 생성 
RUN mkdir -p /keys
# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /app/dist /usr/share/nginx/html
