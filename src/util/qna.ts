/**
 * 숫자 변경 처리 함수 모음
 */

/**
 * @param {string} questionType
 * @returns {string}
 * @description
 * 1. 입력받은 타입 문자열을 각 해당 문자열로 변환
 * @example
 * checkQuestionType('1') // '이용문의'
 */
const checkQuestionType = (questionType: string) => {
  switch (questionType) {
    case '1':
      return '이용문의';
    case '2':
      return '포인트문의';
    case '3':
      return '오류/불만';
    case '4':
      return '개선사항';
    case '5':
      return '기타';
    default:
      return '선택';
  }
};

const checkReplyType = (replyType: string) => {
  switch (replyType) {
    case '1':
      return '미회신';
    case '2':
      return '회신완료';
    default:
      return '미회신';
  }
};

export { checkQuestionType, checkReplyType };
