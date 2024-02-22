<template>
  <div class="pop-bg">
    <div class="basket-box">
      <div class="icon">
        <img src="@/assets/images/basket.svg" alt="" />
      </div>
      <div class="basket-box-title-box">
        <span class="basket-box-title"> 정말 탈퇴하시겠습니까? </span>
        <span class="basket-box-sub-title">
          탈퇴하실 경우, 포인트 및 모든 정보가 삭제되며<br />
          복구되지 않습니다.
        </span>
      </div>
      <div class="btn-box">
        <button class="round-btn w" @click="emit('cancel')">아니오</button>
        <button class="round-btn black" @click="emit('confirm')">
          네, 탈퇴하겠습니다.
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{ (e: 'cancel'): void; (e: 'confirm'): void }>();
</script>
<style lang="scss" scoped>
.pop-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
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
      line-height: 36px;
    }
  }
}
</style>
