<template>
  <div class="pocket-contents-body-title">
    <div class="pocket-contents-body-title-box">내 정보관리</div>
  </div>
  <div class="pocket-input-row-container">
    <div class="pocket-input-row">
      <div class="pocket-input-box"></div>
      <div class="btn-box">
        <button class="round-btn w w-auto" @click="showPopup('WITHDRAW')">
          회원탈퇴
        </button>
        <button class="round-btn black w-auto" @click="showPopup('EDIT')">
          수정
        </button>
      </div>
    </div>

    <Form
      class="pocket-input-row-container"
      :initial-values="fromUserValue"
      :validation-schema="userSchema"
      ref="fromUserRef"
    >
      <div class="pocket-input-row">
        <div class="pocket-input-box">
          <div class="pocket-input-title require">이름</div>
          <div class="pocket-input-data">
            <Field
              v-model="fromUserValue.userName"
              class="input"
              id="userName"
              name="userName"
              type="text"
              placeholder="이름을 입력해주세요"
            />
            <ErrorMessage class="fail_msg" name="userName" />
          </div>
        </div>
        <div class="pocket-input-box">
          <div class="pocket-input-title require">휴대폰 번호</div>
          <div class="pocket-input-data">
            <Field
              v-model="fromUserValue.userPhone"
              class="input"
              id="userPhone"
              name="userPhone"
              type="text"
              placeholder="번호만 입력해주세요"
            />
            <ErrorMessage class="fail_msg" name="userPhone" />
          </div>
        </div>
      </div>
      <div class="pocket-input-row">
        <div class="pocket-input-box">
          <div class="pocket-input-title require">이메일</div>
          <div class="pocket-input-data">
            <Field
              class="input"
              id="userEmail"
              name="userEmail"
              type="text"
              placeholder="이메일을 입력해주세요"
              disabled
            />
          </div>
        </div>
        <div class="pocket-input-box">
          <div class="pocket-input-title">광고성 정보 수신 동의</div>
          <label class="switch">
            <Field
              v-model="fromUserValue.userTheme"
              type="checkbox"
              name="userTheme"
              id="userTheme"
              :value="true"
              @change="isAdAgree = !isAdAgree"
            />
            <span class="slider round">
              <span class="check-text"
                >동의합니다. (수신동의일:
                <span class="agree-date">{{ fromUserValue.userThemeDate }}</span
                >)</span
              >
            </span>
          </label>
        </div>
      </div>
    </Form>
  </div>
  <div class="info-change-tab" v-if="userStore.getUser.userType == '2'">
    <div class="pocket-tab-row-container">
      <div
        class="pocket-tab"
        @click="activeTab = 1"
        :class="{ active: activeTab === 1 }"
      >
        사업자 정보 수정
      </div>
      <div
        class="pocket-tab"
        @click="activeTab = 2"
        :class="{ active: activeTab === 2 }"
      >
        이용자 관리 및 초대
      </div>
    </div>
    <div v-if="activeTab === 1">
      <Form
        class="result-container tab-contents-1"
        :initial-values="fromCompanyValue"
        :validation-schema="companySchema"
        ref="fromCompanyRef"
      >
        <div class="pocket-input-row-container">
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require">상호명</div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.businessName"
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="상호명을 입력해주세요"
                  maxlength="30"
                />
                <ErrorMessage class="fail_msg" name="businessName" />
              </div>
            </div>
            <div class="pocket-input-box add-file">
              <div class="pocket-input-title require">사업자등록번호</div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.businessNumber"
                  id="businessNumber"
                  name="businessNumber"
                  type="number"
                  placeholder="하이픈(-) 제외 10자리"
                  oninput="this.value = this.value.slice(0, 10)"
                />
                <ErrorMessage class="fail_msg" name="businessNumber" />
              </div>
            </div>
          </div>
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require">대표자명</div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.presidentName"
                  id="presidentName"
                  name="presidentName"
                  type="text"
                  placeholder="대표자명을 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="presidentName" />
              </div>
            </div>
            <div class="pocket-input-box"></div>
          </div>
        </div>
        <div class="col-line"></div>
        <div class="pocket-contents-body-title">
          <div class="pocket-contents-body-title-box">
            세금계산서 담당자 정보
          </div>
        </div>
        <div class="pocket-input-row-container">
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require">
                <span>담당자명</span>
              </div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.taxPicName"
                  id="taxPicName"
                  name="taxPicName"
                  type="text"
                  placeholder="담당자명을 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="taxPicName" />
              </div>
            </div>
            <div class="pocket-input-box">
              <div class="pocket-input-title">직위/직급</div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.taxPicPosition"
                  id="taxPicPosition"
                  name="taxPicPosition"
                  type="text"
                  placeholder="직위를 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="taxPicPosition" />
              </div>
            </div>
          </div>
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require">
                <span>연락처</span>
              </div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.taxPicTel"
                  id="taxPicTel"
                  name="taxPicTel"
                  type="text"
                  placeholder="하이픈(-)포함 13자리"
                  maxlength="13"
                />
                <ErrorMessage class="fail_msg" name="taxPicTel" />
              </div>
            </div>
            <div class="pocket-input-box">
              <div class="pocket-input-title require">
                <span>이메일</span>
              </div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.taxPicEmail"
                  id="taxPicEmail"
                  name="taxPicEmail"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="taxPicEmail" />
              </div>
            </div>
          </div>
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require"><span>업종</span></div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.businessType"
                  id="businessType"
                  name="businessType"
                  type="text"
                  placeholder="업종을 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="businessType" />
              </div>
            </div>
            <div class="pocket-input-box">
              <div class="pocket-input-title require"><span>업태</span></div>
              <div class="pocket-input-data">
                <Field
                  v-model="fromCompanyValue.businessStat"
                  id="businessStat"
                  name="businessStat"
                  type="text"
                  placeholder="업태를 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="businessStat" />
              </div>
            </div>
          </div>
          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title require">
                <span>사업장소재지</span>
              </div>

              <div class="pocket-input-data">
                <div class="adress-search-box">
                  <Field
                    v-model="fromCompanyValue.businessPostName"
                    id="businessPostName"
                    name="businessPostName"
                    type="text"
                    disabled
                  />
                  <img
                    @click="showPopup('POST_SEARCH')"
                    src="@/assets/images/search-btn.svg"
                    alt="serach"
                    class="search-btn"
                  />
                </div>

                <Field
                  v-model="fromCompanyValue.businessAddr1"
                  id="businessAddr1"
                  name="businessAddr1"
                  type="text"
                  disabled
                />
                <Field
                  v-model="fromCompanyValue.businessAddr2"
                  id="businessAddr2"
                  name="businessAddr2"
                  type="text"
                  placeholder="상세주소를 입력해주세요"
                />
                <ErrorMessage class="fail_msg" name="businessAddr2" />
              </div>
            </div>
          </div>

          <div class="pocket-input-row">
            <div class="pocket-input-box">
              <div class="pocket-input-title"><span>사업자등록증</span></div>
              <div class="pocket-input-inner-box">
                <div class="pocket-input-data">
                  <Field
                    v-model="fromCompanyValue.uploadRealFileName"
                    id="uploadRealFileName"
                    name="uploadRealFileName"
                    type="text"
                    disabled
                  />
                  <ErrorMessage class="fail_msg" name="uploadRealFileName" />
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

              <span
                class="attachment"
                v-if="fromCompanyValue.regCertAttachYN == '1'"
              >
                <a
                  :download="fromCompanyValue.regCertFileName"
                  :href="downLoadURL"
                >
                  <span class="attachment-name link">
                    {{ fromCompanyValue.regCertFileName }}
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
      </Form>
    </div>
    <div class="result-container tab-contents-2" v-if="activeTab === 2">
      <MyInfoInvite />
    </div>
  </div>
  <component
    v-for="(popup, index) in activePopups"
    :is="popup.component"
    :key="index"
    :content="popup.content"
    @close="closePopup"
    @cancel="cancelPopup"
    @confirm="confirmPopup"
    @postConfirm:data="postConfirmPopup"
  />
