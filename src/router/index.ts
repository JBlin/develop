import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ReMain',
    component: () => import('@/views/front/ReMain.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: () => import('@/views/front/ErrorPage.vue')
  },
  {
    path: '/tos',
    name: 'Tos',
    component: () => import('@/views/front/TermsOfService.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/front/PrivacyPolicy.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/components/signup/Layout.vue'),
    children: [
      {
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/signup/Login.vue')
      },
      {
        path: '/LoginKakao',
        name: 'LoginKakao',
        component: () => import('@/views/signup/LoginKakao.vue')
      },
      {
        path: '/LoginLink',
        name: 'LoginLink',
        component: () => import('@/views/signup/LoginLink.vue')
      },
      {
        path: '/LoginLinkKakao',
        name: 'LoginLinkKakao',
        component: () => import('@/views/signup/LoginLinkKakao.vue')
      },
      {
        path: '/SignUp',
        name: 'SignUp',
        component: () => import('@/views/signup/SignUp.vue')
      },
      {
        path: '/SignUpInfoManager',
        name: 'SignUpInfoManager',
        component: () => import('@/views/signup/SignUpInfoManager.vue')
      },
      {
        path: '/SignUpInfoUser',
        name: 'SignUpInfoUser',
        component: () => import('@/views/signup/SignUpInfoUser.vue')
      }
    ]
  },
  {
    path: '/pocket',
    name: 'pocket',
    component: () => import('@/components/main/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'Main',
        name: '대시보드',
        meta: { navTitle: '대시보드' },
        component: () => import('@/views/front/Main.vue')
      },
      {
        path: 'CorporateSearch',
        name: '법인 검색',
        meta: { navTitle: '법인등기' },
        component: () => import('@/views/corporate/CorporateSearch.vue')
      },
      {
        path: 'CorporateManagement',
        name: '법인 등기 관리',
        meta: { navTitle: '법인등기' },
        component: () => import('@/components/frame/TabLayout.vue')
      },
      {
        path: 'ExpirationAlarm',
        name: '임기만료 알림',
        meta: { navTitle: '법인등기' },
        component: () => import('@/views/corporate/ExpirationAlarm.vue')
      },
      {
        path: 'RealEstateSearch',
        name: '부동산 검색',
        meta: { navTitle: '부동산 등기' },
        component: () => import('@/views/realEstate/RealEstateSearch.vue')
      },
      {
        path: 'RealEstateManagement',
        name: '부동산 등기 관리',
        meta: { navTitle: '부동산 등기' },
        component: () => import('@/components/frame/TabLayout.vue')
      },
      {
        path: 'ChangeAlarm',
        name: '등기변동 알림',
        meta: { navTitle: '부동산 등기' },
        component: () => import('@/views/realEstate/ChangeAlarm.vue')
      },
      {
        path: 'PointManagement',
        name: '포인트관리',
        meta: { navTitle: '포인트관리' },
        component: () => import('@/views/point/PointManagement.vue')
      },
      {
        path: '/PointProcess',
        name: '포인트결제진행',
        component: () => import('@/views/point/PointProcess.vue')
      },
      {
        path: 'Notice',
        name: '공지사항',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/cs/Notice.vue')
      },
      {
        path: 'Notice/:id',
        name: '공지사항 상세내용',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/cs/NoticeDetail.vue'),
        props: true
      },
      {
        path: 'Faq',
        name: '자주묻는질문',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/cs/Faq.vue')
      },
      {
        path: 'Qna',
        name: '문의하기',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/cs/Qna.vue')
      },
      {
        path: 'Qna/:id',
        name: '문의하기 상세내용',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/cs/QnaDetail.vue'),
        props: true
      },
      {
        path: 'MyInfo',
        name: '내 정보관리',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/mypage/MyInfo.vue')
      },
      {
        path: 'TestCorpIssue',
        name: 'TestCorpIssue',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/TestCorpIssue.vue')
      },
      {
        path: 'TestEstateIssue',
        name: 'TestEstateIssue',
        meta: { navTitle: '고객센터' },
        component: () => import('@/views/TestEstateIssue.vue')
      }
    ]
  }
];
