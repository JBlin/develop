<template>
  <div class="notice-detail-view">
    <div class="notice-detail-view-header">
      <span class="notice-detail-view-title">
        {{ noticeData.title }}
        <span class="new" v-if="noticeData.isNew === '1' ? true : false">
          <img src="@/assets/images/new.svg" alt="new" /> </span
      ></span>
      <div class="notice-detail-view-right">
        <span v-if="noticeData.fileNm">
          <span class="attachment-name">
            첨부파일:
            <span class="link" @click="fileDownload(noticeData.fileNm)">{{
              noticeData.fileNm
            }}</span>
            <img src="@/assets/images/attachment.svg" alt="첨부파일 아이콘" />
          </span>
        </span>
        <span class="date"
          >등록일: {{ convertTimestampToDate(noticeData.insDate) }}</span
        >
        <span class="view">
          <img src="@/assets/images/view-grey.svg" alt="뷰아이콘" /> 조회수:
          {{ noticeData.readCnt }}
        </span>
      </div>
    </div>
    <div class="notice-detail-view-body">
      <pre v-html="noticeData.contents"></pre>
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
import { onMounted, ref, shallowRef } from 'vue';
import { convertTimestampToDate } from '@/util/number';
import { useRoute, useRouter } from 'vue-router';
import { get, post, get_download } from '@/util/service/request';
import { Log } from '@/util/common';
import { useUserStore } from '@/stores/user.store';
import { ERROR_500, DOWNLOAD_FAIL } from '@/util/message';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const currentPopup = ref('');

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface NoticeData {
  title: string;
  contents: string;
  insDate: string;
  readCnt: number;
  isNew: string;
  fileNm: string;
}

const noticeData = ref<NoticeData>({
  title: '',
  contents: '',
  insDate: '',
  readCnt: 0,
  isNew: '',
  fileNm: ''
});

onMounted(() => {
  performCount();
  performFetch();
});

/* 공지사항 조회수 증가 */
const performCount = () => {
  const url_info = `/user/customer/notice/${route.params.id}`;
  post(url_info, {}, userStore.getToken)
    .then((_response) => {
      Log('performCount', _response);
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

/* 공지사항 상세 내용 */
const performFetch = () => {
  const url_info = `/user/customer/notice/${route.params.id}`;
  get(url_info, {}, userStore.getToken)
    .then((_response) => {
      noticeData.value = _response.data.payload;
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

/* 파일 다운로드 */
const fileDownload = (fileNm: string) => {
  const url_info = `/user/file/download/NOTICE/${fileNm}`;
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
    case 'DOWNLOAD_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DOWNLOAD_FAIL
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

/* 공지사항 리스트로 돌아가기 */
const routeToList = () => {
  router.push({ path: '/pocket/Notice' });
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
