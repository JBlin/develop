<template>
  <ReHeader />
  <div class="back-container">
    <router-link to="/" class="back-main">
      홈으로
      <img src="@/assets/images/btn-arrow.svg" alt="뒤로가기" />
    </router-link>
  </div>
  <div class="main">
    <div class="section privacy-section terms-section">
      <div class="max-container">
        <div class="section-title-box flex-start">
          <span class="section-title"> 개인정보처리방침 </span>
        </div>
        <div class="privacy-intro">
          <span class="privacy-intro-text">
            주식회사 비즈비(이하 ’회사’)는 정보주체의 자유와 권리 보호를 위해
            「개인정보보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
            개인정보를 처리하고 안전하게 관리하고 있습니다. 이에
            「개인정보보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한
            절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할
            수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 공개합니다.
          </span>
        </div>
        <div class="terms-box">
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              1. 개인정보 처리 목적, 수집 항목, 보유 및 이용기간
            </span>
            <span class="terms-box-text">
              회사는 서비스 이용에 필수적인 개인정보를 다음과 같은 목적을 위하여
              처리합니다. 처리하는 개인정보는 다음의 목적 이외의 용도로는
              이용되지 않으며, 처리 목적과 항목이 변경되는 경우에는 사전에
              이용자의 동의를 받습니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>수집/처리 목적</th>
                    <th>수집/처리 항목</th>
                    <th>이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>홈페이지 회원가입 및 관리</td>
                    <td>
                      - 회원식별 및 회원관리, 고객상담 및 민원처리<br />
                      - 부정 이용방지와 비인가 사용 방지<br />
                      - 광고성 정보 제공 및 참여기회 제공<br />
                      - 기타 법률에 정한 목적<br />
                    </td>
                    <td>
                      (공통) 카카오 계정에 관한 정보<br />
                      (사업자) 상호명, 대표자명, 사업자등록번호
                    </td>
                    <td rowspan="7">
                      계약 해지(회원 탈퇴) 즉시 파기<br />
                      (단, 관련법규에 의해 별도 규정이 있는 경우 그 기간을 따름)
                    </td>
                  </tr>
                  <tr>
                    <td>홈페이지 회원가입 시 선택사항</td>
                    <td>회원관리 및 맞춤형 광고 및 서비스 제공</td>
                    <td>출생연도, 생일, 성별</td>
                  </tr>
                  <tr>
                    <td>사업자 회원 내 정보 관리에서 회사 정보 입력</td>
                    <td>세금계산서 발행 제공</td>
                    <td>
                      세금 계산서 담당자 성명, 담당자 연락처, 담당자 이메일,
                      사업자등록증의 모든 정보(업종, 업태, 사업장 소재지 등)
                    </td>
                  </tr>
                  <tr>
                    <td>법인 등기 서류 열람/발급 서비스 이용</td>
                    <td>인터넷등기소, 등으로부터 등기 서류 제공</td>
                    <td>
                      회원이 직접 입력한 법인명, 법인등록번호에 따라 스크래핑
                      수집된 회사의 정보
                    </td>
                  </tr>
                  <tr>
                    <td>부동산 관련 등기 서류 열람 서비스 이용</td>
                    <td>인터넷등기소, 정부24로부터 등기 서류 제공</td>
                    <td>
                      회원이 직접 입력한 주소에 따라 스크래핑 수집된 집합건물,
                      토지, 건물의 정보
                    </td>
                  </tr>
                  <tr>
                    <td>문의하기 게시판 이용</td>
                    <td>회원의 문의 내용 확인, 서비스 개선, 해결 방안 제공</td>
                    <td>
                      회원의 신원확인, 문의사항 확인, 사실 조사를 위한
                      연락·통지, 처리 결과 통보
                    </td>
                  </tr>
                  <tr>
                    <td>통계 작성 및 연구 등</td>
                    <td>
                      서비스 및 콘텐츠 관련 통계 작성(상업적 목적 포함) 및
                      연구(산업적 연구 포함)등
                    </td>
                    <td>
                      이름, 성별, 출생연도., 생년월일, 휴대폰번호, 접속빈도,
                      내/외국인 여부, 암호화된 이용자 확인 값(CI),
                      중복가입확인정보(DI), 소속회사의 명칭, 규모, 산업군, 주소,
                      이메일
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-sub-title">
              서비스 이용 과정에서 자동 생성/수집되는 정보
            </span>
            <span class="terms-box-text">
              서비스 이용을 위해 회사는 다음과 같은 방법으로 이용자의 개인정보를
              수집하고 있습니다.
            </span>
            <span class="terms-box-text">
              • 회원가입 및 서비스 이용을 위해 이용자가 직접 입력한 정보<br />
              • 서비스 이용을 위해 회원의 동의를 받아 스크래핑 기술을 이용하여
              조회한 인터넷 등기소, 정부24 등의 결과 정보 • 상담과 민원처리
              과정에서 수집/생성된 정보<br />
              • 온·오프라인의 이벤트/설문 등을 통한 수집<br />
              • 서비스 이용과정에서 자동으로 수집되는 정보
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title"> 2. 개인정보 처리의 위탁 </span>
            <span class="terms-box-text">
              1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이
              개인정보처리업무를 위탁하고 있습니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>업체명</th>
                    <th>위탁목적</th>
                    <th>보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>인포텍코리아㈜</td>
                    <td>법인/부동산 등기 서비스 제공을 위한 API</td>
                    <td rowspan="5">회원 탈퇴 시 혹은 위탁 계약 종료 시까지</td>
                  </tr>
                  <tr>
                    <td>토스페이먼츠㈜</td>
                    <td>결제 관련 업무 대행</td>
                  </tr>
                  <tr>
                    <td>카카오㈜</td>
                    <td>회원 가입을 위한 간편 본인 인증</td>
                  </tr>
                  <tr>
                    <td>비즈뿌리오</td>
                    <td>카카오 알림톡</td>
                  </tr>
                  <tr>
                    <td>Amazon Web Service Inc</td>
                    <td>
                      개인정보가 저장된 국내(한국 리전)클라우드 서버 운영 및
                      관리
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              2. 회사는 관련 법령의 규정에 의한 경우를 제외하고는 어떠한
              경우에도 동의서에서 명시한 범위를 넘어 고객의 개인정보를
              이용하거나 타인 또는 타 기업이나 기관에 제공하지 않습니다.
            </span>
            <span class="terms-box-text">
              3. 위탁계약 시 개인정보보호의 안전을 기하기 위하여 개인정보보호
              관련 지시 엄수 및 개인 정보에 관한 금지 및 사고 시의 책임부담 등을
              명확히 규정하고 당해 계약 내용을 서면 및 전자적으로 보관합니다.
              업체가 변경될 경우, 회사는 변경된 업체 명을 개인정보처리방침
              화면에 공지합니다.
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              3. 개인정보의 파기 절차 및 방법
            </span>
            <span class="terms-box-text">
              1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>보존항목</th>
                    <th>근거법령</th>
                    <th>보존기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>계약 또는 청약철회 등에 관한 기록</td>
                    <td rowspan="4">
                      전자상거래 등에서의 소비자보호에 관한 법률 시행령
                    </td>
                    <td>5 년</td>
                  </tr>
                  <tr>
                    <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                    <td>5년</td>
                  </tr>
                  <tr>
                    <td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
                    <td>3년</td>
                  </tr>
                  <tr>
                    <td>표시/광고에 관한 기록</td>
                    <td>6 개월</td>
                  </tr>
                  <tr>
                    <td>Amazon Web Service Inc</td>
                    <td>통신비밀보호법</td>
                    <td>3 개월</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              2. 개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </span>
            <span class="terms-box-text">
              1. 파기절차<br />
              회사는 개인정보 보호책임자의 책임 하에 내부방침 절차에 따라 다음과
              같이 처리하고 있습니다. <br />
              <span class="terms-box-inner-text">
                o 개인정보의 파기<br />
                보유기간이 경과한 개인정보는 종료일로부터 지체 없이
                파기합니다.<br />
                o 개인정보파일의 파기<br />
                개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료
                등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가
                불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을
                파기합니다.
              </span>
            </span>
            <span class="terms-box-text">
              2. 파기방법 <br />
              회사는 전자적 파일 형태로 기록ㆍ저장된 개인정보는 기록을 재생할 수
              없도록 파기하며, 종이 문서에 기록ㆍ저장된 개인정보는 분쇄기로
              분쇄하거나 소각하여 파기합니다<br />
              <span class="terms-box-inner-text">
                o 개인정보의 파기<br />
                보유기간이 경과한 개인정보는 종료일로부터 지체 없이
                파기합니다.<br />
                o 개인정보파일의 파기<br />
                개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료
                등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가
                불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을
                파기합니다.
              </span>
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              4. 정보주체와 법정대리인의 권리ㆍ의무 및 행사방법
            </span>
            <span class="terms-box-text">
              1. 정보주체는 회사에 대해 언제든지 개인정보
              열람ㆍ정정ㆍ삭제ㆍ처리정지요구 등의 권리를 행사할 수 있습니다
              <div class="br"></div>
              <span class="terms-box-inner-text">
                1. 개인정보의 열람 및 정정 범위 <br />
                <span class="terms-box-inner-text">
                  o 회사가 가지고 있는 정보주체의 개인정보<br />
                  o 회사가 정보주체의 개인정보를 이용하거나 제3자에게 제공한
                  현황<br />
                  o 정보주체가 개인정보 수집ㆍ이용ㆍ제공 등의 동의를 한 현황<br />
                </span>
                2. 개인정보의 열람, 정정 및 동의 철회 방법<br />
                <span class="terms-box-inner-text">
                  o 고객센터(본사), 방문 후 본인 확인<br />
                  o 이메일 : contact@bizbee.co.kr<br />
                  o 서면 : 서울시 서초구 반포대로 21길3 비1층
                  비01호(이화빌딩)<br />
                  o 전화 : 고객센터(02-525-4221)<br />
                </span>
                3. 회원탈퇴<br />
                <span class="terms-box-inner-text"
                  >o 등기데이터 홈페이지 로그인 - [내 정보관리] -
                  [탈퇴하기]</span
                >
              </span>
            </span>
            <span class="terms-box-text">
              2. 권리 행사는 회사에 대해 「개인정보보호법」 시행령 제41조
              제1항에 따라 서면, 전자우편 등을 통하여 하실 수 있으며, 회사는
              이에 대해 지체 없이 조치하겠습니다.
            </span>
            <span class="terms-box-text">
              3. 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
              대리인을 통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에
              관한 고시" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </span>
            <span class="terms-box-text">
              4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
              제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.
            </span>
            <span class="terms-box-text">
              5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
              대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
            </span>
            <span class="terms-box-text">
              6. 회사는 정보주체 권리에 따른 열람의 요구, 정정ㆍ삭제의 요구,
              처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
              대리인인지를 확인합니다.
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              5. 개인정보의 안전성 확보조치
            </span>
            <span class="terms-box-text">
              회사는 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고
              있습니다. <br />
              <span class="terms-box-inner-text">
                1. 관리적 조치 : 개인정보보호 지침 수립ㆍ시행, 전담조직 운영,
                정기적 직원 교육<br />
                2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리,
                접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및
                갱신<br />
                3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제
              </span>
            </span>
            <span class="terms-box-text">
              회사는 개인정보의 안전성을 확보하기 위하여 법령에서 규정하고 있는
              사항 이외에도 다음과 같은 활동을 시행하고 있습니다. <br />
              - 정보보호 관리체계(ISMS) 인증
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              6. 개인정보 자동 수집 장치의 설치ㆍ운영 및 거부에 관한 사항
            </span>
            <span class="terms-box-text">
              1. 회사는 정보주체의 이용정보를 저장하고 수시로 불러오는
              '쿠키(cookie)'를 사용합니다.
            </span>
            <span class="terms-box-text">
              2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
              컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
              컴퓨터내의 하드디스크에 저장되기도 합니다. <br />
              <span class="terms-box-inner-text">
                ① 쿠키의 사용목적 : 이용자의 접속빈도나 방문시간 등을 파악하여
                이용자에게 보다 편리한 서비스를 제공하기 위해 사용됩니다. <br />
                ② 쿠키의 설치ㆍ운영 및 거부: 브라우저 옵션 설정을 통해 쿠키
                허용, 쿠키 차단 등의 설정을 할 수 있습니다. <br />
                <span class="terms-box-inner-text">
                  o Edge: 웹브라우저 우측 상단의 설정 메뉴 > 쿠키 및 사이트 권한
                  > 쿠키 및 사이트 데이터 관리 및 삭제<br />
                  o Chrome: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 및 보안
                  > 서드 파티 쿠키 > 서드 파티 쿠키 차단<br />
                </span>
                ③ 쿠키 저장을 거부 또는 차단할 경우 서비스 이용에 어려움이
                발생할 수 있습니다. <br />
              </span>
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              7. 행태정보의 수집ㆍ이용ㆍ제공 및 거부 등에 관한 사항
            </span>
            <span class="terms-box-text">
              1. 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스
              및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를
              수집·이용하고 있습니다.
            </span>
            <span class="terms-box-text">
              2. 회사는 다음과 같이 행태정보를 수집합니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>수집하는 행태정보의 항목</th>
                    <th>행태정보 수집 방법</th>
                    <th>행태 정보 수집 목적</th>
                    <th>보유ㆍ이용기간 및 이후 정보처리 방법</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      이용자의 웹/모바일 서비스 접속 기록 및 클릭 등 사용
                      기록기록 (국가, 지역, 통신사, 기기정보, 기기 운영체제,
                      기기 설정 언어)
                    </td>
                    <td>
                      이용자의 웹/모바일 내에서 행해지는 주요행동에 대해
                      생성정보 수집 툴(google analytics)을 통해 자동 수집 전송
                    </td>
                    <td>서비스 품질 개선 및 통계 목적</td>
                    <td>서비스 품질 개선 및 통계 목적</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              3. 회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을
              수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동
              경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는
              민감한 행태정보를 수집하지 않습니다.
            </span>
            <span class="terms-box-text">
              4. 회사는 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를
              수집·이용 합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의
              맞춤형 광고를 차단·허용할 수 있습니다.
              <span class="terms-box-inner-text">
                • 스마트폰의 광고식별자 차단/허용<br />
                <span class="terms-box-inner-text">
                  o (안드로이드) 설정 → 개인정보보호 → 광고 → 광고 ID 재설정
                  또는 광고ID 삭제<br />
                  o (아이폰) 설정 → 개인정보보호 → 추적 → 앱이 추적을 요청하도록
                  허용 끔<br />
                </span>
                ※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.
                <br />
              </span>
            </span>
            <span class="terms-box-text">
              5. 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형
              광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은
              웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수
              있습니다.
              <span class="terms-box-inner-text">
                o ① Microsoft Edge
                <span class="terms-box-inner-text">
                  • Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을
                  클릭합니다. <br />
                  • 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후
                  「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.<br />
                  • ‘InPrivate를 검색할 때 항상 "엄격" 추적 방지 사용’ 여부를
                  선택합니다.<br />
                  • 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를
                  선택합니다.
                </span>
                o ② 크롬 브라우저
                <span class="terms-box-inner-text">
                  • Chrome에서 오른쪽 상단 ‘⋮’ 표시(chrome 맞춤설정 및 제어)를
                  클릭한 후, 설정 표시를 클릭합니다.<br />
                  • 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」
                  섹션에서 콘텐츠 설정을 클릭합니다.<br />
                  • 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를
                  선택합니다.
                </span>
              </span>
            </span>
            <span class="terms-box-text">
              6. 정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과
              거부권 행사, 피해 신고 접수 등을 문의할 수 있습니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>개인정보 보호책임자</th>
                    <th>연락처</th>
                    <th>전자우편</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>개인정보보호 담당자</td>
                    <td>이준희 이사</td>
                    <td>02-525-4221</td>
                    <td>contact@bizbee.co.kr</td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              8. 개인정보보호책임자 및 개인정보 열람청구
            </span>
            <span class="terms-box-text">
              1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다. <br /><br />

              [개인정보보호책임자]<br />
              세무법인 혜안 더낸세금 돌려받기 개인정보 보호책임자는 남규용
              세무사, 02-552-5100, vtax@daum.net)이며, 개인정보 관련 문의사항은
              관련 부서별 개인정보 보호담당자에게 연락주시면 친절하게 안내하여
              드리겠습니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>개인정보 보호책임자</th>
                    <th>연락처</th>
                    <th>전자우편</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>개인정보보호 담당자</td>
                    <td>이준희 이사</td>
                    <td>02-525-4221</td>
                    <td>contact@bizbee.co.kr</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              2. 회사는「개인정보보호법」 제35조에 따른 개인정보의 열람 청구를
              아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보
              열람청구가 신속하게 처리되도록 노력하겠습니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>개인정보 보호책임자</th>
                    <th>연락처</th>
                    <th>전자우편</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>개인정보 열람 청구</td>
                    <td>김태형 전무</td>
                    <td>02-525-4221</td>
                    <td>contact@bizbee.co.kr</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              3. 정보주체는 회사의 서비스를 이용하시면서 발생한 모든
              개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
              개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. 회사는
              정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title"> 9. 권익침해 구제방법 </span>
            <span class="terms-box-text">
              1. 회사는 정보주체의 개인정보자기결정권을 보장하고,
              개인정보침해로인한 상담 및 피해 구제를 위해 노력하고 있으며,
              신고나 상담이 필요한 경우 아래의 담당부서로 연락해 주시기
              바랍니다.
            </span>
            <span class="terms-box-table">
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>개인정보 보호책임자</th>
                    <th>연락처</th>
                    <th>전자우편</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>개인정보보호 담당자</td>
                    <td>이준희 이사</td>
                    <td>02-525-4221</td>
                    <td>contact@bizbee.co.kr</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="terms-box-text">
              2. 정보주체는 개인정보침해로 인한 구제를 받기 위하여
              개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
              분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
              개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
              바랍니다.
              <span class="terms-box-inner-text">
                1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972
                (www.kopico.go.kr) <br />
                2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
                <br />
                3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr) <br />
                4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
              </span>
            </span>
            <span class="terms-box-text">
              3. 「개인정보보호법」 제35조(개인정보의 열람), 제36조(개인정보의
              정정ㆍ삭제),제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대
              하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는
              이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을
              청구할 수 있습니다.
              <span class="terms-box-inner-text">
                1. 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)
              </span>
            </span>
          </div>
          <div class="terms-box-row">
            <span class="terms-box-sub-title">
              10. 개인정보 처리방침의 변경
            </span>
            <span class="terms-box-text">
              1. 이 개인정보 처리방침 개정 및 시행일자 : 2023년 11월 15일
            </span>
            <span class="terms-box-text">
              2. 이전의 개인정보처리방침은 하단의 '이전 개인정보 처리방침
              보기'에서 확인하실 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ReFooter />
</template>
<script lang="ts" setup>
import ReFooter from '@/components/remain/ReFooter.vue';
import ReHeader from '@/components/remain/ReHeader.vue';
</script>
