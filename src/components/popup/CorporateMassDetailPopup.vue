<template>
  <div class="window">
    <loading-overlay :content="LoadingContent" v-if="isLoading" />
    <CorporateMassPopupLayout
      :title="popupTitle"
      :type="'2'"
      @close="closePopup"
    >
      <div class="popup-body-header">
        <div class="popup-body-header-left">
          <span class="blue_text">
            * 살아있는 등기가 아닌 경우엔 개별 선택이 필요합니다. 상호를
            선택해주세요.</span
          >
          <span class="popup-body-header-title"></span>
          <span class="popup-body-header-sub-title"></span>
        </div>
        <div class="popup-body-header-date"></div>
      </div>

      <div class="result-container-top">
        <span class="result-container-count">
          전체 <span>{{ addCommas(totalCount) }}</span
          >건
        </span>

        <div class="btn-box">
          <button class="round-btn w" @click="showPopup('MASS_CORP_TEMP_DEL')">
            목록에서 삭제
          </button>
          <button class="round-btn w black" @click="closePopup">취소</button>
        </div>
      </div>
      <br />
      <div class="pocket-table-box">
        <div class="table-scroll">
          <table class="pocket-table">
            <colgroup>
              <col width="20px" />
              <col width="60px" />
              <col width="60px" />
              <col width="60px" />
              <col width="60px" />
              <col width="60px" />
              <col width="60px" />
              <col width="60px" />
            </colgroup>
            <thead class="gray">
              <tr>
                <th class="t-c">No.</th>
                <th>관할등기소</th>
                <th>법인구분</th>
                <th>본/지점</th>
                <th>등기번호</th>
                <th class="t-c">상호</th>
                <th class="t-c">주말여부</th>
                <th class="t-c">폐쇄여부</th>
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
                <td>{{ data.regOfficeNm }}</td>
                <td>{{ data.regDivNm }}</td>
                <td>
                  {{ data.hdShopNm }}
                </td>
                <td>{{ data.regSeqNo }}</td>
                <td
                  class="click"
                  @click="showPopup('MASS_CORP_TEMP_EDIT', data)"
                >
                  {{ data.dBrandNm }}
                </td>
                <td>{{ data.jumalYn }}</td>
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
import { post, del, put } from '@/util/service/request';
import CorporateMassPopupLayout from '@/components/popup/CorporateMassPopupLayout.vue';
import LoadingOverlay from '@/components/loading/Loading.vue';
import { useUserStore } from '@/stores/user.store';
import { addCommas } from '@/util/number';
import {
  ERROR_500,
  MASS_CORP_TEMP_DEL,
  MASS_CORP_TEMP_EDIT
} from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';

const popupTitle = '엑셀 다건등록(상세)';
const userStore = useUserStore();
const currentPopup = ref();
const activePopups = ref<PopupItem[]>([]);
const totalCount = ref(0);
const massList = ref<MassDto[]>([]);
const LoadingContent = ref({ text: '로딩중...' });
const isLoading = ref(false);
const props = defineProps<{ content: Props }>();
const _tempIdRef = ref(props.content._tempId);
const _corpRegNoRef = ref(props.content._corpRegNo);
const _brandNmRef = ref(props.content._brandNm);
const editDataRef = ref<MassDto>();

interface Props {
  _tempId?: string;
  _corpRegNo?: string;
  _brandNm?: string;
}

interface PopupItem {
  component: any;
  content: any;
}

interface MassDto {
  index: number;
  id: number;
  userId: number;
  tempId?: number;
  brandNm?: string;
  closeYn: string;
  corpRegNo?: string;
  dBrandNm?: string;
  hdShopNm: string;
  jumalYn: string;
  regDivNm: string;
  regOfficeNm: string;
  regSeqNo: string;
  status: string;
}

onMounted(() => {
  getCorpDetail();
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
    case 'MASS_CORP_TEMP_DEL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_CORP_TEMP_DEL(_brandNmRef.value)
      });
      break;
    case 'MASS_CORP_TEMP_EDIT':
      editDataRef.value = data;
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_CORP_TEMP_EDIT(data.dBrandNm)
      });
      break;
  }
};

const emit = defineEmits<{ (e: 'close'): void }>();

const closePopup = () => {
  emit('close');
};

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'MASS_CORP_TEMP_DEL':
      corpTempDel();
      break;
    case 'MASS_CORP_TEMP_EDIT':
      corpTempUpdate();
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

const getCorpDetail = () => {
  startLoading();
  const searchTypeVal = '1';
  const searchTextVal = _corpRegNoRef.value;
  const url_info = `/user/corp/search?searchType=${searchTypeVal}&searchText=${searchTextVal}`;
  post(url_info, {}, userStore.getToken)
    .then((_response) => {
      stopLoading();
      const list = _response.data.payload.map((item: any, index: number) => {
        return {
          ...item,
          index: index + 1,
          dBrandNm: item.brandNm
        };
      });
      massList.value = list;
      totalCount.value = list.length;
    })
    .catch(() => {
      stopLoading();
    });
};

const corpTempDel = () => {
  const url = `/user/mass/corp/temp/${_tempIdRef.value}?delType=SINGLE`;
  del(url, {}, userStore.getToken)
    .then(() => {
      closePopup();
    })
    .catch(() => {});
};

const corpTempUpdate = () => {
  const data = editDataRef.value;
  if (data != null) {
    const url = `/user/mass/corp/temp`;
    data.tempId = Number(_tempIdRef.value);
    data.corpRegNo = _corpRegNoRef.value;
    data.brandNm = _brandNmRef.value;
    data.status = '1';
    const params = {
      massList: [data]
    };
    console.log('params::', params);
    put(url, params, userStore.getToken)
      .then(() => {
        closePopup();
      })
      .catch(() => {});
  }
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
  color: #59c3ef;
  font-size: 12px;
}
.red-line {
  color: #d92d20;
}
.gray {
  background-color: #ebf0f4;
}
.click {
  cursor: pointer;
  color: #5984ff;
}
</style>
