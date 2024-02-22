<template>
  <LayoutPopup :title="popupTitle" @close="closePopup">
    <div class="pocket-table-box">
      <div @click="getData()">가져오기</div>
      <br />
      <div v-for="(item, index) in registerList" :key="index">
        <!-- 번호: {{ index }} -->
        <div v-if="item?.type === 'I'">
          등기사항전부증명서(말소사항 포함)
          <br />
          {{ item.iss_office }}
          <br />
          고유번호 //{{ item.pin_no }}
          <br />
          {{ item.wksbi_address }}
        </div>

        <div v-if="item?.type === 'W'">
          표제부 (1동의 건물의 표시)
          <br />
          표시번호 //{{ item.wksbw_indi_no }}
          <br />
          접수 // {{ item.wksbw_receve }}
          <br />
          소재지번,건물명칭 및 번호 //{{ item.wksbw_real_indi_cont }}
          <br />
          건물내역 // {{ item.wksbw_buld_cont }}
          <br />
          등기원인 및 기타사항 // {{ item.wksbw_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksbw_common_flag }}
        </div>

        <div v-if="item?.type === 'X'">
          대지권의 목적인 토지의 표시
          <br />
          표시번호 //{{ item.wksbx_indi_no }}
          <br />
          소재지번 //{{ item.wksbx_real_indi_cont }}
          <br />
          지목 //{{ item.wksbx_land_type }}
          <br />
          면적 //{{ item.wksbx_area }}
          <br />
          등기원인 및 기타사항 //{{ item.wksbx_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksbx_common_flag }}
        </div>

        <div v-if="item?.type === 'Y'">
          표제부 (전유부분의 건물의 표시)
          <br />
          표시번호 //{{ item.wksby_indi_no }}
          <br />
          접수 //{{ item.wksby_receve }}
          <br />
          건물번호 //{{ item.wksby_build_no }}
          <br />
          건물내역 //{{ item.wksby_buld_cont }}
          <br />
          등기원인 및 기타사항 //{{ item.wksby_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksby_common_flag }}
        </div>

        <div v-if="item?.type === 'Z'">
          대지권의 표시
          <br />
          표시번호 //{{ item.wksbz_indi_no }}
          <br />
          대지권종류 //{{ item.wksbz_lot_type }}
          <br />
          대지권비율 //{{ item.wksbz_lot_num }}
          <br />
          등기원인 및 기타사항 //{{ item.wksbz_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksbz_common_flag }}
        </div>

        <div v-if="item?.type === 'P'">
          표제부 (건물의 표시)
          <br />
          표시번호 //{{ item.wksbj_indi_no }}
          <br />
          접수 //{{ item.wksbj_receve }}
          <br />
          소재지번 및 건물번호 //{{ item.wksbj_real_indi_cont }}
          <br />
          건물내역 //{{ item.wksbj_buld_cont }}
          <br />
          등기원인 및 기타사항 //{{ item.wksbj_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksbj_common_flag }}
        </div>

        <div v-if="item?.type === 'T'">
          표제부 (토지의 표시)
          <br />
          표시번호 //{{ item.wksbt_indi_no }}
          <br />
          접수 //{{ item.wksbt_receve }}
          <br />
          소재지번 //{{ item.wksbt_real_indi_cont }}
          <br />
          지목 // {{ item.wksbt_land_type }}
          <br />
          면적 //{{ item.wksbt_area }}
          <br />
          등기원인 및 기타사항 //{{ item.wksbt_caus_and_etc }}
          <br />
          2)참고 // {{ item.wksbt_common_flag }}
        </div>

        <div v-if="item?.type === 'K'">
          갑구 (소유권에 관한 사항)
          <br />
          순위번호 //{{ item.wksbk_kap_rank_no }}
          <br />
          등기목적 //{{ item.wksbk_rgs_aim_cont }}
          <br />
          접수 //{{ item.wksbk_receve }}
          <br />
          등기원인 // {{ item.wksbk_rgs_caus }}
          <br />
          권리자 및 기타사항 //{{ item.wksbk_nomprs_and_etc }}
          <br />
          2)참고 // {{ item.wksbk_common_flag }}
        </div>

        <div
          v-if="item?.type === 'E'"
          :class="underLine(item?.wksbe_eul_rank_no)"
        >
          을구 (소유권 이외의 권리에 관한 사항)
          <br />
          순위번호 //{{ item.wksbe_eul_rank_no }}
          <br />
          등기목적 //{{ item.wksbe_rgs_aim_cont }}
          <br />
          접수 //{{ item.wksbe_receve }}
          <br />
          등기원인 // {{ item.wksbe_rgs_caus }}
          <br />
          권리자 및 기타사항 //{{ item.wksbe_nomprs_and_etc }}
          <br />
          2)참고 // {{ item.wksbe_common_flag }}
        </div>

        <br />
        <div class="solid_style"></div>
        <!-- 선 구분자 -->
        <!-- <div v-if="item?.line === 'N'">
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
        </div> -->
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

const popupTitle = '부동산 XML 화면';
const userStore = useUserStore();
const registerList = ref<Array<any>>();
const summaryList = ref<Array<any>>();
const companyTypeRef = ref('');

const closePopup = () => {
  // 팝업닫기
};

// const postData = () => {
//   const userToken = userStore.getToken;
//   const url = `/user/issue/estate`;
//   post(url, {}, userToken)
//     .then((res) => {})
//     .catch((error) => {
//       Log(error);
//       return;
//     });
// };

const getData = () => {
  const userToken = userStore.getToken;
  const url = `/user/test/estate/2`;
  get(url, {}, userToken)
    .then((res) => {
      Log('res:', res);
      const result = JSON.parse(res.data.payload.jsonData);
      const register = result.register.item;
      const summary = result.summary.item;
      registerList.value = register;
      summaryList.value = summary;
      // companyTypeRef.value = corporType(result.item[0]?.lpSangho);
      Log('register:', register);
      Log('summary:', summary);
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
  if (first_char === '&' && last_char === '&') {
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
