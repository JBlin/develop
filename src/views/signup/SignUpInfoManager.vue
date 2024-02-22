<template>
  <div class="login">
    <div class="contents-title-box">
      <!-- <span class="contents-title">개인 및 법인사업자</span> -->
      <span class="contents-sub-title">사업자 정보를 입력해 주세요.</span>
      <span class="contents-text"
        >담당자를 추가하여 서비스를 이용하실 수 있어요.</span
      >
    </div>

    <Form
      class="info-form"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors }"
      ref="fromRef"
    >
      <div class="input-box">
        <span class="input-title require" for="businessName"> 상호명 </span>
        <div class="input" :class="{ fail: errors?.businessName }">
          <Field
            class="input"
            id="businessName"
            name="businessName"
            type="text"
            maxlength="30"
            placeholder="상호명을 입력해 주세요"
          />
        </div>
        <ErrorMessage class="fail_msg" name="businessName" />
      </div>

      <div class="input-box">
        <span class="input-title require" for="presidentName"> 대표자명 </span>
        <div class="input" :class="{ fail: errors?.presidentName }">
          <Field
            class="input"
            id="presidentName"
            name="presidentName"
            type="text"
            maxlength="20"
            placeholder="대표자명을 입력해 주세요"
          />
        </div>
        <ErrorMessage class="fail_msg" name="presidentName" />
      </div>

      <div class="input-box">
        <span class="input-title require" for="businessNumber">
          사업자 등록번호
        </span>
        <div class="input" :class="{ fail: errors?.businessNumber }">
          <Field
            class="input"
            id="businessNumber"
            name="businessNumber"
            type="number"
            placeholder="하이픈(-)을 제외한 사업자 등록번호 10자리를 입력해 주세요"
            oninput="this.value = this.value.slice(0, 10)"
          />
        </div>
        <ErrorMessage class="fail_msg" name="businessNumber" />
      </div>

      <div class="form-btn-box">
        <button class="form-btn black">확인</button>
        <button class="form-btn grey" @click="cancel()">취소</button>
      </div>
    </Form>
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
</template>
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { isMobile, Log } from '@/util/common';
import { post } from '@/util/service/request';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { LOGIN_FAIL, ERROR_500, CUSTOM_ONE } from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';

const fromRef = ref<any>(null);
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

const schema = yup.object().shape({
  businessName: yup.string().required(t('common.validation.required')),
  presidentName: yup.string().required(t('common.validation.required')),
  businessNumber: yup
    .string()
    .min(10, t('common.validation.failed_business_no'))
    .max(10, t('common.validation.failed_business_no'))
    .required(t('common.validation.required'))
});

const onSubmit = (result: any) => {
  Log(result);
  const userInfo = userStore.getUser;

  const params = {
    snsId: userInfo.snsId,
    snsAuthToken: userInfo.snsAuthToken,
    userEmail: userInfo.email,
    userType: String(2),
    userName: userInfo.name,
    userPhone: userInfo.phone,
    presidentName: result.presidentName,
    businessNumber: result.businessNumber,
    businessName: result.businessName
  };
  numberCheck(params);
};

const signup = (params: any) => {
  let device: string = '1';
  if (isMobile()) {
    device = '2';
  }

  const url = `/user/login/signup?device=${device}`;
  post(url, params)
    .then((res) => {
      if (res.data.status == 200) {
        const data = res.data.payload;
        Log(data);
        userStore.setUser(
          {
            snsId: data.snsId,
            snsAuthToken: data.snsAuthToken,
            userType: data.userType,
            email: data.userEmail,
            name: data.userName,
            phone: data.userPhone,
            point: data.totPoint,
            presidentName: data.presidentName,
            businessNumber: data.businessNumber,
            businessName: data.businessName
          },
          data.userToken
        );
        router.push('/pocket/Main');
      } else {
        showPopup('LOGIN_FAIL');
        router.push('/Login');
      }
    })
    .catch((error) => {
      Log('에러', error);
      showPopup('LOGIN_FAIL');
    });
};

const numberCheck = (params: any) => {
  const url = `/user/login/business/check`;
  post(url, params)
    .then((res) => {
      Log(res);
      if (res.data.errorCode == 'SUCCESS') {
        signup(params);
      } else if (res.data.errorCode == 'BUSINESS_NUMBER_NOT') {
        fromRef.value?.setFieldError(
          'businessNumber',
          t('common.validation.failed_business_no')
        );
      } else if (res.data.errorCode == 'BUSINESS_NUMBER_NOT_FOUND') {
        showPopup('CUSTOM_ONE', res.data.msg);
      } else {
        showPopup('ERROR_500');
      }
    })
    .catch((error) => {
      Log('에러', error);
      showPopup('ERROR_500');
    });
};

const cancel = () => {
  userStore.resetUser;
  router.push('/');
};

//공통 팝업
const showPopup = (popName: string, msg?: string) => {
  switch (popName) {
    case 'LOGIN_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: LOGIN_FAIL
      });
      break;
    case 'CUSTOM_ONE':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: CUSTOM_ONE(msg)
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
  activePopups.value.splice(0, 1);
  router.push('/Login');
};

//취소 버튼
const cancelPopup = () => {
  activePopups.value.splice(0, 1);
};

//확인버튼
const confirmPopup = () => {
  activePopups.value.splice(0, 1);
  router.push('/Login');
};
</script>
<style lang="scss" scoped></style>
