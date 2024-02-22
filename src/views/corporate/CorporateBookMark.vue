<template>
  <div class="result-container-search">
    <div class="input-box">
      <input
        type="text"
        placeholder="상호명, 법인등록번호로 검색해 주세요."
        v-model="searchText"
        @keypress.enter="getSearchList()"
      />
      <button class="result-container-search-btn" @click="getSearchList()">
        <img src="@/assets/images/search-btn.svg" alt="돋보기" />
      </button>
    </div>
  </div>
  <div class="result-container-top">
    <span class="result-container-count">
      전체 <span> {{ addCommas(totalCount) }}</span
      >건 / 선택 <span class="bl">{{ addCommas(checkedRef.length) }}</span
      >건
    </span>

    <div class="btn-box">
      <button class="round-btn w w-auto" @click="downloadExcel">
        <img src="@/assets/images/download-black.svg" alt="다운 아이콘" />
        엑셀
      </button>

      <button class="round-btn black" @click="showPopup('REISSUE')">
        <img src="@/assets/images/file2.svg" alt="파일" />
        재발급
      </button>
    </div>
  </div>
  <div class="table-scroll">
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
              <th>최근 발급일자</th>
              <th>법인 상세 정보</th>
              <th class="t-c">즐겨찾기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="favoriteList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in favoriteList" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="checked"
                  :value="data.id"
                  v-model="checkedRef"
                />
              </td>
              <td class="t-c">{{ data.index }}</td>
              <td>
                {{
                  data.issueDate
                    ? convertIssueCorpDateTime(data.issueDate)
                    : '-'
                }}
              </td>
              <td class="detail_text" @click="detail(data.issueId)">
                {{ data.corpNm }} l
                {{ addBarToCorpRegNumber(data.corpRegNo) }} l
                {{ data.regOfficeNm }}
              </td>
              <td class="t-c">
                <img
                  src="@/assets/images/star.svg"
                  alt="별"
                  @click="deleteFavorite(data.id)"
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
import { useRoute } from 'vue-router';
import Pagenation from '@/components/Pagenation.vue';
import { useUserStore } from '@/stores/user.store';
import { addCommas } from '@/util/number';
import { get, post, get_download } from '@/util/service/request';
import {
  addBarToCorpRegNumber,
  checkInputStringIsNumber,
  convertIssueCorpDateTime
} from '@/util/number';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import CorporateDetailPopup from '@/components/popup/CorporateDetailPopup.vue';
import {
  REISSUE,
  CORPORATE_EMPTY,
  ERROR_500,
  SAVE_SUCCESS,
  ISSUE_DETAIL,
  ISSUE_NOT_DETAIL
} from '@/util/message';

interface PopupItem {
  component: any;
  content: any;
}

interface FavoriteList {
  index: number;
  id: number;
  issueId: number;
  issueDate: string;
  corpNm: string;
  corpRegNo: string;
  attrNo: string;
  regOfficeNm: string;
  regDivNm: string;
  weekendYn: string;
}

const activePopups = ref<PopupItem[]>([]);
const userStore = useUserStore();
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const searchText = ref('');
const activeTab = ref(1);
const route = useRoute();
const totalCount = ref(0);
const currentPage = ref(1);
const currentSize = ref(10);
const pagenationRef = ref<any>(null);
const favoriteList = ref<FavoriteList[]>([]);
const currentPopup = ref('');

onMounted(() => {
  const queryParam = route.query.activeTab;
  if (typeof queryParam === 'string') {
    activeTab.value = parseInt(queryParam);
  }
  performFetch(true);
});

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
  const url_info = `/user/corp/favorite/list?searchType=${searchType}&searchText=${searchText}&page=${page}&size=${size}`;
  get(url_info, '', userToken)
    .then((_response) => {
      favoriteList.value = _response.data.payload.list.map(
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
    favoriteList.value.forEach((value) => {
      checkedRef.value.push(value.id);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (favoriteList.value.length == checkedRef.value.length) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
};

const initializeCheck = () => {
  isAllChecked.value = false;
  checkedRef.value = [];
};

const deleteFavorite = (id: number) => {
  const url_info = `/user/corp/favorite/delete/${id}`;
  const userToken = userStore.getToken;
  post(url_info, {}, userToken)
    .then(() => {
      initializeCheck();
      performFetch(false);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const getSearchList = () => {
  initializeCheck();
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  performFetch(true, searchTypeVal, searchTextVal);
};

const performInsert = () => {
  const url_info = `/user/corp/favorite/cart`;
  const userToken = userStore.getToken;
  const params = {
    idList: checkedRef.value
  };

  post(url_info, params, userToken)
    .then(() => {
      showPopup('SAVE_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//공통 팝업
const showPopup = (popName: string, data?: any) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'REISSUE':
      if (0 >= checkedRef.value.length) {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: CORPORATE_EMPTY
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: REISSUE
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'SAVE_SUCCESS':
      initializeCheck();
      performFetch(false);
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: SAVE_SUCCESS
      });
      break;
    case 'CORPORATE_DETAIL':
      activePopups.value.push({
        component: shallowRef(CorporateDetailPopup),
        content: ISSUE_DETAIL(data, '1')
      });
      break;
    case 'ISSUE_NOT_DETAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_NOT_DETAIL
      });
      break;
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
  switch (currentPopup.value) {
    case 'REISSUE':
      if (checkedRef.value.length == 0) {
        return;
      } else {
        performInsert();
      }
      break;
  }
  currentPopup.value = '';
};

const detail = (issueId: number) => {
  if (issueId == null) {
    showPopup('ISSUE_NOT_DETAIL');
    return;
  }
  showPopup('CORPORATE_DETAIL', String(issueId));
};

const downloadExcel = () => {
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  const size = 1000;
  const url_info = `/user/corp/favorite/excel?searchType=${searchTypeVal}&searchText=${searchTextVal}&size=${size}`;
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
.detail_text {
  cursor: pointer;
  text-align: left;
}
</style>
