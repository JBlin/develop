<template>
  <loading-overlay :content="LoadingContent" v-if="isLoading" />
  <div class="pocket-contents-body-title">
    <div class="pocket-contents-body-title-box">
      법인 검색
      <div class="tip">
        <img
          src="@/assets/images/info.svg"
          alt="open"
          @click="togglePopup = !togglePopup"
        />
        <div class="pop-box" v-if="togglePopup">
          <span class="pop-title">
            검색 안내
            <button class="colse-btn" @click="togglePopup = !togglePopup">
              <img src="@/assets/images/close-x.svg" />
            </button>
          </span>
          <div class="pop-text-box">
            <span class="pop-text">
              1. 상호(명칭) 중 법인구분 부분을 제외한 나머지 부분만 상호입력란에
              입력하여 검색하실 수 있어요.
            </span>
            <span class="pop-sub-text">
              ‘스마트’를 검색하시면 ‘스마트 주식회사’처럼 동일한 상호의
              등기기록만 검색되며, <br />
              ‘스마트인’으로 입력하면 ‘스마트인 주식회사’, ‘스마트인 유한회사’
              등 검색어로 시작하는 상호의 등기기록이 검색돼요.
            </span>
            <span class="pop-text">
              2. 법인구분 부분을 포함한 정확한 상호(명칭)을 입력하면, 검색의
              정확도가 높아져요.
            </span>
            <span class="pop-sub-text"> 주식회사 홍길동전 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pocket-input-row-container">
    <div class="pocket-input-row">
      <div class="pocket-input-box select-box">
        <Select
          :options="['간편검색', '법인명', '법인등록번호']"
          @optionChange:option="getStatusList"
        >
          {{ filterValue.value }}
        </Select>
      </div>
      <div class="pocket-input-box">
        <input
          v-model="searchText"
          type="text"
          :placeholder="searchTextPlaceholder"
          @keypress.enter="bindNumber"
        />
      </div>
      <button class="round-btn black" @click="bindNumber">검색</button>
    </div>
  </div>
  <div class="result-container">
    <div class="result-container-top">
      <span class="result-container-count">
        전체 <span>{{ addCommas(searchResultCnt) }}</span> 건 / 선택
        <span class="bl">{{ addCommas(checkedRef.length) }}</span> 건
      </span>
      <button class="round-btn blue" @click="openBasket()">장바구니</button>
      <Basket
        v-if="basketModal"
        :basketModal="basketModal"
        :closeBasket="closeBasket"
      />
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
              <th>관할등기소</th>
              <th>법인명</th>
              <!-- <th>법인등록번호</th> -->
              <th>등기번호</th>
              <th>법인구분</th>
              <th>본/지점</th>
              <th class="t-c">주말여부</th>
              <th>폐쇄여부</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="searchResult.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr v-for="(data, index) in searchResult" :key="index">
              <td>
                <input
                  type="checkbox"
                  @change="checked"
                  :value="data"
                  v-model="checkedRef"
                />
              </td>
              <td class="t-c">{{ data.id }}</td>
              <td>{{ data.regOfficeNm }}</td>
              <td>{{ data.brandNm }}</td>
              <!-- <td>{{ data.dRegNo }}</td> -->
              <td>{{ data.regSeqNo }}</td>
              <td>{{ data.regDivNm }}</td>
              <td class="t-c">{{ data.hdShopNm }}</td>
              <td class="t-c">{{ data.jumalYn }}</td>
              <td>{{ data.closeYn }}</td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>
<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { shallowRef, ref } from 'vue';
import Select from '@/components/PoSelect.vue';
import Basket from '@/components/popup/BasketPopup.vue';
import LoadingOverlay from '@/components/loading/Loading.vue';
import { post } from '@/util/service/request';
import { addCommas } from '@/util/number';
import { Log } from '@/util/common';
import { useUserStore } from '@/stores/user.store';
import {
  ERROR_500,
  BASKET_CORP,
  SEARCH_TEXT_CHECK,
  CORP_NUMBER,
  CORP_NO_DATA,
  ISSUE_BASKET_LIMIT
} from '@/util/message';

const userStore = useUserStore();
const filterValue = ref<filterType>({ key: '0', value: '간편검색' });
const searchTextPlaceholder = ref('법인명 또는 법인등록번호로 조회하세요.');
const togglePopup = ref(false);
const basketModal = ref(false);
const searchText = ref('');
const optionValue = ref('2');
const searchResultCnt = ref(0);
const isAllChecked = ref(false);
const checkedRef = ref<any[]>([]);
const isLoading = ref(false);
const LoadingContent = ref({ text: '로딩중...' });
const currentPopup = ref('');
const basketLimit = ref(5);
const activePopups = ref<PopupItem[]>([]);

interface filterType {
  key: string;
  value: string;
}

interface PopupItem {
  component: any;
  content: any;
}

