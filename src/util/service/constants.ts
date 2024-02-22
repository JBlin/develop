/**
 * 글로벌 HTTP 상수를 지정한다.
 * 실패시 해당 처리로 구분
 */
const HTTP_STATUS_CODE = {
  SUCCESSFUL: 200, // 성공
  UNAUTHORIZED: 401 // 인증실패
};

/**
 * 토스 페이먼츠 상품 타입
 * 현 기획상 포인트 결제만 일어나기에 별도 추가가 없을 것으로 보이나 상수처리를 하여 명칭 변경시에도 대응할 수 있도록 한다.
 */
const PRODUCT_TYPE = {
  POINT: '등기데이터_포인트'
};
export { HTTP_STATUS_CODE, PRODUCT_TYPE };
