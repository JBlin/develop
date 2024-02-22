<template>
  <div class="window">
    <loading-overlay :content="LoadingContent" v-if="isLoading" />
    <CorporateMassPopupLayout
      :title="popupTitle"
      :type="'1'"
      @close="closePopup"
      @sample="getSampleFile"
    >
      <div class="popup-body-header">
        <div class="popup-body-header-left">
          <span class="red_text">
            ※ 유 의 사 항<br />
            1) 발급예약은 열람용으로 발급되며, 말소사항은 제외됩니다. (다음날
            발급등기 탭에서 확인 가능) <br />
            2) 조회된 등기사항을 확인하시고 변경이 필요한 경우 상호를 클릭하여
            팝업창에서 선택해 주세요. <br />
            3) 등기번호가 조회중일 때 창을 종료하시면 오작동이 발생할 수 있으니
            주의 바랍니다.
          </span>
          <span class="popup-body-header-title"></span>
          <span class="popup-body-header-sub-title"></span>
        </div>
        <div class="popup-body-header-date"></div>
      </div>

      <div class="result-container-top">
        <span class="result-container-count">
          전체 <span>{{ addCommas(totalCount) }}</span
          >건 ( 미처리
          <span>{{ addCommas(totalCount - successCount - failCount) }}</span
          >건 / 성공 <span>{{ addCommas(successCount) }}</span
          >건 / 실패 <span>{{ addCommas(failCount) }}</span
          >건 )
        </span>

        <div class="btn-box">
          <input
            v-show="false"
            type="file"
            ref="fileRef"
            @change="readExcel"
            @cancel="cancelExcel"
          />
          <button class="round-btn w w-auto" @click="corpExcelCheck">
            법인목록 불러오기
          </button>
          <button class="round-btn w" @click="corpSearchFor">
            등기번호 조회
          </button>
          <button class="round-btn w black" @click="corpCart">등록</button>
        </div>
      </div>
      <br />
      <div class="pocket-table-box">
        <div class="table-scroll">
          <table class="pocket-table">
            <colgroup>
              <col width="40px" />
              <col width="60px" />
              <col />
              <col width="140px" />
              <col width="60px" />
              <col width="80px" />
              <col />
              <col width="60px" />
            </colgroup>
            <thead>
              <tr>
                <th class="t-c">No.</th>
                <th>법인등록번호</th>
                <th>상호</th>
                <th>관할등기소</th>
                <th>등기번호</th>
                <th class="t-c">법인구분</th>
                <th class="t-c">상호(등기)</th>
                <th class="t-c">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="massList.length == 0">
                <td colspan="20">데이터가 없습니다.</td>
              </tr>
              <tr
                v-for="(data, index) in massList"
                :key="index"
                :class="data.status == '2' ? 'red-line' : ''"
              >
                <td class="t-c">{{ data.index }}</td>
                <td>{{ data.corpRegNo }}</td>
                <!-- <td
                  @click="data.status == '2' ? showPopup('DETAIL', data) : ''"
                  :class="data.status == '2' ? 'click' : ''"
                >
                  {{ data.brandNm }}
                </td> -->
                <td
                  @click="showPopup('DETAIL', data)"
                  :class="data.status == '2' ? 'click' : 'click_choice'"
                >
                  {{ data.brandNm }}
                </td>
                <td>{{ data.regOfficeNm }}</td>
                <td>{{ data.regSeqNo }}</td>
                <td>{{ data.regDivNm }}</td>
                <td>{{ data.dBrandNm }}</td>
                <td>{{ data.closeYn }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </CorporateMassPopupLayout>
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
import { ref, onMounted, shallowRef } from 'vue';
import { get, post, get_download, del } from '@/util/service/request';
import CorporateMassPopupLayout from '@/components/popup/CorporateMassPopupLayout.vue';
import CorporateMassDetailPopup from '@/components/popup/CorporateMassDetailPopup.vue';
import LoadingOverlay from '@/components/loading/Loading.vue';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import { addCommas } from '@/util/number';
import {
  ERROR_500,
  DOWNLOAD_FAIL,
  SAVE_SUCCESS,
  MASS_REQUIRED_VALUE,
  MASS_CORP_ERROR1,
  MASS_CORP_ERROR2,
  MASS_CORP_TEMP1,
  MASS_CORP_TEMP2
} from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';

const router = useRouter();
const popupTitle = '엑셀 다건등록';
const userStore = useUserStore();
const currentPopup = ref();
const activePopups = ref<PopupItem[]>([]);
const totalCount = ref(0);
const failCount = ref(0);
const successCount = ref(0);
const searchCount = ref(0);
const massList = ref<MassDto[]>([]);
const LoadingContent = ref({ text: '로딩중...' });
const isLoading = ref(false);
const fileRef = ref();

interface PopupItem {
  component: any;
  content: any;
}

interface MassDto {
  index: number;
  id: number;
  userId: number;
  tempId: number;
  brandNm: string;
  closeYn: string;
  corpRegNo: string;
  dBrandNm: string;
  hdShopNm: string;
  jumalYn: string;
  regDivNm: string;
  regOfficeNm: string;
  regSeqNo: string;
  status: string;
}

onMounted(() => {
  getTempCheck();
});

const showPopup = (popName: string, data: any = 0) => {
  currentPopup.value = popName;
  switch (popName) {
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
    case 'SAVE_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: SAVE_SUCCESS
      });
      break;
    case 'MASS_REQUIRED_VALUE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_REQUIRED_VALUE
      });
      break;
    case 'MASS_CORP_ERROR1':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_CORP_ERROR1
      });
      break;
    case 'MASS_CORP_TEMP1':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_CORP_TEMP1
      });
      break;
    case 'MASS_CORP_TEMP2':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_CORP_TEMP2
      });
      break;
    case 'DETAIL':
      activePopups.value.push({
        component: shallowRef(CorporateMassDetailPopup),
        content: {
          _tempId: data.tempId,
          _corpRegNo: data.corpRegNo,
          _brandNm: data.brandNm
        }
      });
      break;
  }
};

