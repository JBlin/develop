<template>
  <div class="result-container-search">
    <div class="input-box">
      <input
        type="text"
        placeholder="주소, 부동산고유번호로 검색해 주세요."
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
            <th>부동산 고유번호</th>
            <th>구분</th>
            <th>부동산 소재지번</th>
            <th>지도보기</th>
            <th class="t-c">상태</th>
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
            <td>{{ addBarToEstateNumber(data.attrNo) }}</td>
            <td>{{ data.estateType }}</td>
            <td>{{ data.businessAddr }}</td>
            <td>
              <span
                class="state-fill green"
                @click="
                  showPopup('KAKAO_MAP', trimForKakaoAddress(data.businessAddr))
                "
                >지도</span
              >
            </td>
            <td>
              <span class="state-line"> {{ data.estateStatus }} </span>
            </td>
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
import { useRoute } from 'vue-router';
import Pagenation from '@/components/Pagenation.vue';
import RealEstateRegistrationPopup from '@/components/popup/RealEstateRegistrationPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import MapPopup from '@/components/popup/MapPopup.vue';
import { useUserStore } from '@/stores/user.store';
import { get, post } from '@/util/service/request';
import { trimForKakaoAddress } from '@/util/address';
import { useRouter } from 'vue-router';
import {
  DEL_DATA,
  MAP,
  REAL_ESTATE_EMPTY,
  ERROR_500,
  DEL_SUCCESS
} from '@/util/message';
import {
  addCommas,
  addBarToEstateNumber,
  checkInputStringIsNumber
} from '@/util/number';
import { Log } from '@/util/common';

const userStore = useUserStore();
const checkedRef = ref<any[]>([]);
const isAllChecked = ref(false);
const searchText = ref('');
const activeTab = ref(1);
const route = useRoute();
const totalCount = ref(0);
const currentPopup = ref('');
const currentPage = ref(1);
const currentSize = ref(10);
const pagenationRef = ref<any>(null);
const router = useRouter();

interface PopupItem {
  component: any;
  content: any;
}

const activePopups = ref<PopupItem[]>([]);

interface CartList {
  index: number;
  id: number;
  attrNo: string;
  businessAddr: string;
  estateStatus: string;
  estateType: string;
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
  const url_info = `/user/estate/cart/list?searchType=${searchType}&searchText=${searchText}&page=${page}&size=${size}`;
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
      cartOwner(cartList.value);
      totalCount.value = _response.data.payload.totCnt;
      if (isInit) {
        pagenationRef.value.init(totalCount.value);
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const cartOwner = (list: CartList[]) => {
  const param = {
    list: list
  };
  const url = `/user/estate/cart/owner`;
  post(url, param, userStore.getToken)
    .then((_response) => {
      Log(_response);
    })
    .catch(() => {});
};

onMounted(() => {
  const queryParam = route.query.activeTab;
  if (typeof queryParam === 'string') {
    activeTab.value = parseInt(queryParam);
  }
  performFetch(true);
});

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  const searchTextVal = searchText.value.replace(/-/g, '');
  const searchTypeVal = checkInputStringIsNumber(searchTextVal);
  performFetch(false, searchTypeVal, searchTextVal);
};

//공통 팝업
const showPopup = (popName: string, data: any = '') => {
  currentPopup.value = popName;
  switch (popName) {
    case 'KAKAO_MAP':
      activePopups.value.push({
        component: shallowRef(MapPopup),
        content: MAP(data)
      });
      break;
    case 'DEL':
      if (0 >= checkedRef.value.length) {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: REAL_ESTATE_EMPTY
        });
        return;
      } else {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: DEL_DATA
        });
        return;
      }
    case 'CREATE':
      if (0 >= checkedRef.value.length) {
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: REAL_ESTATE_EMPTY
        });
        return;
      }
      activePopups.value.push({
        component: shallowRef(RealEstateRegistrationPopup),
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
      performFetch(false);
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DEL_SUCCESS
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
  const url_info = `/user/estate/cart/delete`;
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
  const url_info = `/user/estate/cart/favorite`;
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
</script>
