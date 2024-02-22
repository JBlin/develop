<template>
  <div>
    <loading-overlay :content="LoadingContent" v-if="isLoading" />
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="popup-body-header issue-mobile">
        <div class="popup-body-header-left issue-mobile">
          <span class="count-text"
            >총 <span class="count">{{ addCommas(totalCount) }}</span
            >건
          </span>
          <span class="point-crcle">
            차감 포인트
            <span class="c-r">{{ addCommas(totPointsForUse) }} P</span>
          </span>
        </div>
        <div class="popup-body-header-btn-box">
          <button class="round-btn w" @click="uncheckAllCheckboxes">
            초기화
          </button>
          <button class="round-btn black" @click="proceedToIssue">발급</button>
        </div>
      </div>
      <div class="pocket-table-box">
        <div class="table-scroll">
          <table class="pocket-table">
            <colgroup>
              <col width="40px" />
            </colgroup>
            <thead>
              <tr>
                <th class="t-c">No.</th>
                <th>법인 상세 정보</th>
                <th class="t-c">사용료</th>
                <th
                  class="t-c pointer"
                  @click="allChecked('INCLUDE_EXPUNGEMENT')"
                >
                  말소사항<br />
                  포함
                </th>
                <th class="t-c pointer" @click="allChecked('VIEW')">
                  등본<br />
                  열람
                </th>
                <th class="t-c pointer" @click="allChecked('ISSUE')">
                  등본<br />
                  발급
                </th>
                <th class="t-c pointer" @click="allChecked('CHANGE_ALERT')">
                  임기만료 <br />알림
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartList.length == 0">
                <td colspan="20">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in cartList" :key="index">
                <td class="t-c">{{ data.index }}</td>
                <td>
                  {{ data.corpNm }} l
                  {{ addBarToCorpRegNumber(data.corpRegNo) }} l {{ data.closeYn
                  }}<br />
                  {{ data.regDivNm }} l {{ data.hdShopNm }} l
                  {{ data.attrNo }} l
                  {{ data.regOfficeNm }}
                </td>
                <td class="t-c">{{ addCommas(data.usePoint) }} P</td>
                <td>
                  <input
                    type="checkbox"
                    v-model="data.isIncludeExpungement"
                    @click="toggleCheckboxState(index, 'INCLUDE_EXPUNGEMENT')"
                  />
                </td>
                <td class="t-c">
                  <input
                    type="checkbox"
                    v-model="data.isView"
                    @click="toggleAndAddPoints(index, 'VIEW')"
                  />
                </td>
                <td class="t-c">
                  <input
                    type="checkbox"
                    v-model="data.isIssue"
                    @click="toggleAndAddPoints(index, 'ISSUE')"
                  />
                </td>
                <td class="t-c">
                  <label class="switch">
                    <input
                      type="checkbox"
                      name="theme"
                      id="theme"
                      v-model="data.isChangeAlert"
                      @click="toggleCheckboxState(index, 'CHANGE_ALERT')"
                    />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagenation
          @update:current="changePage"
          :totalCount="totalCount"
          :isFilter="true"
          ref="pagenationRef"
        />
      </div>
      <span class="tip">
        <img src="@/assets/images/tip-red.svg" alt="tip" />
        본 열람용 등기부등본은 법적 효력이 없습니다. 관공서 등에 제출하기 위한
        등기부등본은 발급용으로 받으셔야 합니다.
      </span>
    </LayoutPopup>

    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :key="index"
      :content="popup.content"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>

<script setup lang="ts">
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, onMounted, shallowRef, computed, watch } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { addCommas } from '@/util/number';
import LoadingOverlay from '@/components/loading/Loading.vue';
import Pagenation from '@/components/Pagenation.vue';
import { useUserStore } from '@/stores/user.store';
import { post } from '@/util/service/request';
import { addBarToCorpRegNumber } from '@/util/number';
import { get } from '@/util/service/request';
// import { useRouter } from 'vue-router';
import { Log } from '@/util/common';
import {
  ERROR_500,
  ISSUE_VIEW,
  POINT_LACK,
  CORP_ALERT,
  ISSUE_SUCCESS
} from '@/util/message';
import { useRouter } from 'vue-router';

