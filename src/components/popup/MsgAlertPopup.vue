<template>
  <div class="pop-bg">
    <div class="basket-box">
      <div
        class="icon"
        :style="{
          backgroundColor: props.content.imgColor
            ? props.content.imgColor
            : '#e0f2fe'
        }"
      >
        <img
          :src="
            props.content.img
              ? `${proxy?._assets}${props.content.img}`
              : `${proxy?._assets}images/basket.svg`
          "
          alt=""
        />
      </div>
      <div class="basket-box-title-box">
        <span class="basket-box-title">
          {{ props.content.title ? props.content.title : '알림' }}
        </span>
        <div class="basket-box-sub-title">
          {{ props.content.text ? props.content.text : '' }}
        </div>
      </div>
      <div class="btn-box" v-if="!props.content.buttonType">
        <button class="round-btn w" @click="emit('cancel')">
          {{ props.content.cancel ? props.content.cancel : '취소' }}
        </button>
        <button class="round-btn black" @click="emit('confirm')">
          {{ props.content.confirm ? props.content.confirm : '확인' }}
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
<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue';

const proxy = ref();
const instance = getCurrentInstance();
if (instance !== null) {
  proxy.value = instance.proxy;
}

/*
buttonType :
  false 선택버튼 두개, true 선택버튼 한개
  defaultValue 는 선택버튼 두개
title :
  alert 창 안내 제목을 말한다.
  defaultValue 는 '알람'
text :
  alert 창 안내 내용을 말한다.
  defaultValue 는 ''
confirm :
  확인버튼을 text를 변경할 수 있다.
  defaultValue 는 '확인'
cancel :
  취소버튼을 text를 변경할 수 있다.
  defaultValue 는 '취소'
img :
  상단 아이콘 이미지를 변경할 수 있다.
  EX) '/images/basket.svg'
  defaultValue 는 '@/assets/images/basket.svg'
imgColor :
  상단 아이콘 백그라운드를 변경할 수 있다.
  EX) '#000000'
  defaultValue 는 '#e0f2fe'
*/

interface Props {
  buttonType?: boolean; //false 선택버튼 두개, true 선택버튼 한개
  title?: string;
  text?: string;
  confirm?: string;
  cancel?: string;
  img?: string;
  imgColor?: string;
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
    }
    .blue {
      background-color: #e0f2fe;
    }

    .red {
      background-color: #ff0000;
    }

    &-title-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
      text-align: center;
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
