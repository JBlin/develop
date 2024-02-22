<template>
  <div class="pagenation">
    <div class="pagenation-first" @click="first">
      <img src="@/assets/images/pagenation-double-arrow.svg" alt="화살표" />
    </div>
    <div class="pagenation-prev" @click="prev">
      <img src="@/assets/images/pagenation-arrow.svg" alt="화살표" />
    </div>
    <div v-for="(value, index) in currentGroup" :key="index">
      <div
        class="pagenation-num"
        :class="{ active: currentNum === value }"
        @click="currentPage(value)"
      >
        <span>{{ value }} </span>
      </div>
    </div>

    <div class="pagenation-next" @click="next">
      <img src="@/assets/images/pagenation-arrow.svg" alt="화살표" />
    </div>
    <div class="pagenation-last" @click="last">
      <img src="@/assets/images/pagenation-double-arrow.svg" alt="화살표" />
    </div>
  </div>
  <!-- 페이지 10, 30, 50개씩 보기 버튼 없애기에 따라 주석처리 -->
  <!-- <div class="select-box" v-if="isFilter">
    <Select
      :options="['10개씩 보기', '30개씩 보기', '50개씩 보기']"
      @optionChange:option="optionChange"
    >
      {{ filterValue }}
    </Select>
  </div> -->
  <component
    v-for="(popup, index) in activePopups"
    :is="popup.component"
    :key="index"
    :content="popup.content"
    @close="closePopup"
    @cancel="cancelPopup"
    @confirm="confirmPopup"
  />
</template>

<script lang="ts" setup>
// import Select from '@/components/PoSelect.vue';
// const filterValue = ref('10개씩 보기');

import { ref, onMounted, shallowRef } from 'vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ESTATE_SEARCH_LIMIT_EXCEED } from '@/util/message';

const currentNum = ref(1); //현재 선택한 페이지 번호
const currentGroupNum = ref(0); //현재 그룹 번호
const groupLimit = ref(5);
const pageList = ref(10); //페이지별 확인가능한 리스트
const currentGroup = ref([0]); //현재 그룹 리스트
const totalGroup = ref(1);
const total = ref(0);
const currentPopup = ref('');

interface Props {
  totalCount?: number;
  isFilter: boolean;
}

interface PopupItem {
  component: any;
  content: any;
}

const activePopups = ref<PopupItem[]>([]);

withDefaults(defineProps<Props>(), {
  totalCount: 0,
  isFilter: true
});

const emit = defineEmits<{
  (e: 'update:current', current: object): void;
}>();

onMounted(() => {
  init();
});

const createArr = (n: number) => {
  const iArr: number[] = new Array(n);
  for (let i = 0; i < n; i++) iArr[i] = i + 1;
  return iArr;
};

const paging = (index: number) => {
  totalGroup.value = Math.ceil(total.value / pageList.value);
  const group: number = Number(currentGroupNum.value * groupLimit.value);
  const nArr = createArr(Number(totalGroup.value));
  const pArr = nArr?.slice(group, Number(groupLimit.value) + group);
  currentGroup.value = pArr;
  currentNum.value = index;
};

const parentUpdate = (index: number) => {
  const json = {
    current: index,
    filterList: pageList.value
  };
  emit('update:current', json);
};

const first = () => {
  currentGroupNum.value = 0;
  paging(1);
  parentUpdate(1);
};

const prev = () => {
  if (currentNum.value <= 1) {
    return;
  }
  if (currentNum.value - 1 <= groupLimit.value * currentGroupNum.value) {
    currentGroupNum.value = currentGroupNum.value - 1;
  }
  currentNum.value = currentNum.value - 1;
  paging(currentNum.value);
  parentUpdate(currentNum.value);
};

const next = () => {
  if (currentNum.value >= totalGroup.value) {
    return;
  }
  if (
    groupLimit.value * Number(currentGroupNum.value + 1) <
    Number(currentNum.value + 1)
  ) {
    currentGroupNum.value = currentGroupNum.value + 1;
  }
  currentNum.value = currentNum.value + 1;
  paging(currentNum.value);
  parentUpdate(currentNum.value);
};

const last = () => {
  // 총 갯수 100개 이하 시 최종 페이지 이동 불가능 처리
  if (total.value >= 100) {
    showPopup('ESTATE_SEARCH_LIMIT_EXCEED');
    return;
  }

  if (currentNum.value >= totalGroup.value) {
    return;
  }

  let lastNum = Math.ceil(totalGroup.value / groupLimit.value - 1);
  if (lastNum <= 0) {
    lastNum = 0;
  }
  currentGroupNum.value = lastNum;
  paging(totalGroup.value);
  parentUpdate(totalGroup.value);
};

const currentPage = (value: number) => {
  paging(value);
  parentUpdate(value);
};

const init = (value?: number): any => {
  if (!value) {
    total.value = 1;
  } else {
    total.value = value;
  }
  currentGroupNum.value = 0;
  paging(1);
};

//닫기 버튼
const closePopup = () => {
  activePopups.value.splice(0, 1);
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
};

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'ESTATE_SEARCH_LIMIT_EXCEED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ESTATE_SEARCH_LIMIT_EXCEED
      });
      break;
  }
};

// const optionChange = (option: any) => {
//   filterValue.value = option.option;
//   switch (option.index) {
//     case 1:
//       pageList.value = 10;
//       paging(currentNum.value);
//       parentUpdate(currentNum.value);
//       break;
//     case 2:
//       pageList.value = 30;
//       paging(currentNum.value);
//       parentUpdate(currentNum.value);
//       break;
//     case 3:
//       pageList.value = 50;
//       paging(currentNum.value);
//       parentUpdate(currentNum.value);
//       break;
//   }
// };

defineExpose({ init });
</script>
