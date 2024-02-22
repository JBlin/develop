<template>
  <div class="result-container-top">
    <span class="result-container-count">
      전체 <span>{{ staffTotCntRef }}</span
      >건 / 선택 <span class="bl">{{ checkedRef.length }}</span
      >건
    </span>
    <div class="btn-box">
      <button class="round-btn w" @click="showPopup('MANAGER_CHANGE')">
        담당자 변경
      </button>
      <button class="round-btn black" @click="showPopup('STAFF_WITHDRAW')">
        이용자 탈퇴
      </button>
    </div>
  </div>
  <div class="pocket-table-box" style="margin-top: -10px">
    <div class="table-scroll">
      <table class="pocket-table">
        <colgroup>
          <col width="40px" />
          <col width="60px" />
          <col width="200px" />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @click="allCheck()"
                :checked="isAllCheckedRef"
              />
            </th>
            <th class="t-c">No.</th>
            <th>이름</th>
            <th>연락처</th>
            <th>카카오계정 이메일</th>
            <th class="t-c">총 이용 포인트 사용내역</th>
          </tr>
        </thead>
        <tbody>
          <tr class="master-tr" v-if="managerRef">
            <td colspan="2">관리자</td>
            <td>{{ managerRef.userName }}</td>
            <td>{{ managerRef.userPhone }}</td>
            <td>{{ managerRef.userEmail }}</td>
            <td class="t-c c-r">{{ addCommas(managerRef.usePoint) }}</td>
          </tr>

          <tr v-if="staffListRef.length == 0">
            <td colspan="20">데이터가 없습니다.</td>
          </tr>

          <tr v-for="(data, index) in staffListRef" :key="index">
            <td>
              <input
                type="checkbox"
                @change="checked"
                :value="data"
                v-model="checkedRef"
              />
            </td>
            <td class="t-c">{{ data.index }}</td>
            <td>{{ data.userName }}</td>
            <td>{{ data.userPhone }}</td>
            <td>{{ data.userEmail }}</td>
            <td class="t-c c-r">{{ addCommas(data.usePoint) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagenation
      @update:current="changePage"
      :totalCount="staffTotCntRef"
      :isFilter="true"
      ref="pagenationRef"
    />
  </div>
  <div class="invite-link-box">
    <div class="invite-link-box-flex">
      <img src="@/assets/images/invite-link.svg" alt="링크아이콘" />
      <div class="invite-link-title-box">
        <span class="invite-link-title">
          초대하실 분에게 링크를 전달하세요! 바로 서비스를 이용하실 수 있어요.
        </span>
        <span class="invite-link-sub-title">
          이 링크는{{ linkDateFormatRef }}(30일)까지 유효합니다.
        </span>
      </div>
    </div>
    <div class="invite-link-input-box">
      <input
        v-model="linkRef"
        type="text"
        class="invite-link-input"
        placeholder="링크 생성 버튼을 눌러 링크를 생성해주세요"
        disabled
      />
      <button
        class="invite-link-input-btn-copy round-btn black"
        @click="linkCopy()"
      >
        링크복사
      </button>
      <button
        class="invite-link-input-btn-create round-btn black"
        @click="linkCreate()"
      >
        링크생성
      </button>
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
import Pagenation from '@/components/Pagenation.vue';
import MsgAlertPopup from '@/components/popup/MsgAlertPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, onMounted, shallowRef } from 'vue';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import {
  INVITE_CREATE,
  INVITE_COPY,
  ERROR_500,
  MANAGER_CHANGE,
  MANAGER_CHANGE_FAIL,
  STAFF_WITHDRAW,
  STAFF_WITHDRAW_FAIL,
  INVITE_URL_1,
  INVITE_URL_2
} from '@/util/message';
import { get, post, put } from '@/util/service/request';
import { useRouter } from 'vue-router';
import { addCommas, convertDateFormat } from '@/util/number';
const router = useRouter();
const userStore = useUserStore();
const pagenationRef = ref<any>(null);

interface PopupItem {
  component: any;
  content: any;
}

interface staffData {
  index: number;
  purchasePoint: number;
  returnPoint: number;
  usePoint: number;
  userEmail: string;
  userId: number;
  userName: string;
  userPhone: string;
  userType: string;
}

interface linkData {
  is30: boolean;
  is15: boolean;
}
const linkDateRef = ref<linkData>({
  is30: false,
  is15: false
});
const activePopups = ref<PopupItem[]>([]);
const currentPopup = ref('');
const currentPage = ref(1);
const currentSize = ref(10);

const linkDateFormatRef = ref('');
const linkRef = ref('');
const staffListRef = ref<staffData[]>([]);
const managerRef = ref<staffData>();
const checkedRef = ref<staffData[]>([]);
const staffTotCntRef = ref(0);
const isAllCheckedRef = ref(false);

onMounted(() => {
  getList(true);
});

//이용자 관리 및 초대
const getList = (isInit: boolean) => {
  if (isInit) {
    currentPage.value = 1;
  }
  const page = currentPage.value;
  const size = currentSize.value;
  const url = `/user/login/staff?page=${page}&size=${size}`;
  get(url, {}, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        const result = res.data.payload;
        Log(result);
        staffTotCntRef.value = result.totCnt;
        managerRef.value = result.manager;
        staffListRef.value = result.list.map((item: any, index: number) => {
          return {
            ...item,
            index:
              currentPage.value == 0
                ? index + 1
                : index + 1 + (currentPage.value - 1) * currentSize.value
          };
        });

        if (isInit) {
          pagenationRef.value.init(staffTotCntRef.value);
        }

        if (result.inviteUrl != null) {
          linkRef.value = `${window.location.origin}/LoginLink?uuid=${result.inviteUrl.uuid}`;
          const lastDate = new Date(result.inviteUrl.updateDate);
          const current = new Date();
          lastDate.setDate(lastDate.getDate() + 15);
          if (current <= lastDate) {
            linkDateRef.value.is15 = true;
          }
          lastDate.setDate(lastDate.getDate() + 15);
          if (current >= lastDate) {
            linkDateRef.value.is30 = true;
          }
          linkDateFormatRef.value = linkDateFormatRef.value = convertDateFormat(
            lastDate.toISOString()
          );
        }
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

//이용자 가입링크 생성하기
const getLinkCreate = () => {
  const url = `/user/login/linkCreate`;
  post(url, {}, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        router.go(0);
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

//담당자 변경
const updateManager = () => {
  const url = `/user/login/userType?type=MANAGER&userID=${checkedRef.value[0].userId}`;
  put(url, {}, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        userStore.setUserInfo({ userType: '3' });
        router.go(-1);
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

//이용자 탈퇴
const staffWithdraw = () => {
  const url = `/user/login/staff/withdraw`;
  const params = { list: checkedRef.value };
  put(url, params, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        getList(true);
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'MANAGER_CHANGE':
      if (checkedRef.value.length < 1 || checkedRef.value.length > 1) {
        currentPopup.value = '';
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: MANAGER_CHANGE_FAIL
        });
      } else {
        Log(checkedRef.value);
        activePopups.value.push({
          component: shallowRef(MsgAlertPopup),
          content: MANAGER_CHANGE(checkedRef.value[0].userName)
        });
      }
      break;
    case 'STAFF_WITHDRAW':
      if (checkedRef.value.length < 1) {
        currentPopup.value = '';
        activePopups.value.push({
          component: shallowRef(AlertPopup),
          content: STAFF_WITHDRAW_FAIL
        });
      } else {
        activePopups.value.push({
          component: shallowRef(MsgAlertPopup),
          content: STAFF_WITHDRAW(String(checkedRef.value.length))
        });
      }
      break;

    case 'INVITE_COPY':
      activePopups.value.push({
        component: shallowRef(MsgAlertPopup),
        content: INVITE_COPY
      });
      break;
    case 'INVITE_CREATE':
      activePopups.value.push({
        component: shallowRef(MsgAlertPopup),
        content: INVITE_CREATE
      });
      break;
    case 'INVITE_URL_1':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: INVITE_URL_1
      });
      break;
    case 'INVITE_URL_2':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: INVITE_URL_2
      });
      break;

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
  currentPopup.value = '';
  activePopups.value.splice(0, 1);
};

//취소 버튼
const cancelPopup = () => {
  currentPopup.value = '';
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  const popName = currentPopup.value;
  currentPopup.value = '';
  switch (popName) {
    case 'MANAGER_CHANGE':
      updateManager();
      break;
    case 'STAFF_WITHDRAW':
      staffWithdraw();
      break;
    case 'INVITE_URL_1':
      getLinkCreate();
      break;
  }
};

const changePage = (current: any) => {
  currentPage.value = current.current;
  currentSize.value = current.filterList;
  getList(false);
};

const linkCopy = () => {
  if (linkDateRef.value.is30) {
    showPopup('INVITE_URL_2');
  } else {
    showPopup('INVITE_COPY');
    navigator.clipboard.writeText(linkRef.value);
  }
};
const linkCreate = () => {
  if (linkDateRef.value.is15) {
    showPopup('INVITE_URL_1');
  } else {
    showPopup('INVITE_CREATE');
    getLinkCreate();
  }
};

/* 체크박스 */
const allCheck = () => {
  isAllCheckedRef.value = !isAllCheckedRef.value;
  if (isAllCheckedRef.value) {
    checkedRef.value = [];
    staffListRef.value.forEach((value) => {
      if (value.userType != '2') {
        checkedRef.value.push(value);
      }
    });
  } else {
    checkedRef.value = [];
  }
};

const checked = () => {
  if (staffListRef.value.length - 1 == checkedRef.value.length) {
    isAllCheckedRef.value = true;
  } else {
    isAllCheckedRef.value = false;
  }
};
</script>
<style scoped lang="scss">
.pocket-input {
  &-title {
    line-height: 36px;
    max-width: 130px;
    flex: 1;
    &.require::after {
      padding-left: 2px;
      font-weight: 500;
      line-height: 1.5;
      content: '*';
      color: #f04438;
    }
  }

  &-box {
    height: 46px;
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      height: 36px;
    }
  }

  &-data {
    height: 46px;
    display: flex;
    gap: 10px;
    flex: 1;
    align-items: center;

    input {
      height: 36px;
    }
  }
  &-row {
    gap: 114px;

    &-container {
      border-bottom: none;
      padding-bottom: 0;
      gap: 20px;
    }
  }
}

.info-change-tab {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-container {
  gap: 20px;
}

.invite {
  &-link {
    &-box {
      height: 88px;
      padding: 20px 30px;
      background-color: #e9efff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-flex {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 600;

      &-box {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
    }

    &-input {
      height: 36px;
      border-radius: 4px 0 0 4px;
      border: 1px solid #e0e0e0;
      padding: 0 20px;
      color: #000;
      font-weight: 500;
      width: 384px;
      background-color: #fff;
      flex: 1;

      &:focus {
        outline: none;
      }

      &-box {
        display: flex;
      }

      &-btn {
        width: 100px;

        &-copy {
          border-radius: 0 4px 4px 0;
        }
        &-create {
          border-radius: 4px;
          margin-left: 4px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .invite {
    &-link {
      &-box {
        height: auto;
        padding: 20px;
        flex-direction: column;

        // text-align: center;
        &-flex {
          flex-direction: column;
          gap: 7px;
        }
      }

      &-sub-title {
        font-size: 12px;
        margin-bottom: 10px;
      }

      &-title {
        font-size: 14px;

        &-box {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 15px;
        }
      }

      &-input {
        width: 100%;
        flex: 1;
        border-radius: 3px;
        height: 36px;
        line-height: 36px;

        &-btn {
          width: 100%;
          &-copy {
            border-radius: 4px;
          }
          &-create {
            border-radius: 4px;
            margin-left: 0px;
          }
        }

        &-box {
          flex-direction: column;
          gap: 3px;
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .pocket {
    &-input {
      &-box {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        gap: 8px;
        width: 100%;

        input {
          line-height: 36px;
          flex: 1;
          width: 100%;
        }
      }

      &-data {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        gap: 8px;
        width: 100%;
      }

      &-title {
        height: auto;
        line-height: 1;
      }

      &-row {
        gap: 20px;

        .btn-box {
          flex-direction: row;
          justify-content: flex-end;
        }

        .adress-search-box {
          width: 100%;

          input {
            max-width: 100%;
          }
        }

        .adress-detail {
          max-width: 100%;
        }
      }
    }
  }
}

.master-tr {
  background-color: #fff6ed !important;
}
.update {
  margin: auto;
}
</style>
