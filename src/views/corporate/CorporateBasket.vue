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
      <button
        v-if="isMobile() == false"
        class="round-btn w"
        @click="showPopup('MASS')"
      >
        엑셀 다건등록
      </button>
      <button
        v-if="isMobile() == false && isReserved == false"
        class="round-btn w w-auto"
        @click="corpReserved(true)"
      >
        발급예약
      </button>
      <button
        v-if="isMobile() == false && isReserved == true"
        class="round-btn blue w-auto"
        @click="corpReserved(false)"
      >
        발급예약(신청완료)
      </button>

      <button class="round-btn w" @click="showPopup('DEL')">삭제</button>
      <button class="round-btn black" @click="showPopup('CREATE')">발급</button>
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
            <th>관할등기소</th>
            <th>법인명</th>
            <th>법인등록번호</th>
            <th>등기번호</th>
            <th>법인구분</th>
            <th class="t-c">주말여부</th>
            <th class="t-c">즐겨찾기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cartList.length == 0">
            <td colspan="20">데이터가 없습니다.</td>
          </tr>
          <tr v-for="(data, index) in cartList" :key="index">
            <td>
              <input
                type="checkbox"
                @change="checked"
                :value="data.id"
                v-model="checkedRef"
              />
            </td>
            <td class="t-c">{{ data.index }}</td>
            <td>{{ data.regOfficeNm }}</td>
            <td>{{ data.corpNm }}</td>
            <td>{{ addBarToCorpRegNumber(data.corpRegNo) }}</td>
            <td>{{ data.attrNo }}</td>
            <td>{{ data.regDivNm }}</td>
            <td class="t-c">{{ data.weekendYn }}</td>
            <td class="t-c" v-if="data.favorite === 'Y'">
              <img
                src="@/assets/images/star.svg"
                alt="별"
                @click="changeFavorite(data.id, data.favorite, index)"
              />
            </td>
            <td class="t-c" v-if="data.favorite === 'N'">
              <img
                src="@/assets/images/star-g.svg"
                alt="별"
                @click="changeFavorite(data.id, data.favorite, index)"
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
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagenation from '@/components/Pagenation.vue';
import CorporateManagementPopup from '@/components/popup/CorporateManagementPopup.vue';
import CorporateMassPopup from '@/components/popup/CorporateMassPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { useUserStore } from '@/stores/user.store';
import { get, post } from '@/util/service/request';
import { isMobile } from '@/util/common';
import {
  DEL_DATA,
  CORPORATE_EMPTY,
  ERROR_500,
  DEL_SUCCESS,
  MASS_ALERT,
  MASS_ALERT_ING,
  MASS_ALERT_ALREADY,
  MASS_ALERT_COMPLETE,
  MASS_ALERT_EMPTY,
  MASS_ALERT_CANCEL,
  POINT_LACK
} from '@/util/message';
import {
  addCommas,
  addBarToCorpRegNumber,
  checkInputStringIsNumber
} from '@/util/number';

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
const currentPopup = ref('');
const router = useRouter();
const isReserved = ref(false);

interface PopupItem {
  component: any;
  content: any;
}
const activePopups = ref<PopupItem[]>([]);

interface CartList {
  index: number;
  id: number;
  corpNm: string;
  corpRegNo: string;
  attrNo: string;
  regOfficeNm: string;
  regDivNm: string;
  weekendYn: string;
  favorite: string;
}