const emit = defineEmits<{ (e: 'close'): void }>();

const closePopup = () => {
  emit('close');
};

const childClose = (index: number) => {
  switch (currentPopup.value) {
    case 'DETAIL':
      getTemp();
      break;
  }
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'MASS_CORP_TEMP1':
      delTempAll();
      break;
  }
  currentPopup.value = '';
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'EDIT':
      break;
    case 'SAVE_SUCCESS':
      router.go(0);
      break;
    case 'MASS_CORP_TEMP1':
      getTemp();
      break;
    case 'MASS_CORP_TEMP2':
      fileRef.value.click();
      break;
  }
  currentPopup.value = '';
};

/* 로딩바 */
const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

//샘플엑셀파일 가져오기
const getSampleFile = () => {
  const url = `/user/mass/sample`;
  startLoading();
  get(url, {}, userStore.getToken)
    .then((_response) => {
      stopLoading();
      downloadSample(_response.data.payload.fileName);
    })
    .catch(() => {
      stopLoading();
      showPopup('ERROR_500');
    });
};

// 엑셀 샘플파일 다운로드
const downloadSample = (fileName: string) => {
  const url_info = `/user/file/download/SAMPLE/${fileName}`;
  get_download(url_info, '', userStore.getToken)
    .then((_response) => {
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(
          new Blob([_response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
        );
        link.href = url;
        link.download = 'sample';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

// 엑셀 읽기 취소
const cancelExcel = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
};

// 엑셀 읽기
const readExcel = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 2
      });
      const excelList: MassDto[] = [];

      SETP1: for (var i = 0; i < jsonData.length; i++) {
        const obj: any = {};
        const row = jsonData[i];
        for (var j = 0; j < 2; j++) {
          const value = row[j];
          if (j == 0) {
            let rValue = '';
            if (value != undefined) {
              rValue = value.toString().replace(/[/-\s\n]/gi, '');
            }
            const isFilter = corpRegNoFilter(rValue, i, row[1]);
            if (isFilter) {
              break SETP1;
            }
            obj['corpRegNo'] = rValue;
          } else if (j == 1) {
            obj['brandNm'] = value;
          }
        }
        obj['index'] = i + 1;
        excelList.push(obj);
      }

      if (excelList.length > 0) {
        createTemp(excelList);
      }
    };
    reader.onerror = (e: any) => {
      Log('onerror:', e);
    };
    reader.readAsArrayBuffer(file);
  }
  event.target.value = '';
};

