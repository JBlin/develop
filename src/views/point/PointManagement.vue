<template>
  <div class="pocket-contents-body-title">포인트 관리</div>
  <div class="point-status">
    <div class="point-text-box">
      <div class="point-icon">
        <img src="@/assets/images/point.svg" alt="포인트 아이콘" />
      </div>
      <div class="user-info-box">
        <span class="user-info">
          <span class="user"> {{ userName }}</span
          >님의 사용 가능한 포인트는
        </span>
        <span class="user-point">
          <span class="point">{{ addCommas(totalPoint) }}</span>
          <span class="t-b"> Point </span> 입니다.
        </span>
      </div>
    </div>
    <div class="btn-box" @click="showPopup('POINT_RECHARGE', totalPoint)">
      <button class="round-btn black">충전하기</button>
    </div>
  </div>
  <div class="pocket-tab-row-container">
    <div
      class="pocket-tab"
      @click="activeTab = 1"
      :class="{ active: activeTab === 1 }"
    >
      충전 내역
    </div>
    <div
      class="pocket-tab"
      @click="activeTab = 2"
      :class="{ active: activeTab === 2 }"
    >
      이용 내역
    </div>
  </div>
  <div class="result-container tab-contents-1" v-if="activeTab === 1">
    <div class="result-container-search date">
      <div class="pocket-input-row">
        <div class="input-box">
          <span class="input-box-title"> 조회 기간</span>
          <div class="input-check-box-group">
            <label class="input-check-box" @change="searchPaymentList">
              <input
                type="radio"
                name="view"
                value="1"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              전체
            </label>
            <label class="input-check-box" @change="searchPaymentList">
              <input
                type="radio"
                name="view"
                value="2"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              당일
            </label>
            <label class="input-check-box" @change="searchPaymentList">
              <input
                type="radio"
                class="radio"
                name="view"
                value="5"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              2개월
            </label>
            <label class="input-check-box" @change="searchPaymentList">
              <input
                type="radio"
                name="view"
                value="6"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              3개월
            </label>
            <label class="input-check-box">
              <input
                type="radio"
                name="view"
                value="7"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              직접지정
            </label>
          </div>
          <div class="date-box">
            <AdDate
              :disabled="dateRangeValue == '7' ? false : true"
              :dateRangeValue="dateRangeValue"
              @select:dates="handleSelectedDatesUpdated"
            />
          </div>
          <button class="round-btn w" @click="searchPaymentList">
            조회하기
          </button>
        </div>
        <button class="round-btn w w-auto" @click="downloadExcel">
          <img src="@/assets/images/download-black.svg" alt="다운 아이콘" />
          엑셀 다운로드
        </button>
      </div>
    </div>
    <div class="pocket-table-box">
      <div class="table-scroll">
        <table class="pocket-table">
          <colgroup>
            <col width="40px" />
            <col width="60px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  @click="allPaymentCheck()"
                  :checked="isAllPaymentChecked"
                />
              </th>
              <th class="t-c">No.</th>
              <th>일시</th>
              <th>결제방식</th>
              <th>결제수단</th>
              <th class="t-c">충전금액</th>
              <th class="t-c">지급 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paymentList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in paymentList" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="paymentChecked"
                  :value="data.id"
                  v-model="checkedPaymentRef"
                />
              </td>
              <td class="t-c">{{ data.index }}</td>
              <td>{{ convertDateFormat(data.approvedAt) }}</td>
              <td>
                {{
                  data.paymentMethod == '간편결제' ||
                  data.paymentMethod == '계좌이체'
                    ? data.paymentMethod
                    : data.cardType + data.paymentMethod + ' 결제'
                }}
              </td>
              <td v-if="data.paymentMethod == '카드'">
                {{ getCardCompany(data.cardAcquirerCode) }}
              </td>
              <td v-if="data.paymentMethod == '계좌이체'">
                {{ getBankCompany(data.bankCode) }}
              </td>
              <td v-if="data.paymentMethod == '간편결제'">
                {{ data.easyPayProviderCode }}
              </td>
              <td class="t-c">{{ addCommas(data.totAmount) }}</td>
              <td class="t-c c-r">{{ addCommas(data.totPoint) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagenation
          @update:current="changePaymentPage"
          :totalCount="totalPaymentCount"
          :isFilter="isPaymentFilter"
          ref="pagenationPaymentRef"
        />
      </div>
    </div>
  </div>
  <div class="result-container tab-contents-2" v-if="activeTab === 2">
    <div class="result-container-search date">
      <div class="pocket-input-row">
        <div class="input-box">
          <span class="input-box-title"> 조회 기간</span>
          <div class="input-check-box-group">
            <label class="input-check-box" @change="searchPointUsageList">
              <input
                type="radio"
                name="view"
                value="1"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              전체
            </label>
            <label class="input-check-box" @change="searchPointUsageList">
              <input
                type="radio"
                name="view"
                value="2"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              당일
            </label>
            <label class="input-check-box" @change="searchPointUsageList">
              <input
                type="radio"
                class="radio"
                name="view"
                value="5"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              2개월
            </label>
            <label class="input-check-box" @change="searchPointUsageList">
              <input
                type="radio"
                name="view"
                value="6"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              3개월
            </label>
            <label class="input-check-box">
              <input
                type="radio"
                name="view"
                value="7"
                v-model="dateRangeValue"
              />
              <span class="custom-radio"></span>
              직접지정
            </label>
          </div>
          <div class="date-box">
            <AdDate
              :disabled="dateRangeValue == '7' ? false : true"
              :dateRangeValue="dateRangeValue"
              @select:dates="handleSelectedDatesUpdated"
            />
          </div>
          <button class="round-btn w" @click="searchPointUsageList">
            조회하기
          </button>
        </div>
        <button class="round-btn w w-auto" @click="downloadExcel">
          <img src="@/assets/images/download-black.svg" alt="다운 아이콘" />
          엑셀 다운로드
        </button>
      </div>
    </div>
    <div class="pocket-table-box">
      <div class="table-scroll">
        <table class="pocket-table">
          <colgroup>
            <col width="40px" />
            <col width="60px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  @click="allPointUsageCheck()"
                  :checked="isAllPointUsageChecked"
                />
              </th>
              <th class="t-c">No.</th>
              <th>일시</th>
              <th>등기 구분</th>
              <th>상세</th>
              <th>유형</th>
              <th class="t-c">이용자</th>
              <th class="t-c">이용 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pointUsageList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in pointUsageList" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="pointUsageChecked"
                  :value="data.id"
                  v-model="checkedPointUsageRef"
                />
              </td>
              <td class="t-c">{{ data.index }}</td>
              <td>{{ convertDateFormat(data.insDate) }}</td>
              <td>
                {{
                  data.issueType == '1' ? '법인등기부등본' : '부동산등기부등본'
                }}
              </td>
              <td>{{ data.dataDetail }}</td>
              <td>
                {{ data.dataType == '1' ? '열람' : '발급' }}
              </td>
              <td class="t-c">{{ data.userNm }}</td>
              <td class="t-c c-r">{{ addCommas(data.usePoint) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagenation
          @update:current="changePointUsagePage"
          :totalCount="totalPointUsageCount"
          :isFilter="isPointUsageFilter"
          ref="pagenationPointUsageRef"
        />
      </div>
    </div>
  </div>
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
import { ref, shallowRef, onMounted, watch } from 'vue';
import { get, get_download } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import {
  addCommas,
  convertDateFormat,
  getBankCompany,
  getCardCompany
} from '@/util/number';
import Pagenation from '@/components/Pagenation.vue';
import AdDate from '@/components/AdDate.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import PointRecharge from '@/components/popup/PointRecharge.vue';
import {
  ERROR_500,
  POINT_RECHARGE,
  POINT_RECHARGE_REQUEST
} from '@/util/message';

const userStore = useUserStore();
const activeTab = ref(2);
const userName = ref(userStore.getUser.name);
const totalPoint = ref(0);
const totalPaymentCount = ref(0);
const totalPointUsageCount = ref(0);
const currentPaymentPage = ref(1);
const currentPointUsagePage = ref(1);
const currentPaymentSize = ref(10);
const currentPointUsageSize = ref(10);
const compPicName = ref('');
const pagenationPaymentRef = ref<any>(null);
const pagenationPointUsageRef = ref<any>(null);
const isAllPaymentChecked = ref(false);
const isAllPointUsageChecked = ref(false);
const checkedPaymentRef = ref<any[]>([]);
const checkedPointUsageRef = ref<any[]>([]);
const dateRangeValue = ref('1');
const isPaymentFilter = ref(true);
const isPointUsageFilter = ref(true);
const selectedDates = ref<Array<Date>>([]);
const currentPopup = ref('');

interface PaymentList {
  index: number;
  id: number;
  approvedAt: string;
  paymentMethod: string;
  cardAcquirerCode: string;
  cardType: string;
  bankCode: string;
  easyPayProviderCode: string;
  totAmount: number;
  totPoint: number;
}

interface PointUsageList {
  index: number;
  id: number;
  insDate: string;
  usePoint: number;
  userNm: string;
  issueType: string;
  dataType: string;
  dataDetail: string;
}

const paymentList = ref<PaymentList[]>([]);
const pointUsageList = ref<PointUsageList[]>([]);

const performPaymentList = (isInit: boolean) => {
  if (isInit) {
    currentPaymentPage.value = 1;
  }
  const page = currentPaymentPage.value;
  const size = currentPaymentSize.value;
  const userToken = userStore.getToken;
  const userType = userStore.getUser.userType;
  const url_info = `/user/payment/list?userType=${userType}&page=${page}&size=${size}`;
  get(url_info, '', userToken)
    .then((_response) => {
      paymentList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPaymentPage.value == 0
                ? index + 1
                : index +
                  1 +
                  (currentPaymentPage.value - 1) * currentPaymentSize.value
          };
        }
      );
      totalPaymentCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationPaymentRef.value.init(totalPaymentCount.value);
      }
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};

const getTotPoints = () => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/point?userType=${userType}`;
  const userToken = userStore.getToken;

  get(url_info, '', userToken)
    .then((_response) => {
      totalPoint.value = _response.data.payload.totPoint;
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};

onMounted(() => {
  performPointUsageList(true);
  getTotPoints();
});

watch(
  () => activeTab.value,
  () => {
    if (activeTab.value == 2) {
      performPointUsageList(true);
    } else {
      performPaymentList(true);
    }
  }
);

interface PopupItem {
  component: any;
  content: any;
}
const activePopups = ref<PopupItem[]>([]);

const USER_TYPE = {
  PERSONAL: '1',
  COMPANY_PIC: '2',
  COMPANY_USER: '3'
};

const showPopup = async (popName: string, totalPoint: number = 0) => {
  currentPopup.value = popName;
  const userType = userStore.getUser.userType;
  switch (popName) {
    case 'POINT_RECHARGE':
      if (userType === USER_TYPE.COMPANY_USER) {
        await checkCompPicName();
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: POINT_RECHARGE_REQUEST(compPicName.value)
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(PointRecharge),
        content: POINT_RECHARGE(totalPoint)
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

const checkCompPicName = async () => {
  try {
    const url_info = 'user/findAdminInfo';
    const userToken = userStore.getToken;
    const response = await get(url_info, '', userToken);
    compPicName.value = response.data.payload.userName;
  } catch (error: any) {
    if (error.response.status === 500) {
      showPopup('ERROR_500');
      return;
    }
  }
};

const allPaymentCheck = () => {
  isAllPaymentChecked.value = !isAllPaymentChecked.value;
  if (isAllPaymentChecked.value) {
    checkedPaymentRef.value = [];
    paymentList.value.forEach((value) => {
      checkedPaymentRef.value.push(value.id);
    });
  } else {
    checkedPaymentRef.value = [];
  }
};

const allPointUsageCheck = () => {
  isAllPointUsageChecked.value = !isAllPointUsageChecked.value;
  if (isAllPointUsageChecked.value) {
    checkedPointUsageRef.value = [];
    pointUsageList.value.forEach((value) => {
      checkedPointUsageRef.value.push(value.id);
    });
  } else {
    checkedPointUsageRef.value = [];
  }
};

const paymentChecked = () => {
  if (paymentList.value.length == checkedPaymentRef.value.length) {
    isAllPaymentChecked.value = true;
  } else {
    isAllPaymentChecked.value = false;
  }
};

const pointUsageChecked = () => {
  if (pointUsageList.value.length == checkedPointUsageRef.value.length) {
    isAllPointUsageChecked.value = true;
  } else {
    isAllPointUsageChecked.value = false;
  }
};

const closePopup = () => {
  activePopups.value.splice(0, 1);
};

const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
};

const changePaymentPage = (current: any) => {
  currentPaymentPage.value = current.current;
  currentPaymentSize.value = current.filterList;
  performPaymentList(false);
};

const changePointUsagePage = (current: any) => {
  currentPointUsagePage.value = current.current;
  currentPointUsageSize.value = current.filterList;
  performPointUsageList(false);
};

const performPaymentSearch = (
  isInit: boolean,
  startDate: string,
  endDate: string
) => {
  if (isInit) {
    currentPaymentPage.value = 1;
  }
  const page = currentPaymentPage.value;
  const size = currentPaymentSize.value;
  const selectedValue = dateRangeValue.value;
  const userToken = userStore.getToken;
  const userType = userStore.getUser.userType;
  const url_info = `user/payment/search?value=${selectedValue}&userType=${userType}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`;

  get(url_info, '', userToken)
    .then((_response) => {
      paymentList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPaymentPage.value == 0
                ? index + 1
                : index +
                  1 +
                  (currentPaymentPage.value - 1) * currentPaymentSize.value
          };
        }
      );
      totalPaymentCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationPaymentRef.value.init(totalPaymentCount.value);
      }
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};

const handleSelectedDatesUpdated = (dates: Array<Date>) => {
  selectedDates.value = dates;
};

const searchPaymentList = () => {
  const startDate = selectedDates.value[0].toISOString().split('T')[0];
  const endDate = selectedDates.value[1].toISOString().split('T')[0];

  // 페이지, 사이즈 초기화
  currentPaymentPage.value = 1;
  currentPaymentSize.value = 10;
  performPaymentSearch(true, startDate, endDate);
};

const downloadExcel = () => {
  const userToken = userStore.getToken;
  const userType = userStore.getUser.userType;
  const url_info = `/user/point/excel?userType=${userType}`;

  get_download(url_info, '', userToken)
    .then((_response) => {
      const url = window.URL.createObjectURL(
        new Blob([_response.data], { type: _response.headers['content-type'] })
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = 'iros_data_' + new Date().getTime() + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};

const performPointUsageList = (isInit: boolean) => {
  if (isInit) {
    currentPointUsagePage.value = 1;
  }
  const page = currentPointUsagePage.value;
  const size = currentPointUsageSize.value;
  const userToken = userStore.getToken;
  const userType = userStore.getUser.userType;
  const url_info = `/user/point/list?userType=${userType}&page=${page}&size=${size}`;
  get(url_info, '', userToken)
    .then((_response) => {
      pointUsageList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPointUsagePage.value == 0
                ? index + 1
                : index +
                  1 +
                  (currentPointUsagePage.value - 1) *
                    currentPointUsageSize.value
          };
        }
      );
      totalPointUsageCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationPointUsageRef.value.init(totalPointUsageCount.value);
      }
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};

const searchPointUsageList = () => {
  const startDate = selectedDates.value[0].toISOString().split('T')[0];
  const endDate = selectedDates.value[1].toISOString().split('T')[0];
  // 페이지, 사이즈 초기화
  currentPointUsagePage.value = 1;
  currentPointUsageSize.value = 10;
  performPointUsageSearch(true, startDate, endDate);
};

const performPointUsageSearch = (
  isInit: boolean,
  startDate: string,
  endDate: string
) => {
  if (isInit) {
    currentPointUsagePage.value = 1;
  }
  const page = currentPointUsagePage.value;
  const size = currentPointUsageSize.value;
  const selectedValue = dateRangeValue.value;
  const userToken = userStore.getToken;
  const userType = userStore.getUser.userType;
  const url_info = `user/point/search?value=${selectedValue}&userType=${userType}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`;

  console.log('url_info', url_info);
  get(url_info, '', userToken)
    .then((_response) => {
      pointUsageList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPointUsagePage.value == 0
                ? index + 1
                : index +
                  1 +
                  (currentPointUsagePage.value - 1) *
                    currentPointUsageSize.value
          };
        }
      );
      totalPointUsageCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationPointUsageRef.value.init(totalPointUsageCount.value);
      }
    })
    .catch((error) => {
      if (error.response.status === 500) {
        showPopup('ERROR_500');
        return;
      }
    });
};
</script>