</template>
<script lang="ts" setup>
import MyInfoInvite from '@/views/mypage/MyInfoInvite.vue';
import PostPopup from '@/components/popup/PostPopup.vue';
import MsgAlertPopup from '@/components/popup/MsgAlertPopup.vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { ref, onMounted, shallowRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useUserStore } from '@/stores/user.store';
import { Log } from '@/util/common';
import {
  WITHDRAW,
  WITHDRA_CONFIRM,
  POST_SEARCH,
  WITHDRAW_ALERT,
  ERROR_500,
  EIDT_SUCCESS,
  DOWNLOAD_FAIL,
  NOT_WITHDRAW_MANAGER
} from '@/util/message';
import { changePhone, convertTimestampToDate } from '@/util/number';
import { regexPhoneNumber, regexEmail } from '@/util/regex';
import {
  post,
  get_download,
  post_upload,
  put,
  get
} from '@/util/service/request';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import { addCommas } from '@/util/number';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

const fromUserRef = ref<any>(null);
const fromCompanyRef = ref<any>(null);
const fromUserValue = ref<any>({});
const fromCompanyValue = ref<any>({});
const activeTab = ref(1);
const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
const isAdAgree = ref(false);
const downLoadURL = ref('');

interface PopupItem {
  component: any;
  content: any;
}

