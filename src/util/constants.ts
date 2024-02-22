/*
 * 카카오
 */
const KAKAO = {
  native: 'cd32531dd425e9dcd2d8e6d757c236ee',
  rest_api: 'fbe34683e26854d3a1a6e5eaf4dd2ca1',
  javascript: 'ed51bb0a82d9bb84466839a9bdce0fa0',
  admin: '5fef8fe545d4acb509accdc3515d12cf',
  redirect_uri: import.meta.env.VITE_KAKAO_LOGIN_REDIRECT,
  redirect_uri_link: import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_LINK
};

/*
 * 토스 페이먼츠
 */
const TOSS_PAYMENTS = {
  client_key: import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY
};

export { KAKAO, TOSS_PAYMENTS };
