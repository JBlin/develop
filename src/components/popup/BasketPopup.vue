<template>
  <div class="pop-bg">
    <div class="basket-box">
      <div class="icon">
        <img src="@/assets/images/basket.svg" alt="" />
      </div>
      <div class="basket-box-title-box">
        <span class="basket-box-title"> 장바구니 담기 </span>

        <span
          class="basket-box-sub-title"
          v-if="route.path == '/pocket/CorporateSearch'"
        >
          선택하신 법인이(등기가)<br />
          장바구니에 담겼어요.
        </span>
        <span
          class="basket-box-sub-title"
          v-if="route.path == '/pocket/RealEstateSearch'"
        >
          선택하신 부동산이(등기가)<br />
          장바구니에 담겼어요.
        </span>
      </div>
      <div class="btn-box">
        <button class="round-btn w" @click="routeToBasket">
          장바구니 이동
        </button>
        <button class="round-btn black" @click="closeBasketModal">
          더 추가하기
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { closeBasket } = defineProps(['closeBasket']);

const closeBasketModal = () => {
  closeBasket();
};

const routeToBasket = () => {
  const currentPath = route.path;
  switch (currentPath) {
    case '/pocket/CorporateSearch':
      router.push({ path: '/pocket/CorporateManagement' }); //법원 등기 장바구니
      break;
    case '/pocket/RealEstateSearch':
      router.push({ path: '/pocket/RealEstateManagement' }); //부동산 등기 장바구니
      break;
  }
};
</script>
<style lang="scss" scoped>
.pop-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);

  .basket-box {
    max-width: 360px;
    width: 100%;
    background-color: #fff;
    padding: 30px;
    display: flex;
    border: 1px solid #e0e0e0;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;

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

    .btn-box {
      width: 100%;
      justify-content: center;
    }

    .round-btn {
      flex: 1;
    }
  }
}
</style>
