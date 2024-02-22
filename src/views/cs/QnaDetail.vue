<template>
  <div class="notice-detail-view">
    <div class="notice-detail-view-header">
      <span class="notice-detail-view-title">
        {{ qnaData.title }}
      </span>
      <div class="notice-detail-view-right">
        <span v-if="qnaData.fileNm">
          <span class="attachment-name">
            첨부파일:
            <span class="link" @click="fileDownload(qnaData.fileNm)">{{
              qnaData.fileNm
            }}</span>
            <img src="@/assets/images/attachment.svg" alt="첨부파일 아이콘" />
          </span>
        </span>
        <span>분류: {{ checkQuestionType(qnaData.questionType) }}</span>
        <span class="date"
          >등록일: {{ convertTimestampToDateWithTime(qnaData.insDate) }}</span
        >
        <span>
          상태:
          <span
            :class="[
              'state-circle',
              qnaData.replyType === '1' ? 'blue' : 'red'
            ]"
          >
            {{ checkReplyType(qnaData.replyType) }}
          </span>
          <span
            v-if="qnaData.replyType === '1'"
            class="state-circle blue edit"
            @click="edit"
            ><img src="@/assets/images/edit.svg" alt="수정"
          /></span>
        </span>
      </div>
    </div>
    <div class="notice-detail-view-body">
      <pre v-html="qnaData.contents"></pre>
    </div>
    <div class="notice-detail-view-footer" v-if="qnaData.replyType == '2'">
      <div class="notice-detail-view-footer-menu">
        <span class="name"
          >{{ qnaData.adminName
          }}<span class="date">{{
            convertTimestampToDateWithTime(qnaData.replyDate)
          }}</span></span
        >
      </div>
      <div class="notice-detail-view-footer-text">
        <span>
          <img src="@/assets/images/answer.svg" />
        </span>
        <pre v-html="qnaData.replyContents"></pre>
      </div>
    </div>
    <div class="notice-detail-view-btn">
      <button @click="routeToList" class="round-btn black">목록</button>
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
import QnaPopup from '@/components/popup/QnaPopup.vue';
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { convertTimestampToDateWithTime } from '@/util/number';
import { get, get_download } from '@/util/service/request';
import { checkQuestionType, checkReplyType } from '@/util/qna';
import { useUserStore } from '@/stores/user.store';
import { ERROR_500, QNA_DATAIL } from '@/util/message';
import { Log } from '@/util/common';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface QnaData {
  title: string;
  questionType: string;
  insDate: string;
  replyType: string;
  replyDate: string;
  adminName: string;
  contents: string;
  replyContents: string;
  fileNm: string;
  filePath: string;
}

const qnaData = ref<QnaData>({
  title: '',
  questionType: '',
  insDate: '',
  replyType: '',
  replyDate: '',
  adminName: '',
  contents: '',
  replyContents: '',
  fileNm: '',
  filePath: ''
});

/* 문의하기 상세 내용 */
const performFetch = () => {
  const url_info = `/user/qna/${route.params.id}`;
  const userToken = userStore.getToken;
  get(url_info, '', userToken)
    .then((_response) => {
      Log(_response);
      qnaData.value = _response.data.payload;
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

onMounted(() => {
  performFetch();
});

const edit = () => {
  showPopup('QNA_DATAIL');
};

const routeToList = () => {
  router.push({ path: '/pocket/Qna' });
};

const fileDownload = (fileNm: string) => {
  const url_info = `/user/file/download/QNA/${fileNm}`;
  const userToken = userStore.getToken;

  get_download(url_info, '', userToken)
    .then((_response) => {
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        const type = _response.headers['content-type'];
        const url = window.URL.createObjectURL(
          new Blob([_response.data], { type })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileNm);
        document.body.appendChild(link);
        link.click();
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

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
        content: QNA_DATAIL('문의 수정하기', `${route.params.id}`)
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
}
.pocket-contents-body:first-child {
  margin-bottom: 15px;
}
.edit {
  margin-left: 5px;
  cursor: pointer;
  img {
    display: unset;
    vertical-align: text-bottom;
    width: 20px;
    height: 19px;
    filter: invert(32%) sepia(82%) saturate(4188%) hue-rotate(220deg)
      brightness(100%) contrast(102%);
  }
}

.attachment {
  display: flex;
  gap: 12px;
  margin-left: 15px;
  &-title {
    font-weight: 500;
  }
  &-name {
    display: flex;
    gap: 5px;
    font-weight: 500;
    .link {
      color: #2961ff;
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
    }
  }
}
</style>
