<template>
  <div class="back">
    <div class="popup-box" :class="detailShowClass">
      <div class="popup-header">
        <span class="popup-header-title">
          {{ props.title }}

          <span
            v-show="props.type == '1' ? true : false"
            class="state-circle blue ml"
            @click="openSample"
            >샘플 다운로드</span
          >
        </span>

        <button class="popup-close" @click="closePopup">
          <img src="@/assets/images/close-x.svg" alt="닫기버튼" />
        </button>
      </div>
      <div class="popup-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { isMobile } from '@/util/common';
interface Props {
  title?: string;
  type?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  type: ''
});

const detailShowClass = computed(() => {
  // 모바일일 경우 확인
  const isMobileDevice = isMobile();
  const cssClass = isMobileDevice
    ? ''
    : props.type == '1'
    ? ''
    : 'type-two-popup';
  return cssClass;
});

const emit = defineEmits<{ (e: 'close'): void; (e: 'sample'): void }>();
const closePopup = () => {
  emit('close');
};

const openSample = () => {
  emit('sample');
};
</script>

<style scoped lang="scss">
.back {
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 153;
  height: 100vh;
  padding: 0 20px;
}

.popup {
  &-box {
    overflow: auto;
    position: absolute;
    max-width: calc(100% - 20px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
      0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-width: 80%;
    max-height: 80%;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eef1f6;
    height: 50px;
    padding: 0 20px;
  }

  &-body {
    padding: 20px 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 200px;
    overflow: auto;
  }
}
.detail-popup {
  max-width: 80%;
  min-width: 80%;
  width: 80%;
  max-height: 80%;
  min-height: 80%;
  height: 80%;
}
.type-two-popup {
  max-width: 65%;
  min-width: 65%;
  width: 65%;
  max-height: 50%;
  min-height: 50%;
  height: 50%;
}
.ml {
  margin-left: 10px;
}
</style>
