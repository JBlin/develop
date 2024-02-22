<template>
  <div class="login">
    <div class="contents-title-box">
      <!-- <span class="contents-title">개인 및 법인사업자</span> -->
      <span class="contents-sub-title">개인 정보를 입력해 주세요.</span>
      <span class="contents-text"> </span>
    </div>

    <Form
      class="info-form"
      @submit="onSubmit"
      :initial-values="fromUserValue"
      :validation-schema="schema"
      v-slot="{ errors }"
      ref="fromRef"
    >
      <div class="input-box">
        <span class="input-title require" for="userEmail"> 이메일 </span>
        <div class="input" :class="{ fail: errors?.userEmail }">
          <Field
            v-model="fromUserValue.userEmail"
            class="input"
            id="userEmail"
            name="userEmail"
            type="text"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <ErrorMessage class="fail_msg" name="userEmail" />
      </div>

      <div class="input-box">
        <span class="input-title require" for="userName"> 이름 </span>
        <div class="input" :class="{ fail: errors?.userName }">
          <Field
            v-model="fromUserValue.userName"
            class="input"
            id="userName"
            name="userName"
            type="text"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <ErrorMessage class="fail_msg" name="userName" />
      </div>

      <div class="input-box">
        <span class="input-title require" for="userPhone"> 휴대폰 번호 </span>
        <div class="input" :class="{ fail: errors?.userPhone }">
          <Field
            v-model="fromUserValue.userPhone"
            class="input"
            id="userPhone"
            name="userPhone"
            type="text"
            placeholder="번호만 입력해주세요"
          />
        </div>
        <ErrorMessage class="fail_msg" name="userPhone" />
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
import { ref, shallowRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { isMobile, Log } from '@/util/common';
import { post } from '@/util/service/request';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { LOGIN_FAIL, ERROR_500, CUSTOM_ONE } from '@/util/message';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import { regexPhoneNumber, regexEmail } from '@/util/regex';
const fromRef = ref();
const fromUserValue = ref<any>({});
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

onMounted(() => {
  const userInfo = userStore.getUser;
  fromUserValue.value = {
    userEmail: isNull(userInfo.email),
    userName: isNull(userInfo.name),
    userPhone: isNull(userInfo.phone)
  };
});

const schema = yup.object().shape({
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

const onSubmit = (result: any) => {
  Log(result);
  const userInfo = userStore.getUser;
  const params = {
    snsId: userInfo.snsId,
    snsAuthToken: userInfo.snsAuthToken,
    userEmail: userInfo.email,
    userType: String(1),
    userName: userInfo.name,
    userPhone: userInfo.phone
  };
  signup(params);
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
      }
    })
    .catch((error) => {
      Log('에러', error);
      showPopup('LOGIN_FAIL');
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
const isNull = (value: any) => {
  return value === null ? '' : value;
};
</script>
<style lang="scss" scoped></style>
