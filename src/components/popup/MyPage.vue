<template>
  <div class="my-page-box">
    <span class="my-info">
      <div class="name">{{ userStore.getUser.name }}</div>
      <div class="email">{{ userStore.getUser.email }}</div>
    </span>
    <span class="my-info">
      <div class="user-point-box">
        <img src="@/assets/images/coin.svg" alt="동전" />
        <span class="user-point-text">보유 포인트</span>
        <span class="user-point"> {{ addCommas(totalPoint) }} P </span>
      </div>
    </span>
    <div class="btn-box">
      <router-link
        to="/pocket/MyInfo?activeTab=1"
        class="round-btn w"
        @click="closeMyPage"
      >
        <img src="@/assets/images/human.svg" alt="아이콘" />
        내정보관리
      </router-link>
      <button class="round-btn w" @click="loginOut()">
        <img src="@/assets/images/logout.svg" alt="아이콘" />
        로그아웃
      </button>
    </div>

    <div v-if="userStore.getUser.businessNumber">
      <div class="com-info">
        <span class="com-title"> 회사정보 </span>
        <div class="com-li">
          <span class="com-text">상호명</span>
          <span class="com-name">{{ userStore.getUser.businessName }}</span>
        </div>
        <div class="com-li">
          <span class="com-text">사업자등록번호</span>
          <span class="com-name">{{ userStore.getUser.businessNumber }}</span>
        </div>
      </div>

      <router-link
        to="/pocket/MyInfo?activeTab=2"
        class="user-invite"
        @click="closeMyPage"
        v-if="userStore.getUser.userType == '2'"
      >
        <img src="@/assets/images/invite.svg" alt="아이콘" />
        이용자 초대
      </router-link>
    </div>
    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :key="index"
      :content="popup.content"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'vue-router';
import { isMobile, Log } from '@/util/common';
import { post, get } from '@/util/service/request';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, shallowRef } from 'vue';
import { addCommas } from '@/util/number';
import { ERROR_500 } from '@/util/message';
const { closeMyPage } = defineProps(['closeMyPage']);
const router = useRouter();
const userStore = useUserStore();
const totalPoint = ref(0);
const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const loginOut = () => {
  let device: string = '1';
  if (isMobile()) {
    device = '2';
  }
  const url = `/user/login/out?device=${device}&userType=${userStore.getUser.userType}`;
  post(url, {}, userStore.getToken)
    .then((res) => {
      Log('res', res);
      userStore.resetUser();
      router.push({ path: '/' });
    })
    .catch((error) => {
      Log('error', error);
      userStore.resetUser();
      router.push({ path: '/' });
    });
};

const getTotPoints = async () => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/point?userType=${userType}`;
  const userToken = userStore.getToken;
  get(url_info, '', userToken)
    .then((_response) => {
      totalPoint.value = _response.data.payload.totPoint;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

defineExpose({ getTotPoints });

const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
  }
};

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
};
</script>
<style lang="scss" scoped>
.my-page-box {
  border-radius: 4px;
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 360px;
  color: #000;

  * {
    font-size: 14px;
  }

  .my-info {
    display: flex;
    gap: 10px;
    line-height: 36px;

    .name {
      font-size: 16px;
      font-weight: 700;
    }

    .email {
      color: #73777a;
    }
  }

  .btn-box {
    gap: 6px;

    .round-btn {
      gap: 6px;
      height: 39px;
      max-width: 150px;
      flex: 1;
    }
  }

  .com {
    &-info {
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }

    &-title {
      line-height: 30px;
      font-size: 15px;
      font-weight: 600;
    }

    &-li {
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-weight: 500;
    }

    &-text {
      color: #73777a;
    }
  }

  .user-invite {
    cursor: pointer;
    display: flex;
    gap: 4px;
    color: #174bdd;
    padding: 5px 0;
  }
  .user-point-box {
    display: flex;
    align-items: center;
    gap: 3px;
    background-color: #e9efff;
    color: #000;
    padding: 0px 10px;
    height: 32px;
    border-radius: 22px;
    font-size: 14px;

    .user-point {
      font-weight: 700;
    }
  }
}
</style>
