<template>
  <div class="pocket-contents-body">
    <div class="pocket-contents-body-title">문의하기</div>
    <div class="result-container">
      <div class="result-container-top">
        <span class="result-container-count"> </span>
        <div class="btn-box">
          <button class="round-btn black" @click="showPopup('QNA_DATAIL')">
            문의하기
          </button>
        </div>
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
                <th>구분</th>
                <th>제목</th>
                <th>작성일</th>
                <th>답변일</th>
                <th class="t-c">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="qnaList.length == 0">
                <td colspan="20">데이터가 없습니다.</td>
              </tr>
              <tr
                v-for="(data, index) in qnaList"
                :key="index"
                @click="routeToDetail(data.id)"
              >
                <td class="t-c">{{ data.index }}</td>
                <td>{{ checkQuestionType(data.questionType) }}</td>
                <td>{{ data.title }}</td>
                <td>{{ convertTimestampToDateWithTime(data.insDate) }}</td>
                <td>
                  {{
                    data.replyDate
                      ? convertTimestampToDateWithTime(data.replyDate)
                      : '-'
                  }}
                </td>
                <td class="t-c">
                  <span
                    :class="[
                      'state-circle',
                      data.replyType === '1' ? 'blue' : 'red',
                      'm-l-5'
                    ]"
                    >{{ checkReplyType(data.replyType) }}</span
                  >
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
            :isFilter="isFilter"
            ref="pagenationRef"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AlertPopup from '@/components/popup/AlertPopup.vue';
import QnaPopup from '@/components/popup/QnaPopup.vue';
import { ref, onMounted, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { useOtherStore } from '@/stores/other.store';
import { get } from '@/util/service/request';
import Pagenation from '@/components/Pagenation.vue';
import { convertTimestampToDateWithTime } from '@/util/number';
import { checkQuestionType, checkReplyType } from '@/util/qna';
import { ERROR_500, QNA_DATAIL } from '@/util/message';

const router = useRouter();
const currentPage = ref(1);
const currentSize = ref(10);
const totalCount = ref(0);
const pagenationRef = ref<any>(null);
const isFilter = ref(true);
const targetId = ref(0);
const userStore = useUserStore();
const useOther = useOtherStore();
const currentPopup = ref('');

const routeToDetail = (id: number) => {
  targetId.value = id;
  router.push({ path: `/pocket/Qna/${id}` });
};

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface QnaList {
  id: number;
  index: number;
  questionType: string;
  title: string;
  insDate: string;
  replyDate: string;
  replyType: string;
}

const qnaList = ref<QnaList[]>([]);

const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'QNA_DATAIL':
      activePopups.value.push({
        component: shallowRef(QnaPopup),
        content: QNA_DATAIL('문의하기', '0')
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

onMounted(() => {
  if (useOther.getOther?.value == 'qnaShow') {
    useOther.setOther({ value: '' });
    showPopup('QNA_DATAIL');
  }
  performFetch(true);
});

const performFetch = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const userToken = userStore.getToken;
  const url_info = `/user/qna?page=${page}&size=${size}`;
  get(url_info, '', userToken)
    .then((_response) => {
      qnaList.value = _response.data.payload.list.map(
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
</script>

<style lang="scss" scoped>
.pocket-contents-body:first-child {
  margin-bottom: 15px;
}
</style>
