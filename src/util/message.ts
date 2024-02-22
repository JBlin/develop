// alert 메세지를 별도 파일로 만든 이유는
// 나중에 다국어 적용 및 모든 페이지에서 일정한 메세지 alert창을 출력하기 위해서 입니다.

const WITHDRAW = (point: string) => {
  return {
    img: '/images/exclamation.svg',
    imgColor: '#FEE4E2',
    title: '정말 탈퇴하시겠습니까?',
    text: `탈퇴하실 경우  ${point}포인트 및 모든 정보가 삭제되며 복구되지 않습니다.`,
    confirm: '네.탈퇴하겠습니다.',
    cancel: '아니오'
  };
};

const WITHDRA_CONFIRM = {
  buttonType: true,
  title: '회원 탈퇴가 완료되었습니다.',
  text: '등기데이터를 이용해 주셔서 진심으로 감사합니다. 더욱 더 노력하는 등기데이터가 되겠습니다.',
  confirm: '확인'
};

const NOT_WITHDRAW_MANAGER = {
  buttonType: true,
  title:
    '담당자회원은 회사에 소속된 이용자회원이 없을경우에만 탈퇴가 가능합니다.'
};

const INVITE_CREATE = {
  buttonType: true,
  title: '초대 링크 생성완료',
  text: '등기데이터 초대 링크 생성이 완료되었습니다.',
  confirm: '확인'
};

const INVITE_COPY = {
  buttonType: true,
  title: '초대 링크 복사완료',
  text: '등기데이터를 함께하고 싶은 직원에게 공유해 보세요.',
  confirm: '확인'
};

const POST_SEARCH = {
  title: '우편번호'
};

const ERROR_500 = {
  buttonType: true,
  title: '에러가 발생했습니다. 잠시후 다시 시도해주세요.'
};

const ERROR_400 = {
  buttonType: true,
  title: '탈퇴회원입니다. 로그아웃 됩니다.'
};

const ERROR_401 = {
  buttonType: true,
  title: '탈퇴회원입니다. 로그아웃 됩니다.'
};

const DEL_DATA = {
  title: '삭제하시겠습니까?'
};

const REISSUE = {
  title: '재발급을 위해 장바구니로 저장합니다.'
};

const UUID_PERIOD_EXPIRES = {
  buttonType: true,
  title: '담당자에게 가입링크를 확인해주세요.'
};

const LOGIN_FAIL = {
  buttonType: true,
  title: '로그인에 실패했습니다. 다시 시도해주세요.'
};

const WITHDRAW_ALERT = {
  buttonType: true,
  title: '담당자 회원은 담당자 변경을 진행해 주셔야 탈퇴가 가능합니다.'
};

const MANAGER_CHANGE_FAIL = {
  buttonType: true,
  title: '담당자 변경은 한명만 선택해 주셔야 합니다.'
};

const MANAGER_CHANGE = (name: string) => {
  return {
    img: '/images/exclamation.svg',
    imgColor: '#FEE4E2',
    title: `담당자가 [${name}]님으로 변경됩니다.진행하시겠습니까?`,
    confirm: '네.변경하겠습니다',
    cancel: '아니오'
  };
};

const STAFF_WITHDRAW_FAIL = {
  buttonType: true,
  title: '한명이상 선택해 주셔야 합니다.'
};

const STAFF_WITHDRAW = (num: string) => {
  return {
    img: '/images/exclamation.svg',
    imgColor: '#FEE4E2',
    title: `정말 ${num} 이용자를 탈퇴 처리하시겠습니까?`,
    text: '탈퇴하시면 추후 복구되지 않습니다.',
    confirm: '네.탈퇴하겠습니다.',
    cancel: '아니오'
  };
};

const INVITE_URL_1 = {
  buttonType: false,
  title: '유효기간이 많이 남아있습니다. 그래도 재생성 하시겠습니까?'
};

const INVITE_URL_2 = {
  buttonType: true,
  title: '유효기간이 지났습니다. 링크생성 후 다시 처리해주세요.'
};

const MAP = (data: any) => {
  return {
    title: '지도',
    id: data
  };
};

const CUSTOM_ONE = (msg: any) => {
  return {
    buttonType: true,
    title: msg
  };
};

const CORPORATE_EMPTY = {
  buttonType: true,
  title: '법인을 선택해주세요.'
};

const REAL_ESTATE_EMPTY = {
  buttonType: true,
  title: '부동산을 선택해주세요.'
};

