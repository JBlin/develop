<template>
  <div>
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="popup-input-row-container">
        <div class="pocket-input-row">
          <div class="pocket-input-box">
            <div class="pocket-input-title">문의유형</div>
            <Select
              :options="selectOptions"
              @optionChange:option="optionChange"
            >
              {{ filterValue }}
            </Select>
          </div>
        </div>
        <div class="pocket-input-row">
          <div class="pocket-input-box">
            <div class="pocket-input-title">문의제목</div>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              v-model="qnaTitle"
            />
          </div>
        </div>
        <div class="pocket-input-row">
          <div class="pocket-input-box">
            <div class="pocket-input-title">문의내용</div>
            <textarea
              name=""
              id=""
              cols="100"
              placeholder="내용을 입력해 주세요."
              v-model="qnaContents"
            ></textarea>
          </div>
        </div>
        <div class="pocket-input-row">
          <div class="pocket-input-box">
            <div class="pocket-input-title">첨부파일</div>
            <div class="pocket-input-inner-box">
              <div class="pocket-input-data">
                <input
                  id="uploadRealFileName"
                  name="uploadRealFileName"
                  type="text"
                  v-model="originalFileName"
                  disabled
                />
              </div>
              <input
                id="fileUpdate"
                type="file"
                accept="image/*"
                @change="uploadFile($event)"
              />
              <label class="round-btn w update" for="fileUpdate"
                >첨부파일</label
              >
            </div>
          </div>
        </div>

        <div class="pocket-input-row" v-if="downLoadURL">
          <div class="pocket-input-box">
            <div class="pocket-input-title"></div>
            <div class="pocket-input-inner-box">
              <div class="pocket-input-data">
                <span class="attachment">
                  <a :download="editOriginalFileName" :href="downLoadURL">
                    <span class="attachment-name link">
                      {{ editOriginalFileName }}
                      <img
                        src="@/assets/images/attachment.svg"
                        alt="첨부파일 아이콘"
                      />
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div class="btn-box">
          <button class="round-btn black" @click="valueCheck">
            {{ qnaId === '0' ? '문의하기' : '수정하기' }}
          </button>
        </div>
      </div>
    </LayoutPopup>
    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :key="index"
      :content="popup.content"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>

<script setup lang="ts">
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, onMounted, shallowRef } from 'vue';
import Select from '@/components/PoSelect.vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { useUserStore } from '@/stores/user.store';
import {
  get,
  put,
  post,
  get_download,
  post_upload
} from '@/util/service/request';
import { useRouter } from 'vue-router';
import {
  ERROR_500,
  QNA_SUCCESS,
  QNA_EDIT_SUCCESS,
  QNA_CONTENT,
  QNA_TITLE,
  QNA_SELECT,
  UPLOAD_SUCCESS,
  DOWNLOAD_FAIL
} from '@/util/message';
import { Log } from '@/util/common';

const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface Props {
  title?: string;
  qnaId?: string;
}
const props = defineProps<{ content: Props }>();

const filterValue = ref('선택');
const filterString = ref('0');
const qnaTitle = ref('');
const qnaContents = ref('');
const userStore = useUserStore();
const router = useRouter();
const originalFileName = ref('');
const uploadedFileName = ref('');
const uploadedFileFolder = ref('');

const editOriginalFileName = ref('');
const editUploadedFileFolder = ref('');
const downLoadURL = ref('');
const qnaId = ref('0');
const popupTitle = ref('');
const selectOptions = ref([
  '선택',
  '이용문의',
  '포인트문의',
  '오류/불만',
  '개선사항',
  '기타'
]);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'performFetch'): void;
}>();

const closePopup = () => {
  emit('close');
};

onMounted(() => {
  qnaId.value = String(props.content.qnaId);
  popupTitle.value = String(props.content.title);
  if (qnaId.value != '0') {
    getDetail();
  }
});

const optionChange = (option: any) => {
  filterValue.value = option.option;
  switch (option.index - 1) {
    case 1:
      filterString.value = '1';
      break;
    case 2:
      filterString.value = '2';
      break;
    case 3:
      filterString.value = '3';
      break;
    case 4:
      filterString.value = '4';
      break;
    case 5:
      filterString.value = '5';
      break;
    case 6:
      filterString.value = '6';
      break;
  }
};

