<template>
  <div>
    <div class="payment-box">
      <div></div>
      <component
        v-for="(popup, index) in activePopups"
        :is="popup.component"
        :key="index"
        :content="popup.content"
        @close="closePopup"
        @cancel="cancelPopup"
        @confirm="confirmPopup"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  PAY_PROCESS_CANCELED,
  PAY_PROCESS_ABORTED,
  REJECT_CARD_COMPANY,
  PAY_PROCESS_SUCCEED,
  ERROR_500
} from '@/util/message';
import { useUserStore } from '@/stores/user.store';
import { post } from '@/util/service/request';
import { addCommas } from '@/util/number';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

onMounted(() => {
  const paymentKey = route.query.paymentKey ? route.query.paymentKey : '';
  const orderId = route.query.orderId ? route.query.orderId : '';
  const amount = route.query.amount ? route.query.amount : '';
  const code = route.query.code ? route.query.code : '';

  if (code === 'PAY_PROCESS_CANCELED') {
    showPopup('PAY_PROCESS_CANCELED');
    return;
  } else if (code === 'PAY_PROCESS_ABORTED') {
    showPopup('PAY_PROCESS_ABORTED');
    return;
  } else if (code === 'REJECT_CARD_COMPANY') {
    showPopup('REJECT_CARD_COMPANY');
    return;
  }
  verifyPayment(paymentKey, orderId, amount);
});

const verifyPayment = (paymentKey: any, orderId: any, amount: any) => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/payment/verify`;
  const userToken = userStore.getToken;
  const params = {
    paymentKey: paymentKey,
    totAmount: amount,
    orderId: orderId,
    refType: userType
  };

  post(url_info, params, userToken)
    .then(() => {
      showPopup('PAY_PROCESS_SUCCEED', addCommas(amount));
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

//공통 팝업
const showPopup = (popName: string, data: string = '0') => {
  switch (popName) {
    case 'PAY_PROCESS_CANCELED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: PAY_PROCESS_CANCELED
      });
      break;
    case 'PAY_PROCESS_ABORTED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: PAY_PROCESS_ABORTED
      });
      break;
    case 'REJECT_CARD_COMPANY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: REJECT_CARD_COMPANY
      });
      break;
    case 'PAY_PROCESS_SUCCEED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: PAY_PROCESS_SUCCEED(data)
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
  }
};

//닫기 버튼
const closePopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/pocket/PointManagement');
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/pocket/PointManagement');
};
</script>
<style lang="scss" scoped>
.payment-box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