const router = useRouter();
const popupTitle = '법인 등기 발급';
const totPointsForUse = ref(0);
const totalCount = ref(0);
const cartList = ref<CartList[]>([]);
const userStore = useUserStore();
const currentPage = ref(1);
const currentSize = ref(10);
const pagenationRef = ref<any>(null);
const totalPoint = ref(0);
// const router = useRouter();
const isLoading = ref(false);
const LoadingContent = ref({ text: '로딩중...' });

const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface CartList {
  index: number;
  attrNo: string;
  regOfficeNm: string;
  regDivNm: string;
  corpNm: string;
  corpRegNo: string;
  hdShopNm: string;
  weekendYn: string;
  favorite: string;
  closeYn: string;
  usePoint: number;
  isView: boolean;
  isIssue: boolean;
  isChangeAlert: boolean;
  isIncludeExpungement: boolean;
  isReIssue: boolean;
}

interface Props {
  idList: number[];
}

/* 로딩바 */
const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

//체크박스 상태 변경 (단일건, 포인트 관련 있는 체크박스)
const toggleAndAddPoints = (index: number, checkboxType: string) => {
  const isView = checkboxType === 'VIEW';
  const isIssue = checkboxType === 'ISSUE';
  if (isView) {
    cartList.value[index].isView = true;
    cartList.value[index].isIssue = false;
  } else if (isIssue) {
    cartList.value[index].isView = false;
    cartList.value[index].isIssue = true;
  }

  if ((event?.target as HTMLInputElement).checked) {
    cartList.value[index].usePoint = 0;
    if (isView) {
      cartList.value[index].usePoint += 1000;
    } else if (isIssue) {
      cartList.value[index].usePoint += 1300;
    }
  } else {
    if (isView) {
      cartList.value[index].usePoint -= 1000;
    } else if (isIssue) {
      cartList.value[index].usePoint -= 1300;
    }
  }
};

//체크박스 상태 변경 (단일건, 포인트 관련 없는 체크박스)
const toggleCheckboxState = (index: number, checkboxType: string) => {
  const isIncludeExpungement = checkboxType === 'INCLUDE_EXPUNGEMENT';
  const isChangeAlert = checkboxType === 'CHANGE_ALERT';

  if (isIncludeExpungement) {
    if (cartList.value[index].isIncludeExpungement) {
      cartList.value[index].isIncludeExpungement = false;
    }
    cartList.value[index].isIncludeExpungement = true;
  } else if (isChangeAlert) {
    if (cartList.value[index].usePoint === 0) {
      showPopup('CORP_ALERT');
      (event?.target as HTMLInputElement).checked = false;
      cartList.value[index].isChangeAlert = false;
    } else {
      cartList.value[index].isChangeAlert =
        !cartList.value[index].isChangeAlert;
    }
  }
};

// 총 사용 포인트 계산
const totalUsePoints = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.usePoint, 0);
});

watch(totalUsePoints, (newValue) => {
  totPointsForUse.value = newValue;
});

// 발급 리스트 닫기
const props = defineProps<{ content: Props }>();
const emit = defineEmits<{ (e: 'close'): void }>();
const closePopup = () => {
  emit('close');
};

//유저가 클릭한 장바구니 리스트 ID
const idList: any = props.content ? props.content : [];

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  performFetch(false);
};

//체크박스 전체 초기화
const uncheckAllCheckboxes = () => {
  totPointsForUse.value = 0;
  cartList.value.forEach((item) => {
    item.usePoint = 0;
  });
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    (checkbox as HTMLInputElement).checked = false;
  });
};

