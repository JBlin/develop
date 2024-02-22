<template>
  <VueDatePicker
    v-model:model-value="selectedDates"
    format="yyyy-MM-dd"
    range
    :text-input-options="textInputOptions"
    locale="ko"
    cancel-text="취소"
    select-text="완료"
    @update:model-value="selectDate"
  >
    <template #input-icon>
      <img class="slot-icon" src="@/assets/images/calendar.svg" />
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { changeDate } from '@/util/number';

const selectedDates = ref<Array<Date>>([]);
const textInputOptions = ref({
  rangeSeparator: ' ~ '
});

interface Props {
  dateRangeValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dateRangeValue: '1'
});

const emit = defineEmits<{
  (e: 'select:dates', dates: Array<Date>): void;
}>();

const selectDate = () => {
  emit('select:dates', selectedDates.value);
};

watch(
  () => selectedDates.value,
  () => {
    emit('select:dates', selectedDates.value);
  }
);

watch(
  () => props.dateRangeValue,
  () => {
    selectedDates.value = changeDate(props.dateRangeValue);
  }
);

onMounted(() => {
  //기본값 1주일 처리
  selectedDates.value = changeDate('3');
});
</script>

<style>
.slot-icon {
  width: 20px;
  height: 20px;
  right: 8px;
}
.dp__input_wrap {
  [disabled] + div {
    .dp__input_icon {
      cursor: unset;
    }
  }
}
</style>
