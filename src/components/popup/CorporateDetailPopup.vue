<template>
  <div>
    <LayoutPopup :title="popupTitle" @close="closePopup">
      <div class="popup-body-header">
        <div class="popup-body-header-left">
          <span class="popup-body-header-title">
            {{ corpDataRef?.corpNm }}
          </span>
          <span class="popup-body-header-sub-title"></span>
        </div>
        <div class="popup-body-header-date" v-if="corpDataRef?.issueDate">
          발급일자:
          {{ convertIssueCorpDateTime(String(corpDataRef?.issueDate)) }}
        </div>
      </div>
      <div class="pocket-tab-row-container">
        <!--<div class="pocket-tab active" v-if="corpDataRef?.weekendYn === 'Y'">
          현재 유효사항
        </div>
        <div class="pocket-tab active" v-if="corpDataRef?.weekendYn === 'N'">
          말소사항 포함
        </div> -->
        <!-- 2023.12.04 윤종경 기존 로직이 주말여부를 체크하고 있어서 "말소사항구분" 으로 변경 -->
        <div
          class="pocket-tab active"
          v-if="corpDataRef?.expungementType === '1'"
        >
          현재 유효사항
        </div>
        <div
          class="pocket-tab active"
          v-if="corpDataRef?.expungementType === '2'"
        >
          말소사항 포함
        </div>

        <button
          class="round-btn black tab-btn"
          @click="downloadPdf(corpDataRef?.pdfNm)"
        >
          인쇄
        </button>
      </div>

      <div class="result-container tab-contents-1">
        <div class="popup-tab-table">
          <!--등기번호-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpDgno">
            <div class="popup-tab-table-th">등기번호</div>
            <div class="popup-tab-table-td">
              {{ detailData?.lpDgno }}
            </div>
          </div>

          <!--등록번호-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpDrokNo">
            <div class="popup-tab-table-th">등록번호</div>
            <div class="popup-tab-table-td">{{ detailData?.lpDrokNo }}</div>
          </div>

          <!--상호-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpSanho">
            <div class="popup-tab-table-th">{{ detailData?.lpSanho }}</div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpSanhoList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--대표이사-->
          <div class="popup-tab-table-tr" v-if="presidentList.length != 0">
            <div class="popup-tab-table-th">대표이사</div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in presidentList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td><pre v-html="data.president"></pre></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--본점-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpBjJuso">
            <div class="popup-tab-table-th">{{ detailData?.lpBjJuso }}</div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpBjJusoList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--공고방법-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpMethod">
            <div class="popup-tab-table-th">공고방법</div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpMethodList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--1주의 금액-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpIlGeumak">
            <div class="popup-tab-table-th">
              {{ detailData?.lpIlGeumak }}
            </div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpIlGeumakList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--발행주식의 총수와 그 종류 및 각각의 수-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpJutot">
            <div class="popup-tab-table-th">
              {{ detailData?.lpJutot }}
            </div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpJutotList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--발행 주식의 총수와 그 종류 및 각각의 수-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpItem">
            <div class="popup-tab-table-th">
              발행 주식의 총수와 그 종류 및 각각의 수
            </div>
            <div class="popup-tab-table-td">
              <table>
                <tbody>
                  <tr
                    v-for="(data, index) in detailData?.lpItemList"
                    :key="index"
                    :class="data.isDotted ? 'dottedLine' : ''"
                  >
                    <td class="td_one">
                      <pre v-html="data.one"></pre>
                    </td>
                    <td class="td_two">
                      <pre v-html="data.two"></pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--목적-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpMokjuk">
            <div class="popup-tab-table-th">목적</div>
            <div class="popup-tab-table-td">
              <pre v-html="detailData?.lpMokjuk"></pre>
            </div>
          </div>

          <!--기타사항-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpGita">
            <div class="popup-tab-table-th">기타사항</div>
            <div class="popup-tab-table-td">
              <pre v-html="detailData?.lpGita"></pre>
            </div>
          </div>

          <!--회사성립일자-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpHsDate">
            <div class="popup-tab-table-th">{{ detailData?.lpHsDate }}</div>
            <div class="popup-tab-table-td">
              <pre v-html="detailData?.lpHsDateList"></pre>
            </div>
          </div>

          <!--등기기록의 개설 사유및 연월일-->
          <div class="popup-tab-table-tr" v-if="detailData?.lpGsWonin">
            <div class="popup-tab-table-th">등기기록의 개설 사유및 연월일</div>
            <div class="popup-tab-table-td">
              <pre v-html="detailData?.lpGsWonin"></pre>
            </div>
          </div>
        </div>
      </div>

      <!--임원정보-->
      <div class="pocket-tab-row-container popup-tab-container">
        <div
          class="pocket-tab popup-tab"
          @click="getMemberList('1', currentId)"
          :class="{ active: activePopTab === '1' }"
        >
          현재 임원
        </div>
        <div
          class="pocket-tab popup-tab"
          @click="getMemberList('2', currentId)"
          :class="{ active: activePopTab === '2' }"
        >
          과거 임원
        </div>
      </div>
      <div class="result-container tab-contents-1" v-if="activePopTab === '1'">
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>직위</th>
                  <th>성명</th>
                  <th>주민번호</th>
                  <th>취임일</th>
                  <th>중임일</th>
                  <th>최근등기일</th>
                  <th>등기예정일</th>
                  <th v-if="issuer == '1' || issuer == '2'">수정</th>
                </tr>
              </thead>
              <tbody v-if="memberListRef.length == 0">
                <tr>
                  <td colspan="20">데이터가 없습니다.</td>
                </tr>
              </tbody>

              <tbody v-for="(data, index) in memberListRef" :key="index">
                <tr>
                  <td>{{ data.position || '-' }}</td>
                  <td>{{ data.name || '-' }}</td>
                  <td>{{ data.pin || '-' }}</td>
                  <td>{{ data.appointmentDate || establishmentDate }}</td>
                  <td>{{ data.inaugurationDate || '-' }}</td>
                  <td>{{ data.registerDate || '-' }}</td>
                  <td v-if="data.revisionCount == 0">
                    <input
                      type="text"
                      v-model="data.editEstimatedRegisterDate"
                      maxlength="10"
                    />
                  </td>
                  <td v-if="data.revisionCount != 0">
                    {{ data.editEstimatedRegisterDate || '-' }}
                  </td>
                  <td v-if="issuer == '1' || issuer == '2'">
                    <img
                      src="@/assets/images/edit.svg"
                      alt="수정"
                      class="edit"
                      @click="updateMemberDate(data)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="result-container tab-contents-2" v-if="activePopTab === '2'">
        <div class="pocket-table-box">
          <div class="table-scroll">
            <table class="pocket-table">
              <thead>
                <tr>
                  <th>직위</th>
                  <th>성명</th>
                  <th>주민번호</th>
                  <th>취임일</th>
                  <th>중임일</th>
                  <th>최근등기일</th>
                  <th>사임일</th>
                </tr>
              </thead>
              <tbody v-if="memberListRef.length == 0">
                <tr>
                  <td colspan="20">데이터가 없습니다.</td>
                </tr>
              </tbody>

              <tbody v-for="(data, index) in memberListRef" :key="index">
                <tr>
                  <td>{{ data.position || '-' }}</td>
                  <td>{{ data.name || '-' }}</td>
                  <td>{{ data.pin || '-' }}</td>
                  <td>{{ data.appointmentDate || establishmentDate }}</td>
                  <td>{{ data.inaugurationDate || '-' }}</td>
                  <td>{{ data.registerDate || '-' }}</td>
                  <td>{{ data.resignDate || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span class="tip">
        <img src="@/assets/images/tip-red.svg" alt="tip" />
        감사의 임기는 3년 이내의 최종결산기로부터 3개월 내 개최한
        정기주주총회일에 만료됨으로 확인 후 직접입력이 필요합니다.
      </span>
      <!-- 2023.12.05 윤종경 법인 상세보기 안내문구 추가-->
      <span class="tip">
        <img src="@/assets/images/tip-red.svg" alt="tip" />
        등기 알림에 대한 변경은 1회로 제한됩니다.
      </span>

      <span class="tip" v-if="issuer == '3' || issuer == '4'">
        <img src="@/assets/images/tip-red.svg" alt="tip" />
        이용자 발급 및 전체에서의 상세화면은 수정이 제한됩니다.
      </span>
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
import { ref, onMounted, shallowRef } from 'vue';
import { get, put, get_download } from '@/util/service/request';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import { convertIssueCorpDateTime, convertIssueCorpDate } from '@/util/number';
import {
  EIDT_SUCCESS,
  ERROR_500,
  CORP_MEMBER_DATE,
  CHANGE_DATA,
  ISNULL_DATE,
  DOWNLOAD_FAIL
} from '@/util/message';

const popupTitle = '법인등기 상세';
const activePopTab = ref('1');
const currentId = ref('0');
const issuer = ref('1');
const userStore = useUserStore();
const corpDataRef = ref<any>();
const currentPopup = ref();
const memberListRef = ref<any[]>([]);
const detailData = ref<any>();
const establishmentDate = ref<any>('-');
const presidentList = ref<any[]>([]);

interface Props {
  issueId?: any;
  issuer?: any;
}
interface PopupItem {
  component: any;
  content: any;
}

interface CorporDto {
  title: string;
  one: string;
  two: string;
  three: string;
  isDotted: boolean;
}

class CorporDtoImpl implements CorporDto {
  title: string;
  one: string;
  two: string;
  three: string;
  isDotted: boolean;

  constructor() {
    this.title = '';
    this.one = '';
    this.two = '';
    this.three = '';
    this.isDotted = false;
  }
}

const props = defineProps<{ content: Props }>();
const activePopups = ref<PopupItem[]>([]);

onMounted(() => {
  currentId.value = String(props.content.issueId);
  issuer.value = String(props.content.issuer);
  getDetail(currentId.value);
  getMemberList(activePopTab.value, currentId.value);
});

const updateMemberDate = (data: any) => {
  //화면상 입력한 일자가 없다면 메시지
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.editEstimatedRegisterDate)) {
    showPopup('ISNULL_DATE'); //변경일자를 입력하지 않았습니다. (형식: YYYY-MM-DD)
    return false;
  }

  //변경횟수가 >0 이면
  if (data.revisionCount != 0) {
    showPopup('CORP_MEMBER_DATE'); //등기예정일 변경은 1회만 가능합니다.
    return false;
  }

  //DB일자에서 변경된것이 없으면
  if (data.editEstimatedRegisterDate == data.estimatedRegisterDate) {
    showPopup('CHANGE_DATA'); //등기예정일이 변경되지 않았습니다. 확인 후 다시 입력해 주세요.
    return false;
  }

  const url = `/user/corp/issue/member`;
  const params = {
    id: data.id,
    revisionCount: data.revisionCount + 1,
    estimatedRegisterDate: data.editEstimatedRegisterDate
  };

  put(url, params, userStore.getToken)
    .then((res) => {
      Log('result', res);
      showPopup('EDIT');
    })
    .catch((error) => {
      Log('error', error);
      showPopup('ERROR_500');
    });
};

