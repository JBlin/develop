import { post } from '@/util/service/request';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user.store';

/**
 * 사용자 인증
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    pwLength: 20 // 비밀번호 변경 길이
  }),
  actions: {
    /** 사용자 로그인 (A_AUTH_001) **/
    async login(userId: string, userPs: string) {
      try {
        const userCd = userId.split('@')[0];
        const projCd = userId.split('@')[1];
        const response = await post('api/v1/auth/login', {
          userId,
          userPs,
          projCd: projCd,
          actionParams: {
            projCd: projCd,
            actPh: '/login',
            actCd: '로그인',
            fnCd: '1',
            ip: import.meta.env.VUE_APP_API_PARAMS_IP || '1.1.1.1',
            actUserId: userCd,
            runDate: new Date().toISOString(),
            param: ''
          }
        });

        if (response.data.code === 'OK') {
          // 로그인 데이터 처리
          const userStore = useUserStore();
          userStore.setUser(response.data.data, response.data.userId);
          // userStore.useSoft = useSoft;
        } else if (response.data.code === 'PWDCHG') {
          // 비밀번호 변경
          const message = response.data.data.value;
          const pwLength = message.split('_')[2];
          this.pwLength = pwLength;
        }
        return response.data.code;
      } catch (error) {}
    }
  }
});
