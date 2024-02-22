<template>
  <div class="pocket-contents-body-title">
    임기만료 알림
    <div class="expiration-state-box">
      <div class="expiration-state">
        <span class="circle blue"></span>
        임기만료 예정인 임원 (30일내)
        <span class="count" @click="showPopup('THIS_MONTH_EXECUTIVE')"
          >{{ addCommas(thisMonthAlarm) }}명</span
        >
      </div>
    </div>
  </div>

  <div class="popup-body">
    <span class="tip">
      <img src="@/assets/images/tip-red.svg" alt="tip" />
      등기예정일 30일전에 카카오알림을 받을 수 있습니다.
    </span>
  </div>

  <span class="col-line"></span>
  <div class="result-container">
    <div class="result-container-search">
      <div class="input-box">
        <input
          type="text"
          placeholder="상호명, 법인등록번호로 검색해 주세요."
          v-model="searchTextVal"
          @keypress.enter="getSearchList()"
        />
        <button class="result-container-search-btn" @click="getSearchList()">
          <img src="@/assets/images/search-btn.svg" alt="돋보기" />
        </button>
      </div>
    </div>
    <div class="result-container-search date">
      <div class="pocket-input-row">
        <div class="input-box">
          <span class="input-box-title"> 검색 조건 </span>
          <div class="input-check-box-group">
            <label class="input-check-box">
              <input
                type="radio"
                value="1"
                v-model="searchRangeVal"
                @change="getSearchList()"
              />
              <span class="custom-radio"></span>
              전체
            </label>
            <label class="input-check-box">
              <input
                type="radio"
                value="2"
                v-model="searchRangeVal"
                @change="getSearchList()"
              />
              <span class="custom-radio"></span>
              도과목록 제외
            </label>
          </div>
        </div>
      </div>
    </div>
    <br />

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
              <th>상호명</th>
              <th>법인등록번호</th>
              <th>성명</th>
              <th>직위</th>
              <th class="t-c">취임일</th>
              <th class="t-c">등기예정일</th>
              <th class="t-c">D-DAY</th>
              <th class="t-c">알림 이력</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="executiveList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in executiveList" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="checked"
                  :value="data.id"
                  v-model="checkedRef"
                />
              </td>
              <td class="t-c">{{ data.index }}</td>
              <td>{{ data.corpNm }}</td>
              <td>{{ addBarToCorpRegNumber(data.corpRegNo) }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.position }}</td>
              <td>{{ data.appointmentDate ? data.appointmentDate : '-' }}</td>
              <td>
                {{
                  data.estimatedRegisterDate ? data.estimatedRegisterDate : '-'
                }}
              </td>
              <td class="t-c c-r">
                {{ calculateDateInterval(data.estimatedRegisterDate) }}
              </td>
              <td class="t-c">
                {{
                  data.latestAlarmDate
                    ? data.latestAlarmDate.split(' ')[0]
                    : '-'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <component
          v-for="(popup, index) in activePopups"
          :is="popup.component"
          :key="index"
          :content="popup.content"
          @close="closePopup"
          @cancel="cancelPopup"
          @confirm="confirmPopup"
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
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import Pagenation from '@/components/Pagenation.vue';
import { useUserStore } from '@/stores/user.store';
import { get, get_download } from '@/util/service/request';
import {
  checkInputStringIsNumber,
  addCommas,
  addBarToCorpRegNumber,
  calculateDateInterval
} from '@/util/number';
import AlarmPopup from '@/components/popup/AlarmPopup.vue';
import { ERROR_500 } from '@/util/message';

const userStore = useUserStore();
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const totalCount = ref(0);
const currentPage = ref(1);
const currentSize = ref(10);
const pagenationRef = ref<any>(null);
const thisMonthAlarm = ref(0);
const currentPopup = ref('');
const searchTextVal = ref('');
const searchRangeVal = ref('1');

interface PopupItem {
  component: any;
  content: any;
}
const activePopups = ref<PopupItem[]>([]);

interface ExecutiveList {
  index: number;
  id: number;
  issueCorpId: number;
  position: string;
  name: string;
  pin: string;
  appointmentDate: string;
  inaugurationDate: string;
  registerDate: string;
  estimatedRegisterDate: string;
  revisionCount: number;
  status: string;
  userId: number;
  alarmYn: string;
  corpNm: string;
  corpRegNo: string;
  latestAlarmDate: string;
}

const executiveList = ref<ExecutiveList[]>([]);

const performFetch = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const searchText = searchTextVal.value.replace(/-/g, '');
  const searchType = checkInputStringIsNumber(searchText);
  const searchRange = searchRangeVal.value;
  const page = currentPage.value;
  const size = currentSize.value;
  const userToken = userStore.getToken;
  const url_info = `/user/alarm/executive/list?searchRange=${searchRange}&searchType=${searchType}&searchText=${searchText}&page=${page}&size=${size}`;
  get(url_info, {}, userToken)
    .then((_response) => {
      executiveList.value = _response.data.payload.list.map(
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
  const url_info = `/user/alarm/executive/month/count`;
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
  performFetch(false);
};

const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    executiveList.value.forEach((value) => {
      checkedRef.value.push(value.id);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (executiveList.value.length == checkedRef.value.length) {
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
    case 'THIS_MONTH_EXECUTIVE':
      activePopups.value.push({
        component: shallowRef(AlarmPopup),
        content: checkedRef.value
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
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
};

const getSearchList = () => {
  initializeCheck();
  performFetch(true);
};

const downloadExcel = () => {
  const searchText = searchTextVal.value.replace(/-/g, '');
  const searchType = checkInputStringIsNumber(searchText);
  const searchRange = searchRangeVal.value;
  const size = 1000;
  const url_info = `/user/alarm/executive/excel?searchRange=${searchRange}&searchType=${searchType}&searchText=${searchText}&size=${size}`;
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
