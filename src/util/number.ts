/**
 * 숫자 변경 처리 함수 모음
 */

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 부동산 고유번호 문자열을 숫자로 변환
 * 2. 변환된 숫자를 4자리씩 끊어서 배열로 만든다.
 * 3. 배열을 '-'로 합쳐서 반환한다.
 * @example
 * addBarToEstateNumber('1234567890123') // '1234-5678-90123'
 */
function addBarToEstateNumber(inputString: string): string {
  const formattedString = `${inputString.slice(0, 4)}-${inputString.slice(
    4,
    8
  )}-${inputString.slice(8)}`;
  return formattedString;
}

/**
 * @param {number} number
 * @returns {string}
 * @description
 * 1. 입력받은 숫자를 3자리씩 끊어서 배열로 만든다.
 * 2. 배열을 ','로 합쳐서 반환한다.
 * @example
 * addCommas('1234567890123') // '1,234,567,890,123'
 */
function addCommas(number: number): string {
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedNumber;
}

/**
 * @param {timestamp} timestamp
 * @returns {string}
 * @description
 * 1. 입력받은 timestamp를 Date 객체로 변환
 * 2. Date 객체에서 년, 월, 일을 추출
 * 3. 년, 월, 일을 '-'로 합쳐서 반환한다.
 * @example
 * convertTimestampToDate('2023-09-04T06:52:01.043+00:00') // '2023-09-04'
 */
function convertTimestampToDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error: any) {
    return error.message;
  }
}

/**
 * @param {timestamp} timestamp
 * @returns {string}
 * @description
 * 1. 입력받은 timestamp를 Date 객체로 변환
 * 2. Date 객체에서 년, 월, 일, 시, 분을 추출
 * 3. 년, 월, 일, 시 분을 합쳐서 반환한다.
 * @example
 * convertTimestampToDateWithTime('2023-09-04T06:52:01.043+00:00') // '2023-09-04 06:52'
 */