//체크박스 컬럼별 전체 선택
const allChecked = (checkboxType: string) => {
  const isView = checkboxType === 'VIEW';
  const isIssue = checkboxType === 'ISSUE';
  const isIncludeExpungement = checkboxType === 'INCLUDE_EXPUNGEMENT';
  const isChangeAlert = checkboxType === 'CHANGE_ALERT';

  cartList.value.forEach((item) => {
    if (isView) {
      item.isView = !item.isView;
      item.isIssue = !item.isView;
      item.usePoint = item.isView ? 1000 : 1300;
    } else if (isIssue) {
      item.isIssue = !item.isIssue;
      item.isView = !item.isIssue;
      item.usePoint = item.isIssue ? 1300 : 1000;
    } else if (isIncludeExpungement) {
      item.isIncludeExpungement = !item.isIncludeExpungement;
    } else if (isChangeAlert) {
      if (item.usePoint === 0) {
        (event?.target as HTMLInputElement).checked = false;
        item.isChangeAlert = false;
      } else {
        item.isChangeAlert = !item.isChangeAlert;
      }
    }
  });
};

//등본 발급 리스트 호출
const performFetch = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const userToken = userStore.getToken;
  const url_info = `user/corp/cart/request?page=${page}&size=${size}`;
  const params = {
    idList: idList
  };

  post(url_info, params, userToken)
    .then((_response) => {
      cartList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPage.value == 0
                ? index + 1
                : index + 1 + (currentPage.value - 1) * currentSize.value,
            usePoint: 0,
            isView: false,
            isIssue: false,
            isIncludeExpungement: false,
            isChangeAlert: false,
            isReIssue: false
          };
        }
      );
      totalCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationRef.value.init(totalCount.value);
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

// 발급 요청
const proceedToIssue = () => {
  // 열람 또는 발급 체크박스 체크 여부 확인
  for (let i = 0; i < cartList.value.length; i++) {
    if (
      cartList.value[i].isView === false &&
      cartList.value[i].isIssue === false
    ) {
      showPopup('ISSUE_VIEW');
      return;
    }
  }
  // 보유 포인트 대비 사용 포인트 체크
  if (totPointsForUse.value > totalPoint.value) {
    showPopup('POINT_LACK');
    return;
  }
  // 등기 발급 요청
  performIssue();
};

// 법인 등기 발급 요청
const performIssue = () => {
  startLoading();

  const userType = userStore.getUser.userType;
  const url_info = `/user/issue/corp`;
  const userToken = userStore.getToken;

  const params = {
    list: cartList.value,
    userType: userType,
    useTotPoint: totPointsForUse.value
  };

  post(url_info, params, userToken)
    .then((_response) => {
      Log(_response);
      showPopup('ISSUE_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

// 유저 총 포인트 조회
const getTotPoints = () => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/point?userType=${userType}`;
  const userToken = userStore.getToken;

  get(url_info, '', userToken)
    .then((_response) => {
      totalPoint.value = _response.data.payload.totPoint;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

// const logOut = () => {
//   let device: string = '1';
//   if (isMobile()) {
//     device = '2';
//   }
//   const url = `/user/login/out?device=${device}&userType=${userStore.getUser.userType}`;
//   post(url, {}, userStore.getToken)
//     .then((res) => {
//       Log('res', res);
//       userStore.resetUser();
//       router.push({ path: '/' });
//     })
//     .catch((error) => {
//       Log('error', error);
//       userStore.resetUser();
//       router.push({ path: '/' });
//     });
// };

onMounted(() => {
  performFetch(true);
  getTotPoints();
});

const showPopup = (popName: string) => {
  currentPopup.value = popName;
  stopLoading();
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'ISSUE_VIEW':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_VIEW
      });
      break;
    case 'POINT_LACK':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: POINT_LACK
      });
      break;
    case 'CORP_ALERT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CORP_ALERT
      });
      break;
    case 'ISSUE_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_SUCCESS
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
    case 'ISSUE_SUCCESS':
      closePopup();
      router.go(0);
      break;
  }
  currentPopup.value = '';
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
