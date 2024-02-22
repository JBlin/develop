<template>
  <div class="pop-bg">
    <div class="alert-box">
      <div class="alert-box-title-box">
        <span class="alert-box-title">
          {{ props.content.title ? props.content.title : '알림' }}
        </span>
      </div>
      <div class="btn-box" v-if="!props.content.buttonType">
        <button class="round-btn w" @click="emit('confirm')">
          {{ props.content.confirm ? props.content.confirm : '확인' }}
        </button>
        <button class="round-btn black" @click="emit('cancel')">
          {{ props.content.cancel ? props.content.cancel : '취소' }}
        </button>
      </div>

      <div class="btn-box" v-if="props.content.buttonType">
        <button class="round-btn black" @click="emit('confirm')">
          {{ props.content.confirm ? props.content.confirm : '확인' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
buttonType :
  false 선택버튼 두개, true 선택버튼 한개
  defaultValue 는 선택버튼 두개
title :
  alert 창 안내 내용을 말한다.
  defaultValue 는 '알람'
confirm :
  확인버튼을 text를 변경할 수 있다.
  defaultValue 는 '확인'
cancel :
  취소버튼을 text를 변경할 수 있다.
  defaultValue 는 '취소'
*/

interface Props {
  buttonType?: boolean;
  title?: string;
  confirm?: string;
  cancel?: string;
}
const props = defineProps<{ content: Props }>();

const emit = defineEmits<{ (e: 'cancel'): void; (e: 'confirm'): void }>();
</script>

<style lang="scss" scoped>
.pop-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 300;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);

  .alert-box {
    max-width: 360px;
    width: 100%;
    background-color: #fff;
    padding: 30px;
    display: flex;
    border: 1px solid #e0e0e0;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    white-space: pre-wrap;
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
      text-align: center;
      line-height: 1;
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
