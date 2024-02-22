<template>
  <div>
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <!-- 포인트UI 충전하기 -->
      <div :class="isPayment ? 'displayNone' : ''">
        <div class="popup-body-header">
          <div class="popup-body-header-left">
            <span class="popup-body-header-title"> 충전 금액 선택 </span>
          </div>
        </div>
        <div class="popup-body-contents">
          <div class="point-box">
            <div class="point-box-li">
              <span class="point-box-li-title"> 현재 보유 포인트 </span>
              <span class="point">
                <span class="num">{{
                  addCommas(
                    props.content.totalPoint ? props.content.totalPoint : 0
                  )
                }}</span>
                Point
              </span>
            </div>
            <div class="point-box-li">
              <span class="point-box-li-title"> 충전 예정 포인트 </span>
              <span class="recharge point">
                <span class="num">{{ addCommas(requestPoint) }}</span>
                Point
              </span>
            </div>
          </div>
          <div class="point-btn-box">
            <button class="round-btn w" @click="addPoint(10000)">
              + 10,000원
            </button>
            <button class="round-btn w" @click="addPoint(50000)">
              + 50,000원
            </button>
            <button class="round-btn w" @click="addPoint(100000)">
              + 100,000원
            </button>
          </div>
          <span class="point-tip">
            · 총 결제금액은 부가세가 포함된 금액입니다.
          </span>
          <div class="btn-box">
            <button class="round-btn black" @click="performNext">다음</button>
          </div>
        </div>
      </div>

      <!-- 카드UI 결제하기 -->
      <div :class="isPayment ? 'payment_view' : 'displayNone'">
        <div class="popup-body-contents">
          <div class="point-box">
            <div id="payment-method"></div>
          </div>
          <div class="btn-box">
            <button class="round-btn black" @click="performPayment">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </LayoutPopup>
    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :content="popup.content"
      :key="index"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>

<script setup lang="ts">
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, shallowRef } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { addCommas } from '@/util/number';
import { generatedOrderId } from '@/util/number';
import { useUserStore } from '@/stores/user.store';
import { TOSS_PAYMENTS } from '@/util/constants';
import { PRODUCT_TYPE } from '@/util/service/constants';
import { post } from '@/util/service/request';
import { Log } from '@/util/common';
import {
  ERROR_500,
  POINT_SELECT,
  REJECT_CARD_COMPANY,
  PAY_PROCESS_ABORTED,
  PAY_PROCESS_SUCCEED,
  POINT_RECHARGE_LIMIT
} from '@/util/message';

const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const popupTitle = '충전하기';
const requestPoint = ref(0);
const userStore = useUserStore();

const clientKey = TOSS_PAYMENTS.client_key;
const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS);
const isPayment = ref(false);

interface Props {
  totalPoint?: number;
}
const props = defineProps<{ content: Props }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const closePopup = () => {
  emit('close');
};

const addPoint = (point: number) => {
  const checkPoint = requestPoint.value + point;
  //포인트 결제창 상한선 1회 10만원으로 제한
  if (checkPoint > 100000) {
    showPopup('POINT_RECHARGE_LIMIT');
    return;
  }
  requestPoint.value += point;
};

const preparePayment = (requestPointAmt: number, orderId: string) => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/payment/prepare`;
  const userToken = userStore.getToken;
  const params = {
    totAmount: requestPointAmt,
    orderId: orderId,
    refType: userType
  };

  post(url_info, params, userToken)
    .then((_response) => {
      Log(_response.data.payload);
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

const performNext = () => {
  const requestPointAmt = requestPoint.value;
  if (requestPointAmt === 0) {
    showPopup('POINT_SELECT');
    return;
  }
  isPayment.value = true;
  paymentWidget.renderPaymentMethods(
    '#payment-method',
    {
      value: requestPoint.value
    },
    { variantKey: 'DEFAULT' }
  );
};

const performPayment = () => {
  // 결제 준비 (클라이언트 측에서 전달한 결제 정보를 DB에 저장하고 결제 검증으로 진행)
  const orderId = generatedOrderId();
  const requestPointAmt = requestPoint.value;
  preparePayment(requestPointAmt, orderId);
  paymentWidget.renderPaymentMethods(
    '#payment-method',
    {
      value: requestPoint.value
    },
    { variantKey: 'DEFAULT' }
  );
  paymentWidget
    .requestPayment({
      amount: requestPointAmt,
      orderId: orderId, // 주문번호
      orderName: PRODUCT_TYPE.POINT, // 주문명
      successUrl: window.location.origin + '/PointProcess', // 성공 리다이렉트 URL
      failUrl: window.location.origin + '/PointProcess' // 실패 리다이렉트 URL
    })
    .catch((error: any) => {
      // 사용자에 의한 결제 프로세스 취소(취소버튼 클릭 시 등) 포인트 충전 팝업 닫기
      if (error.code === 'PAY_PROCESS_CANCELED') {
        closePopup();
        return;
        // 기타 위젯 에러 처리
      } else if (error.code === 'REJECT_CARD_COMPANY') {
        showPopup('REJECT_CARD_COMPANY');
      } else if (error.code === 'PAY_PROCESS_ABORTED') {
        showPopup('PAY_PROCESS_ABORTED');
      }
    });
};

const showPopup = (popName: string, data: string = '0') => {
  currentPopup.value = popName;
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'POINT_SELECT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: POINT_SELECT
      });
      break;
    case 'REJECT_CARD_COMPANY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: REJECT_CARD_COMPANY
      });
      break;
    case 'PAY_PROCESS_ABORTED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: PAY_PROCESS_ABORTED
      });
      break;
    case 'PAY_PROCESS_SUCCEED':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: PAY_PROCESS_SUCCEED(data)
      });
      break;
    case 'POINT_RECHARGE_LIMIT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: POINT_RECHARGE_LIMIT
      });
      break;
  }
};

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'ERROR_500':
      closePopup();
      break;
  }
  currentPopup.value = '';
};
</script>

<style lang="scss" scoped>
.use-point {
  margin-top: 10px;
}

.popup-body-header-title {
  font-size: 16px;
}

.check-flex {
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;

  input[type='checkbox'] {
    width: 18px !important;
    height: 18px !important;
  }

  label {
    display: flex;
    align-items: center;
    gap: 3px;
    line-height: 1;
  }
}

.popup-body-contents {
  display: flex;
  flex-direction: column;
  width: 100%;

  .point-box {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;

    &-li {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;

      &:last-child {
        border-top: 1px solid #e0e0e0;
      }

      &-title {
        font-size: 14px;
        font-weight: 500;
        color: #73777a;
      }

      .point {
        font-weight: 500;
        font-size: 14px;

        .num {
          font-weight: 700;
          font-size: 18px;
        }

        &.recharge {
          color: #f04438;
        }
      }
    }
  }

  .point-btn-box {
    display: flex;
    flex: 1;
    margin-bottom: 10px;
    gap: 10px;

    button {
      flex: 1;
      font-size: 14px;

      &:hover {
        color: #ffff;
        background-color: #2961ff;
        border-color: transparent;
      }

      &:focus {
        color: #ffff;
        background-color: #2961ff;
        border-color: transparent;
      }
    }
  }

  .point-tip {
    margin-bottom: 30px;
  }

  .btn-box {
    flex: 1;

    .round-btn {
      flex: 1;
    }
  }
}
.displayNone {
  display: none;
}
.payment_view {
  display: block;
  width: 600px;
}
@media (max-width: 768px) {
  .payment_view {
    display: block;
    width: 100%;
  }
}
</style>