//법인등록번호 필터
const corpRegNoFilter = (rValue: string, line: number, brandNm: string) => {
  const nValue: number = Number(rValue);
  if (!isNaN(nValue) && rValue.length == 13) {
    return false;
  }
  currentPopup.value = 'MASS_CORP_ERROR2';
  activePopups.value.push({
    component: shallowRef(AlertPopup),
    content: MASS_CORP_ERROR2(line, brandNm)
  });
  return true;
};

//등기번호 조회 for
const corpSearchFor = () => {
  searchCount.value = 0;
  successCount.value = 0;
  failCount.value = 0;
  if (massList.value.length <= 0) {
    showPopup('MASS_REQUIRED_VALUE');
    return;
  }
  startLoading();
  for (var i = 0; i < massList.value.length; i++) {
    corpSearch(i, massList.value[i]);
  }
};

//등기번호 조회
const corpSearch = (index: number, data: MassDto) => {
  const list: MassDto[] = [];
  list.push(data);
  const url = `/user/mass/corp/search`;
  const params = {
    massList: list
  };
  post(url, params, userStore.getToken)
    .then((_response) => {
      const mList = _response.data.payload.massList[0];
      if (mList.status == '1') {
        successCount.value = successCount.value + 1;
      } else if (mList.status == '2') {
        failCount.value = failCount.value + 1;
      }
      mList.index = index + 1;
      massList.value.splice(index, 1, mList);
      searchCount.value = searchCount.value + 1;
      if (massList.value.length == searchCount.value) {
        stopLoading();
      }
    })
    .catch(() => {
      failCount.value = failCount.value + 1;
      searchCount.value = searchCount.value + 1;
      if (massList.value.length == searchCount.value) {
        stopLoading();
      }
    });
};

//장바구니 등록
const corpCart = () => {
  const list: MassDto[] = [];
  for (var i = 0; i < massList.value.length; i++) {
    const item = massList.value[i];
    if (item.regSeqNo != null) {
      list.push(item);
    }
  }
  if (list.length <= 0) {
    showPopup('MASS_CORP_ERROR1');
    return;
  }
  const url = `/user/mass/corp/cart`;
  const params = { massList: list };
  startLoading();
  post(url, params, userStore.getToken)
    .then((_response) => {
      Log(_response);
      stopLoading();
      showPopup('SAVE_SUCCESS');
    })
    .catch(() => {
      stopLoading();
      showPopup('MASS_CORP_ERROR1');
    });
};

//임시저장 리스트
const getTemp = () => {
  successCount.value = 0;
  failCount.value = 0;

  const url = `/user/mass/corp/temp/list`;
  get(url, {}, userStore.getToken)
    .then((_response) => {
      massList.value = _response.data.payload.massList.map(
        (item: any, index: number) => {
          if (item.status == '2') {
            failCount.value = failCount.value + 1;
          } else if (item.status == '1') {
            successCount.value = successCount.value + 1;
          }
          return {
            ...item,
            index: index + 1
          };
        }
      );
      totalCount.value = massList.value.length;
    })
    .catch(() => {});
};

//임시저장 체크
const getTempCheck = () => {
  const url = `/user/mass/corp/temp/check`;
  get(url, {}, userStore.getToken)
    .then((_response) => {
      Log(_response);
      if (_response.data.payload) {
        showPopup('MASS_CORP_TEMP1');
      }
    })
    .catch(() => {});
};

const delTempAll = () => {
  const url = `/user/mass/corp/temp/0?delType=ALL`;
  del(url, {}, userStore.getToken)
    .then((_response) => {
      Log(_response);
    })
    .catch(() => {});
};

const corpExcelCheck = () => {
  if (massList.value.length > 0) {
    showPopup('MASS_CORP_TEMP2');
  } else {
    fileRef.value.click();
  }
};

//임시저장기능
const createTemp = (list: MassDto[]) => {
  const url = `/user/mass/corp/temp/create`;
  const params = { massList: list };
  post(url, params, userStore.getToken)
    .then((_response) => {
      Log(_response);
      getTemp();
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.pocket-table-box {
  margin-top: -11px;
}
.window {
  min-width: 100%;
}
.blue_text {
  color: #5984ff;
  font-size: 12px;
}
.red_text {
  color: #d92d20;
  font-size: 14px;
}
.red-line {
  color: #d92d20;
}
.click {
  cursor: pointer;
}
.click_choice {
  cursor: pointer;
  color: #5984ff;
}
</style>