const EIDT_SUCCESS = {
  buttonType: true,
  title: '수정이 완료되었습니다.'
};

const CORP_MEMBER_DATE = {
  buttonType: true,
  title: '등기예정일 변경은 1회만 가능합니다.'
};

const CHANGE_DATA = {
  buttonType: true,
  title: '등기예정일이 변경되지 않았습니다. \n확인 후 다시 입력해 주세요.'
};

const ISNULL_DATE = {
  buttonType: true,
  title: '입력한 날짜형식이 올바르지 않습니다. \n(형식: YYYY-MM-DD)'
};

const PAY_PROCESS_CANCELED = {
  buttonType: true,
  title: '사용자에 의해 결제가 취소되었습니다.'
};

const PAY_PROCESS_ABORTED = {
  buttonType: true,
  title: '결제 진행 중 승인에 실패하여 결제가 중단되었습니다.'
};

const REJECT_CARD_COMPANY = {
  buttonType: true,
  title: '결제 승인이 거절되었습니다.'
};

const PAY_PROCESS_SUCCEED = (purchasePoint: string) => {
  return {
    buttonType: true,
    title: `${purchasePoint} Point 결제가 완료되었습니다.`
  };
};

const ISSUE_DETAIL = (id: any, issuer: any) => {
  return {
    issueId: id,
    issuer: issuer
  };
};

const DOWNLOAD_FAIL = {
  buttonType: true,
  title: '다운로드할 파일이 존재하지 않습니다.'
};

const DEL_SUCCESS = {
  buttonType: true,
  title: '삭제가 완료되었습니다.'
};

const NO_SPECIAL_TEXT = {
  buttonType: true,
  title: '특수문자는 입력하실 수 없습니다.'
};
const SAVE_SUCCESS = {
  buttonType: true,
  title: '저장이 완료되었습니다'
};

const NODATA_FAQ = {
  buttonType: true,
  title: '등록된 자주 묻는 질문이 없습니다. 관리자에게 문의해주세요.'
};

const BASKET_CORP = {
  buttonType: true,
  title: '장바구니에 담을 법인을 선택해주세요.'
};

const BASKET_ESTATE = {
  buttonType: true,
  title: '장바구니에 담을 부동산을 선택해주세요.'
};

const QNA_CONTENT = {
  buttonType: true,
  title: '내용을 입력해주세요.'
};

const QNA_TITLE = {
  buttonType: true,
  title: '제목을 입력해주세요.'
};

const QNA_SELECT = {
  buttonType: true,
  title: '문의 유형을 선택해 주세요.'
};

const QNA_SUCCESS = {
  buttonType: true,
  title: '문의 등록이 완료되었습니다.'
};

const QNA_EDIT_SUCCESS = {
  buttonType: true,
  title: '문의 수정이 완료되었습니다.'
};

const ISSUE_SUCCESS = {
  buttonType: true,
  title:
    '등기 발급이 신청되었습니다. \n발급 처리에 1분 가량 소요되오니 \n잠시후 [발급등기] 탭에서 목록을 조회하시기 바랍니다.'
};

const POINT_LACK = {
  buttonType: true,
  title: '보유포인트가 부족합니다'
};

const POINT_SELECT = {
  buttonType: true,
  title: '충전할 포인트를 선택해주세요.'
};

const ISSUE_VIEW = {
  buttonType: true,
  title: '등본 열람 또는 발급을 선택해주세요'
};

const ESTATE_LAND = {
  buttonType: true,
  title: '토지는 건축물 대장 발급이 불가능합니다.'
};

const ESTATE_ALERT = {
  buttonType: true,
  title: '변경알림은 등본 열람 또는 발급시에만 선택 가능합니다.'
};

const CORP_ALERT = {
  buttonType: true,
  title: '임기만료 알림은 등본 열람 또는 발급 시에만 선택 가능합니다.'
};

const POST_FAIL = {
  buttonType: true,
  title: '주소가 정확하지 않아 확인이 어렵습니다. 다시 확인해주세요.'
};

const SEARCH_TEXT_CHECK = (length: number) => {
  const text =
    length === 0
      ? '검색어를 입력하시기 바랍니다.'
      : '최소 2글자 이상 입력하셔야 합니다.';
  return {
    buttonType: true,
    title: text
  };
};

const ESTATE_SEARCH_ALERT = {
  buttonType: false,
  title:
    '검색결과가 많아 소재지번 확인이 어려울 수 있습니다. [확인]을 누르면 검색결과를 확인 할 수 있으며, [취소]를 누르면 검색어 수정 후 재조회 할 수 있습니다.'
};