const userSchema = yup.object().shape({
  userName: yup.string().required(t('common.validation.required')),
  userPhone: yup
    .string()
    .matches(regexPhoneNumber, t('common.validation.failed_phone'))
    .required(t('common.validation.required')),
  userEmail: yup
    .string()
    .matches(regexEmail, t('common.validation.failed_email'))
    .required(t('common.validation.required'))
});

const companySchema = yup.object().shape({
  businessNumber: yup
    .string()
    .min(10, t('common.validation.failed_business_no'))
    .max(10, t('common.validation.failed_business_no'))
    .required(t('common.validation.required')),
  businessName: yup.string().required(t('common.validation.required')),
  presidentName: yup.string().required(t('common.validation.required')),
  taxPicName: yup.string().required(t('common.validation.required')),
  taxPicTel: yup
    .string()
    .matches(regexPhoneNumber, t('common.validation.failed_phone'))
    .required(t('common.validation.required')),
  taxPicEmail: yup
    .string()
    .matches(regexEmail, t('common.validation.failed_email'))
    .required(t('common.validation.required')),
  businessType: yup.string().required(t('common.validation.required')),
  businessStat: yup.string().required(t('common.validation.required')),
  businessAddr1: yup.string().required(t('common.validation.required')),
  businessAddr2: yup.string().required(t('common.validation.required')),
  businessPostName: yup.string().required(t('common.validation.required'))
});

onMounted(() => {
  activeTab.value = Number(route.query.activeTab ?? 1);
  getUserInfo();
});

