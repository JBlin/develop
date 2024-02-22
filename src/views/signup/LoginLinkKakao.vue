<template>
  <div>
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
</template>

<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { post } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import { isMobile, Log } from '@/util/common';
import {
  UUID_PERIOD_EXPIRES,
  STAFF_SIGNUP_1,
  STAFF_SIGNUP_2,
  STAFF_SIGNUP_3,
  STAFF_SIGNUP_4,
  STAFF_SIGNUP_5,
  KAKAO_NOACCOUNT
} from '@/util/message';

const route = useRoute();
const router = useRouter();
const currentPopup = ref('');
const userInfo = ref({});
const userStore = useUserStore();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

onMounted(() => {
  const code = route.query.code;
  if (code) {
    const url = `/user/login/link?code=${code}&uuid=${userStore.getUUID}`;
    post(url)
      .then((res) => {
        Log(res);
        const data = res.data.payload;
        userInfo.value = data;
        if (data.stateType == '1') {
          if (validation(data)) {
            showPopup('STAFF_SIGNUP_1', data);
          }
        } else if (data.stateType == '2') {
          showPopup('STAFF_SIGNUP_2', data);
        } else if (data.stateType == '3') {
          showPopup('STAFF_SIGNUP_3', data);
        } else if (data.stateType == '4') {
          showPopup('STAFF_SIGNUP_4');
        } else if (data.stateType == '5') {
          showPopup('STAFF_SIGNUP_5');
        }
      })
      .catch(() => {
        showPopup('UUID_PERIOD_EXPIRES');
      });
  }
});

const validation = (userInfo: any) => {
  // let msg: string = '카카오 회원정보를 확인해 주세요 (원인:';
  let count = 0;
  if (!userInfo.userName) {
    // msg = msg + '성명, ';
    count = count + 1;
  }
  if (!userInfo.userEmail) {
    // msg = msg + '이메일, ';
    count = count + 1;
  }
  if (!userInfo.userPhone) {
    // msg = msg + '핸드폰, ';
    count = count + 1;
  }
  // msg = msg + '누락)';
  if (count == 0) {
    return true;
  } else {
    showPopup('KAKAO_NOACCOUNT');
    return false;
  }
};

const login = (type: string) => {
  let device: string = '1';
  if (isMobile()) {
    device = '2';
  }
  const url = `/user/login/link/signup?type=${type}&device=${device}`;

  post(url, userInfo.value)
    .then((res) => {
      if (res.data.status == 200) {
        const data = res.data.payload;
        userStore.setUser(
          {
            userType: data.userType,
            email: data.userEmail,
            name: data.userName,
            presidentName: data.presidentName,
            businessNumber: data.businessNumber,
            businessName: data.businessName
          },
          data.userToken
        );
        router.push('/pocket/Main');
      } else {
        showPopup('UUID_PERIOD_EXPIRES');
      }
    })
    .catch(() => {
      showPopup('UUID_PERIOD_EXPIRES');
    });
};

//공통 팝업
const showPopup = (popName: string, data?: any) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'KAKAO_NOACCOUNT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: KAKAO_NOACCOUNT
      });
      break;
    case 'UUID_PERIOD_EXPIRES':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: UUID_PERIOD_EXPIRES
      });
      break;
    case 'STAFF_SIGNUP_1':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: STAFF_SIGNUP_1(data?.businessName)
      });
      break;
    case 'STAFF_SIGNUP_2':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: STAFF_SIGNUP_2(data?.businessName)
      });
      break;
    case 'STAFF_SIGNUP_3':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: STAFF_SIGNUP_3(data?.businessName, data?.userType)
      });
      break;
    case 'STAFF_SIGNUP_4':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: STAFF_SIGNUP_4
      });
      break;
    case 'STAFF_SIGNUP_5':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: STAFF_SIGNUP_5
      });
      break;
  }
};

//닫기 버튼
const closePopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/');
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/');
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  switch (currentPopup.value) {
    case 'STAFF_SIGNUP_1':
      login('1');
      break;
    case 'STAFF_SIGNUP_2':
      login('2');
      break;
    case 'STAFF_SIGNUP_3':
      login('3');
      break;
    default:
      router.push('/');
      break;
  }
  currentPopup.value = '';
};
</script>
<style lang="scss" scoped></style>