function convertTimestampToDateWithTime(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (error: any) {
    return error.message;
  }
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 법인등록번호 문자열에서 앞 6자리와 뒤 7자리를 추출
 * 2. 각 추출된 내용을 '-'로 합쳐서 반환한다.
 * @example
 * addBarToYearMonthDayString('20230824') // '2023-08-24'
 */
function addBarToYearMonthDayString(inputString: string): string {
  if (inputString.length !== 8 || inputString === '') {
    return '-';
  }

  const year = inputString.slice(0, 4);
  const month = inputString.slice(4, 6);
  const day = inputString.slice(6, 8);

  return `${year}-${month}-${day}`;
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 법인등록번호 문자열에서 앞 6자리와 뒤 7자리를 추출
 * 2. 각 추출된 내용을 '-'로 합쳐서 반환한다.
 * @example
 * addBarToCorpRegNumber('1301110049139') // '130111-0049139'
 */
function addBarToCorpRegNumber(inputString: string): string {
  const formattedString = inputString.replace(/^(\d{6})(\d+)/, '$1-$2');
  return formattedString;
}

/**
 * @param {string} inputString
 * @returns {string} 1 or 2
 * @description
 * 1. 입력받은 값이 숫자 또는 문자열인지 확인한다.
 * 2. 숫자일 경우 true, 문자열일 경우 false를 반환한다.
 * @example
 * checkInputStringIsNumber('1301110049139') // 1
 * checkInputStringIsNumber('안녕하세요') // 2
 */
function checkInputStringIsNumber(inputString: string): string {
  const processedInputString = inputString.replace(/-/g, '');
  if (Number(processedInputString)) {
    return '1';
  } else {
    return '2';
  }
}

function generateRandomToken(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

function generateRandomNumber(): string {
  const randomToken = generateRandomToken(32); // 32자
  return randomToken;
}
/**
 * @param {any} email
 * @returns {string} orderId
 * @description
 * 1. 입력받은 이메일주소를 이용하여 문자열 형식의 orderId를 생성한다.
 * @example
 * generatedOrderId(bonghyunyang2@gmail.com) // iros_data_Q0GTk3nOeqdIwgVk2zYvPNndSRiGF2F3_1695028202936
 */
function generatedOrderId(): string {
  return (
    'iros_data' + '_' + generateRandomNumber() + '_' + new Date().getTime()
  );
}

/**
 * @param {string} inputDate
 * @returns {string} formattedDate
 * @description
 * 1. 입력받은 일자 형태의 문자열을 포맷팅하여 일월년시분까지 리턴한다.
 * @example
 * convertDateFormat(2023-09-18T11:03:55+09:00) // 2023-09-18 11:03
 */
function convertDateFormat(inputDate: string): string {
  const inputDateObj = new Date(inputDate);
  if (isNaN(inputDateObj.getTime())) {
    return 'Invalid date format';
  }
  const year = inputDateObj.getFullYear();
  const month = String(inputDateObj.getMonth() + 1).padStart(2, '0');
  const day = String(inputDateObj.getDate()).padStart(2, '0');
  const hours = String(inputDateObj.getHours()).padStart(2, '0');
  const minutes = String(inputDateObj.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
}

/**
 * @param {string} cardCode
 * @returns {string} formattedDate
 * @description
 * 1. 입력받은 카드사 코드를 통해 카드사 이름을 리턴한다.
 * @example
 * getCardCompany(11) // 'KB국민카드'
 */
function getCardCompany(cardCode: string): string | undefined {
  const cardData: Record<string, string> = {
    '3K': '기업 BC',
    '46': '광주은행',
    '71': '롯데카드',
    '30': 'KDB산업은행',
    '31': 'BC카드',
    '51': '삼성카드',
    '38': '새마을금고',
    '41': '신한카드',
    '62': '신협',
    '36': '씨티카드',
    '33': '우리BC카드(BC 매입)',
    W1: '우리카드(우리 매입)',
    '39': '저축은행중앙회',
    '35': '전북은행',
    '42': '제주은행',
    '15': '카카오뱅크',
    '3A': '케이뱅크',
    '24': '토스뱅크',
    '21': '하나카드',
    '61': '현대카드',
    '11': 'KB국민카드',
    '91': 'NH농협카드',
    '34': 'Sh수협은행'
  };

  return cardData[cardCode] || '기타카드';
}

/**
 * @param {string} bankCode
 * @returns {string} formattedDate
 * @description
 * 1. 입력받은 은행 코드를 통해 은행 이름을 리턴한다.
 * @example
 * getBankCompany(92) // '토스뱅크'
 */
function getBankCompany(bankCode: string): string | undefined {
  const bankData: Record<string, string> = {
    '39': '경남은행',
    '34': '광주은행',
    '12': '단위농협(지역농축협)',
    '32': '부산은행',
    '45': '새마을금고',
    '64': '산림조합',
    '88': '신한은행',
    '48': '신협',
    '27': '씨티은행',
    '20': '우리은행',
    '71': '우체국',
    '50': '저축은행중앙회',
    '37': '전북은행',
    '35': '카카오뱅크',
    '92': '토스뱅크',
    '81': '하나은행',
    '54': '홍콩상하이은행',
    '03': 'IBK기업은행',
    '06': 'KB국민은행',
    '31': 'DGB대구은행',
    '02': 'KDB산업은행',
    '11': 'NH농협은행',
    '23': 'SC제일은행',
    '07': 'Sh수협은행'
  };

  return bankData[bankCode] || '기타은행';
}

/**
 * @param {string} selectedValue
 * @returns {Array} [startDate, endDate]
 * @description
 * 1. 특정 숫자로 된 문자를 입력받아 해당하는 날짜를 리턴한다.
 * @example
 * changeDate(3) // [startDate, endDate] [현재 날짜, 현재 날짜 + 7일]
 */
const changeDate = (selectedValue: string) => {
  const startDate = new Date();
  const endDate = new Date();

  switch (selectedValue) {
    case '1':
    case '2': // 1, 2번은 전체 또는 오늘로 처리
      break;
    case '3':
      startDate.setDate(endDate.getDate() - 7); // 1주일(7일) 이전
      break;
    case '4':
      startDate.setDate(endDate.getDate() - 30); // 1개월(30일) 이전
      break;
    case '5':
      startDate.setDate(endDate.getDate() - 60); // 2개월(60일) 이전
      break;
    case '6':
      startDate.setDate(endDate.getDate() - 90); // 3개월(90일) 이전
      break;
    default:
      break;
  }

  const returnArr = [startDate, endDate];
  return returnArr;
};

/**
 * @param {string} inputString
 * @returns {string} formattedDate
 * @description
 * 1. 법인등기 XML에서 열람일시를 받아와서 날짜 형식으로 변환한다.
 * @example
 * convertIssueCorpDateTime(열람일시 : 2023년 10월 04일 오후 16시 33분 57초) // 2023-10-04 16:33:57
 */
function convertIssueCorpDateTime(inputString: string): string {
  if (inputString == null) {
    return '-';
  }
  const dateAndTime = inputString.split('열람일시 :')[1];
  const year = dateAndTime.slice(0, 5);
  const month = dateAndTime.slice(7, 9);
  const day = dateAndTime.slice(11, 13);
  const hours = dateAndTime.slice(18, 20);
  const minutes = dateAndTime.slice(22, 24);
  const seconds = dateAndTime.slice(26, 28);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

/**
 * @param {string} inputString
 * @returns {string} formattedDate
 * @description
 * 1. 부동산등기 열람일시를 받아와서 날짜 형식으로 변환한다.
 * @example
 * convertIssueEstateDateTime(2023년10월11일 11시02분37초) // 2023-10-04 16:33:57
 */
function convertIssueEstateDateTime(inputString: string): string {
  if (inputString == null) {
    return '-';
  }
  const dateAndTime = inputString;
  const year = dateAndTime.slice(0, 4);
  const month = dateAndTime.slice(5, 7);
  const day = dateAndTime.slice(8, 10);
  const hours = dateAndTime.slice(12, 14);
  const minutes = dateAndTime.slice(15, 17);
  const seconds = dateAndTime.slice(18, 20);
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 1. 입력받은 부동산등기 문자열에 추출된 내용을 '-'로 합쳐서 반환한다.
 * @example
 * addBarToEstateRegNumber(12012019013069') // '1201-2019-013069'
 */
function addBarToEstateRegNumber(inputString: string): string {
  const formattedString = inputString.replace(
    /(\d{4})(\d{4})(\d{6})/,
    '$1-$2-$3'
  );
  return formattedString;
}

/**
 * @param {string} targetDateString
 * @returns {string}
 * @description
 * 1. 입력받은 날짜와 금일날짜와의 차이를 계산하여 반환한다.
 * @example
 * calculateDateInterval('2023-10-18') // '33'
 */
function calculateDateInterval(targetDateString: string | null): string {
  if (targetDateString === null || targetDateString === '') {
    return '-';
  }

  const targetDate: Date = new Date(targetDateString);
  const currentDate: Date = new Date();
  const timeDifference: number = targetDate.getTime() - currentDate.getTime();

  const daysDifference: number = Math.ceil(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  // 오늘 날짜보다 이전인 경우
  if (daysDifference < 0) {
    return '도과';
  }

  // 오늘 날짜 이후일 시 '-' 추가
  return String('-' + daysDifference);
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * 01000000000 => 010-0000-0000
 * @example
 * changeType('01000000000') // 010-0000-0000
 */
function changePhone(inputString: string): string {
  const formattedString = inputString.replace(
    /^(\d{2,3})(\d{3,4})(\d{4})$/,
    `$1-$2-$3`
  );
  return formattedString;
}

/**
 * @param {string} inputString
 * @returns {string}
 * @description
 * @example
 * convertIssueCorpDate('2007 년 08 월 22 일') // 2007-08-22
 */
function convertIssueCorpDate(inputString: string): string {
  const text = inputString.replace(/\s/g, '');
  return text.replace(/년|월/g, '-').replace('일', '');
}

export {
  addBarToEstateNumber,
  addCommas,
  convertTimestampToDate,
  addBarToYearMonthDayString,
  addBarToCorpRegNumber,
  checkInputStringIsNumber,
  convertTimestampToDateWithTime,
  generatedOrderId,
  convertDateFormat,
  getCardCompany,
  getBankCompany,
  changeDate,
  convertIssueCorpDateTime,
  convertIssueEstateDateTime,
  addBarToEstateRegNumber,
  calculateDateInterval,
  changePhone,
  convertIssueCorpDate
};