//유저 정보 가져오기
const getUserInfo = () => {
  const url = `/user/login/userInfo`;
  const params = '';
  post(url, params, userStore.getToken)
    .then((res) => {
      // Log(res);
      if (res.data.errorCode == 'SUCCESS') {
        const result = res.data.payload;

        //유저 객체 업데이트
        userStore.setUserInfo({
          email: result.userEmail,
          name: result.userName,
          presidentName: result.presidentName,
          businessNumber: result.businessNumber,
          businessName: result.businessName
        });

        //유저 정보 유효성 체크
        fromUserValue.value = {
          userName: isNull(result.userName),
          userPhone: changePhone(isNull(result.userPhone)),
          userEmail: isNull(result.userEmail),
          userTheme: String(result.adAgreeYN) === '1' ? true : false,
          userThemeDate: convertTimestampToDate(result.adAgreeDate),
          userType: result.userType
        };

        fromCompanyValue.value = {
          compId: result.compId,
          businessNumber: isNull(result.businessNumber),
          businessName: isNull(result.businessName),
          presidentName: isNull(result.presidentName),
          taxPicName: isNull(result.taxPicName),
          taxPicPosition: isNull(result.taxPicPosition),
          taxPicTel: changePhone(isNull(result.taxPicTel)),
          taxPicEmail: isNull(result.taxPicEmail),
          businessType: isNull(result.businessType),
          businessStat: isNull(result.businessStat),
          businessAddr1: isNull(result.businessAddr1),
          businessAddr2: isNull(result.businessAddr2),
          businessPostName: isNull(result.businessPostName),
          regCertFileName: isNull(result.regCertFileName),
          regCertAttachYN: isNull(result.regCertAttachYN),
          regCertPath: isNull(result.regCertPath),
          uploadRealFile: null,
          uploadRealFileName: ''
        };

        if (result.regCertFileName) {
          downloadFile(result.regCertFileName);
        }
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

const getTotPoints = async () => {
  const userType = userStore.getUser.userType;
  const url_info = `/user/point?userType=${userType}`;
  get(url_info, '', userStore.getToken)
    .then((_response) => {
      const total = addCommas(_response.data.payload.totPoint);
      activePopups.value.push({
        component: shallowRef(MsgAlertPopup),
        content: WITHDRAW(total)
      });
    })
    .catch(() => {});
};

//사업자등록증 파일다운로드
const downloadFile = (fileNm: string) => {
  const url = `/user/file/download/BUSINESS_NUMBER/${fileNm}`;
  get_download(url, '', userStore.getToken)
    .then((_response) => {
      if (_response.status == 201 || _response.status == 202) {
        showPopup('DOWNLOAD_FAIL');
      } else {
        Log('downloadFile', _response);
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

//사업자등록증 파일업데이트
const uploadFile = (event: any) => {
  const url = `/user/file/upload/BUSINESS_NUMBER`;
  const formData = new FormData();
  formData.append('files', event.target.files[0]);
  post_upload(url, formData, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        const result = res.data.payload;
        fromCompanyValue.value.uploadRealFile = result;
        fromCompanyValue.value.uploadRealFileName = result.originalFileName;
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//수정하기
const edit = () => {
  const url = `/user/login/userInfo`;
  const user = fromUserValue.value;
  const company = fromCompanyValue.value;
  const params = {
    userType: user.userType,
    userEmail: user.userEmail,
    userName: user.userName,
    userPhone: user.userPhone.replace(/-/g, ''),
    adAgreeYN: user.userTheme ? '1' : '2',
    isAdAgree: isAdAgree.value,
    compId: company.compId,
    businessNumber: company.businessNumber,
    businessName: company.businessName,
    presidentName: company.presidentName,
    taxPicName: company.taxPicName,
    taxPicPosition: company.taxPicPosition,
    taxPicTel: company.taxPicTel.replace(/-/g, ''),
    taxPicEmail: company.taxPicEmail,
    businessType: company.businessType,
    businessStat: company.businessStat,
    businessAddr1: company.businessAddr1,
    businessAddr2: company.businessAddr2,
    businessPostName: company.businessPostName,
    regCertAttachYN: company.uploadRealFile ? '1' : company.regCertAttachYN,
    regCertFileName: company.uploadRealFile
      ? company.uploadRealFile?.fileName
      : company.regCertFileName,
    regCertPath: company.uploadRealFile
      ? company.uploadRealFile?.fileFolder
      : company.regCertPath
  };
  put(url, params, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        showPopup('EIDT_SUCCESS');
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log(error);
      showPopup('ERROR_500');
    });
};

//회원탈퇴
const withdraw = () => {
  const userType = userStore.getUser.userType;
  const url = `/user/login/withdraw?userType=${userType}`;
  put(url, {}, userStore.getToken)
    .then((res) => {
      if (res.data.errorCode == 'SUCCESS') {
        showPopup('WITHDRA_CONFIRM');
      } else if (res.data.errorCode == 'NOT_WITHDRAW_MANAGER') {
        showPopup('NOT_WITHDRAW_MANAGER');
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//사업자 번호 검증
const numberCheck = (params: any) => {
  const url = `/user/login/business/check`;
  post(url, params, userStore.getToken)
    .then((res) => {
      Log(res);
      if (res.data.errorCode == 'SUCCESS') {
        fromUserRef.value?.validate().then((userSuccess?: any) => {
          if (userSuccess?.valid) {
            fromCompanyRef.value?.validate().then((companySuccess?: any) => {
              if (companySuccess?.valid) {
                edit();
              }
            });
          }
        });
      } else {
        fromCompanyRef.value?.setFieldError(
          'businessNumber',
          t('common.validation.failed_business_no')
        );
      }
    })
    .catch(() => {
      showPopup('ERROR_500');
    });
};

//공통 팝업
const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'WITHDRA_CONFIRM':
      activePopups.value.push({
        component: shallowRef(MsgAlertPopup),
        content: WITHDRA_CONFIRM
      });
      break;
    case 'WITHDRAW_ALERT':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: WITHDRAW_ALERT
      });
      break;
    case 'WITHDRAW':
      getTotPoints();
      break;
    case 'EDIT':
      if (activeTab.value != 1) {
        activeTab.value = 1;
        return;
      }
      if (userStore.getUser.userType == '2') {
        numberCheck({ businessNumber: fromCompanyValue.value.businessNumber });
      } else {
        fromUserRef.value?.validate().then((userSuccess?: any) => {
          if (userSuccess?.valid) {
            edit();
          }
        });
      }

      break;
    case 'POST_SEARCH':
      activePopups.value.push({
        component: shallowRef(PostPopup),
        content: POST_SEARCH
      });
      break;
    case 'ERROR_500':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: ERROR_500
      });
      break;
    case 'EIDT_SUCCESS':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: EIDT_SUCCESS
      });
      break;
    case 'DOWNLOAD_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: DOWNLOAD_FAIL
      });
      break;
    case 'NOT_WITHDRAW_MANAGER':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: NOT_WITHDRAW_MANAGER
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
    case 'WITHDRAW':
      withdraw();
      break;
    case 'WITHDRA_CONFIRM':
      userStore.resetUser();
      router.push('/');
      break;
    case 'EIDT_SUCCESS':
      getUserInfo();
      break;
  }
};

//다음 주소 팝업 데이터 가져오기
const postConfirmPopup = (data: any) => {
  currentPopup.value = '';
  activePopups.value.splice(0, 1);
  fromCompanyValue.value.businessPostName = data.zonecode;
  fromCompanyValue.value.businessAddr1 = data.address;
};

//null체크
const isNull = (value: any) => {
  return value === null ? '' : value;
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
        width: 170px;
        border-radius: 0 4px 4px 0;
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
          border-radius: 4px;
          width: 100%;
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

.attachment {
  display: flex;
  gap: 12px;
  margin-left: 15px;
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

.master-tr {
  background-color: #fff6ed !important;
}
.update {
  margin: auto;
}
</style>