interface SearchResult {
  id: number;
  regOfficeNm: string;
  regDivCd: string;
  regOfficeCd: string;
  brandNm: string;
  dRegNo: string;
  regSeqNo: string;
  regDivNm: string;
  jumalYn: string;
  closeYn: string;
  hdShopNm: string;
}

const searchResult = ref<SearchResult[]>([]);

/* 법인 등록번호 keyup 처리 */
const bindNumber = () => {
  let search = searchText.value.replace('-', '').trim();
  const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z]/;
  if (search.length == 0) {
    searchText.value = '';
    showPopup('SEARCH_TEXT_CHECK');
    return;
  }

  switch (filterValue.value.value) {
    case '간편검색':
      if (Number(search) && search.length == 13) {
        optionValue.value = '1';
      } else {
        search = searchText.value;
        optionValue.value = '2';
      }
      break;
    case '법인명':
      search = searchText.value;
      optionValue.value = '2';
      break;
    case '법인등록번호':
      if (reg.exec(search) !== null) {
        search = search.replace(/[^0-9]/g, '');
      }
      if (!Number(search) && search.length != 13) {
        searchText.value = '';
        showPopup('CORP_NUMBER');
        return;
      }
      // 법인 등록번호 13자리 입력 시 자동으로 하이픈(-) 추가
      // search = search.replace(/(\d{6})(\d{7})/, '$1-$2');
      optionValue.value = '1';
      break;
  }
  searchText.value = '';
  performSearch(search);
};

const addCart = () => {
  LoadingContent.value = { text: '법인번호 조회 중...' };
  startLoading();
  const url_info = `/user/corp/cart`;
  const userToken = userStore.getToken;
  const checkedList = checkedRef.value;

  post(url_info, checkedList, userToken)
    .then((_response) => {
      stopLoading();
      Log('addCart', _response.data.payload);
      basketModal.value = true;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const openBasket = () => {
  if (checkedRef.value.length == 0) {
    showPopup('BASKET_CORP');
    return;
  }
  if (checkedRef.value.length > basketLimit.value) {
    showPopup('ISSUE_BASKET_LIMIT');
    return;
  }
  addCart();
};

const closeBasket = () => {
  basketModal.value = false;
};

const getStatusList = (json: any) => {
  switch (json.option) {
    case '간편검색':
      filterValue.value = { key: '0', value: '간편검색' };
      searchTextPlaceholder.value = '법인명 또는 법인등록번호로 조회하세요.';
      break;
    case '법인명':
      filterValue.value = { key: '1', value: '법인명' };
      searchTextPlaceholder.value =
        '(주), (유), (합) 등 구분어는 입력하지 마세요.';
      break;
    case '법인등록번호':
      filterValue.value = { key: '2', value: '법인등록번호' };
      searchTextPlaceholder.value = '번호와 하이픈(-)을 포함하여 입력해주세요.';
      break;
  }
};

const performSearch = (searchTextVal: string) => {
  startLoading();
  const searchTypeVal = optionValue.value;
  const url_info = `/user/corp/search?searchType=${searchTypeVal}&searchText=${searchTextVal}`;
  post(url_info, {}, userStore.getToken)
    .then((_response) => {
      if (_response.data.payload.length == 0) {
        showPopup('CORP_NO_DATA');
        return;
      }
      const responseData = _response.data.payload.map(
        (item: any, index: number) => {
          return {
            ...item,
            id: index + 1
          };
        }
      );
      initializeCheck();
      searchResult.value = responseData;
      searchResultCnt.value = _response.data.payload.length;
      stopLoading();
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

/* 체크박스 */
const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    searchResult.value.forEach((value) => {
      checkedRef.value.push(value);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (searchResult.value.length == checkedRef.value.length) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
};

const initializeCheck = () => {
  isAllChecked.value = false;
  checkedRef.value = [];
};

/* 로딩바 */
const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  isLoading.value = false;
};

const showPopup = (popName: string) => {
  if (currentPopup.value != '') {
    return;
  }
  currentPopup.value = popName;
  stopLoading();
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'BASKET_CORP':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: BASKET_CORP
      });
      break;
    case 'SEARCH_TEXT_CHECK':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: SEARCH_TEXT_CHECK(0)
      });
      break;
    case 'CORP_NUMBER':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CORP_NUMBER
      });
      break;
    case 'CORP_NO_DATA':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CORP_NO_DATA
      });
      break;
    case 'ISSUE_BASKET_LIMIT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISSUE_BASKET_LIMIT
      });
      break;
  }
};

//닫기 버튼
const closePopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  currentPopup.value = '';
};
</script>

<style lang="scss" scoped>
.table-scroll {
  height: calc(100vh - 390px);
  .pocket-table {
    padding-top: 44px;
  }
  thead {
    position: sticky;
    z-index: 1;
    background-color: #fff;
    top: 0;
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #e0e0e0;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #e0e0e0;
    }
  }
}
</style>
