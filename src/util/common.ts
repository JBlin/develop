/**
 * @returns {string} boolean
 * @description
 * 1. 모바일인지 확인한다.
 * @example
 * isMobile() // true or false
 */
function isMobile(): boolean {
  if (
    navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i
    )
  ) {
    return true;
  }
  return false;
}

/**
 * @param {string} key
 * @returns {string} value
 * @description
 * 1. 로그를 출력한다.
 * @example
 * Log("title") // 테스트 ::: title
 */
function Log(title: any, text?: any): void {
  if (text) {
    console.log(title, ':::', text);
  } else {
    console.log('테스트 :::', title);
  }
}

/**
 * @param {string} key
 * @returns {string} value
 * @description
 * 1. 입력받은 쿼리스트링 키값을 통해 value값을 가져온다.
 * @example
 * getQueryString("orderId") // toss_payments_3004028427_1694652313652
 */
function getQueryString(key: string): string {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return '';
}

/**
 * @param {string} presidentNm
 * @returns {string} value
 * @description
 * 1. 입력받은 대표자명 XML 추출값 데이터에서 이름만 분리해 가져온다.
 * @example
 * getPresidentNm("대표이사 권일수 6") // "권일수"
 */
function getPresidentNm(presidentNm: string): string {
  try {
    const name = presidentNm.split(' ');
    return name[1];
  } catch (error: any) {
    return '-';
  }
}

export { isMobile, Log, getQueryString, getPresidentNm };
