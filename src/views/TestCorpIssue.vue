<template>
  <LayoutPopup :title="popupTitle" @close="closePopup">
    <div class="pocket-table-box">
      <div @click="getData()">가져오기</div>
      <br />
      <div v-for="(item, index) in jsonList" :key="index">
        번호: {{ index }}
        <div v-if="item?.lpDevide === 'C'">상호: {{ item?.lpSanho }}</div>
        <div v-if="item?.lpDevide === 'D'">본점:{{ item?.lpBjJuso }}</div>
        <div v-if="item?.lpDevide === 'E'">공고방법: {{ item?.lpMethod }}</div>
        <div v-if="item?.lpDevide === 'F'">
          <div v-if="companyTypeRef === 'A'">
            1주의 금액: {{ item?.lpIlGeumak }}
          </div>
          <div v-if="companyTypeRef === 'B'">
            출자 1좌의 금액: {{ item?.lpIlGeumak }}
          </div>
        </div>
        <div v-if="item?.lpDevide === 'G'">
          <div v-if="companyTypeRef === 'A'">
            발행할 주식의 총수: {{ item?.lpJutot }}
          </div>
          <div v-if="companyTypeRef === 'B'">
            자본금의 총액: {{ item?.lpJutot }}
          </div>
          <div v-if="companyTypeRef === 'C'">
            자본금의 액: {{ item?.lpJutot }}
          </div>
        </div>
        <div v-if="item?.lpDevide === 'H'">
          발행주식의 총수와 그 종류 및 각각의 수
          {{ item?.lpItem1 }}
          {{ item?.lpItem2 }}
          자본금의 액
          {{ item?.lpItem3 }}
        </div>
        <div v-if="item?.lpDevide === 'I'">
          회사성립연월일: {{ item?.lpHsDate }}
        </div>
        <div v-if="item?.lpDevide === 'J'">
          등기기록의 개설 사유 및 연월일: {{ item?.lpGsWonin }}
        </div>
        <div v-if="item?.lpDevide === 'K'">목적: {{ item?.lpMokjuk }}</div>
        <div v-if="item?.lpDevide === 'L'" :class="underLine(item?.lpImwon)">
          <div v-if="companyTypeRef === 'A'">
            임원에 관한 사항(사내이사,대표이사, 감사): {{ item?.lpImwon }}
          </div>
          <div v-if="companyTypeRef === 'B'">
            임원에 관한 사항(대표이사, 감사, 이사): {{ item?.lpImwon }}
          </div>
          <div v-if="companyTypeRef === 'C'">
            업무집행자'청산인에 관한사항/(업무집행자, 대표업무집행자)
            {{ item?.lpImwon }}
          </div>
          <div v-if="companyTypeRef === 'D'">
            사원'청산인에 관한 사항/ (무한책임사원)
            {{ item?.lpImwon }}
          </div>
          <div v-if="companyTypeRef === 'E'">
            사원'청산인에 관한 사항/ (사원, 대표사원, 청산인)
            {{ item?.lpImwon }}
          </div>
        </div>
        <div v-if="item?.lpDevide === 'M'">기타사항</div>
        <div v-if="item?.lpDevide === 'X'">
          {{ item?.lpTitle }}
          <br />
          등기번호: {{ item?.lpDgno }}
          <br />
          {{ item?.lpJrisdictionOffice }}
        </div>
        <div v-if="item?.lpDevide === 'A'">등록번호: {{ item?.lpDrokNo }}</div>

        <!-- 선 구분자-->
        <div v-if="item?.lpLineStyle === 'N'">
          <p>{{ item?.lpChgDate }}</p>
        </div>
        <div v-if="item?.lpLineStyle === 'S'">
          <p>{{ item?.lpChgDate }}</p>
          <div class="dotted_style_2"></div>
        </div>
        <div v-if="item?.lpLineStyle === 'J'">
          <p>{{ item?.lpChgDate }}</p>
          <div class="dotted_style_1"></div>
        </div>
        <div v-if="item?.lpLineStyle === 'L'">
          <p>{{ item?.lpChgDate }}</p>
          <div class="solid_style"></div>
        </div>
      </div>
    </div>
  </LayoutPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { get, post } from '@/util/service/request';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';

const popupTitle = '등기발급 XML 화면';
const userStore = useUserStore();
const jsonList = ref<Array<any>>();
const isJson = ref(false);
const companyTypeRef = ref('');

const closePopup = () => {
  // 팝업닫기
};

// const postData = () => {
//   const url = `/user/issue/corp`;
//   post(url, {}, userStore.getToken)
//     .then((res) => {})
//     .catch((error) => {
//       Log(error);
//       return;
//     });
// };

const getData = () => {
  isJson.value = true;
  const userToken = userStore.getToken;
  const url = `/user/test/corp/9`;
  get(url, {}, userToken)
    .then((res) => {
      const result = JSON.parse(res.data.payload.jsonData);
      jsonList.value = result.item;
      companyTypeRef.value = corporType(result.item[0]?.lpSangho);
      Log('result:', result);
    })
    .catch((error) => {
      Log(error);
      return;
    });
};

//취소선
const underLine = (str: string) => {
  let first_char = str.charAt(0);
  let last_char = str.charAt(str.length - 1);
  if (first_char === '!' && last_char === '!') {
    return 'under_line';
  } else {
    return '';
  }
};

//법인 발급 종류
const corporType = (str: string) => {
  if (str.includes('주식회사')) {
    return 'A';
  } else if (str.includes('유한회사')) {
    return 'B';
  } else if (str.includes('유한책임회사')) {
    return 'C';
  } else if (str.includes('합자회사')) {
    return 'D';
  } else if (str.includes('합명회사')) {
    return 'E';
  } else {
    return '';
  }
};
</script>

<style lang="scss" scoped>
.pocket-table-box {
  min-width: 600px;
}

.solid_style {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
.dotted_style_1 {
  border-width: 1px;
  border-style: dotted;
  border-color: black;
}
.dotted_style_2 {
  max-width: 100px;
  border-width: 1px;
  border-style: dotted;
  border-color: black;
}

//취소선
.under_line {
  color: red;
  text-decoration: underline;
}
</style>
