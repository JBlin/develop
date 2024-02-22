/**
 * 해당 부분은 정규식을 한군데로 모아놓아 해당 부분의 파편화를 막아 처리한다.
 */

const regexPhoneNumber =
  /^(0[1-9][01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/; /** 전화번호 형식을 확인하여 주시기 바랍니다. */
const regexPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; /** 비밀번호는 8자이상 특수문자 포함 영 소문자이어야 합니다. */
const regexEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; /** 이메일의 형식을 체크하여 주시기 바랍니다. */
const regexUserId =
  /^[a-z0-9A-Z]{5,20}$/; /** 아이디는 영 대소문자, 숫자 5~20자리로 입력해주시기 바랍니다. */
export { regexPhoneNumber, regexPassword, regexEmail, regexUserId };
