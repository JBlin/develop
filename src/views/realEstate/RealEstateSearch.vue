<template>
  <loading-overlay :content="LoadingContent" v-if="isLoading" />
  <div class="pocket-contents-body-title">
    <div class="pocket-contents-body-title-box">
      부동산 검색
      <div class="tip">
        <img
          src="@/assets/images/info.svg"
          alt="open"
          @click="toggleInfoPopup"
        />
        <div class="pop-box" v-if="showInfoPopup">
          <span class="pop-title">
            검색 안내
            <button class="colse-btn" @click="toggleInfoPopup">
              <img src="@/assets/images/close-x.svg" />
            </button>
          </span>
          <div class="pop-text-box">
            <span class="pop-text">
              도로명 주소로 조회되지 않는 경우에는 지번 주소를 입력하여 검색해
              주시기 바랍니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pocket-input-row-container">
    <div class="pocket-input-row">
      <div class="pocket-input-box select-box">
        <Select
          :options="['전체', '집합건물', '토지', '건물']"
          @optionClick="(option: string) => filterTableValue = option"
          @optionChange:option="optionChange"
        >
          {{ filterTableValue }}
        </Select>
      </div>
      <div class="pocket-input-box">
        <input
          v-model="searchText"
          type="text"
          placeholder="주소를 입력해 주세요."
          @keypress.enter="searchButton()"
        />
      </div>
      <button class="round-btn black" @click="searchButton()">검색</button>
    </div>
  </div>
  <div class="result-container">
    <div class="result-container-top">
      <span class="result-container-count">
        전체 <span>{{ addCommas(totalCount) }}</span> 건 / 선택
        <span class="bl">{{ addCommas(checkedRef.length) }}</span> 건
      </span>
      <button class="round-btn bl" @click="openBasket">장바구니</button>
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
              <th>고유번호</th>
              <th>구분</th>
              <th>주소</th>
              <th>지도보기</th>
              <th>상태</th>
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
              <td>{{ addBarToEstateNumber(data.부동산고유번호) }}</td>
              <td>{{ data.구분 }}</td>
              <td>{{ data.부동산소재지번 }}</td>
              <td>
                <span
                  class="state-fill green"
                  @click="
                    showPopup(
                      'KAKAO_MAP',
                      trimForKakaoAddress(data.부동산소재지번)
                    )
                  "
                  >지도</span
                >
              </td>
              <td>
                <span class="state-line">{{ data.상태 }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagenation
          @update:current="changePage"
          :totalCount="totalCount"
          :isFilter="false"
          ref="pagenationRef"
        />
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
import { ref, shallowRef } from 'vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import Select from '@/components/PoSelect.vue';
import Pagenation from '@/components/Pagenation.vue';
import Basket from '@/components/popup/BasketPopup.vue';
import LoadingOverlay from '@/components/loading/Loading.vue';
import MapPopup from '@/components/popup/MapPopup.vue';
import { post } from '@/util/service/request';
import { addBarToEstateNumber, addCommas } from '@/util/number';
import { trimForKakaoAddress } from '@/util/address';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import {
  MAP,
  ERROR_500,
  BASKET_ESTATE,
  NO_SPECIAL_TEXT,
  SEARCH_TEXT_CHECK,
  ESTATE_SEARCH_ALERT,
  ISSUE_BASKET_LIMIT
} from '@/util/message';

const userStore = useUserStore();
const filterTableValue = ref('전체');
const showInfoPopup = ref(false);
const basketModal = ref(false);
const searchText = ref('');
const optionValue = ref('1');
const isAllChecked = ref(false);
const checkedRef = ref<any[]>([]);
const isLoading = ref(false);
const LoadingContent = ref({ text: '로딩중...' });
const currentPage = ref(1);
const currentSize = ref(10);
const totalCount = ref(0);
const pagenationRef = ref<any>(null);
const checkCount = ref(0);
const currentPopup = ref('');
const basketLimit = ref(5);

interface SearchData {
  id: number;
  부동산고유번호: string;
  구분: string;
  부동산소재지번: string;
  소유자: string;
  상태: string;
}

const searchResult = ref<SearchData[]>([]);

const addCart = () => {
  startLoading();
  const url_info = `/user/estate/cart`;
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

const toggleInfoPopup = () => {
  showInfoPopup.value = !showInfoPopup.value;
};

const openBasket = () => {
  if (checkedRef.value.length == 0) {
    showPopup('BASKET_ESTATE');
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

const optionChange = (option: any) => {
  optionValue.value = option.index;
  filterTableValue.value = option.option;
};

const searchButton = () => {
  startLoading();
  const searchTextVal = searchText.value;

  if (searchTextVal.length === 0 || searchTextVal.length <= 1) {
    showPopup('SEARCH_TEXT_CHECK', searchTextVal.length);
    return;
  }

  const regExp = /[!?@#$%^&*():;+=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
  if (regExp.test(searchTextVal)) {
    showPopup('NO_SPECIAL_TEXT');
    return;
  }

  // performCheckTotSearchCnt().then(() => {
  //   if (checkCount.value > 50000) {
  //     showPopup('ESTATE_SEARCH_ALERT');
  //   } else {
  //     performSearch(true);
  //   }
  // });
  performSearch(true);
};

const performCheckTotSearchCnt = () => {
  const searchTypeVal = filterTableValue.value;
  const currentPageVal = currentPage.value;
  const searchTextVal = searchText.value;
  const userToken = userStore.getToken;
  const url_info = `/user/estate/search?searchType=${searchTypeVal}&searchText=${searchTextVal}&pageNo=${currentPageVal}`;
  return post(url_info, {}, userToken)
    .then((_response) => {
      checkCount.value = _response.data.payload.grdTotCnt;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const performSearch = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  startLoading();
  const searchTypeVal = filterTableValue.value; // 부동산 등기는 타입을 국문으로 검색
  const currentPageVal = currentPage.value;
  const searchTextVal = searchText.value;

  const userToken = userStore.getToken;
  const url_info = `/user/estate/search?searchType=${searchTypeVal}&searchText=${searchTextVal}&pageNo=${currentPageVal}`;
  post(url_info, {}, userToken)
    .then((_response) => {
      const responseData = _response.data.payload.list.map(
        (item: any, index: number) => {
          return {
            ...item,
            id:
              currentPage.value == 0
                ? index + 1
                : index + 1 + (currentPageVal - 1) * currentSize.value
          };
        }
      );
      initializeCheck();
      searchResult.value = responseData;
      totalCount.value = parseInt(
        _response.data.payload.grdTotCnt ? _response.data.payload.grdTotCnt : 0
      );
      if (isInit) {
        pagenationRef.value.init(totalCount.value);
      }
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

interface PopupItem {
  component: any;
  content: any;
}

const activePopups = ref<PopupItem[]>([]);

const showPopup = (popName: string, data?: any) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'KAKAO_MAP':
      activePopups.value.push({
        component: shallowRef(MapPopup),
        content: MAP(data)
      });
      break;
    case 'ERROR_500':
      stopLoading();
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'BASKET_ESTATE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: BASKET_ESTATE
      });
      break;
    case 'NO_SPECIAL_TEXT':
      stopLoading();
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: NO_SPECIAL_TEXT
      });
      break;
    case 'SEARCH_TEXT_CHECK':
      stopLoading();
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: SEARCH_TEXT_CHECK(Number(data))
      });
      break;
    case 'ESTATE_SEARCH_ALERT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ESTATE_SEARCH_ALERT
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
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
  switch (currentPopup.value) {
    case 'ESTATE_SEARCH_ALERT':
      stopLoading();
      break;
  }
  currentPopup.value = '';
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  switch (currentPopup.value) {
    case 'ESTATE_SEARCH_ALERT':
      performSearch(true);
      break;
  }
  currentPopup.value = '';
};

const changePage = (current: any) => {
  currentPage.value = current.current;
  // currentSize.value = current.filterList;
  performSearch(false);
};
</script>
