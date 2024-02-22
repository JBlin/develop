<template>
  <div class="result-container-search date">
    <div class="pocket-input-row">
      <div class="input-box">
        <span class="input-box-title"> 조회 기간 </span>
        <div class="input-check-box-group">
          <label class="input-check-box" @change="performFetch(false)">
            <input
              type="radio"
              name="view"
              value="1"
              v-model="dateRangeValue"
            />
            <span class="custom-radio"></span>
            전체
          </label>
          <label class="input-check-box" @change="performFetch(false)">
            <input
              type="radio"
              name="view"
              value="2"
              v-model="dateRangeValue"
            />
            <span class="custom-radio"></span>
            당일
          </label>
          <label class="input-check-box" @change="performFetch(false)">
            <input
              type="radio"
              class="radio"
              name="view"
              value="3"
              v-model="dateRangeValue"
            />
            <span class="custom-radio"></span>
            1주일
          </label>
          <label class="input-check-box" @change="performFetch(false)">
            <input
              type="radio"
              class="radio"
              name="view"
              value="4"
              v-model="dateRangeValue"
            />
            <span class="custom-radio"></span>
            1개월
          </label>
          <label class="input-check-box">
            <input
              type="radio"
              class="radio"
              name="view"
              value="5"
              v-model="dateRangeValue"
            />
            <span class="custom-radio"></span>
            직접지정
          </label>
        </div>
        <div class="date-box">
          <AdDate
            :disabled="dateRangeValue == '5' ? false : true"
            :dateRangeValue="dateRangeValue"
            @select:dates="handleSelectedDatesUpdated"
          />
        </div>
        <button
          class="round-btn w"
          @click="performFetch(false), initializeCheck()"
        >
          조회하기
        </button>
      </div>
    </div>

    <div v-if="userStore.getUser?.userType == '2'">
      <br />
      <div class="pocket-input-row">
        <div class="input-box">
          <span class="input-box-title"> 발급자 구분 </span>
          <div class="input-check-box-group">
            <label class="input-check-box" @change="performFetch(false)">
              <input type="radio" value="2" v-model="issuerValue" />
              <span class="custom-radio"></span>
              담당자 발급
            </label>
            <label class="input-check-box" @change="performFetch(false)">
              <input type="radio" value="3" v-model="issuerValue" />
              <span class="custom-radio"></span>
              이용자 발급
            </label>
            <label class="input-check-box" @change="performFetch(false)">
              <input type="radio" value="4" v-model="issuerValue" />
              <span class="custom-radio"></span>
              전체
            </label>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>

  <div class="result-container-top">
    <span class="result-container-count">
      <div v-if="isMobileDevice == false">
        전체 <span> {{ addCommas(totalCount) }}</span
        >건 / 선택 <span class="bl">{{ addCommas(checkedRef.length) }}</span
        >건
      </div>
    </span>
    <div class="btn-box">
      <button class="round-btn w w-auto" @click="showPopup('EXCEL')">
        <img src="@/assets/images/download-black.svg" alt="다운 아이콘" />
        엑셀
      </button>
      <button
        class="round-btn w"
        v-if="issuerValue == '1' || issuerValue == '2'"
        @click="showPopup('DEL')"
      >
        삭제
      </button>
      <button class="round-btn black" @click="showPopup('PRINT')">출력</button>
      <button class="round-btn black" @click="showPopup('DOWNLOAD')">
        <img src="@/assets/images/download.svg" alt="다운로드" />
        다운로드
      </button>
    </div>
  </div>
  <div v-if="isMobileDevice" class="result-container-top">
    <span class="result-container-count">
      전체 <span> {{ addCommas(totalCount) }}</span
      >건 / 선택 <span class="bl">{{ addCommas(checkedRef.length) }}</span
      >건
    </span>
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
            <th>발급일자</th>
            <th v-if="issuerValue == '3' || issuerValue == '4'">발급자명</th>
            <th>법인 상세 정보</th>
            <th>등기번호</th>
            <th>주말여부</th>
            <th class="t-c">열람용</th>
            <th class="t-c">제출용</th>
            <th class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              임기만료 알림
            </th>
            <th class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              즐겨찾기
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="issueCorpList.length == 0">
            <td colspan="20">데이터가 없습니다.</td>
          </tr>
          <tr v-for="(data, index) in issueCorpList" :key="index">
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
              {{ convertIssueCorpDateTime(data.issueDate) }}
            </td>
            <td v-if="issuerValue == '3' || issuerValue == '4'">
              {{ data.issuerNm }}
            </td>
            <td class="detail_text" @click="detail(data.id, data.pdfNm)">
              {{ data.corpNm }} l {{ addBarToCorpRegNumber(data.corpRegNo) }} l
              {{ data.presidentNm ? getPresidentNm(data.presidentNm) : '-'
              }}<br />
              {{ data.corpAddr }}
            </td>
            <td>{{ data.regNo }}</td>
            <td>
              {{ data.weekendYn }}
            </td>
            <td class="t-c">
              <span v-if="data.issueType === '1'">
                <span class="blue state-fill" v-if="data.issueStatus == '1'">
                  발급중</span
                >
                <span
                  v-if="data.issueStatus == '2'"
                  class="red state-fill"
                  @click="downloadPdf('CORP', data.pdfNm, false)"
                  >PDF</span
                >
                <span
                  class="gray state-fill"
                  v-if="data.issueStatus == '3'"
                  @click="showPopup('ISSUE_FAIL_ALERT', data)"
                  >실패</span
                >
              </span>
            </td>
            <td class="t-c">
              <span v-if="data.issueType === '2'">
                <span class="blue state-fill" v-if="data.issueStatus == '1'">
                  발급중</span
                >
                <span
                  v-if="data.issueStatus == '2'"
                  class="red state-fill"
                  @click="downloadPdf('CORP', data.pdfNm, false)"
                  >PDF</span
                >
                <span
                  class="gray state-fill"
                  v-if="data.issueStatus == '3'"
                  @click="showPopup('ISSUE_FAIL_ALERT', data)"
                  >실패</span
                >
              </span>
            </td>
            <td class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              <label class="switch">
                <input
                  type="checkbox"
                  name="theme"
                  id="theme"
                  v-model="data.alarmYn"
                  @click="toggleCheckboxState(data.id, index)"
                />
                <span class="slider round"></span>
              </label>
            </td>
            <td class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              <img
                v-if="data.favorite === 'Y'"
                src="@/assets/images/star.svg"
                alt="별"
                @click="changeFavorite(data.id, data.favorite)"
              />
              <img
                v-if="data.favorite === 'N'"
                src="@/assets/images/star-g.svg"
                alt="별"
                @click="changeFavorite(data.id, data.favorite)"
              />
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
        @choose:value="choosePopup"
      />
      <Pagenation
        @update:current="changePage"
        :totalCount="totalCount"
        :isFilter="true"
        ref="pagenationRef"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import Pagenation from '@/components/Pagenation.vue';