const ESTATE_SEARCH_LIMIT_EXCEED = {
  buttonType: true,
  title: '검색 총 갯수 100개 이하일 경우에만 최종 페이지 이동 가능합니다.'
};

const STAFF_SIGNUP_1 = (companyName?: string) => {
  return {
    buttonType: false,
    title: `[${companyName}] 이용자로 가입하시겠습니까?`
  };
};

const STAFF_SIGNUP_2 = (companyName?: string) => {
  return {
    buttonType: false,
    title: `개인회원으로 가입된 상태입니다.[${companyName}] 이용자로 전환하시겠습니까?`
  };
};

const STAFF_SIGNUP_3 = (companyName?: string, userType?: string) => {
  const type = userType == null ? '' : userType == '2' ? '담당자' : '이용자';
  return {
    buttonType: true,
    title: `이미 [${companyName}]에 ${type}로 가입되었습니다. 홈페이지(www.irosdata.com)로 접속해주세요.`
  };
};

const STAFF_SIGNUP_4 = {
  buttonType: true,
  title:
    '다른 회사에 이미 가입되어 있습니다. 홈페이지(www.irosdata.com)로 접속해 주세요.'
};

const STAFF_SIGNUP_5 = {
  buttonType: true,
  title:
    '사용가능한 포인트가 있는 회원은 가입이 불가능합니다. 담당자에게 문의해주세요.'
};

const KAKAO_NOACCOUNT = {
  buttonType: true,
  title: '카카오톡을 사용하는 계정이 아닙니다. 다른 계정으로 가입해 주세요.'
};

const QNA_DATAIL = (title: string, qnaId: string) => {
  return {
    title: title,
    qnaId: qnaId
  };
};

const POINT_RECHARGE = (point: number) => {
  return {
    title: '충전하기',
    totalPoint: point ? point : 0
  };
};

const POINT_RECHARGE_REQUEST = (compPicName?: string) => {
  return {
    buttonType: false,
    title: `회사 담당자인 ${compPicName} 님에게 충전을 요청하세요.`
  };
};

const CORP_NUMBER = {
  buttonType: true,
  title: '법인등록번호가 유효하지 않습니다'
};

const CORP_NO_DATA = {
  buttonType: true,
  title: '검색결과가 없습니다. 검색어를 다시 입력하여 조회하시기 바랍니다.'
};

const UPLOAD_SUCCESS = {
  buttonType: true,
  title: '첨부파일 업로드가 완료되었습니다.'
};

const POINT_RECHARGE_LIMIT = {
  buttonType: true,
  title: '포인트는 최대 1회 10만원까지 가능합니다.'
};

const ISSUE_BASKET_LIMIT = {
  buttonType: true,
  title: '장바구니에는 1회 5건만 담을 수 있습니다.'
};

const ISSUE_USER_PERMISSION = {
  buttonType: true,
  title: '담당자 발급에서만 가능한 기능입니다.'
};

const ISSUE_NOT_DETAIL = {
  buttonType: true,
  title: '발급된 등기가 없습니다.'
};

const ISSUE_FAIL_ALERT = {
  buttonType: false,
  title:
    '등기를 다시 발급하시겠습니까?\n 실패가 반복되는 등기는 인터넷등기소를 이용하시기 바랍니다.'
};

const MASS_ALERT = {
  buttonType: true,
  title:
    '스케쥴러 수행시간에 메시지처리\n (등기 발급이 처리중입니다. 오후 6시~12시'
};

const MASS_ALERT_ING = {
  buttonType: true,
  title: '예약된 발급이 진행중입니다.\n(발급시간 : 오후 6시~12시)'
};

const MASS_ALERT_ALREADY = {
  buttonType: true,
  title: '발급예약이 신청된 상태입니다.\n예약을 취소한 후 처리해주세요.'
};

const MASS_ALERT_COMPLETE = {
  buttonType: true,
  title: '발급예약이 신청되었습니다.\n(발급시간 : 오후 6시~12시)'
};

const MASS_ALERT_EMPTY = {
  buttonType: true,
  title: '장바구니가 비었습니다.'
};

const MASS_ALERT_CANCEL = {
  buttonType: true,
  title: '발급예약이 취소되었습니다.'
};

const MASS_REQUIRED_VALUE = {
  buttonType: true,
  title: '법인목록 불러오기를 진행해주세요.'
};

