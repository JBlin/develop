## 프로젝트 개요 
등기데이터 사용자 프론트 엔드 코드이다. 해당 프로젝트는 비즈비에서 제작을 의뢰했으며, Hyper-link에서 제작한다. 

## License
Apache-2.0 Licensed | Copyright © 2021-present Gery Hirschfeld & Contributors


### 담당자 연락처 
- 김호성 상무                  : 010-9928-8115
- 윤종경 PM                   : 010-3681-7537
- 심현섭 수석                  : 010-8937-4544
- 양봉현 선임(풀스택)           : 010-9154-1702
- 김소라 선임(풀스택)           : 010-2367-9992


## Plugins
- Router: [Vue Router](https://next.router.vuejs.org/)
- State Management: [Pinia](https://pinia.vuejs.org/)
- Form Validation: [VeeValidate](https://vee-validate.logaretm.com/v4/)
- Internationalization: [Vue i18n](https://vue-i18n.intlify.dev/)
- Http client: [Axios](https://www.npmjs.com/package/axios)
- Formatting: [Prettier](https://prettier.io/)


## Getting started
최초 라이브 러리 다운로드

```bash

npm install
```

러이브 러리 다운로드 이후 해당 프로그램 시작
```bash
npm run dev
```

The development sever runs at `http://localhost:3000/`.


Build the application for production release. The builded application will be in the `dist` folder.

```bash
npm run build:dev or npm run build:prod  (dev와 product 로 나뉘어 처리)
```


## 프로젝트 Tree (될수 있으면 해당 프로젝트의 컨벤션을 준수 해주었으면 합니다.)
```
- metam-vue 
├── build                             vite 빌드시 처리되는 설정 파일 
├── dist                              빌드 출력 export 파일
├── nginx                             Dev Server Docker 를 위한 Nginx설정 
├── public                            이미지, 기타 public 리소스 
├── src                               이미지, 기타 public 리소스 
│   ├── assets                        기본 Asset폴더     
│   ├── components                    Vue에서 사용하는 Component들을 모아 놓는곳     
│   ├── locales                       다국어 지원 언어문자열 저장소     
│   ├── models                        Typescript를 사용한다면 해당 부분에 모델 저장     
│   ├── plugins                       플러그인 처리   
│   ├── router                        Router처리   
│   ├── stores                        저장소 (Pinia 기반) 처리, 통신 서비스 처리
│   ├── util                          통신모듈, 상수 처리, 필터, 정규식 등등 유틸
│   └── views                         View Component모음
├── App.vue                           최초 실행 View
├── main.ts                           최초 설정 main
├── env.*                             dev, prod, local 설정 dotenv
├── docker-compose.yml                
├── Dockerfile                        Dev 설정을 위한 처리
├── index.html                        최초 실행 index.html
├── package.json                      설정 파일
└── vite.config.ts                    vite빌드를 위한 파일

```

--- 

### 프로젝트 공통 모듈 (중요)
1. 정규식 한곳에 모아 파편화를 방지 
  - `src/util/regex.ts` : 해당 파일에서 정규식의 상수를 가져와 처리

2. HTTP 공통 모듈 (해당 부분은 통신 사전 처리와 사후처리가 공통으로 있기에 해당 모듈로 통신)  
  - `src/util/service.ts` 에 해당 부분 구현되어 있음 
  - 해당 부분으로 Http통신 처리함

3. 모바일, PC 구분
  - import { isMobile } from '@/util/common'; 상단에 선언.
  - if (isMobile()) {
      //모바일 
    }else{
      //PC 
    }
---
