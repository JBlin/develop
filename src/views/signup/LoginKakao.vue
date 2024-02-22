<template>
  <div>
    <div class="login-box">
      <div>로그인 중입니다. 잠시만 기다려 주세요...</div>
      <component
        v-for="(popup, index) in activePopups"
        :is="popup.component"
        :key="index"
        :content="popup.content"
        @close="closePopup"
        @cancel="cancelPopup"
        @confirm="confirmPopup"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { post } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import { isMobile, Log } from '@/util/common';
import { LOGIN_FAIL } from '@/util/message';
const route = useRoute();
const router = useRouter();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

onMounted(() => {
  const code = route.query.code;
  const userStore = useUserStore();
  let device: string = '1';
  if (isMobile()) {
    device = '2';
  }

  if (code) {
    const url = `/user/login?code=${code}&device=${device}`;
    post(url)
      .then((res) => {
        if (res.data.status == 200) {
          const data = res.data.payload;
          Log(data);
          userStore.setUser(
            {
              snsId: data.snsId,
              snsAuthToken: data.snsAuthToken,
              userType: data.userType,
              email: data.userEmail,
              name: data.userName,
              phone: data.userPhone,
              point: data.totPoint,
              presidentName: data.presidentName,
              businessNumber: data.businessNumber,
              businessName: data.businessName
            },
            data.userToken
          );
          if (data.userToken) {
            router.push('/pocket/Main');
          } else {
            router.push('/Signup');
          }
        } else {
          showPopup('LOGIN_FAIL');
        }
      })
      .catch((error) => {
        Log('에러', error);
        showPopup('LOGIN_FAIL');
      });
  }
});

//공통 팝업
const showPopup = (popName: string) => {
  switch (popName) {
    case 'LOGIN_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: LOGIN_FAIL
      });
      break;
  }
};

//닫기 버튼
const closePopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/Login');
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/Login');
};
</script>
<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
