<template>
  <div class="pocket-contents-body-title">공지사항</div>
  <div class="result-container">
    <div class="result-container-top">
      <span class="result-container-count">
        전체 <span>{{ totalCount }}</span
        >건
      </span>
    </div>
    <div class="pocket-table-box">
      <div class="table-scroll">
        <table class="pocket-table">
          <colgroup>
            <col width="60px" />
          </colgroup>
          <thead>
            <tr>
              <th class="t-c">No.</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th class="t-c">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="noticeList.length == 0">
              <td colspan="20">데이터가 없습니다.</td>
            </tr>
            <tr
              v-for="(data, index) in noticeList"
              :key="index"
              @click="routeToDetail(data.id)"
            >
              <td class="t-c">{{ data.index }}</td>
              <td>
                <span class="notice-title">
                  {{ data.title }}
                  <span class="new" v-if="data.isNew === '1' ? true : false">
                    <img src="@/assets/images/new.svg" alt="new" /> </span
                ></span>
              </td>
              <td>{{ data.adminName }}</td>
              <td>{{ convertTimestampToDate(data.insDate) }}</td>
              <td class="t-c">{{ data.readCnt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagenation
          @update:current="changePage"
          :totalCount="totalCount"
          :isFilter="isFilter"
          ref="pagenationRef"
        />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import Pagenation from '@/components/Pagenation.vue';
import { useRouter } from 'vue-router';
import { get } from '@/util/service/request';
import { convertTimestampToDate } from '@/util/number';
import { useUserStore } from '@/stores/user.store';
import { ERROR_500 } from '@/util/message';

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const router = useRouter();
const currentPage = ref(1);
const currentSize = ref(10);
const totalCount = ref(0);
const pagenationRef = ref<any>(null);
const isFilter = ref(true);
const targetId = ref(0);
const userStore = useUserStore();
const currentPopup = ref('');

const routeToDetail = (id: number) => {
  targetId.value = id;
  router.push({ path: `/pocket/Notice/${id}` });
};

interface NoticeList {
  id: number;
  index: number;
  title: string;
  contents: string;
  adminName: string;
  insDate: string;
  readCnt: number;
  isNew: string;
}

const noticeList = ref<NoticeList[]>([]);

const performFetch = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const url_info = `/user/customer/notice?page=${page}&size=${size}`;
  get(url_info, {}, userStore.getToken)
    .then((_response) => {
      noticeList.value = _response.data.payload.list.map(
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
      return;
    });
};

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  performFetch(false);
};

onMounted(() => {
  performFetch(true);
});

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
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
</script>

<style lang="scss" scoped>
.mo-table {
  .date,
  .view {
    color: #73777a;
    font-size: 11px;
  }

  .view {
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
}
</style>
