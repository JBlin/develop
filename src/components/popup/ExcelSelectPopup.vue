<template>
  <div class="window">
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="excel-popup">
        <div class="popup-body-header">
          <span class="popup-body-header-title"
            >저장할 엑셀 종류 선택하세요.</span
          >
        </div>

        <div class="input-box">
          <div class="input-check-box-group">
            <label class="input-check-box">
              <input
                type="radio"
                name="viewpopup"
                value="1"
                v-model="radioRangeValue"
              />
              <span class="custom-radio"></span>
              목록
            </label>
            <label class="input-check-box">
              <input
                type="radio"
                name="viewpopup"
                value="2"
                v-model="radioRangeValue"
              />
              <span class="custom-radio"></span>
              등기상세
            </label>
          </div>
        </div>

        <div class="btn-box">
          <button class="round-btn w w-auto black" @click="choose()">
            <img src="@/assets/images/download.svg" alt="다운로드" />
            엑셀 다운로드
          </button>
        </div>
      </div>
    </LayoutPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';

const popupTitle = '엑셀 다운로드';
const radioRangeValue = ref('1');

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'choose:value', value: string): void;
}>();

const closePopup = () => {
  emit('close');
};

const choose = () => {
  emit('choose:value', radioRangeValue.value);
};
</script>

<style lang="scss" scoped>
.window {
  min-width: 100%;
}

.excel-popup {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    padding: 5px;
  }
  div {
    padding: 7px;
  }
  @media (max-width: 768px) {
    * {
      font-size: 16px;
    }
  }
}
</style>
