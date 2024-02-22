<template>
  <LayoutPopup :title="props.content.title ? props.content.title : ''">
    <VueDaumPostcode @complete="onComplete" />
  </LayoutPopup>
</template>

<script setup lang="ts">
import { VueDaumPostcode } from 'vue-daum-postcode';
import LayoutPopup from '@/components/popup/PopupLayout.vue';

interface Props {
  title?: string;
}
const props = defineProps<{ content: Props }>();

const onComplete = (data: any) => {
  emit('postConfirm:data', data);
};
const emit = defineEmits<{
  (e: 'postConfirm:data', data: any): void;
}>();
</script>

<style lang="scss" scoped></style>