const MASS_CORP_ERROR1 = {
  buttonType: true,
  title: '등기번호를 조회한 후 등록하세요.'
};

const MASS_CORP_ERROR2 = (line: number, brandNm?: string) => {
  brandNm = brandNm == undefined ? '상호 미입력된' : brandNm;
  line = line + 3;
  return {
    buttonType: true,
    title: `A:${line}\n '${brandNm}' 법인등록번호를 확인해주세요.`
  };
};

const MASS_CORP_TEMP1 = {
  buttonType: false,
  title: '기존에 작업중인 데이터가 있습니다.\n 조회할까요?'
};

const MASS_CORP_TEMP2 = {
  buttonType: false,
  title: '기존에 작업중인 목록이 초기화됩니다.\n 계속하시겠습니끼?'
};

const MASS_CORP_TEMP_DEL = (brandNm?: string) => {
  return {
    buttonType: false,
    title: `'${brandNm}' 삭제하시겠습니까?`
  };
};

const MASS_CORP_TEMP_EDIT = (brandNm?: string) => {
  return {
    buttonType: false,
    title: `'${brandNm}' 등록하시겠습니까?`
  };
};

export {
  //서버 에러
  ERROR_500,
  ERROR_400,
  ERROR_401,
  //로그인, 마이페이지
  WITHDRAW,
  WITHDRA_CONFIRM,
  INVITE_CREATE,
  INVITE_COPY,
  POST_SEARCH,
  DEL_DATA,
  REISSUE,
  UUID_PERIOD_EXPIRES,
  LOGIN_FAIL,
  WITHDRAW_ALERT,
  MANAGER_CHANGE_FAIL,
  MANAGER_CHANGE,
  STAFF_WITHDRAW_FAIL,
  INVITE_URL_1,
  INVITE_URL_2,
  STAFF_WITHDRAW,
  MAP,
  CUSTOM_ONE,
  //법인, 부동산, 기타
  CORPORATE_EMPTY,
  REAL_ESTATE_EMPTY,
  EIDT_SUCCESS,
  ISSUE_DETAIL,
  CORP_MEMBER_DATE,
  CHANGE_DATA,
  ISNULL_DATE,
  PAY_PROCESS_CANCELED,
  PAY_PROCESS_ABORTED,
  REJECT_CARD_COMPANY,
  PAY_PROCESS_SUCCEED,
  DOWNLOAD_FAIL,
  DEL_SUCCESS,
  NO_SPECIAL_TEXT,
  SAVE_SUCCESS,
  NODATA_FAQ,
  BASKET_CORP,
  BASKET_ESTATE,
  QNA_CONTENT,
  QNA_TITLE,
  QNA_SELECT,
  QNA_SUCCESS,
  QNA_EDIT_SUCCESS,
  ISSUE_SUCCESS,
  POINT_LACK,
  POINT_SELECT,
  ISSUE_VIEW,
  ESTATE_LAND,
  ESTATE_ALERT,
  CORP_ALERT,
  POST_FAIL,
  SEARCH_TEXT_CHECK,
  STAFF_SIGNUP_1,
  STAFF_SIGNUP_2,
  STAFF_SIGNUP_3,
  STAFF_SIGNUP_4,
  STAFF_SIGNUP_5,
  KAKAO_NOACCOUNT,
  QNA_DATAIL,
  POINT_RECHARGE,
  POINT_RECHARGE_REQUEST,
  ESTATE_SEARCH_ALERT,
  CORP_NUMBER,
  CORP_NO_DATA,
  UPLOAD_SUCCESS,
  ESTATE_SEARCH_LIMIT_EXCEED,
  NOT_WITHDRAW_MANAGER,
  POINT_RECHARGE_LIMIT,
  ISSUE_BASKET_LIMIT,
  ISSUE_USER_PERMISSION,
  ISSUE_NOT_DETAIL,
  ISSUE_FAIL_ALERT,
  MASS_ALERT,
  MASS_ALERT_ING,
  MASS_ALERT_ALREADY,
  MASS_ALERT_COMPLETE,
  MASS_ALERT_EMPTY,
  MASS_ALERT_CANCEL,
  MASS_REQUIRED_VALUE,
  MASS_CORP_ERROR1,
  MASS_CORP_ERROR2,
  MASS_CORP_TEMP1,
  MASS_CORP_TEMP2,
  MASS_CORP_TEMP_DEL,
  MASS_CORP_TEMP_EDIT
};
