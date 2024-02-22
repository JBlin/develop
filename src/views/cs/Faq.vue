<template>
  <div>
    <div class="pocket-contents-body-title">자주 묻는 질문</div>
    <ul class="qna-ul">
      <li
        class="qna-li"
        v-for="(data, index) in faqList"
        :key="index"
        @click="toggleQna(index)"
        :class="{ active: activeIndex === index }"
      >
        <span class="qna-li-q">
          <img
            src="@/assets/images/pocket-q.svg"
            alt="q아이콘"
            class="q-icon"
          />.
          <pre v-html="data.question"></pre>
          <span class="open-btn">
            <img src="@/assets/images/qna-arrow.svg" alt="아이콘" />
          </span>
        </span>
        <span
          class="qna-li-a"
          v-for="index in faqList"
          :key="'answer-' + index"
        ></span>
        <span
          class="qna-li-a-text"
          v-show="activeIndex === index"
          ref="qnaText"
        >
          <pre v-html="data.answer"></pre>
        </span>
      </li>
    </ul>

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
import { ref, onMounted, shallowRef } from 'vue';
import { get } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import { ERROR_500, NODATA_FAQ } from '@/util/message';

const userStore = useUserStore();
const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface FaqList {
  id: number;
  question: string;
  answer: string;
}

const faqList = ref<FaqList[]>([]);
const activeIndex = ref(-1);

const performFetch = () => {
  const url = `/user/customer/faq`;
  get(url, {}, userStore.getToken)
    .then((_response) => {
      if (_response.data.payload.length == 0) {
        showPopup('NODATA_FAQ');
        return;
      }
      faqList.value = _response.data.payload;
    })
    .catch(() => {
      showPopup('ERROR_500');
      return;
    });
};

function toggleQna(index: any) {
  if (activeIndex.value === index) {
    activeIndex.value = -1;
  } else {
    activeIndex.value = index;
  }
}

onMounted(() => {
  performFetch();
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
    case 'NODATA_FAQ':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: NODATA_FAQ
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
.qna {
  &-ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-li {
    background-color: #fff;
    padding: 20px 30px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    cursor: pointer;

    &-q {
      display: flex;
      align-items: center;
      font-weight: 500;
      line-height: 1.6;

      .q-icon {
        width: 20px;
      }

      .open-btn {
        position: absolute;
        right: 0;
        transition: 0.4s ease;
      }
    }

    &-a {
      // display: none;
      // border-top: 1px solid #E0E0E0;
      // padding-top: 20px;
      line-height: 1.6;
      height: 0;
      overflow: hidden;
      transition: 0.3s ease-in-out;

      &-text {
        display: block;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid #e0e0e0;
      }
    }

    &.active {
      .qna-li-q {
        .open-btn {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