import AdDate from '@/components/AdDate.vue';
import ExcelSelectPopup from '@/components/popup/ExcelSelectPopup.vue';
import CorporateDetailPopup from '@/components/popup/CorporateDetailPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { Log } from '@/util/common';
import { useUserStore } from '@/stores/user.store';
import { get, post, get_download } from '@/util/service/request';
import {
  addCommas,
  convertIssueCorpDateTime,
  addBarToCorpRegNumber
} from '@/util/number';
import { getPresidentNm } from '@/util/common';
import {
  DEL_DATA,
  CORPORATE_EMPTY,
  ISSUE_DETAIL,
  ERROR_500,
  DOWNLOAD_FAIL,
  DEL_SUCCESS,
  ISSUE_USER_PERMISSION,
  ISSUE_FAIL_ALERT
} from '@/util/message';
import { useRouter } from 'vue-router';
import { isMobile } from '@/util/common';

const router = useRouter();
const activeTab = ref(1);
const route = useRoute();
const currentPopup = ref();
const totalCount = ref(0);
const currentPage = ref(1);
const currentSize = ref(10);
const userStore = useUserStore();
const pagenationRef = ref<any>(null);
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const dateRangeValue = ref('1');
/*  1: 일반적인 경우(개인, 이용자)
    2: 담당자(담당자 발급)
    3: 담당자(이용자 발급)
    4: 담당자(전체) */
const issuerValue = ref('1');
const selectedDates = ref<Array<Date>>([]);
const reIssueList = ref<Array<any>>([]);
const issueStatusData = ref();
const isMobileDevice = isMobile();

interface PopupItem {
  component: any;
  content: any;
}
const activePopups = ref<PopupItem[]>([]);

interface IssueCorpList {
  index: number;
  id: number;
  issueDate: string;
  pdfNm: string;
  filePath: string;
  corpNm: string;
  corpRegNo: string;
  presidentNm: string;
  corpAddr: string;
  regNo: string;
  weekendYn: string;
  issueType: string;
  alarmYn: boolean;
  favorite: string;
  issueStatus: string;
  hdShopNm: string;
  expungementType: string;
  issuerNm: string;
  issuerType: string;
}

const issueCorpList = ref<IssueCorpList[]>([]);

