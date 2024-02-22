<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <div class="logo-box">
          <img src="@/assets/images/pocket-logo.png" alt="로고" />
        </div>
        <router-link to="/" class="back-btn" v-if="hideBackBtn">
          돌아가기
        </router-link>
      </div>
      <ul class="gnb-ul">
        <li class="gnb-li" @click="scrollToSection(0)">주요 서비스</li>
        <li class="gnb-li" @click="scrollToSection(1)">특장점</li>
        <li class="gnb-li" @click="scrollToSection(2)">이용후기</li>
        <li class="gnb-li" @click="scrollToSection(3)">자주묻는질문</li>
      </ul>
      <div class="btn-box">
        <router-link to="/pocket/Main" class="btn login-btn"
          >시작하기</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const scrollToSection = (index: number): void => {
  const sectionId = `section${index + 1}`;
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const hideBackBtn = ref(false);

const router = useRouter();

watchEffect(() => {
  hideBackBtn.value = router.currentRoute.value.meta.hideBackBtn as boolean;
});
</script>

<style scoped lang="scss">
.logo-box {
  width: 180px;
}
</style>