const cartList = ref<CartList[]>([]);

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
  const url_info = `/user/corp/cart/list?searchType=${searchType}&searchText=${searchText}&page=${page}&size=${size}`;
  get(url_info, {}, userToken)
    .then((_response) => {
      cartList.value = _response.data.payload.list.map(
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

onMounted(() => {
  const queryParam = route.query.activeTab;
  if (typeof queryParam === 'string') {
    activeTab.value = parseInt(queryParam);
  }
  performFetch(true);
  getReserved();
});

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  performFetch(false, searchTypeVal, searchTextVal);
};

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'DEL':
      if (isReserved.value) {
        //showPopup('MASS_ALERT');
        if (getIsNowSchedule()) {
          showPopup('MASS_ALERT_ING'); //예약된 발급이 잰행중입니다
        } else {
          showPopup('MASS_ALERT_ALREADY'); //발급예약이 신청된 상태입니다.
        }
        return;
      }
      if (0 >= checkedRef.value.length) {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: CORPORATE_EMPTY
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_DATA
      });

      break;
    case 'CREATE':
      if (isReserved.value) {
        //showPopup('MASS_ALERT');
        if (getIsNowSchedule()) {
          showPopup('MASS_ALERT_ING'); //예약된 발급이 잰행중입니다
        } else {
          showPopup('MASS_ALERT_ALREADY'); //발급예약이 신청된 상태입니다.
        }
        return;
      }
      if (0 >= checkedRef.value.length) {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: CORPORATE_EMPTY
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(CorporateManagementPopup),
        content: checkedRef.value
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'DEL_SUCCESS':
      initializeCheck();
      performFetch(false);
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_SUCCESS
      });
      break;
    case 'MASS':
      if (isReserved.value) {
        if (getIsNowSchedule()) {
          showPopup('MASS_ALERT_ING'); //예약된 발급이 잰행중입니다
        } else {
          showPopup('MASS_ALERT_ALREADY'); //발급예약이 신청된 상태입니다.
        }
        return;
      }
      activePopups.value.push({
        component: shallowRef(CorporateMassPopup),
        content: {}
      });
      break;
    case 'MASS_ALERT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT
      });
      break;
    case 'POINT_LACK':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: POINT_LACK
      });
      break;
    case 'MASS_ALERT_ING':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT_ING
      });
      break;
    case 'MASS_ALERT_ALREADY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT_ALREADY
      });
      break;
    case 'MASS_ALERT_COMPLETE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT_COMPLETE
      });
      break;
    case 'MASS_ALERT_EMPTY':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT_EMPTY
      });
      break;
    case 'MASS_ALERT_CANCEL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: MASS_ALERT_CANCEL
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
    case 'DEL':
      if (checkedRef.value.length == 0) {
        return;
      } else {
        performDelete();
      }
      break;
  }
  currentPopup.value = '';
};

const allCheck = () => {
  isAllChecked.value = !isAllChecked.value;
  if (isAllChecked.value) {
    checkedRef.value = [];
    cartList.value.forEach((value) => {
      checkedRef.value.push(value.id);
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (cartList.value.length == checkedRef.value.length) {
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
  const url_info = `/user/corp/cart/delete`;
  const userToken = userStore.getToken;
  const params = {
    idList: checkedRef.value
  };

  post(url_info, params, userToken)
    .then(() => {
      router.go(0);
      showPopup('DEL_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const changeFavorite = (id: number, favorite: string, index: number) => {
  const url_info = `/user/corp/cart/favorite`;
  const userToken = userStore.getToken;
  const params = {
    dataId: id,
    favoriteYn: favorite
  };
  post(url_info, params, userToken)
    .then((_response) => {
      if (_response.data.payload.favoriteYn == 'Y') {
        cartList.value[index].favorite = 'N';
      } else {
        cartList.value[index].favorite = 'Y';
      }
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

// 예약하기
const corpReserved = (is: boolean) => {
  if (totalCount.value == 0) {
    showPopup('MASS_ALERT_EMPTY'); //장바구니가 비었습니다.
    return;
  }
  if (getIsNowSchedule()) {
    showPopup('MASS_ALERT_ING'); //예약된 발급이 진행중입니다.
    return;
  }

  const userType = userStore.user.userType;
  const userPoint = totalCount.value * 1000;
  const url = `/user/mass/reserved?issueType=1&isReserved=${is}&userType=${userType}&userPoint=${userPoint}`;
  post(url, {}, userStore.getToken)
    .then((_response) => {
      console.log(_response);
      if (_response.data.errorCode == 'SUCCESS') {
        if (!isReserved.value) {
          showPopup('MASS_ALERT_COMPLETE'); //발급예약이 신청되었습니다.
        } else {
          showPopup('MASS_ALERT_CANCEL'); //발급예약이 취소되었습니다.
        }
        performFetch(false);
        isReserved.value = is;
      } else if (_response.data.errorCode == 'POINT_LACK') {
        showPopup('POINT_LACK');
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

// 예약상태 가져오기
const getReserved = () => {
  const url = `/user/mass/reserved/check?issueType=1`;
  post(url, {}, userStore.getToken)
    .then((_response) => {
      isReserved.value = _response.data.payload;
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const getIsNowSchedule = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const hhmmss = hours + minutes + seconds;

  console.log('현재시각 : ' + hhmmss);

  if (hhmmss >= '180100' && hhmmss <= '235959') {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="scss" scoped></style>