const performFetch = (isInit: boolean) => {
  initializeCheck();
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const dateType = dateRangeValue.value == '1' ? 'ALL' : 'DATE';
  const issuer = issuerValue.value;
  const userToken = userStore.getToken;
  const startDate = selectedDates.value[0]
    ? selectedDates.value[0].toISOString().split('T')[0]
    : getToday();
  const endDate = selectedDates.value[1]
    ? selectedDates.value[1].toISOString().split('T')[0]
    : getToday();
  const url_info = `/user/corp/issue/list?page=${page}&size=${size}&dateType=${dateType}&startDate=${startDate}&endDate=${endDate}&issuerValue=${issuer}`;
  get(url_info, {}, userToken)
    .then((_response) => {
      Log(_response.data.payload);
      issueCorpList.value = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            index:
              currentPage.value == 0
                ? index + 1
                : index + 1 + (currentPage.value - 1) * currentSize.value,
            // v-model을 위해 boolean으로 변경
            alarmYn: item.alarmYn === '1' ? true : false
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

//pdf 파일 다운로드
const downloadPdf = (pdfolder: string, pdfNm: string, isDownload: boolean) => {
  const url_info = `/user/file/download/${pdfolder}/${pdfNm}`;
  get_download(url_info, '', userStore.getToken)
    .then((_response) => {
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(
          new Blob([_response.data], { type: 'application/pdf' })
        );
        link.href = url;
        if (isDownload) {
          link.download = pdfNm;
        } else {
          link.target = '_blank';
        }
        link.click();
        window.URL.revokeObjectURL(url);
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//토글 상태 변경 (단일건)
const toggleCheckboxState = (id: number, index: number) => {
  if (issueCorpList.value[index].alarmYn) {
    issueCorpList.value[index].alarmYn = false;
    toggleAlarm(id, '2');
  } else {
    issueCorpList.value[index].alarmYn = true;
    toggleAlarm(id, '1');
  }
};

//알람 상태 변경
const toggleAlarm = (id: number, alarmYn: string) => {
  const url_info = `/user/corp/issue/alarm/${id}`;
  const userToken = userStore.getToken;

  post(url_info, alarmYn, userToken)
    .then((_response) => {
      Log(_response.data.payload.response);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

onMounted(() => {
  const queryParam = route.query.activeTab;
  if (typeof queryParam === 'string') {
    if (userStore.getUser.userType == '2') {
      issuerValue.value = '2';
    } else {
      issuerValue.value = '1';
    }
    activeTab.value = parseInt(queryParam);
  }
  performFetch(true);
});

const detail = (id: number, pdfNm: string) => {
  if (pdfNm == null) {
    return;
  }
  Log(id);
  showPopup('CORPORATE_DETAIL', id);
};

//실패 등기 재발급
const reIssueCorp = () => {
  if (issuerValue.value == '3' || issuerValue.value == '4') {
    showPopup('ISSUE_USER_PERMISSION');
    return;
  }
  const userType = userStore.getUser.userType;
  const url_info = `/user/issue/corp`;
  const list = Array.of(issueStatusData.value);
  let total = 0;
  reIssueList.value = list.map((item: any) => {
    const currentPoint: number = item.issueType === '1' ? 1000 : 1300;
    total = currentPoint + total;
    return {
      id: 0,
      attrNo: item.regNo,
      regOfficeNm: item.officeNm,
      regDivNm: item.corpType,
      corpNm: item.corpNm,
      corpRegNo: item.corpRegNo,
      hdShopNm: item.hdShopNm,
      weekendYn: item.weekendYn,
      closeYn: item.closeYn,
      usePoint: currentPoint,
      isView: item.issueType === '1' ? true : false,
      isIssue: item.issueType === '1' ? false : true,
      isChangeAlert: item.alarmYn === '1' ? true : false,
      isIncludeExpungement: item.expungementType === '1' ? false : true,
      isReIssue: true,
      issueId: item.id
    };
  });

  const params = {
    list: reIssueList.value,
    userType: userType,
    useTotPoint: total
  };
  post(url_info, params, userStore.getToken)
    .then((_response) => {
      Log(_response);
      router.go(0);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const emptyCorporate = () => {
  if (checkedRef.value.length <= 0) {
    currentPopup.value = '';
    showPopup('CORPORATE_EMPTY');
    return true;
  } else {
    return false;
  }
};

//공통 팝업
const showPopup = (popName: string, data: any = 0) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'CORPORATE_DETAIL':
      activePopups.value.push({
        component: shallowRef(CorporateDetailPopup),
        content: ISSUE_DETAIL(data, issuerValue.value)
      });
      break;
    case 'DEL':
      if (emptyCorporate()) {
        return;
      }
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_DATA
      });
      break;
    case 'PRINT':
      if (emptyCorporate()) {
        return;
      }
      openPdfInNewWindow(false);
      initializeCheck();
      break;
    case 'DOWNLOAD':
      if (emptyCorporate()) {
        return;
      }
      openPdfInNewWindow(true);
      initializeCheck();
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'DOWNLOAD_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DOWNLOAD_FAIL
      });
      break;
    case 'DEL_SUCCESS':
      router.go(0);
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_SUCCESS
      });
      break;
    case 'ISSUE_USER_PERMISSION':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_USER_PERMISSION
      });
      break;
    case 'ISSUE_FAIL_ALERT':
      issueStatusData.value = data;
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_FAIL_ALERT
      });
      break;
    case 'EXCEL':
      activePopups.value.push({
        component: shallowRef(ExcelSelectPopup),
        content: {}
      });
      break;
    case 'CORPORATE_EMPTY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CORPORATE_EMPTY
      });
      break;
    default:
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
  }
};

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  performFetch(false);
};

const closePopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const cancelPopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const confirmPopup = () => {
  switch (currentPopup.value) {
    case 'ISSUE_FAIL_ALERT':
      reIssueCorp();
      break;
    case 'DEL':
      if (checkedRef.value.length == 0) {
        return;
      } else {
        performDelete();
      }
      break;
  }
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    issueCorpList.value.forEach((value) => {
      checkedRef.value.push(value);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (issueCorpList.value.length == checkedRef.value.length) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
};

const initializeCheck = () => {
  isAllChecked.value = false;
  checkedRef.value = [];
};

const performDelete = () => {
  const delList: any[] = [];
  checkedRef.value.forEach((value) => {
    delList.push(value.id);
  });
  const url_info = `/user/corp/issue/delete`;
  post(url_info, delList, userStore.getToken)
    .then(() => {
      showPopup('DEL_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};
const openPdfInNewWindow = (isDownload: boolean) => {
  const fileList: any[] = [];
  checkedRef.value.forEach((value) => {
    const path = value.filePath;
    if (value.pdfNm) {
      fileList.push(path + value.pdfNm);
    }
  });
  const url_info = `/user/file/multiDownload`;
  post(url_info, fileList, userStore.getToken)
    .then((_response) => {
      Log(_response);
      if (_response.data.status == 200) {
        const result = _response.data.payload;
        downloadPdf(result.fileFolder, result.fileName, isDownload);
      } else if (_response.data.status == 400) {
        showPopup('DOWNLOAD_FAIL');
      }
    })
    .catch(() => {});
};

const changeFavorite = (id: number, favorite: string) => {
  const url_info = `/user/corp/issue/favorite/${id}`;
  const userToken = userStore.getToken;
  post(url_info, favorite, userToken)
    .then((_response) => {
      if (_response.data.payload.favorite == 'Y') {
        for (let i = 0; i < issueCorpList.value.length; i++) {
          if (
            issueCorpList.value[i].corpRegNo == _response.data.payload.corpRegNo
          ) {
            issueCorpList.value[i].favorite = 'N';
          }
        }
      } else {
        for (let i = 0; i < issueCorpList.value.length; i++) {
          if (
            issueCorpList.value[i].corpRegNo == _response.data.payload.corpRegNo
          ) {
            issueCorpList.value[i].favorite = 'Y';
          }
        }
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const handleSelectedDatesUpdated = (dates: Array<Date>) => {
  selectedDates.value = dates;
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;
  return dateString;
};

const downloadExcel = () => {
  const dateType = dateRangeValue.value == '1' ? 'ALL' : 'DATE';
  const issuer = issuerValue.value;
  const startDate = selectedDates.value[0]
    ? selectedDates.value[0].toISOString().split('T')[0]
    : getToday();
  const endDate = selectedDates.value[1]
    ? selectedDates.value[1].toISOString().split('T')[0]
    : getToday();
  const size = 1000;
  const url_info = `/user/corp/issue/excel?size=${size}&dateType=${dateType}&startDate=${startDate}&endDate=${endDate}&issuerValue=${issuer}`;
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
      closePopup();
      showPopup('ERROR_500');
    });
};

const downloadDetailExcel = () => {
  const dateType = dateRangeValue.value == '1' ? 'ALL' : 'DATE';
  const issuer = issuerValue.value;
  const startDate = selectedDates.value[0]
    ? selectedDates.value[0].toISOString().split('T')[0]
    : getToday();
  const endDate = selectedDates.value[1]
    ? selectedDates.value[1].toISOString().split('T')[0]
    : getToday();
  const size = 1000;
  const url_info = `/user/corp/detail/excel?size=${size}&dateType=${dateType}&startDate=${startDate}&endDate=${endDate}&issuerValue=${issuer}`;
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
      closePopup();
      showPopup('ERROR_500');
    });
};

// 선택팝업
const choosePopup = (value: string) => {
  if (value == '1') {
    downloadExcel();
  } else if (value == '2') {
    downloadDetailExcel();
  }
};
</script>

<style scoped lang="scss">
.detail_text {
  cursor: pointer;
  text-align: left;
}
</style>
