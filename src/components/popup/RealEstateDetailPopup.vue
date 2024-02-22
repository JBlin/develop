<template>
  <div class="window">
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="popup-body-header">
        <div class="popup-body-header-left">
          <span class="popup-body-header-title">
            {{ estateData?.estateAddr }}</span
          >
          <span
            class="state-fill green"
            @click="
              showPopup(
                'KAKAO_MAP',
                trimForKakaoAddress(estateData?.estateAddr)
              )
            "
            >지도</span
          >
          <span class="popup-body-header-sub-title"></span>
        </div>
        <div class="popup-body-header-date" v-if="estateData?.issueDate">
          발급일자: {{ convertIssueEstateDateTime(estateData?.issueDate) }}
        </div>
      </div>
      <br />
      <div class="pocket-tab-row-container">
        <!--
        <div class="pocket-tab active" v-if="estateData?.weekendYn === 'Y'">
          말소사항 포함
        </div>
        <div class="pocket-tab active" v-if="estateData?.weekendYn === 'N'">
          현재 유효사항
        </div>
        -->
        <!-- 2023.12.04 윤종경 기존 로직이 주말여부를 체크하고 있어서 "말소사항구분" 으로 변경 -->
        <div
          class="pocket-tab active"
          v-if="estateData?.expungementType === '1'"
        >
          현재 유효사항
        </div>
        <div
          class="pocket-tab active"
          v-if="estateData?.expungementType === '2'"
        >
          말소사항 포함
        </div>
        <button class="round-btn black tab-btn" @click="openPdfInNewWindow()">
          인쇄
        </button>
      </div>

      <div class="result-container tab-contents-1">
        <div class="popup-tab-table">
          <div class="popup-tab-table-tr">
            <div class="popup-tab-table-th">소유자/공유자</div>
            <div class="popup-tab-table-td">
              <!-- {{ estateData?.estateOwnerName }} -->
              {{
                getOwner(
                  estateData?.estateOwnerName,
                  estateData?.estateOwnerCnt
                )
              }}
            </div>
          </div>
          <div class="popup-tab-table-tr">
            <div class="popup-tab-table-th">(주민)등록번호</div>
            <div class="popup-tab-table-td">
              {{ estateData?.estateOwnerPin }}
            </div>
          </div>
          <div class="popup-tab-table-tr">
            <div class="popup-tab-table-th">최종지분</div>
            <div class="popup-tab-table-td">
              {{ estateData?.estateType }}
            </div>
          </div>
          <div class="popup-tab-table-tr">
            <div class="popup-tab-table-th">등기고유번호</div>
            <div class="popup-tab-table-td">
              {{ addBarToEstateRegNumber(estateData?.attrNo || '') }}
            </div>
          </div>
        </div>
      </div>

      <!-- 표제부 (건물의 표시) -->
      <div class="popup-table-box" v-if="detailData?.pType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          표제부 (건물의 표시)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>접수</th>
                  <th>소재지번, 건물명칭 및 번호</th>
                  <th>건물내역</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.pTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />

      <!-- 표제부 (1동의 건물의 표시) -->
      <div class="popup-table-box" v-if="detailData?.wType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          표제부 (1동의 건물의 표시)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>접수</th>
                  <th>소재지번, 건물명칭 및 번호</th>
                  <th>건물내역</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.wTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />

      <!-- 표제부 (토지의 표시) //토지만 -->
      <div class="popup-table-box" v-if="detailData?.tType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          표제부 (토지의 표시)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>접수</th>
                  <th>소재지번</th>
                  <th>지목 및 면적</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.tTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>

      <!-- 대지권의 목적인 토지의 표시 -->
      <div class="popup-table-box" v-if="detailData?.xType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          대지권의 목적인 토지의 표시
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>소재지번</th>
                  <th>지목</th>
                  <th>면적</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.xTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>

      <!-- 표제부(전유부분의 건물의 표시) -->
      <div class="popup-table-box" v-if="detailData?.yType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          표제부(전유부분의 건물의 표시)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>접수</th>
                  <th>건물번호</th>
                  <th>건물내역</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.yTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>

      <!-- 대지권의 표시 -->
      <div class="popup-table-box" v-if="detailData?.zType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          대지권의 표시
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>표시번호</th>
                  <th>대지권종류</th>
                  <th>대지권비율</th>
                  <th>등기원인 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.zTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>

      <!-- 갑구(소유권에 관한 사항) -->
      <div class="popup-table-box" v-if="detailData?.kType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          갑구(소유권에 관한 사항)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>순위번호</th>
                  <th>등기목적</th>
                  <th>접수</th>
                  <th>등기원인</th>
                  <th>권리자 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.kTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>

      <!-- 을구(소유권권 이외의 권리에 관한 사항) -->
      <div class="popup-table-box" v-if="detailData?.eType.isView">
        <div class="popup-table-box-title">
          <img src="@/assets/images/popup-title.svg" />
          을구(소유권권 이외의 권리에 관한 사항)
        </div>
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>순위번호</th>
                  <th>등기목적</th>
                  <th>접수</th>
                  <th>등기원인</th>
                  <th>권리자 및 기타사항</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in detailData?.eTypeList"
                  :key="index"
                  :class="data.isDel ? 'red-line' : ''"
                >
                  <td><pre v-html="data.one"></pre></td>
                  <td><pre v-html="data.two"></pre></td>
                  <td><pre v-html="data.three"></pre></td>
                  <td><pre v-html="data.four"></pre></td>
                  <td><pre v-html="data.five"></pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    </LayoutPopup>
    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :content="popup.content"
      :key="index"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
