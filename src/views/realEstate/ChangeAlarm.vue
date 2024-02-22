<template>
  <loading-overlay :content="LoadingContent" v-if="isLoading" />
  <div class="pocket-contents-body-title">
    등기변동 알림
    <div class="expiration-state-box">
      <div class="expiration-state">
        <span class="circle blue"></span>
        등기변동사항 발생 부동산 (30일간)
        <span class="count" @click="showPopup('THIS_MONTH_ESTATE')"
          >{{ addCommas(thisMonthAlarm) }}건</span
        >
      </div>
    </div>
  </div>

  <div class="popup-body">
    <span class="tip">
      <img src="@/assets/images/tip-red.svg" alt="tip" />
      발급일 이후 부동산등기 변경사항이 발생되면 다음날 카카오알림을 받을 수
      있습니다.
    </span>
  </div>

  <span class="col-line"></span>
  <div class="result-container">
    <div class="result-container-search">
      <div class="input-box">
        <input
          type="text"
          v-model="searchText"
          @keypress.enter="getSearchList()"
          placeholder="주소, 부동산고유번호로 검색해 주세요."
        />
        <button class="result-container-search-btn" @click="getSearchList()">
          <img src="@/assets/images/search-btn.svg" alt="돋보기" />
        </button>
      </div>
    </div>
    <div class="result-container-top">
      <span class="result-container-count">
        전체 <span>{{ addCommas(totalCount) }}</span
        >건 / 선택 <span class="bl">{{ addCommas(checkedRef.length) }}</span
        >건
      </span>

      <div class="btn-box">
        <button class="round-btn w w-auto" @click="downloadExcel">
          <img src="@/assets/images/download-black.svg" alt="다운 아이콘" />
          엑셀 다운로드
        </button>
        <button class="round-btn black" @click="showPopup('REISSUE')">
          <img src="@/assets/images/new-open.svg" alt="돋보기" />신규열람
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
                  @click="allCheck()"
                  :checked="isAllChecked"
                />
              </th>
              <th class="t-c">No.</th>
              <th>알림 신청일</th>
              <th>주소</th>
              <th>소유자</th>
              <th>등기변경일</th>
              <th>등기목적</th>
              <th>처리상태</th>
              <th class="t-c">알림 이력</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="estateList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in estateList" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="checked"
                  :value="data"
                  v-model="checkedRef"
                />
              </td>
              <td class="t-c">{{ data.index }}</td>
              <td>
                {{ data.alarmReqDate ? data.alarmReqDate.split(' ')[0] : '-' }}
              </td>
              <td>
                {{ addBarToEstateRegNumber(data.attrNo) }} l
                {{ data.estateType }}
                <span class="state-line blue m-l-5" v-if="data.status == '1'"
                  >현행</span
                >
                <span class="state-line blue m-l-5" v-if="data.status == '2'"
                  >폐쇄</span
                >
                <br />
                {{ data.estateAddr }}
              </td>
              <td>
                {{
                  data.estateOwnerNm ? data.estateOwnerNm.split(' ')[0] : '-'
                }}
              </td>
              <td>{{ data.changeDate }}</td>
              <td>{{ data.purpose }}</td>
              <td>{{ data.historyStatus }}</td>
              <td class="t-c">
                {{ data.insDate ? data.insDate.split(' ')[0] : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <component
          v-for="(popup, index) in activePopups"
          :is="popup.component"
          :content="popup.content"
          :key="index"
          @close="closePopup(index)"
          @cancel="cancelPopup(index)"
          @confirm="confirmPopup(index)"
        />
        <Pagenation
          @update:current="changePage"
          :totalCount="totalCount"
          :isFilter="true"
          ref="pagenationRef"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue';
import Pagenation from '@/components/Pagenation.vue';
import LoadingOverlay from '@/components/loading/Loading.vue';
import { useUserStore } from '@/stores/user.store';
import { get, post, get_download } from '@/util/service/request';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import {
  checkInputStringIsNumber,
  addCommas,
  addBarToEstateRegNumber
} from '@/util/number';
import RealEstateChange from '@/components/popup/RealEstateChange.vue';
import {
  REISSUE,
  REAL_ESTATE_EMPTY,
  ERROR_500,
  SAVE_SUCCESS
} from '@/util/message';

const userStore = useUserStore();
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const searchText = ref('');
const totalCount = ref(0);
const currentPage = ref(1);
const currentSize = ref(10);
const pagenationRef = ref<any>(null);
const thisMonthAlarm = ref(0);
const currentPopup = ref('');
const isLoading = ref(false);
const LoadingContent = ref({ text: '로딩중...' });

interface PopupItem {
  component: any;
  content: any;
}
const activePopups = ref<PopupItem[]>([]);

interface EstateList {
  index: number;
  id: number;
  alarmReqDate: string;
  attrNo: string;
  changeDate: string;
  estateAddr: string;
  estateOwnerNm: string;
  estateType: string;
  historyStatus: string;
  purpose: string;
  status: string;
  insDate: string;
}

const estateList = ref<EstateList[]>([]);

const addCart = () => {
  startLoading();
  const url_info = `/user/alarm/estate/cart`;
  const userToken = userStore.getToken;
  const checkedList = checkedRef.value;
  post(url_info, checkedList, userToken)
    .then(() => {
      showPopup('SAVE_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

/* 로딩바 */
const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

const performFetch = (
  isInit: boolean,
  searchType: string = '',
  searchText: string = ''
) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const userToken = userStore.getToken;
  const url_info = `/user/alarm/estate/list?searchType=${searchType}&searchText=${searchText}&page=${page}&size=${size}`;
  get(url_info, {}, userToken)
    .then((_response) => {
      estateList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPage.value == 0
                ? index + 1
                : index + 1 + (currentPage.value - 1) * currentSize.value
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

const performThisMonthAlarm = () => {
  const userToken = userStore.getToken;
  const url_info = `/user/alarm/estate/month/count`;
  get(url_info, {}, userToken)
    .then((_response) => {
      thisMonthAlarm.value = _response.data.payload;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

onMounted(() => {
  performFetch(true);
  performThisMonthAlarm();
});

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  performFetch(false, searchTypeVal, searchTextVal);
};

const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    estateList.value.forEach((value) => {
      checkedRef.value.push(value);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (estateList.value.length == checkedRef.value.length) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
};

const initializeCheck = () => {
  isAllChecked.value = false;
  checkedRef.value = [];
};

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'THIS_MONTH_ESTATE':
      activePopups.value.push({
        component: shallowRef(RealEstateChange),
        content: checkedRef.value
      });
      break;
    case 'REISSUE':
      if (0 >= checkedRef.value.length) {
        currentPopup.value = '';
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: REAL_ESTATE_EMPTY
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: REISSUE
      });
      break;
    case 'ERROR_500':
      stopLoading();
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'SAVE_SUCCESS':
      stopLoading();
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: SAVE_SUCCESS
      });
      break;
  }
};

const closePopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'REISSUE':
      addCart();
      break;
  }
};

const getSearchList = () => {
  initializeCheck();
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  performFetch(true, searchTypeVal, searchTextVal);
};

const downloadExcel = () => {
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  const size = 1000;
  const url_info = `/user/alarm/estate/excel?searchType=${searchTypeVal}&searchText=${searchTextVal}&size=${size}`;
  get_download(url_info, {}, userStore.getToken)
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
    .catch(() => {
      showPopup('ERROR_500');
    });
};
</script>
<style lang="scss" scoped>
.count {
  cursor: pointer;
}
</style>
