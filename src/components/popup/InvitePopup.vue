<template>
  <div class="pop-bg">
    <div class="basket-box">
      <div class="icon">
        <img src="@/assets/images/basket.svg" alt="" />
      </div>
      <div class="basket-box-title-box">
        <span class="basket-box-title"> 초대 링크 복사 완료 </span>
        <span class="basket-box-sub-title">
          등기데이터를 함께하고 싶은 직원에게<br />
          공유해 보세요.
        </span>
      </div>
      <div class="btn-box">
        <button class="round-btn black" @click="toggleInvitePopup">확인</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { toggleInvitePopup } = defineProps(['toggleInvitePopup']);
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
    }
  }
}
</style>
