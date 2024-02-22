<template>
  <div>
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="result-container">
        <div class="result-container-top">
          <span class="result-container-count">
            전체 <span class="c-b">{{ executiveList.length }}</span
            >건
          </span>
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>성명</th>
                  <th>주민번호</th>
                  <th>상호명</th>
                  <th>취임일</th>
                  <th>등기예정일</th>
                  <th class="t-c">D-DAY</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="executiveList.length == 0">
                  <td colspan="20">데이터가 없습니다.</td>
                </tr>
                <tr v-for="(data, index) in executiveList" :key="index">
                  <td>
                    <span class="name-blod">{{ data.name }}</span> <br />
                    {{ data.position }}
                  </td>
                  <td>{{ data.pin }}</td>
                  <td>{{ data.corpNm }}</td>
                  <td>
                    {{ data.appointmentDate ? data.appointmentDate : '-' }}
                  </td>
                  <td>
                    {{
                      data.estimatedRegisterDate
                        ? data.estimatedRegisterDate
                        : '-'
                    }}
                  </td>
                  <td class="t-c">
                    <span class="c-r">
                      {{
                        calculateDateInterval(data.estimatedRegisterDate)
                      }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pocket-input-box select-box"></div>
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
import { onMounted, ref, shallowRef } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { useUserStore } from '@/stores/user.store';
import { get } from '@/util/service/request';
import { calculateDateInterval } from '@/util/number';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ERROR_500 } from '@/util/message';

const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const popupTitle = '임기만료 예정인 임원 (30일내)';
const userStore = useUserStore();

interface ExecutiveList {
  index: number;
  id: number;
  issueCorpId: number;
  position: string;
  name: string;
  pin: string;
  appointmentDate: string;
  inaugurationDate: string;
  registerDate: string;
  estimatedRegisterDate: string;
  revisionCount: number;
  status: string;
  userId: number;
  alarmYn: string;
  corpNm: string;
  corpRegNo: string;
  latestAlarmDate: string;
}

const executiveList = ref<ExecutiveList[]>([]);

const emit = defineEmits<{ (e: 'close'): void }>();
const closePopup = () => {
  emit('close');
};

const performFetch = () => {
  const userToken = userStore.getToken;
  const url_info = `/user/alarm/executive/month/list`;
  get(url_info, {}, userToken)
    .then((_response) => {
      executiveList.value = _response.data.payload.map(
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

<style lang="scss" scoped>
.detail-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
</style>
