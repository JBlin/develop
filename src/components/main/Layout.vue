<template>
  <Header></Header>
  <div class="pocket-wrap">
    <div class="pocket-contents">
      <div class="pocket-contents-header">
        <router-link to="/pocket/Main">
          <span class="pokcet-contents-header-route-text home">
            <img src="@/assets/images/home.svg" alt="홈" />
          </span>
        </router-link>
        <img
          src="@/assets/images/route-arrow.svg"
          alt="화살표 아이콘"
          v-if="route.currentRoute.value.name !== '대시보드'"
        />
        <span
          class="pocket-contents-header-route-text route-li state-title"
          v-if="route.currentRoute.value.name !== '대시보드'"
        >
          {{ navTitle }}
        </span>
        <img src="@/assets/images/route-arrow.svg" alt="화살표 아이콘" />
        <span
          class="pocket-contents-header-route-text route-sub-li state-sub-title"
        >
          {{ route.currentRoute.value.name }}
        </span>
      </div>
      <div
        :class="{
          'pocket-contents-body':
            currentRoutePath !== '/pocket/Main' &&
            currentRoutePath !== '/pocket/Qna'
        }"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!--footer 필요시 주석삭제-->
  <!-- <Footer></Footer> -->
</template>

<script setup lang="ts">
import { ref, watchEffect, onBeforeUpdate, onBeforeMount } from 'vue';
import Header from '@/components/main/Header.vue';
// import Footer from '@/components/main/Footer.vue';
import { useRouter } from 'vue-router';
import { useNavStore } from '@/stores/nav.store';
const nav = useNavStore();
const route = useRouter();
const navTitle = ref('');
const currentRoutePath = ref('');

watchEffect(() => {
  currentRoutePath.value = route.currentRoute.value.path;
});

onBeforeMount(() => {
  navTitle.value = nav.getNav.navTitle ?? '';
});

onBeforeUpdate(() => {
  navTitle.value = nav.getNav.navTitle ?? '';
});
</script>

<style lang="scss" scoped>
.pocket-wrap {
  padding-top: 90px;
  background-color: #f8f9fb;
  width: 100%;
  height: 100%;
  transition: 0.4s ease;
  min-height: 100vh;
  padding-bottom: 30px;

  .pocket-contents {
    max-width: 1260px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-header {
      display: flex;
      align-items: center;
      transition: 0.3s ease;
      height: 18px;

      &-route-text {
        color: #5e6066;
        font-size: 14px;
        font-weight: 500;

        &.state-sub-title {
          color: #36363d;
        }
      }

      .home {
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 1024px) {
  .user-menu {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding: 0 20px;
    background-color: #fff;
    height: 55px;
    flex-direction: row-reverse;
    justify-content: space-between;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #e0e0e0;

    * {
      color: #1f2935;
    }
  }

  .pocket-wrap {
    padding-top: 125px;
  }

  .pc-my-page {
    display: none;
  }
}

@media (max-width: 768px) {
  .pocket-header .user-menu .user-point-box .user-point-text {
    display: none;
  }

  .pocket-wrap {
    padding-top: 110px;
  }
}
</style>