import { get, post, get_download } from '@/util/service/request';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import {
  convertIssueEstateDateTime,
  addBarToEstateRegNumber
} from '@/util/number';
import { ERROR_500, MAP, DOWNLOAD_FAIL } from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import MapPopup from '@/components/popup/MapPopup.vue';
import { trimForKakaoAddress } from '@/util/address';

const popupTitle = '부동산등기 상세';
const userStore = useUserStore();
const estateData = ref<any>();
const detailData = ref<any>();
const currentPopup = ref();
const currentId = ref('0');
const issuer = ref('1');
const activePopups = ref<PopupItem[]>([]);

interface PopupItem {
  component: any;
  content: any;
}
interface Props {
  issueId?: any;
  issuer?: any;
}

interface EstateDto {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  isDel: boolean;
}

class EstateDtoImpl implements EstateDto {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  isDel: boolean;

  constructor() {
    this.one = '';
    this.two = '';
    this.three = '';
    this.four = '';
    this.five = '';
    this.isDel = false;
  }
}

const props = defineProps<{ content: Props }>();

onMounted(() => {
  currentId.value = String(props.content.issueId);
  issuer.value = String(props.content.issuer);
  getDetail(currentId.value);
});

const getDetail = (id: string) => {
  const url = `/user/estate/issue/detail/${id}`;
  get(url, {}, userStore.getToken)
    .then((res) => {
      const result = JSON.parse(res.data.payload.jsonData);
      estateData.value = res.data.payload;
      pasing(result.register.item);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const pasing = (object: any) => {
  let estateDto: EstateDto = new EstateDtoImpl();
  const result: any = {
    wType: { isView: false },
    tType: { isView: false },
    xType: { isView: false },
    yType: { isView: false },
    zType: { isView: false },
    kType: { isView: false },
    eType: { isView: false },
    pType: { isView: false },
    wTypeList: [],
    tTypeList: [],
    xTypeList: [],
    yTypeList: [],
    zTypeList: [],
    kTypeList: [],
    eTypeList: [],
    pTypeList: []
  };

  for (var i = 0; i < object.length; i++) {
    const item = object[i];
    // if (item?.type === 'I') {
    //   //기본정보
    //   Log(item);
    // }
    if (item?.type === 'W') {
      //표제부 (1동의 건물의 표시)
      //표시번호
      estateDto.one += getText(item?.wksbw_indi_no) + '\n';
      //접수
      estateDto.two += getText(item?.wksbw_receve) + '\n';
      //소재지번,건물명칭 및 번호(해당 주말선 체크)
      estateDto.three += getText(item?.wksbw_real_indi_cont) + '\n';
      //건물내역
      estateDto.four += getText(item?.wksbw_buld_cont) + '\n';
      //등기원인 및 기타사항
      estateDto.five += getText(item?.wksbw_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbw_indi_no, estateDto.isDel);

      if (item?.wksbw_common_flag == '1') {
        result.wType.isView = true;
        result.wTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'P') {
      //표제부 (건물의 표시)
      //표시번호
      estateDto.one += getText(item?.wksbj_indi_no) + '\n';
      //접수
      estateDto.two += getText(item?.wksbj_receve) + '\n';
      //소재지번,건물명칭 및 번호(해당 주말선 체크)
      estateDto.three += getText(item?.wksbj_real_indi_cont) + '\n';
      //건물내역
      estateDto.four += getText(item?.wksbj_buld_cont) + '\n';
      //등기원인 및 기타사항
      estateDto.five += getText(item?.wksbj_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbj_indi_no, estateDto.isDel);

      if (item?.wksbj_common_flag == '1') {
        result.pType.isView = true;
        result.pTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'T') {
      //표제부 (토지의 표시)
      //표시번호
      estateDto.one += getText(item?.wksbt_indi_no) + '\n';
      //접수
      estateDto.two += getText(item?.wksbt_receve) + '\n';
      //소재지번
      estateDto.three += getText(item?.wksbt_real_indi_cont) + '\n';
      //지목 및 면적
      estateDto.four +=
        getText(item?.wksbt_land_type) + '/' + getText(item?.wksbt_area) + '\n';
      //등기원인 및 기타사항
      estateDto.five += getText(item?.wksbt_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbt_indi_no, estateDto.isDel);

      if (item?.wksbt_common_flag == '1') {
        result.tType.isView = true;
        result.tTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'X') {
      //  대지권의 목적인 토지의 표시
      // 표시번호
      estateDto.one += getText(item?.wksbx_indi_no) + '\n';
      //소재지번
      estateDto.two += getText(item?.wksbx_real_indi_cont) + '\n';
      //지목
      estateDto.three += getText(item?.wksbx_land_type) + '\n';
      //면적
      estateDto.four += getText(item?.wksbx_area) + '\n';
      //등기원인 및 기타사항
      estateDto.five += getText(item?.wksbx_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbx_indi_no, estateDto.isDel);

      if (item?.wksbx_common_flag == '1') {
        result.xType.isView = true;
        result.xTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'Y') {
      //표제부 (전유부분의 건물의 표시)
      //표시번호
      estateDto.one += getText(item?.wksby_indi_no) + '\n';
      //접수
      estateDto.two += getText(item?.wksby_receve) + '\n';
      //건물번호
      estateDto.three += getText(item?.wksby_build_no) + '\n';
      //건물내역
      estateDto.four += getText(item?.wksby_buld_cont) + '\n';
      //등기원인 및 기타사항
      estateDto.five += getText(item?.wksby_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksby_indi_no, estateDto.isDel);

      if (item?.wksby_common_flag == '1') {
        result.yType.isView = true;
        result.yTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'Z') {
      //대지권의 표시
      //표시번호
      estateDto.one += getText(item?.wksbz_indi_no) + '\n';
      //대지권종류
      estateDto.two += getText(item?.wksbz_lot_type) + '\n';
      //대지권비율
      estateDto.three += getText(item?.wksbz_lot_num) + '\n';
      //등기원인 및 기타사항
      estateDto.four += getText(item?.wksbz_caus_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbz_indi_no, estateDto.isDel);

      if (item?.wksbz_common_flag == '1') {
        result.zType.isView = true;
        result.zTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'K') {
      //갑구 (소유권에 관한 사항)
      //순위번호
      estateDto.one += getText(item?.wksbk_kap_rank_no) + '\n';
      //등기목적
      estateDto.two += getText(item?.wksbk_rgs_aim_cont) + '\n';
      //접수
      estateDto.three += getText(item?.wksbk_receve) + '\n';
      //등기원인
      estateDto.four += getText(item?.wksbk_rgs_caus) + '\n';
      //권리자 및 기타사항
      estateDto.five += getText(item?.wksbk_nomprs_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbk_kap_rank_no, estateDto.isDel);

      if (item?.wksbk_common_flag == '1') {
        result.kType.isView = true;
        result.kTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    } else if (item?.type === 'E') {
      //을구 (소유권 이외의 권리에 관한 사항)
      //순위번호
      estateDto.one += getText(item?.wksbe_eul_rank_no) + '\n';
      //등기목적
      estateDto.two += getText(item?.wksbe_rgs_aim_cont) + '\n';
      //접수
      estateDto.three += getText(item?.wksbe_receve) + '\n';
      //등기원인
      estateDto.four += getText(item?.wksbe_rgs_caus) + '\n';
      //권리자 및 기타사항
      estateDto.five += getText(item?.wksbe_nomprs_and_etc) + '\n';
      //주말선
      estateDto.isDel = underLine(item?.wksbe_eul_rank_no, estateDto.isDel);

      if (item?.wksbe_common_flag == '1') {
        result.eType.isView = true;
        result.eTypeList.push(estateDto);
        estateDto = new EstateDtoImpl();
      }
    }
  }
  detailData.value = result;
};

const getText = (str: string) => {
  if (str == null || str == undefined) {
    return '';
  } else {
    const text1 = str.replace(/{p~p}|\s|&/g, ' ');
    const text2 = text1.split('^');
    if (text2.length > 1) {
      return text2[1];
    } else {
      return text2[0];
    }
  }
};

//취소선
const underLine = (str: string, isDel: boolean) => {
  if (str == null || str == undefined) {
    return false;
  } else if (str.includes('&')) {
    return true;
  }
  return isDel;
};

const openPdfInNewWindow = () => {
  const fileList: any[] = [];
  const path = estateData.value?.filePath;
  if (estateData.value?.issuePdf) {
    fileList.push(path + estateData.value?.issuePdf);
  }
  if (estateData.value?.buildingInfoPdf) {
    fileList.push(path + estateData.value?.buildingInfoPdf);
  }
  if (estateData.value?.landInfoPdf) {
    fileList.push(path + estateData.value?.landInfoPdf);
  }
  if (estateData.value?.cadastralMapPdf) {
    fileList.push(path + estateData.value?.cadastralMapPdf);
  }
  if (estateData.value?.landUsePlanPdf) {
    fileList.push(path + estateData.value?.landUsePlanPdf);
  }

  const url_info = `/user/file/multiDownload`;
  post(url_info, fileList, userStore.getToken)
    .then((_response) => {
      if (_response.data.status == 200) {
        const result = _response.data.payload;
        downloadPdf(result.fileFolder, result.fileName);
      } else if (_response.data.status == 400) {
        showPopup('DOWNLOAD_FAIL');
      }
    })
    .catch((error) => {
      Log(error);
    });
};

//pdf 파일 다운로드
const downloadPdf = (pdfolder: string, pdfNm: string) => {
  const url_info = `/user/file/download/${pdfolder}/${pdfNm}`;
  get_download(url_info, '', userStore.getToken)
    .then((_response) => {
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(
          new Blob([_response.data], { type: 'application/pdf' })
        );
        link.href = url;
        link.download = pdfNm;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const getOwner = (ownerNm?: string, ownerCnt?: string) => {
  if (ownerNm == null || ownerNm == '') {
    return '';
  }
  const result = ownerNm?.split(' ');
  const name = result[0];
  const type = result[1];
  if (type?.includes('(공유자)')) {
    return name + ' 외' + ownerCnt;
  } else {
    return name;
  }
};

const showPopup = (popName: string, data: any = 0) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'KAKAO_MAP':
      activePopups.value.push({
        component: shallowRef(MapPopup),
        content: MAP(data)
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

const emit = defineEmits<{ (e: 'close'): void }>();

const closePopup = () => {
  emit('close');
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
    case 'EDIT':
      break;
  }
};
</script>

<style lang="scss" scoped>
.pocket-table-box {
  margin-top: -11px;
}
.window {
  min-width: 100%;
}
</style>
