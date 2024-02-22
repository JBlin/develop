<template>
  <div class="result-container-search date">
    <div class="pocket-input-row">
      <div class="input-box">
        <span class="input-box-title"> 조회 기간 </span>
        <div class="input-check-box-group">
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="1" v-model="dateRangeValue" />
            <span class="custom-radio"></span>
            전체
          </label>
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="2" v-model="dateRangeValue" />
            <span class="custom-radio"></span>
            당일
          </label>
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="3" v-model="dateRangeValue" />
            <span class="custom-radio"></span>
            1주일
          </label>
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="4" v-model="dateRangeValue" />
            <span class="custom-radio"></span>
            1개월
          </label>
          <label class="input-check-box">
            <input type="radio" value="5" v-model="dateRangeValue" />
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
        <button class="round-btn w" @click="getList(false)">조회하기</button>
      </div>
    </div>
    <br v-if="userStore.getUser?.userType == '2'" />
    <div class="pocket-input-row" v-if="userStore.getUser?.userType == '2'">
      <div class="input-box">
        <span class="input-box-title"> 발급자 구분 </span>
        <div class="input-check-box-group">
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="2" v-model="issuerValue" />
            <span class="custom-radio"></span>
            담당자 발급
          </label>
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="3" v-model="issuerValue" />
            <span class="custom-radio"></span>
            이용자 발급
          </label>
          <label class="input-check-box" @change="getList(false)">
            <input type="radio" value="4" v-model="issuerValue" />
            <span class="custom-radio"></span>
            전체
          </label>
        </div>
      </div>
    </div>
    <br v-if="userStore.getUser?.userType == '2'" />
    <!-- <div class="pocket-input-row">
      <div class="input-box">
        <span class="input-box-title"> 등기 구분 </span>
        <div class="input-check-box-group">
          <label class="input-check-box">
            <input type="radio" value="ALL" v-model="estateTypeRef" />
            <span class="custom-radio"></span>
            전체
          </label>
          <label class="input-check-box">
            <input type="radio" value="B" v-model="estateTypeRef" />
            <span class="custom-radio"></span>
            건축물대장
          </label>
          <label class="input-check-box">
            <input type="radio" value="L" v-model="estateTypeRef" />
            <span class="custom-radio"></span>
            토지대장
          </label>
          <label class="input-check-box">
            <input type="radio" value="C" v-model="estateTypeRef" />
            <span class="custom-radio"></span>
            지적도
          </label>
          <label class="input-check-box">
            <input type="radio" value="P" v-model="estateTypeRef" />
            <span class="custom-radio"></span>
            토지이용계획
          </label>
        </div>
        <button class="round-btn w" @click="getList(false)">조회하기</button>
      </div>
    </div> -->
  </div>

  <div class="result-container-top">
    <span class="result-container-count">
      <div v-if="isMobileDevice == false">
        전체 <span>{{ totalCount }}</span
        >건 / 선택 <span class="bl">{{ checkedRef.length }}</span
        >건
      </div>
    </span>
    <div class="btn-box">
      <button class="round-btn w w-auto" @click="downloadExcel">
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
      전체 <span> {{ totalCount }}</span
      >건 / 선택 <span class="bl">{{ checkedRef.length }}</span
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
            <th>부동산 정보</th>
            <th class="t-c">지도 <br />보기</th>
            <th class="t-c">등본<br />구분</th>
            <th class="t-c">
              등기<br />
              부등본
            </th>
            <!-- <th class="t-c">
              건축물<br />
              대장
            </th>
            <th class="t-c">
              토지<br />
              대장
            </th>
            <th class="t-c">지적도</th>
            <th class="t-c">
              토지이용<br />
              계획
            </th> -->
            <th class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              등기변경<br />알림
            </th>
            <th class="t-c" v-if="issuerValue == '1' || issuerValue == '2'">
              즐겨찾기
            </th>
          </tr>
        </thead>

        <tbody v-if="realEsateListRef.length == 0">
          <tr>
            <td colspan="20">데이터가 없습니다.</td>
          </tr>
        </tbody>
        <tbody v-for="(data, index) in realEsateListRef" :key="index">
          <tr>
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
              {{ convertIssueEstateDateTime(data.issueDate) }}
            </td>
            <td v-if="issuerValue == '3' || issuerValue == '4'">
              {{ data.issuerNm }}
            </td>
            <td class="detail_text" @click="detail(data.id, data.issuePdf)">
              {{ addBarToEstateRegNumber(data.attrNo) }} l
              {{ data.estateType }}
              <span
                class="state-line blue m-l-5"
                v-if="data.estateStatus == '1'"
                >현행</span
              >
              <span
                class="state-line blue m-l-5"
                v-if="data.estateStatus == '2'"
                >폐쇄</span
              >
              <br />

              {{ data.estateAddr }}
            </td>
            <td>
              <span
                class="state-fill green"
                @click="
                  showPopup('KAKAO_MAP', trimForKakaoAddress(data.estateAddr))
                "
                >지도</span
              >
            </td>
            <td class="t-c">열람용</td>
            <td class="t-c">
              <span class="blue state-fill" v-if="data.issueStatus == '1'">
                발급중</span
              >
              <span
                class="red state-fill"
                v-if="data.issueStatus == '2'"
                @click="downloadPdf('ESTATE', data.issuePdf, false)"
                >PDF</span
              >
              <span
                class="gray state-fill"
                v-if="data.issueStatus == '3'"
                @click="showPopup('ISSUE_FAIL_ALERT', data)"
                >실패</span
              >
            </td>
            <!-- <td class="t-c">
              <span
                class="red state-fill"
                v-if="data.buildingInfoPdf"
                @click="downloadPdf('ESTATE', data.buildingInfoPdf, true)"
                >PDF</span
              >
            </td>
            <td class="t-c">
              <span
                class="red state-fill"
                v-if="data.landInfoPdf"
                @click="downloadPdf('ESTATE', data.landInfoPdf, true)"
                >PDF</span
              >
            </td>
            <td class="t-c">
              <span
                class="red state-fill"
                v-if="data.cadastralMapPdf"
                @click="downloadPdf('ESTATE', data.cadastralMapPdf, true)"
                >PDF</span
              >
            </td>
            <td class="t-c">
              <span
                class="red state-fill"
                v-if="data.landUsePlanPdf"
                @click="downloadPdf('ESTATE', data.landUsePlanPdf, true)"
                >PDF</span
              >
            </td> -->
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
                @click="changeFavorite(data)"
              />
              <img
                v-if="data.favorite === 'N'"
                src="@/assets/images/star-g.svg"
                alt="별"
                @click="changeFavorite(data)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <Pagenation
        @update:current="changePage"
        :totalCount="totalCount"
        :isFilter="true"
        ref="pagenationRef"
      />

      <component
        v-for="(popup, index) in activePopups"
        :is="popup.component"
        :content="popup.content"
        :key="index"
        @close="closePopup(index)"
        @cancel="cancelPopup(index)"
        @confirm="confirmPopup(index)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import Pagenation from '@/components/Pagenation.vue';
