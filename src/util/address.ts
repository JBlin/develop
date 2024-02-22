/**
 * 주소 변경 처리 함수 모음
 */

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 문자열을 간략한 주소로 변경합니다.
 * @example
 * trimAddress('경기도 수원시 팔달구 매산로104번길 10, 풍림아이원아파트 제1층 제101호 [교동 185-7]') // '경기도 수원시 팔달구 매산로104번길 10'
 * trimAddress('경상남도 김해시 주촌면 이지산단로 51 [천곡리 1414-1 부산기전가동]') // '경상남도 김해시 주촌면 이지산단로 51'
 * trimAddress('경상남도 창원시 진해구 안골동 부산항신항북컨배후물류부지비51 부산신항화물차휴게소 제세차장동호') // '경상남도 창원시 진해구 안골동'
 */
function trimAddress(inputString: string): string {
  let formattedAddress = '';
  if (inputString.includes(',')) {
    formattedAddress = inputString.split(', ')[0];
  } else if (inputString.includes('[')) {
    formattedAddress = inputString.split('[')[0].trim();
  } else {
    const wordArray = inputString.split(' ');
    formattedAddress = wordArray.slice(0, 5).join(' ');
  }
  return formattedAddress;
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 문자열을 카카오맵에서 인식할 수 있는 주소로 변경합니다.
 * @example
 * trimAddress('경기도 수원시 팔달구 매산로104번길 10, 풍림아이원아파트 제1층 제101호 [교동 185-7]') // '경기도 수원시 팔달구 매산로104번길 10'
 * trimAddress('경상남도 김해시 주촌면 이지산단로 51 [천곡리 1414-1 부산기전가동]') // '경상남도 김해시 주촌면 이지산단로 51'
 * trimAddress('서울특별시 광진구 용마산로29길 19 중곡동29-50공동주택 제2층 제202호') // '서울특별시 광진구 용마산로29길 19'
 */
function trimForKakaoAddress(inputString: string): string {
  let formattedAddress = '';
  if (inputString.includes(',')) {
    formattedAddress = inputString.split(', ')[0];
  } else if (inputString.includes('[')) {
    const trimmedAddress = inputString.split('[')[0].trim();
    const wordArray = trimmedAddress.split(' ');
    if (wordArray[0].includes('도')) {
      formattedAddress = wordArray.slice(0, 5).join(' ');
    } else {
      formattedAddress = wordArray.slice(0, 4).join(' ');
    }
  } else {
    const wordArray = inputString.split(' ');
    formattedAddress = wordArray.slice(0, 5).join(' ');
  }
  return formattedAddress;
}

export { trimAddress, trimForKakaoAddress };
