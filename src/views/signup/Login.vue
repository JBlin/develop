<template>
  <div class="login">
    <div class="contents-title-box">
      <div class="logo-box pointer">
        <img src="@/assets/images/pocket-logo.png" alt="로고" @click="logo()" />
      </div>
      <span class="contents-text"
        >카카오계정 하나로 서비스를 편리하게 이용해 보세요!</span
      >
    </div>
    <button class="kakao-login-btn" @click="login()">
      <img src="@/assets/images/kakao.svg" alt="카카오" />
      카카오계정으로 로그인
    </button>
  </div>
</template>

<script lang="ts" setup>
import { KAKAO } from '@/util/constants';
import { useRouter } from 'vue-router';
const router = useRouter();
const login = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO.rest_api}&redirect_uri=${KAKAO.redirect_uri}`;
};

const logo = () => {
  //window.location.href = `https://www.irosdata.com`;
  router.push({ path: '/' });
};
</script>

<style lang="scss" scoped>
.logo-box {
  max-width: 230px;
  width: 100%;
}
.pointer {
  cursor: pointer;
}
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
      width: 100%;
      height: 80px;
      font-size: 18px;
    }
  }
}
</style>