import RealEstateDetailPopup from '@/components/popup/RealEstateDetailPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import MapPopup from '@/components/popup/MapPopup.vue';
import {
  ERROR_500,
  MAP,
  ISSUE_DETAIL,
  DEL_DATA,
  DEL_SUCCESS,
  REAL_ESTATE_EMPTY,
  DOWNLOAD_FAIL,
  ISSUE_USER_PERMISSION,
  ISSUE_FAIL_ALERT
} from '@/util/message';
import { Log } from '@/util/common';
import { get, post, get_download } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import {
  convertIssueEstateDateTime,
  addBarToEstateRegNumber
} from '@/util/number';
import { trimForKakaoAddress } from '@/util/address';
import { useRouter } from 'vue-router';
import { isMobile } from '@/util/common';

interface PopupItem {
  component: any;
  content: any;
}
interface IssueEstateList {
  index: number;
  id: number;
  userId: number;
  pointId: number;
  attrNo: string;
  status: string;
  issueDate: string;
  issueType: string;
  alarmYn: boolean;
  issuePdf: string;
  buildingInfoPdf: string;
  landInfoPdf: string;
  cadastralMapPdf: string;
  landUsePlanPdf: string;
  filePath: string;
  estateType: string;
  estateAddr: string;
  estateStatus: string;
  estateOwnerName: string;
  issueStatus: string;
  favorite: string;
  issuerNm: string;
  issuerType: string;
}
const userStore = useUserStore();
const router = useRouter();
const activePopups = ref<PopupItem[]>([]);
const activeTab = ref(1);
const route = useRoute();
const currentPopup = ref();
const realEsateListRef = ref<IssueEstateList[]>([]);
const totalCount = ref(0);
const currentPage = ref(1);
const currentSize = ref(10);
const estateTypeRef = ref('ALL');
const pagenationRef = ref<any>(null);
const dateRangeValue = ref('1');
/*  1: 일반적인 경우(개인, 이용자)
    2: 담당자(담당자 발급)
    3: 담당자(이용자 발급)
    4: 담당자(전체) */