const uploadFile = (event: any) => {
  const url = `/user/file/upload/QNA`;
  const formData = new FormData();
  const userToken = userStore.getToken;
  formData.append('files', event.target.files[0]);
  post_upload(url, formData, userToken)
    .then((res) => {
      originalFileName.value = res.data.payload.originalFileName;
      uploadedFileName.value = res.data.payload.fileName;
      uploadedFileFolder.value = res.data.payload.fileFolder;
      showPopup('UPLOAD_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

/* 문의하기 상세 내용 */
const getDetail = () => {
  const url_info = `/user/qna/${qnaId.value}`;
  const userToken = userStore.getToken;
  get(url_info, '', userToken)
    .then((_response) => {
      Log(_response);
      const result = _response.data.payload;
      qnaTitle.value = result.title;
      qnaContents.value = result.contents;
      filterString.value = result.questionType;
      filterValue.value = selectOptions.value[result.questionType];
      if (result.fileNm) {
        downloadFile(result.fileNm);
      }
      editOriginalFileName.value = result.fileNm;
      editUploadedFileFolder.value = result.filePath;
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

const downloadFile = (fileNm: string) => {
  const url = `/user/file/download/QNA/${fileNm}`;
  get_download(url, '', userStore.getToken)
    .then((_response) => {
      Log(_response);
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        const type = _response.headers['content-type'];
        const url = window.URL.createObjectURL(
          new Blob([_response.data], { type })
        );
        downLoadURL.value = url;
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

const valueCheck = () => {
  if (filterString.value === '0') {
    showPopup('QNA_SELECT');
    return;
  } else if (qnaTitle.value === '') {
    showPopup('QNA_TITLE');
    return;
  } else if (qnaContents.value === '') {
    showPopup('QNA_CONTENT');
    return;
  }

  if (qnaId.value === '0') {
    performSubmit();
  } else {
    edit();
  }
};

const edit = () => {
  const url_info = `/user/qna`;
  const params = {
    id: `${qnaId.value}`,
    title: qnaTitle.value,
    contents: qnaContents.value,
    questionType: filterString.value,
    fileNm:
      uploadedFileName.value === ''
        ? editOriginalFileName.value
        : uploadedFileName.value,
    filePath:
      uploadedFileFolder.value === ''
        ? editUploadedFileFolder.value
        : uploadedFileFolder.value
  };

  const userToken = userStore.getToken;
  put(url_info, params, userToken)
    .then(() => {
      showPopup('QNA_EDIT_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const performSubmit = () => {
  const url_info = `/user/qna`;
  const userToken = userStore.getToken;
  const params = {
    title: qnaTitle.value,
    contents: qnaContents.value,
    questionType: filterString.value,
    fileNm: uploadedFileName.value,
    filePath: uploadedFileFolder.value
  };

  post(url_info, params, userToken)
    .then(() => {
      showPopup('QNA_SUCCESS');
    })
    .catch(() => {
      showPopup('ERROR_500');
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
    case 'QNA_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: QNA_SUCCESS
      });
      break;
    case 'QNA_EDIT_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: QNA_EDIT_SUCCESS
      });
      break;
    case 'QNA_CONTENT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: QNA_CONTENT
      });
      break;
    case 'QNA_TITLE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: QNA_TITLE
      });
      break;
    case 'QNA_SELECT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: QNA_SELECT
      });
      break;
    case 'UPLOAD_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: UPLOAD_SUCCESS
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

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'QNA_EDIT_SUCCESS':
    case 'QNA_SUCCESS':
      closePopup();
      router.go(0);
      break;
  }
  currentPopup.value = '';
};
</script>

<style lang="scss" scoped>
.popup-input-row-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .pocket-input-row {
    .pocket-input-box {
      display: flex;
      align-items: center;
      gap: 8px;

      .pocket-input-title {
        width: 138px;
        min-width: 138px;
      }

      .select-box {
        flex: 1;
      }
    }
  }

  textarea {
    width: 100%;
    min-width: 120px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    height: 200px;
    padding: 8px 12px;
    resize: none;
    flex: 1;
  }

  .btn-box {
    justify-content: center;

    .round-btn {
      width: 138px;
    }
  }
}

.attachment {
  display: flex;
  gap: 12px;
  &-title {
    font-weight: 500;
  }
  &-name {
    display: flex;
    gap: 5px;
    font-weight: 500;
    &.link {
      color: #2961ff;
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
    }
  }
}
</style>
