<template>
  <div class="login">
    <div class="contents-title-box">
      <span class="contents-title">회원가입</span>
      <span class="contents-sub-title">카카오로 1초만에 빠른 회원가입</span>
      <span class="contents-text">회원가입 유형을 선택해주세요.</span>
    </div>
    <div class="login-route">
      <div class="login-per login-route-box" @click="signup('individual')">
        <span class="login-route-sub-title"> 19세 이상 일반 </span>
        <span class="login-route-title"> 개인 회원가입 </span>
        <span class="login-route-img">
          <img src="@/assets/images/login-per.svg" alt="로그인 아이콘" />
        </span>
        <span class="login-route-text">
          아이디와 비밀번호 없이<br />
          카카오로 1초만에 로그인하세요.
        </span>
      </div>

      <div class="login-com login-route-box" @click="signup('company')">
        <span class="login-route-sub-title"> 개인 및 법인사업자 </span>
        <span class="login-route-title"> 사업자 회원가입 </span>
        <span class="login-route-img">
          <img src="@/assets/images/login-com.svg" alt="로그인 아이콘" />
        </span>
        <span class="login-route-text">
          카카오 계정 공유할 필요없이<br />
          담당자를 추가하여<br />
          서비스를 이용하실 수 있어요.
        </span>
      </div>
    </div>
  </div>
  <component
    v-for="(popup, index) in activePopups"
    :is="popup.component"
    :key="index"
    :content="popup.content"
    @close="closePopup"
    @cancel="cancelPopup"
    @confirm="confirmPopup"
  />
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { post } from '@/util/service/request';
import { isMobile, Log } from '@/util/common';
import { LOGIN_FAIL, CUSTOM_ONE } from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';
const router = useRouter();
const userStore = useUserStore();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}
const signup = (type: string) => {
  const userInfo = userStore.getUser;
  let device: string = '1';
  if (isMobile()) {
    device = '2';
  }

  // //카카오 로그인 검증을 위해서 페이지 이동 부분 추가 나중에 수정이 필요합니다.
  // if (type === 'individual') {
  //   router.push({ path: '/SignUpInfoUser' });
  // } else {
  //   router.push({ path: '/SignUpInfoManager' });
  // }

  if (validation(userInfo)) {
    if (type === 'individual') {
      const url = `/user/login/signup?device=${device}`;
      const params = {
        snsId: userInfo.snsId,
        snsAuthToken: userInfo.snsAuthToken,
        userEmail: userInfo.email,
        userType: String(1),
        userName: userInfo.name,
        userPhone: userInfo.phone
      };

      post(url, params)
        .then((res) => {
          if (res.data.status == 200) {
            const data = res.data.payload;
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
            router.push('/pocket/Main');
          } else {
            showPopup('LOGIN_FAIL');
          }
        })
        .catch((error) => {
          Log('에러', error);
          showPopup('LOGIN_FAIL');
        });
    } else {
      router.push({ path: '/SignUpInfoManager' });
    }
  }
};

const validation = (userInfo: any) => {
  let msg = '카카오 회원정보를 확인해 주세요 (원인:';
  let count = 0;
  if (!userInfo.name) {
    msg = msg + '성명, ';
    count = count + 1;
  }
  if (!userInfo.email) {
    msg = msg + '이메일, ';
    count = count + 1;
  }
  if (!userInfo.phone) {
    msg = msg + '핸드폰, ';
    count = count + 1;
  }
  msg = msg + '누락)';
  Log(msg);
  if (count == 0) {
    return true;
  }
  showPopup(
    'CUSTOM_ONE',
    '카카오톡을 사용하는 계정이 아닙니다. 다른 계정으로 가입해 주세요.'
  );
  return false;
};

//공통 팝업
const showPopup = (popName: string, msg?: string) => {
  switch (popName) {
    case 'LOGIN_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: LOGIN_FAIL
      });
      break;
    case 'CUSTOM_ONE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CUSTOM_ONE(msg)
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
.step {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
}

.login {
  padding-top: 165px;
  // justify-content: center;
  display: flex;
  flex-direction: column;

  // background-color: #000;
  .contents {
    &-title {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.6;
      color: #004282;
      gap: 5px;

      &-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 80px;
      }
    }

    &-sub-title {
      font-size: 40px;
      font-weight: 700;
      line-height: 1.2;
    }

    &-text {
      font-size: 20px;
      line-height: 1.6;
    }
  }

  &-route {
    display: flex;
    gap: 30px;

    &-box {
      background-color: #fff;
      padding: 50px 0;
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      border: 1px solid #e0e0e0;
      cursor: pointer;

      &:hover {
        border-color: #36bffa;
        background-color: #f0f9ff;
        box-shadow: 4px 8px 24px 6px rgba(0, 0, 0, 0.07);
      }
    }

    &-sub-title {
      color: #36bffa;
      line-height: 1.6;
      margin-bottom: 5px;
    }

    &-title {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.2;
    }

    &-img {
      margin: 25px 0;
    }

    &-text {
      text-align: center;
      line-height: 1.3;
      flex: 1;
      display: flex;
      align-items: flex-end;
    }
  }
}

@media (max-width: 768px) {
  .login {
    .contents {
      &-title {
        font-size: 14px;
        gap: 5px;

        &-box {
          margin-bottom: 30px;
        }
      }

      &-sub-title {
        font-size: 24px;
      }

      &-text {
        font-size: 15px;
      }
    }

    &-route {
      gap: 20px;
      flex-direction: column;

      &-box {
        background-color: #fff;
        padding: 30px 0;
        width: 100%;
        border: 1px solid #e0e0e0;
        cursor: pointer;
      }

      &-sub-title {
        font-size: 14px;
        margin-bottom: 3px;
      }

      &-title {
        font-size: 24px;
        margin-bottom: 10px;
      }

      &-img {
        display: none;
      }

      &-text {
        font-size: 15px;
      }
    }
  }
}
</style>