const issuerValue = ref('1');
const selectedDates = ref<Array<Date>>([]);
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const reIssueList = ref<Array<any>>([]);
const issueStatusData = ref();
const isMobileDevice = isMobile();

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
  getList(true);
});

const handleSelectedDatesUpdated = (dates: Array<Date>) => {
  selectedDates.value = dates;
};

//리스트 api
const getList = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  isAllChecked.value = false;
  const page = currentPage.value;
  const size = currentSize.value;
  // const estateType = 'ALL';
  // estateType
  // ALL => 전체
  // B => 건축물대장
  // L => 토지대장
  // C => 지적도
  // P => 토지이용계획
  // dateType => ALL 전체 OR DATE 날짜 검색
  // startDate => 시작일 AND endDate => 마지막일
  const dateType = dateRangeValue.value == '1' ? 'ALL' : 'DATE';
  const issuer = issuerValue.value;
  const startDate = selectedDates.value[0]
    ? selectedDates.value[0].toISOString().split('T')[0]
    : getToday();
  const endDate = selectedDates.value[1]
    ? selectedDates.value[1].toISOString().split('T')[0]
    : getToday();
  const url = `/user/estate/issue/list?page=${page}&size=${size}&estateType=${estateTypeRef.value}&dateType=${dateType}&startDate=${startDate}&endDate=${endDate}&issuerValue=${issuer}`;
  get(url, {}, userStore.getToken)
    .then((_response) => {
      Log(_response);
      realEsateListRef.value = _response.data.payload.list.map(
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

//데이터 삭제
const del = () => {
  const delList: any[] = [];
  checkedRef.value.forEach((value) => {
    delList.push(value.id);
  });
  const url_info = `/user/estate/issue/delete`;
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
    if (value.issuePdf) {
      fileList.push(path + value.issuePdf);
    }
    if (value.buildingInfoPdf) {
      fileList.push(path + value.buildingInfoPdf);
    }
    if (value.landInfoPdf) {
      fileList.push(path + value.landInfoPdf);
    }
    if (value.cadastralMapPdf) {
      fileList.push(path + value.cadastralMapPdf);
    }
    if (value.landUsePlanPdf) {
      fileList.push(path + value.landUsePlanPdf);
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
    .catch((error) => {
      Log(error);
    });
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;
  return dateString;
};

//토글 상태 변경 (단일건)
const toggleCheckboxState = (id: number, index: number) => {
  if (realEsateListRef.value[index].alarmYn) {
    realEsateListRef.value[index].alarmYn = false;
    toggleAlarm(id, '2');
  } else {
    realEsateListRef.value[index].alarmYn = true;
    toggleAlarm(id, '1');
  }
};

//알람 상태 변경
const toggleAlarm = (id: number, alarmYn: string) => {
  const url_info = `/user/estate/issue/alarm/${id}`;
  post(url_info, alarmYn, userStore.getToken)
    .then((_response) => {
      Log(_response.data.payload.response);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    realEsateListRef.value.forEach((value) => {
      checkedRef.value.push(value);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (realEsateListRef.value.length == checkedRef.value.length) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
};

//pdf 파일 다운로드
const downloadPdf = (pdfolder: string, pdfNm: string, isDownload: boolean) => {
  const url_info = `/user/file/download/${pdfolder}/${pdfNm}`;
  get_download(url_info, '', userStore.getToken)
    .then((_response) => {
      Log('_response', _response);
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

const detail = (id: number, issuePdf: string) => {
  if (issuePdf == null) {
    return;
  }
  Log(id);
  showPopup('REALESTATE_DATAIL', String(id));
};

const reIssueEstate = () => {
  if (issuerValue.value == '3' || issuerValue.value == '4') {
    showPopup('ISSUE_USER_PERMISSION');
    return;
  }
  const userType = userStore.getUser.userType;
  const url_info = `/user/issue/estate`;
  const list = Array.of(issueStatusData.value);
  let total = 0;
  reIssueList.value = list.map((item: any) => {
    const currentPoint: number = item.issueType === '1' ? 1000 : 1300;
    total = currentPoint + total;
    return {
      id: 0,
      attrNo: item.attrNo,
      estateType: item.estateType,
      estateStatus: item.estateStatus == '1' ? '현행' : '삭제',
      businessAddr: item.estateAddr,
      usePoint: currentPoint,
      isView: item.issueType === '1' ? true : false,
      isIssue: item.issueType === '1' ? false : true,
      isBuildingInfo: false,
      isLandInfo: false,
      isCadastralMap: false,
      isLandUsePlan: false,
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

const changeFavorite = (data: any) => {
  const url_info = `/user/estate/issue/favorite/${data.id}`;
  post(url_info, data.favorite, userStore.getToken)
    .then((_response) => {
      if (_response.data.errorCode == 'SUCCESS') {
        const isFavorite = data.favorite == 'Y' ? 'N' : 'Y';
        for (let i = 0; i < realEsateListRef.value.length; i++) {
          if (realEsateListRef.value[i].attrNo == data.attrNo) {
            realEsateListRef.value[i].favorite = isFavorite;
          }
        }
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const emptyEstate = () => {
  if (checkedRef.value.length <= 0) {
    currentPopup.value = '';
    showPopup('REAL_ESTATE_EMPTY');
    return true;
  } else {
    return false;
  }
};

//공통 팝업
const showPopup = (popName: string, data: any = 0) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'KAKAO_MAP':
      activePopups.value.push({
        component: shallowRef(MapPopup),
        content: MAP(data)
      });
      break;
    case 'REALESTATE_DATAIL':
      activePopups.value.push({
        component: shallowRef(RealEstateDetailPopup),
        content: ISSUE_DETAIL(data, issuerValue.value)
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'DEL':
      if (emptyEstate()) {
        return;
      }
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_DATA
      });
      break;
    case 'PRINT':
      if (emptyEstate()) {
        return;
      }
      openPdfInNewWindow(false);
      initializeCheck();
      break;
    case 'DOWNLOAD':
      if (emptyEstate()) {
        return;
      }
      openPdfInNewWindow(true);
      initializeCheck();
      break;
    case 'DEL_SUCCESS':
      router.go(0);
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_SUCCESS
      });
      break;
    case 'DOWNLOAD_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DOWNLOAD_FAIL
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
    case 'REAL_ESTATE_EMPTY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: REAL_ESTATE_EMPTY
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

const closePopup = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const confirmPopup = (index: number) => {
  switch (currentPopup.value) {
    case 'ISSUE_FAIL_ALERT':
      reIssueEstate();
      break;
    case 'DEL':
      del();
      break;
  }
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
  issueStatusData.value = '';
};

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  getList(false);
};

const initializeCheck = () => {
  isAllChecked.value = false;
  checkedRef.value = [];
};

const downloadExcel = () => {
  const size = 1000;
  const estateType = 'ALL';
  const dateType = dateRangeValue.value == '1' ? 'ALL' : 'DATE';
  const issuer = issuerValue.value;
  const startDate = selectedDates.value[0]
    ? selectedDates.value[0].toISOString().split('T')[0]
    : getToday();
  const endDate = selectedDates.value[1]
    ? selectedDates.value[1].toISOString().split('T')[0]
    : getToday();
  const url_info = `/user/estate/issue/excel?size=${size}&estateType=${estateType}&dateType=${dateType}&issuerValue=${issuer}&startDate=${startDate}&endDate=${endDate}`;
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

<style scoped lang="scss">
.pocket-table-box .pocket-table td {
  min-width: 52px;
  max-width: 300px;
}
.detail_text {
  cursor: pointer;
  text-align: left;
}
</style>
