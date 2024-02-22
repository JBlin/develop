<template>
  <div>
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="result-container">
        <div class="result-container-top">
          <span class="result-container-count">
            총 <span class="c-b">{{ estateList.length }}</span
            >건
          </span>
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>알림신청일</th>
                  <th>주소</th>
                  <th>소유자</th>
                  <th>등기변경일</th>
                  <th>등기목적</th>
                  <th>처리상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="estateList.length == 0">
                  <td colspan="20">데이터가 없습니다.</td>
                </tr>
                <tr v-for="(data, index) in estateList" :key="index">
                  <td>
                    {{
                      data.alarmReqDate ? data.alarmReqDate.split(' ')[0] : '-'
                    }}
                  </td>
                  <td>
                    {{ addBarToEstateRegNumber(data.attrNo) }} l
                    {{ data.estateType }}
                    <span
                      class="state-line blue m-l-5"
                      v-if="data.status == '1'"
                      >현행</span
                    >
                    <span
                      class="state-line blue m-l-5"
                      v-if="data.status == '2'"
                      >폐쇄</span
                    >
                    <br />
                    {{ data.estateAddr }}
                  </td>
                  <td>
                    {{
                      data.estateOwnerNm
                        ? data.estateOwnerNm.split(' ')[0]
                        : '-'
                    }}
                  </td>
                  <td>{{ addBarToYearMonthDayString(data.changeDate) }}</td>
                  <td>{{ data.purpose }}</td>
                  <td>{{ data.historyStatus }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
import { onMounted, ref, shallowRef } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { useUserStore } from '@/stores/user.store';
import { get } from '@/util/service/request';
import {
  addBarToEstateRegNumber,
  addBarToYearMonthDayString
} from '@/util/number';
import { ERROR_500 } from '@/util/message';

const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const popupTitle = '등기변동사항 발생 부동산 (30일간)';
const userStore = useUserStore();

interface EstateList {
  index: number;
  id: number;
  alarmReqDate: string;
  attrNo: string;
  changeDate: string;
  estateAddr: string;
  estateOwnerNm: string;
  estateType: string;
  historyStatus: string;
  purpose: string;
  status: string;
  insDate: string;
}

const estateList = ref<EstateList[]>([]);

const emit = defineEmits<{ (e: 'close'): void }>();
const closePopup = () => {
  emit('close');
};

const performFetch = () => {
  const userToken = userStore.getToken;
  const url_info = `/user/alarm/estate/month/list`;
  get(url_info, {}, userToken)
    .then((_response) => {
      estateList.value = _response.data.payload.map(
        (item: any, index: number) => {
          return {
            ...item,
            id: index + 1
          };
        }
      );
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

onMounted(() => {
  performFetch();
});

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

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  currentPopup.value = '';
};
</script>
<style lang="scss" scoped></style>
