<template>
  <div class="dashboard">
    <div class="dashboard-left">
      <div class="dashboard-flex">
        <div class="dashboard-item" @click="routeToAnotherPage(1)">
          <div class="dashboard-title">임기만료 예정인 임원 (30일내)</div>
          <div class="alram-count">
            <span class="num">{{ addCommas(corpAlarmCnt) }}</span>
            <span class="text">건</span>
            <img src="@/assets/images/count-arrow.svg" alt="화살표" />
          </div>
        </div>
        <div class="dashboard-item" @click="routeToAnotherPage(2)">
          <div class="dashboard-title">등기변동사항 발생 부동산 (30일간)</div>
          <div class="alram-count">
            <span class="num">{{ addCommas(estateAlarmCnt) }} </span>
            <span class="text">건</span>
            <img src="@/assets/images/count-arrow.svg" alt="화살표" />
          </div>
        </div>
      </div>
      <div class="dashboard-item po-rel">
        <FullCalendar
          ref="fullCalendarRef"
          :options="calendarOptions"
          class="custom-calendar pocket-calendar"
        >
        </FullCalendar>
        <div class="pocket-calendar-tip">
          <span>
            <span class="circle-icon blue"></span>
            법인 임기만료
          </span>
          <span>
            <span class="circle-icon red"></span>
            부동산 등기변경
          </span>
        </div>
      </div>
      <div class="dashboard-item">
        <div class="dashboard-item-header">
          <div class="dashboard-title">확인사항</div>
        </div>
        <div class="pocket-table-box">
          <table class="pocket-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>대상일자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="currentCalendarList.length == 0">
                <td colspan="2">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in currentCalendarList" :key="index">
                <td>{{ data.contents }}</td>
                <td v-if="data.contents == '법인 임기만료'">
                  {{ data.corpNm }} || {{ data.corpRegNo }}||
                  {{ data.position }} {{ data.name }}
                </td>
                <td v-if="data.contents == '부동산 등기변경'">
                  {{ data.estateOwnerNm }} || {{ data.estateAddr }}
                </td>
                <td>{{ convertTimestampToDate(data.start) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="dashboard-right">
      <div class="dashboard-item">
        <div class="dashboard-item-header">
          <div class="dashboard-title">즐겨찾는 법인 등기</div>
          <button class="dashboard-btn" @click="routeToAnotherPage(3)">
            <span class="num">{{ favoriteCorpCnt }}</span
            >건
            <img src="@/assets/images/btn-arrow.svg" alt="화살표" />
          </button>
        </div>
        <div class="pocket-table-box">
          <table class="pocket-table">
            <thead>
              <tr>
                <th>법인명</th>
                <th class="num">법인등록번호</th>
                <!-- <th>구분</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-if="favoriteCorpList.length == 0">
                <td colspan="2">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in favoriteCorpList" :key="index">
                <td>{{ data.corpNm }}</td>
                <td class="num">{{ addBarToCorpRegNumber(data.corpRegNo) }}</td>
                <!-- <td>{{ data.issueType }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="dashboard-item">
        <div class="dashboard-item-header">
          <div class="dashboard-title">즐겨찾는 부동산 등기</div>
          <button class="dashboard-btn" @click="routeToAnotherPage(4)">
            <span class="t-l">{{ favoriteEstateCnt }}</span
            >건
            <img src="@/assets/images/btn-arrow.svg" alt="화살표" />
          </button>
        </div>
        <div class="pocket-table-box">
          <table class="pocket-table">
            <thead>
              <tr>
                <th>주소</th>
                <th>구분</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="favoriteEstateList.length == 0">
                <td colspan="2">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in favoriteEstateList" :key="index">
                <td class="t-l">
                  {{ trimAddress(data.businessAddr) }}
                </td>
                <td>{{ data.estateType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="dashboard-item">
        <div class="dashboard-item-header">
          <div class="dashboard-title">장바구니</div>
          <div class="tab-box">
            <div
              class="tab-btn"
              :class="{ active: activeTab === 'corporate' }"
              @click="changeTab('corporate')"
            >
              법인
            </div>
            <div
              class="tab-btn"
              :class="{ active: activeTab === 'realEstate' }"
              @click="changeTab('realEstate')"
            >
              부동산
            </div>
          </div>
          <!-- 2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가-->
          <button class="dashboard-btn" @click="routeToAnotherPage(6)">
            <span class="t-l" v-if="activeTab == 'corporate'">
              {{ cartCorpCnt }}
            </span>
            <span class="t-l" v-if="activeTab == 'realEstate'">
              {{ cartEstateCnt }} </span
            >건
            <img src="@/assets/images/btn-arrow.svg" alt="화살표" />
          </button>
        </div>
        <div class="pocket-table-box">
          <table class="pocket-table" v-if="activeTab == 'corporate'">
            <thead>
              <tr>
                <th>관할등기소</th>
                <th>법인명</th>
                <th>법인등록번호</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartCorpList.length == 0">
                <td colspan="3">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in cartCorpList" :key="index">
                <td>{{ data.regOfficeNm }}</td>
                <td>{{ data.corpNm }}</td>
                <td class="t-l">{{ addBarToCorpRegNumber(data.corpRegNo) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="pocket-table" v-if="activeTab == 'realEstate'">
            <thead>
              <tr>
                <th>부동산고유번호</th>
                <th>구분</th>
                <th>주소</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartEstateList.length == 0">
                <td colspan="3">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in cartEstateList" :key="index">
                <td>{{ addBarToEstateNumber(data.attrNo) }}</td>
                <td>{{ data.estateType }}</td>
                <td class="t-l">{{ trimAddress(data.businessAddr) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 문의하기 -->
      <div class="dashboard-item">
        <div class="dashboard-item-header">
          <div class="dashboard-title">문의하기</div>
          <button class="dashboard-btn" @click="routeToAnotherPage(5)">
            글쓰기
          </button>
        </div>
        <div class="pocket-table-box">
          <table class="pocket-table">
            <thead>
              <tr>
                <th>일시</th>
                <th>제목</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="qnaList.length == 0">
                <td colspan="3">데이터가 없습니다.</td>
              </tr>
              <tr v-for="(data, index) in qnaList" :key="index">
                <td>{{ convertTimestampToDate(data.insDate) }}</td>
                <td class="t-l">{{ data.title }}</td>
                <td>
                  <span class="state-처리완료 👍 line red">
                    {{ checkReplyType(data.replyType) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <span class="copyright">ⓒ bizbee. All rights reserved.</span>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { trimAddress } from '@/util/address';
import {
  addCommas,
  convertTimestampToDate,
  addBarToEstateNumber,
  addBarToCorpRegNumber
} from '@/util/number';
import { checkReplyType } from '@/util/qna';
import { useUserStore } from '@/stores/user.store';
import { useOtherStore } from '@/stores/other.store';
import { get } from '@/util/service/request';
import { CalendarOptions } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Log } from '@/util/common';

const router = useRouter();
const corpAlarmCnt = ref(0);
const estateAlarmCnt = ref(0);
const favoriteCorpCnt = ref(0);
const favoriteEstateCnt = ref(0);
const cartCorpCnt = ref(0); //2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가
const cartEstateCnt = ref(0); //2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가
const userStore = useUserStore();
const useOther = useOtherStore();
const activeTab = ref('corporate');
const fullCalendarRef = ref();

interface FavoriteCorpList {
  corpNm: string;
  corpRegNo: string;
  issueType: string;
}

interface FavoriteEstateList {
  attrNo: string;
  businessAddr: string;
  estateType: string;
}

interface QnaList {
  insDate: string;
  title: string;
  replyType: string;
}

interface CartCorpList {
  regOfficeNm: string;
  corpNm: string;
  corpRegNo: string;
}

interface CartEstateList {
  attrNo: string;
  estateType: string;
  businessAddr: string;
}

interface CalendarList {
  title: string;
  start: string;
  contents: string;
  corpNm: string;
  corpRegNo: string;
  position: string;
  name: string;
  estateOwnerNm: string;
  estateAddr: string;
}

const favoriteCorpList = ref<FavoriteCorpList[]>([]);
const favoriteEstateList = ref<FavoriteEstateList[]>([]);
const qnaList = ref<QnaList[]>([]);
const cartCorpList = ref<CartCorpList[]>([]);
const cartEstateList = ref<CartEstateList[]>([]);
const calendarList = ref<CalendarList[]>([]);
const currentCalendarList = ref<CalendarList[]>([]);

const changeTab = (tab: string) => {
  activeTab.value = tab;
};

onMounted(() => {
  performFetch();
  performCalendar(new Date());
});

const routeToAnotherPage = (number: number) => {
  switch (number) {
    case 1: //법원 임원임기만료 알림
      router.push({ path: '/pocket/ExpirationAlarm' });
      break;
    case 2: //부동산 등기변동 알림
      router.push({ path: '/pocket/ChangeAlarm' });
      break;
    case 3: //즐겨찾는 법인 등기
      router.push({
        path: '/pocket/CorporateManagement',
        query: { activeTab: 3 }
      });
      break;
    case 4: //즐겨찾는 부동산 등기
      router.push({
        path: '/pocket/RealEstateManagement',
        query: { activeTab: 3 }
      });
      break;
    case 5: // 문의하기
      useOther.setOther({ value: 'qnaShow' });
      router.push({ path: '/pocket/Qna' });
      break;
    case 6: //법인/부동산등기 - 장바구니 바로가기 - 2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가
      if (activeTab.value == 'corporate') {
        //법인등기 장바구니
        router.push({
          path: '/pocket/CorporateManagement',
          query: { activeTab: 1 }
        });
      } else {
        //부동산등기 장바구니
        router.push({
          path: '/pocket/RealEstateManagement',
          query: { activeTab: 1 }
        });
      }
  }
};

const performFetch = () => {
  const userToken = userStore.getToken;
  const url_info = `/user/main`;
  get(url_info, {}, userToken)
    .then((_response) => {
      corpAlarmCnt.value = _response.data.payload.corpAlarmCnt;
      estateAlarmCnt.value = _response.data.payload.estateAlarmCnt;
      favoriteCorpCnt.value = _response.data.payload.favoriteCorpCnt;
      favoriteCorpList.value = _response.data.payload.favoriteCorpList;
      favoriteEstateCnt.value = _response.data.payload.favoriteEstateCnt;
      favoriteEstateList.value = _response.data.payload.favoriteEstateList;
      qnaList.value = _response.data.payload.qnaList;
      cartCorpCnt.value = _response.data.payload.cartCorpCnt; //2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가
      cartEstateCnt.value = _response.data.payload.cartEstateCnt; //2023.12.06 윤종경 대시보드 장바구니 바로가기 기능 추가
      cartCorpList.value = _response.data.payload.cartCorpList;
      cartEstateList.value = _response.data.payload.cartEstateList;
    })
    .catch(() => {
      return;
    });
};

const performCalendar = (day: any) => {
  const userToken = userStore.getToken;
  const url_info = `/user/main/calendar?date=${
    day.toISOString().split('T')[0]
  }`;

  get(url_info, {}, userToken)
    .then((_response) => {
      calendarList.value = _response.data.payload.calendarList.map(
        (item: any, index: number) => {
          return {
            ...item,
            id: index,
            title: index
          };
        }
      );
      calendarOptions.events = calendarList.value;
    })
    .catch(() => {
      return;
    });
};

const calendarOptions = reactive<CalendarOptions>({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  locale: 'ko',
  dayCellContent: ({ date }) => date.getDate(),
  expandRows: true,
  customButtons: {
    prev: {
      click: function () {
        const calendarApi = fullCalendarRef.value.getApi();
        calendarApi.prev();
        const pre = calendarApi.getDate();
        pre.setDate(pre.getDate() + 1);
        performCalendar(pre);
      }
    },
    next: {
      click: function () {
        const calendarApi = fullCalendarRef.value.getApi();
        calendarApi.next();
        const next = calendarApi.getDate();
        next.setDate(next.getDate() + 1);
        performCalendar(next);
      }
    }
  },
  headerToolbar: {
    right: '',
    left: 'title,prev,next'
  },
  dateClick(info) {
    getCurrentDate(info.date);
  },
  eventClick(info) {
    getCurrentDate(info.event.start);
  },
  eventContent(info) {
    return;
  },
  moreLinkContent(info) {
    return info.shortText;
  },
  moreLinkClick(info) {
    getCurrentDate(info.date);
    return 'none';
  },
  eventOrder: 'id',
  events: [],
  dayMaxEventRows: true,
  views: {
    dayGrid: { dayMaxEventRows: 3 }
  }
});
const getCurrentDate = (current: any) => {
  const currentDate = new Date(current);
  currentCalendarList.value = calendarList.value.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getDate() === currentDate.getDate()
    );
  });
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  gap: 20px;
  align-items: baseline;

  &-btn {
    height: 30px;
    padding: 0 15px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 15px;
    gap: 2px;

    &:hover {
      background-color: #f5f5f5;
    }

    .num {
      font-size: 14px;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
  }

  &-flex {
    display: flex;
    gap: 20px;
  }

  &-item {
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    padding: 25px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);

    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;
    }
  }

  &-left {
    .dashboard-flex {
      height: 152px;

      > div {
        flex: 1;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .alram-count {
          align-self: flex-end;
          display: flex;
          align-items: flex-end;

          .num {
            font-size: 32px;
            font-weight: 700;
            display: flex;
            margin-right: 5px;
            line-height: 1.2;
          }

          .text {
            line-height: 1.6;
            font-size: 18px;
          }

          img {
            top: -5px;
          }
        }
      }
    }

    > .dashboard-item {
      height: 563px;
    }

    > .dashboard-item:nth-child(3) {
      height: 100%;
    }
  }

  &-title {
    font-size: 17px;
    font-weight: 600;
  }

  .pocket-table {
    min-width: auto;

    tr {
      text-align: center;
    }

    .t-l {
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 250px;
    }
  }
}

.copyright {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  color: #73777a;
  font-size: 11px;
  display: none;
}

@media (max-width: 768px) {
  .pocket-wrap {
    .dashboard {
      gap: 15px;
      margin: 0 20px;

      > div {
        gap: 15px;
      }

      &-flex {
        flex-direction: column;
      }

      &-item {
        padding: 15px;
      }

      &-left {
        .dashboard-flex {
          height: auto;
          gap: 15px;

          > div {
            flex-direction: row;
            padding: 15px;
            align-items: center;

            .alram-count {
              align-items: center;

              .num {
                font-size: 18px;
              }

              .text {
                font-size: 14px;
              }

              img {
                top: 0;
              }
            }
          }
        }
      }

      &-title {
        font-size: 14px;
      }
    }
  }

  .copyright {
    display: flex;
  }

  .pocket-calendar-tip {
    top: 9px;
    right: 20px;
    display: grid;
    gap: 5px;
  }
}

// 캘린더
.custom-calendar {
  height: 100%;
}
</style>
