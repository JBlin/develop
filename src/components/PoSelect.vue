<template>
  <button
    class="select_type_pocket"
    :class="{ on: state }"
    @click="toggleDropdown"
    ref="buttonRef"
  >
    <span>
      <slot></slot>
    </span>
    <img src="@/assets/images/select-btn.svg" alt="down" class="select-arrow" />
    <ul v-if="state" ref="ulRef">
      <li
        v-for="(option, index) in props.options"
        @click="optionClick(option, index)"
        :class="{ active: option === selectedOption }"
        :key="index"
      >
        {{ option }}
      </li>
    </ul>
    <!-- arrow-down-b -->
    <!-- icon-arrow-up-b -->
  </button>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const state = ref(false);
const selectedOption = ref(); // Keep track of the selected option
const props = defineProps<{ options: string[] }>();
const emit = defineEmits<{ (e: 'optionChange:option', option: any): void }>();

const buttonRef = ref<HTMLElement | null>(null);
const ulRef = ref<HTMLElement | null>(null);

function optionClick(option: string, index: number) {
  selectedOption.value = option; // Update the selected option
  const json = { option: option, index: index + 1 }; // index 값은 1부터 시작
  emit('optionChange:option', json);
}

const toggleDropdown = () => {
  state.value = !state.value;
};

onMounted(() => {
  if (props.options.length > 0) {
    selectedOption.value = props.options[0];
  }

  // buttonRef.value = buttonRef.value;
  // ulRef.value = ulRef.value;

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: Event) => {
  const buttonElement = buttonRef.value;
  const ulElement = ulRef.value;
  if (
    buttonElement &&
    ulElement &&
    !(
      buttonElement.contains(event.target as Node) ||
      ulElement.contains(event.target as Node)
    )
  ) {
    state.value = false;
  }
};
</script>
<style lang="scss">
.select_type_pocket {
  width: 100%;
  min-width: 120px;
  height: 36px;
  font-size: 13px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  border-radius: 4px;
  padding: 0 8px 0 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  // overflow: visible !important;
  cursor: pointer;
  position: relative;

  &:hover {
    border: 1px solid #5984ff;
  }

  &:not(:disabled):active,
  &:focus {
    border: 1px solid #5984ff;
    box-shadow: 0px 0px 0px 2px #b9cbff;
  }

  &:disabled {
    background: #eef1f6;
    border: 1px solid #e0e0e0;
  }

  .grey_color {
    color: #8d99a8;
  }

  ul {
    text-align: start;
    position: absolute;
    top: calc(100% + 2px);
    left: 0%;
    width: 100%;
    background-color: #fff;
    z-index: 2;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
    border: 1px solid #eef1f6;
    border-radius: 4px;

    // display: none;
    li {
      height: 36px;
      line-height: 36px;
      padding-left: 12px;

      &:hover {
        background-color: #eef1f6;
      }

      &.active {
        background-color: #5984ff;
        color: #fff;
      }
    }
  }

  .select-arrow {
    transform: rotate(180deg);
  }

  &.on {
    .select-arrow {
      transform: rotate(0);
    }
  }

  &.no-before {
    &::before {
      content: none;
    }
  }
}

@media (max-width: 768px) {
  .select_type_pocket {
    ul {
      text-align: start;
      position: absolute;
      // dropdown 상단으로 강제열림 코드 주석처리
      // top: auto;
      // bottom: calc(100% + 2px);
      left: 0%;
      width: 100%;
      background-color: #fff;
      z-index: 2;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      // display: none;
    }
  }
}
</style>