//임원 리스트
const getMemberList = (status: string, id: string) => {
  activePopTab.value = status;
  const url = `/user/corp/issue/member/${status}/${id}`;
  get(url, {}, userStore.getToken)
    .then((res) => {
      const presidentListSize = res.data.payload.presidentList.length - 1;
      presidentList.value = res.data.payload.presidentList.map(
        (item: any, index: number) => {
          return {
            president: '\n' + getText(item.name + ' / ' + item.address) + '\n',
            isDotted: presidentListSize == index ? false : true
          };
        }
      );
      memberListRef.value = res.data.payload.list.map((item: any) => {
        return {
          ...item,
          editEstimatedRegisterDate: item.estimatedRegisterDate
        };
      });
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

const getDetail = (id: string) => {
  const url = `/user/corp/issue/detail/${id}`;
  get(url, {}, userStore.getToken)
    .then((res) => {
      const result = JSON.parse(res.data.payload.jsonData);
      corpDataRef.value = res.data.payload;
      pasing(result.item);
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//pdf 파일 다운로드
const downloadPdf = (pdfNm: string) => {
  const url_info = `/user/file/download/CORP/${pdfNm}`;
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

//상세 페이지
const pasing = (object: any) => {
  let corporDto: CorporDto = new CorporDtoImpl();
  const result: any = {
    lpDgno: '',
    lpDrokNo: '',
    lpSanho: '',
    lpSanhoList: [],
    lpBjJuso: '',
    lpBjJusoList: [],
    lpMethod: '',
    lpMethodList: [],
    lpIlGeumak: '',
    lpIlGeumakList: [],
    lpJutot: '',
    lpJutotList: [],
    lpItem: '',
    lpItemList: [],
    lpMokjuk: '',
    lpHsDate: '',
    lpHsDateList: [],
    lpGsWonin: '',
    lpGita: ''
  };

  for (var i = 0; i < object.length; i++) {
    const item = object[i];

    if (item?.lpDevide === 'X') {
      //등기번호
      result.lpDgno = item?.lpDgno;
    } else if (item?.lpDevide === 'A') {
      //등록번호
      result.lpDrokNo = item?.lpDrokNo;
    } else if (item?.lpDevide === 'C' && item?.lpJuMal != '') {
      //상호
      result.lpSanho = '상호';
      if (
        corpDataRef.value.corpType.includes('협동조합') ||
        corpDataRef.value.corpType.includes('사단법인') ||
        corpDataRef.value.corpType.includes('재단법인')
      ) {
        result.lpSanho = '명칭';
      }

      corporDto.one += getText(item?.lpSanho);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpSanhoList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'D' && item?.lpJuMal != '') {
      //본점
      result.lpBjJuso = '본점';
      if (
        corpDataRef.value.corpType.includes('협동조합') ||
        corpDataRef.value.corpType.includes('사단법인') ||
        corpDataRef.value.corpType.includes('재단법인')
      ) {
        result.lpBjJuso = '주사무소';
      }

      corporDto.one += getText(item?.lpBjJuso);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpBjJusoList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'E' && item?.lpJuMal != '') {
      //공고방법
      result.lpMethod = '공고방법';
      corporDto.one += getText(item?.lpMethod);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpMethodList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'F') {
      //1주의 금액
      if (corpDataRef.value.corpType.includes('주식회사')) {
        result.lpIlGeumak = '1주의 금액';
      } else if (corpDataRef.value.corpType.includes('유한회사')) {
        result.lpIlGeumak = '출자 1좌의 금액';
      }
      corporDto.one += getText(item?.lpIlGeumak);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpIlGeumakList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'G' && item?.lpJuMal != '') {
      //발행할 주식의 총수
      if (corpDataRef.value.corpType.includes('주식회사')) {
        result.lpJutot = '발행할 주식의 총수';
      } else if (corpDataRef.value.corpType.includes('유한회사')) {
        result.lpJutot = '자본금의 총액';
      } else if (corpDataRef.value.corpType.includes('유한책임회사')) {
        result.lpJutot = '자본금의 액';
      }
      corporDto.one += getText(item?.lpJutot);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpJutotList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'H' && item?.lpJuMal != '') {
      result.lpItem = true;
      const resItem =
        item?.lpItem1 + getBackslash(item?.lpItem2) + item?.lpItem3;
      corporDto.one += getText(resItem);
      corporDto.two += getText(item?.lpChgDate) + '\n';
      corporDto.isDotted = getLine(item?.lpLineStyle, corporDto.isDotted);

      if (item?.lpLineStyle == 'J' || item?.lpLineStyle == 'L') {
        result.lpItemList.push(corporDto);
        corporDto = new CorporDtoImpl();
      }
    } else if (item?.lpDevide === 'K') {
      //목차
      result.lpMokjuk += getText(item?.lpMokjuk) + '\n';
    } else if (item?.lpDevide === 'I') {
      //회사성립일자
      result.lpHsDate = '회사성립일자';
      if (
        corpDataRef.value.corpType.includes('협동조합') ||
        corpDataRef.value.corpType.includes('사단법인') ||
        corpDataRef.value.corpType.includes('재단법인')
      ) {
        result.lpHsDate = '법인성립연월일';
      }

      result.lpHsDateList += getText(item?.lpHsDate) + '\n';
      establishmentDate.value = convertIssueCorpDate(item?.lpHsDate);
    } else if (item?.lpDevide === 'J') {
      //등기기록의 개설 사유 및 연월일
      result.lpGsWonin += getText(item?.lpGsWonin) + '\n';
    } else if (item?.lpDevide === 'M' && item?.lpJuMal != '') {
      result.lpGita += getText(item?.lpGita) + '\n';
    }
  }
  detailData.value = result;
};

const getText = (str: string) => {
  if (str == null || str == undefined) {
    return '';
  } else {
    let res = str.replace(/{p~p}|!/g, '');
    if (str.includes('!')) {
      return "<div class='clear'>" + res + '</div>';
    } else {
      return '<div>' + res + '</div>';
    }
  }
};

//라인
const getLine = (str: string, isLine: boolean) => {
  if (str === 'J') {
    return true;
  }
  return isLine;
};

//발행주식 구분자
const getBackslash = (str: string) => {
  if (str === '') {
    return str;
  }
  return str + ' / ';
};

const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'EDIT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: EIDT_SUCCESS
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'CORP_MEMBER_DATE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CORP_MEMBER_DATE
      });
      break;
    case 'CHANGE_DATA':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CHANGE_DATA
      });
      break;
    case 'ISNULL_DATE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ISNULL_DATE
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
      getMemberList(activePopTab.value, currentId.value);
      break;
  }
};
</script>

<style lang="scss" scoped>
.pocket-table-box {
  margin-top: -11px;
  padding: 6px;
}

.popup-tab-table {
  pre {
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 100%;
  }
  .td_one {
    width: 70% !important;
    min-width: 70% !important;
    border-right: 1px solid #e0e0e0;
  }
  .td_two {
    width: 30% !important;
    min-width: 30% !important;
    text-align: center;
  }
}
/* lpLineStyle : N : 선없음, S : 부분점선, J : 전체점선, L : 실선*/
</style>
