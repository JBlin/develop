<template>
  <div class="login">
    <div class="contents-title-box">
      <div>
        <div class="basket-box">
          <div class="icon">
            <img src="@/assets/images/airplane.svg" alt="" />
          </div>
          <div class="basket-box-title-box">
            <span class="basket-box-title"> 등기데이터에 초대되었습니다. </span>
            <span class="basket-box-sub-title">
              {{ nameRef }}님이 귀하를 <br />등기데이터 서비스에 초대했습니다.
              <br />등기데이터에서 제공하는 다양한 등기서비스를 <br />편리하게
              이용해보세요!
            </span>
          </div>
        </div>
      </div>
    </div>
    <button class="kakao-login-btn" @click="login()">
      <img src="@/assets/images/kakao.svg" alt="카카오" />
      카카오계정으로 로그인
    </button>

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
import { KAKAO } from '@/util/constants';
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { post } from '@/util/service/request';
import { ERROR_500, UUID_PERIOD_EXPIRES } from '@/util/message';
import { Log } from '@/util/common';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const nameRef = ref('');

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

onMounted(() => {
  checkUUID();
});

const checkUUID = () => {
  const uuid = route.query.uuid;
  if (uuid) {
    const url = `/user/login/linkCheck?uuid=${uuid}`;
    post(url, {})
      .then((res) => {
        if (res.data.errorCode == 'SUCCESS') {
          nameRef.value = res.data.payload.userName;
        } else {
          showPopup('UUID_PERIOD_EXPIRES');
        }
      })
      .catch((error) => {
        Log(error);
        showPopup('ERROR_500');
      });
  }
};

const login = () => {
  const uuid = route.query.uuid;
  if (uuid) {
    userStore.setUUID(String(uuid));
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO.rest_api}&redirect_uri=${KAKAO.redirect_uri_link}`;
  } else {
    showPopup('UUID_PERIOD_EXPIRES');
  }
};

//공통 팝업
const showPopup = (popName: string) => {
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'UUID_PERIOD_EXPIRES':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: UUID_PERIOD_EXPIRES
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
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/');
};
</script>

<style lang="scss" scoped>
.login {
  padding-top: 130px !important;
  // justify-content: center;
  // display: flex;
  flex-direction: column;
  align-items: center;

  // background-color: #000;
  .contents {
    display: flex;
    justify-content: center;

    &-title {
      &-box {
        align-items: center;

        .logo-box {
          margin-bottom: 10px;
        }
      }
    }
  }

  .kakao-login-btn {
    height: 100px;
    border-radius: 12px;
    background-color: #ffe500;
    width: 510px;
    margin-bottom: 50px;
    gap: 7px;
    font-size: 20px;
    font-weight: 500;
  }

  .kakao-sign-up {
    text-decoration: underline;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.6;
    text-underline-offset: 4px;
    color: #36363d;
  }
  .contents-title-box {
    margin-bottom: 0px;
  }
}

@media (max-width: 768px) {
  .login {
    width: 100%;

    .contents {
      &-text {
        font-size: 14px;
      }
    }

    .kakao-login-btn {
      // width: 100%;
      height: 80px;
      font-size: 18px;
    }
  }
}

.basket-box {
  min-width: 360px;
  max-width: 360px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e0f2fe;
  }

  &-title-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  &-title {
    font-size: 20px;
    font-weight: 700;
  }

  &-sub-title {
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    color: #36363d;
    line-height: 1.4;
  }
}
</style>
