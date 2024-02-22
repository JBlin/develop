<template>
  <ReHeader />
  <div class="main-wrap">
    <section class="sc main-sc">
      <div class="conatiner">
        <div class="sc-title-box main-title-box">
          <span class="sc-main-sub-title">
            <span class="ani-off ani-main-text">
              <span>법인, 부동산 등기부등본 발급과 관리를 모두 한곳에서!</span>
            </span>
          </span>
          <span class="sc-main-title">
            <span class="ani-off ani-main-text">
              <span class="delay-1">등기부등본 1분이면 발급 OK!!</span> </span
            ><br />
            <span class="ani-off ani-main-text">
              <span class="delay-2">데이터는 3년 동안 안전하게 관리!!</span>
            </span>
          </span>
          <div class="btn-box ani-text ani-off delay-6">
            <router-link to="/pocket/Main" class="btn large login-btn">
              <span>시작하기</span>
            </router-link>
          </div>
        </div>
        <!-- 20240126 메인비디오추가 -->
        <div class="video-container">
          <video ref="mainVideo" @ended="onVideoEnded" poster="../../assets/images/main-video-thumbnail.png" src="../../assets/video/main-video.mp4" muted playsinline>
          </video>
          <div class="video-poster" ref="videoPoster">
            <button class="video-play-btn" @click="playVideo">
              <img src="../../assets/images/video-play-btn.svg" alt="비디오재생버튼">
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="sc service-sc sc-view" id="section1" index="0">
      <div class="max-container">
        <div class="sc-title-box">
          <span class="sc-circle-title ani-off ani-text"> 주요 서비스 </span>
          <span class="sc-title">
            <span class="ani-off ani-text delay-1"> 등기데이터가 제공하는</span
            ><br />
            <span class="ani-off ani-text delay-2"
              >다양한 서비스를 확인해보세요.</span
            >
          </span>
          <!--
          <span class="sc-sub-title">
            <span class="ani-off ani-text delay-3 red"
              >*현재 정부 행정전산망 장애로 "건축물대장, 토지대장, 지적도,
              토지이용계획" 은 서비스이용이 중단되었습니다.</span
            >
          </span>-->
        </div>
        <div class="card-contents">
          <div class="card-item ani-off ani-card delay-1">
            <span class="card-item-title">
              법인 등기부등본
              <img src="@/assets/images/card-1.svg" alt="아이콘" />
            </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <span class="card-item-ex-text bg-brightnavy">발급</span>
                <span class="card-item-ex-text bg-red">PDF</span>
                <span class="card-item-ex-text bg-gray">TEXT DATA</span>
              </span>
              <span class="card-item-row">
                <span class="card-item-ex-text c-b bg-skyblue">
                  <img src="@/assets/images/alram.svg" alt="아이콘" />
                  임원 임기만료 알림 서비스
                </span>
              </span>
            </div>
          </div>
          <div class="card-item ani-off ani-card">
            <span class="card-item-title">
              부동산 등기부등본
              <img src="@/assets/images/card-2.svg" alt="아이콘" />
            </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <!-- <span class="card-item-ex-text">발급</span> -->
                <span class="card-item-ex-text bg-red">PDF</span>
                <span class="card-item-ex-text bg-gray">TEXT DATA</span>
              </span>
              <span class="card-item-row">
                <span class="card-item-ex-text c-b bg-skyblue">
                  <img src="@/assets/images/alram.svg" alt="아이콘" />
                  변경사항 알림 서비스
                </span>
              </span>
            </div>
          </div>
          <!-- 2024.01.12 윤종경 건축물대장 등 기능 표시제거-->
          <!--
          <div
            class="card-item ani-off ani-card delay-4"
            style="padding: 50px 0"
          >
            <span class="card-item-title"> 건축물대장 </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <span class="card-item-ex-text bg-red">PDF</span>
              </span>
            </div>
          </div>
          <div
            class="card-item ani-off ani-card delay-5"
            style="padding: 50px 0"
          >
            <span class="card-item-title"> 토지대장 </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <span class="card-item-ex-text bg-red">PDF</span>
              </span>
            </div>
          </div>
          <div
            class="card-item ani-off ani-card delay-3"
            style="padding: 50px 0"
          >
            <span class="card-item-title"> 지적도 </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <span class="card-item-ex-text bg-red">PDF</span>
              </span>
            </div>
          </div>
          <div
            class="card-item ani-off ani-card delay-2"
            style="padding: 50px 0"
          >
            <span class="card-item-title"> 토지이용계획 </span>
            <div class="card-item-ex">
              <span class="card-item-row">
                <span class="card-item-ex-text bg-brightnavy">열람</span>
                <span class="card-item-ex-text bg-red">PDF</span>
              </span>
            </div>
          </div>-->
        </div>
      </div>
    </section>
    <section class="sc why-sc sc-view" id="section2" index="1">
      <div class="max-container">
        <div class="sc-title-box">
          <span class="sc-circle-title ani-off ani-text">
            Why 등기데이터?
          </span>
          <span class="sc-title">
            <span class="ani-off ani-text delay-1"
              >등기데이터를 사용해야 하는 이유</span
            >
          </span>
        </div>
        <span class="col-line"></span>
        <div class="why-contents">
          <div class="why-item">
            <div class="why-item-title-box">
              <span class="why-item-sub-title ani-text ani-off">
                <img src="@/assets/images/computer.svg" alt="아이콘" />
                보안프로그램 설치와 프린터가 없는 상황에서의 불편함을
                걱정하시나요?
              </span>
              <span class="why-item-title">
                <span class="ani-text ani-off delay-1"
                  >다양한 등기서류를 손쉽게 발급받고,</span
                >
                <br />
                <span class="ani-text ani-off delay-2"
                  >추가비용 없이 언제든 다운로드 해보세요</span
                >
              </span>
              <span class="why-item-title-ex">
                <span class="why-item-title-ex-text ani-card ani-off delay-2">
                  #등기부등본
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #간편발급
                </span>
                <span class="why-item-title-ex-text ani-card ani-off delay-1">
                  #언제든
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #재다운로드
                </span>
              </span>
            </div>
            <div class="why-item-img-box ani-card ani-off">
              <div class="why-item-img">
                <img src="@/assets/images/why-item-1.svg" alt="이미지" />
              </div>
              <div class="why-item-img">
                <img src="@/assets/images/why-item-2.svg" alt="이미지" />
              </div>
            </div>
          </div>
          <div class="why-item">
            <div class="why-item-title-box">
              <span class="why-item-sub-title ani-text ani-off">
                <img src="@/assets/images/bell.svg" alt="아이콘" />
                매번 확인할 수 없는 등기부등본, 등기 변동 사항이 생길 때 알아서
                알림을 준다면?
              </span>
              <span class="why-item-title">
                <span class="ani-text ani-off delay-1"
                  >부동산 등기변경부터 법인 임원 임기만료까지</span
                >
                <br /><span class="ani-text ani-off delay-2"
                  >등기 알림 서비스를 통해 편리함을 경험해보세요</span
                >
              </span>
              <span class="why-item-title-ex">
                <span class="why-item-title-ex-text ani-card ani-off delay-2">
                  #등기변동사항
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #부동산등기변동
                </span>
                <span class="why-item-title-ex-text ani-card ani-off delay-1">
                  #법인임기만료
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #카카오알림
                </span>
              </span>
            </div>
            <div class="why-item-img-box ani-card ani-off">
              <div class="why-item-img">
                <img src="@/assets/images/why-item-3.svg" alt="이미지" />
              </div>
              <div class="why-item-img">
                <img src="@/assets/images/why-item-4.svg" alt="이미지" />
              </div>
            </div>
            <!-- 20240126 카드아이템 추가 -->
            <div class="card-item ani-off ani-card">
              <div class="card-item-title-box">
                <h3 class="card-item-title">
                  <img src="../../assets/images/warning.svg" alt="경고이미지">
                  <span class="card-item-main-title">
                    <span class="card-item-title-highlight">등기 임원 임기관리</span><br class="br-mobile"> 어떻게 하고 계신가요?
                  </span>
                </h3>
                <p class="card-item-title-text">
                  상법 제383조 2항에 ‘이사의 임기는 ‘3년을 초과하지 못한다’고 규정하고 있어요.<br class="br-pc"> 따라서 <strong>임기 중간 공백 없이 중임 등기를 반드시 하셔야 하고,</strong><br class="br-pc">
                  <strong>혹여 기간을 놓치게 되면 과태료가 부과</strong>되기 때문에 주의가 필요해요.<br>
                  <br>
                  만약 과태료 사안이 2건 이상인 경우,<br class="br-pc">
                  더 높은 금액을 기준으로 산정 후 약간 증액되어 과태료가 부과돼요.
                </p>
              </div>
              <div class="card-item-table">
                <table class="penalty-period-table">
                  <thead class="penalty-period-header">
                    <tr class="penalty-period-row">
                      <th class="penalty-period-heading">도과기간</th>
                      <th class="penalty-period-heading">과태료</th>
                    </tr>
                  </thead>
                  <tbody class="penalty-period-body">
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">1일~1개월</td>
                      <td class="penalty-period-data">25만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">1개월~2개월</td>
                      <td class="penalty-period-data">50만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">2개월~6개월</td>
                      <td class="penalty-period-data">75만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">6개월~1년</td>
                      <td class="penalty-period-data">125만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">1년~2년</td>
                      <td class="penalty-period-data">175만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">2년~3년</td>
                      <td class="penalty-period-data">250만원</td>
                    </tr>
                    <tr class="penalty-period-row">
                      <td class="penalty-period-data">3년 이상</td>
                      <td class="penalty-period-data">350만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="why-item">
            <div class="why-item-title-box">
              <span class="why-item-sub-title ani-text ani-off">
                <img src="@/assets/images/file.svg" alt="아이콘" />
                볼수록 복잡한 등기부등본, 좀 더 깔끔하게 보고 싶진 않으신가요?
              </span>
              <span class="why-item-title">
                <span class="ani-text ani-off delay-1"
                  >등기부등본의 문서를 디지털화하여</span
                ><br />
                <span class="ani-text ani-off delay-2"
                  >데이터의 활용 가치를 높여드려요</span
                >
              </span>
              <span class="why-item-title-ex">
                <span class="why-item-title-ex-text ani-card ani-off delay-2">
                  #보기쉬운
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #등기부등본
                </span>
                <span class="why-item-title-ex-text ani-card ani-off delay-1">
                  #깔끔😊
                </span>
              </span>
            </div>
            <div class="why-item-img-box ani-card ani-off">
              <div class="why-item-img">
                <img src="@/assets/images/why-item-5.svg" alt="이미지" />
              </div>
              <div class="why-item-img">
                <img src="@/assets/images/why-item-6.svg" alt="이미지" />
              </div>
            </div>
          </div>
          <!--현재 대용량 발급 불가-->
          <!-- <div class="why-item">
            <div class="why-item-title-box">
              <span class="why-item-sub-title ani-text ani-off">
                <img src="@/assets/images/clock.svg" alt="아이콘" />
                부동산 등기 서류 대량 발급에 너무 많은 시간이 소요된다면?
              </span>
              <span class="why-item-title">
                <span class="ani-text ani-off delay-1"
                  >클릭 몇번으로 대량 발급 가능!</span
                >
                <br />
                <span class="ani-text ani-off delay-2"
                  >업무효율을 극단적으로 높여드려요.</span
                >
              </span>
              <span class="why-item-title-ex">
                <span class="why-item-title-ex-text ani-card ani-off delay-2">
                  #칼퇴
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #빠른업무
                </span>
                <span class="why-item-title-ex-text ani-card ani-off">
                  #보장
                </span>
              </span>
            </div>
            <div class="why-item-img-box ani-card ani-off">
              <div class="why-item-img">
                <img src="@/assets/images/why-item-w.png" alt="이미지" />
              </div>
              <div class="why-item-img">
                <img src="@/assets/images/why-item-w.png" alt="이미지" />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>
    <section class="sc review-sc sc-view" id="section3" index="2">
      <div class="max-container">
        <div class="sc-title-box">
          <span class="sc-circle-title ani-text ani-off"> 이용후기 </span>
          <span class="sc-title">
            <span class="ani-off ani-text delay-1"
              >먼저 등기데이터 서비스를 경험한</span
            ><br />
            <span class="ani-off ani-text delay-2"
              >실제 사용자들의 후기를 확인해보세요.</span
            >
          </span>
        </div>
      </div>
      <ReviewPC></ReviewPC>
      <ReviewMobile></ReviewMobile>
    </section>
    <section class="sc partners-sc sc-view" id="section4" index="3">
      <div class="max-container">
        <div class="logo-box">
          <div class="logo-box-wrap logo-box-tax-firm">
            <span class="logo-box-title">세무 법인</span>
            <div class="logo-box-row-wrap">
              <ul class="logo-box-row">
                <li class="logo-image ani-card ani-off">
                  <img class="heyan-logo-image" src="../../assets/images/heyan-logo.svg" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off delay-1">
                  <img src="../../assets/images/neotax-logo.svg" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off">
                  <img class="buddy-logo-image" src="../../assets/images/buddy-tax-logo.png" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off">
                  <img src="../../assets/images/dongil-logo.svg" alt="로고이미지">
                </li>
              </ul>
            </div>
          </div>
          <hr class="logo-box-divider">
          <div class="logo-box-wrap logo-box-domestic-firm">
            <span class="logo-box-title">국내 기업</span>
            <div class="logo-box-row-wrap">
              <ul class="logo-box-row">
                <li class="logo-image ani-card ani-off">
                  <img src="../../assets/images/valuemark-logo.svg" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off"> 
                  <img src="../../assets/images/junggi-logo.svg" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off delay-1">
                  <img class="taxcube-logo-image" src="../../assets/images/taxcube-logo.png" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off delay-1">
                  <img src="../../assets/images/infotech_logo.png" alt="로고이미지">
                </li>
              </ul>
              <ul class="logo-box-row">
                <li class="logo-image ani-card ani-off delay-1">
                  <img class="maycommerce-logo-image" src="../../assets/images/maycommerce-logo.svg" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off delay-1">
                  <img class="haevah-logo-image" src="../../assets/images/haevah-logo.png" alt="로고이미지">
                </li>
                <li class="logo-image ani-card ani-off delay-1">
                  <img class="maymerce-logo-image" src="../../assets/images/maymerce-logo.svg" alt="로고이미지">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="sc qna-sc sc-view" id="section5" index="4">
      <div class="max-container">
        <div class="sc-title-box">
          <span class="qna-title">
            <span class="ani-off ani-text">자주 묻는 질문</span>
          </span>
        </div>
        <div class="qna-contents">
          <ul class="qna-ul ani-off ani-card">
            <li class="qna-li">
              <span class="qna-li-q">
                <img src="@/assets/images/q-icon.svg" alt="q아이콘" />. 발급받은
                등기는 무제한으로 다운 받을 수 있나요?
                <span class="open-btn">
                  <img src="@/assets/images/plus.svg" alt="아이콘" />
                </span>
              </span>
              <span class="qna-li-a">
                <span class="qna-li-a-text">
                  물론이죠. 발급받은 등기부등본은 무제한으로 다운로드 할 수
                  있어요. <br />
                  등기데이터에서 발급받은 등기는 3년간 보관되며, 이 기간 동안
                  언제든지 다운로드하여 이용하실 수 있어요. <br />
                  이렇게 되면 기존 등기 발급 방식과 달리 어디에 있는지 모르거나
                  재발급을 요청해야 하는 경우, 번거로움 없이 편리하게 등기를
                  관리하실 수 있어요.
                </span>
              </span>
            </li>
            <li class="qna-li">
              <span class="qna-li-q">
                <img src="@/assets/images/q-icon.svg" alt="q아이콘" />. 법인등기 해태로 인한 과태료는 무엇인가요?
                <span class="open-btn">
                  <img src="@/assets/images/plus.svg" alt="아이콘" />
                </span>
              </span>
              <span class="qna-li-a">
                <span class="qna-li-a-text">
                  법인 등기 해태란 법인의 설립, 변경, 해산과 같은 주요 사건이 발생했을 때, 이러한 변경 사항을 관할 등기소에 신고하고 등기해야 하는 의무를 이행하지 않은 경우를 말해요. 
                  법인의 주소, 대표자, 사업 목적, 자본금, 이사의 임기 등이 변경되었다면, 해당 사건이 발생한 날로부터 14일 이내에 등기 절차를 완료해야 해요. 이 기한을 넘기면 최대 500만원까지 과태료가 부과될 수 있어요. 
                  <br />
                  하지만 걱정하지 마세요.😊 등기데이터를 활용하면 따로 계산하실 필요 없이, 임기 만료 예정인 임원이 있으면 만료예정 30일 전에 카카오 알림을 드려요.
                </span>
              </span>
            </li>
            <li class="qna-li">
              <span class="qna-li-q">
                <img src="@/assets/images/q-icon.svg" alt="q아이콘" />. 등기
                알림 서비스는 이용료가 있나요?
                <span class="open-btn">
                  <img src="@/assets/images/plus.svg" alt="아이콘" />
                </span>
              </span>
              <span class="qna-li-a">
                <span class="qna-li-a-text">
                  아니요. 등기 알림 서비스는 무료예요. 유료 등기 열람 또는 발급
                  건에 한해서 무료로 등기 알림 서비스를 신청하실 수 있어요.
                  <br />
                  이를 통해 중요한 변동 사항이나 업데이트가 있는 경우 신속하고
                  정확하게 알림을 받으실 수 있어요.
                </span>
              </span>
            </li>
            <li class="qna-li">
              <span class="qna-li-q">
                <img src="@/assets/images/q-icon.svg" alt="q아이콘" />.
                사업자인데 개인 카카오톡 가입이 꺼려집니다. 다른 방식은
                없을까요?
                <span class="open-btn">
                  <img src="@/assets/images/plus.svg" alt="아이콘" />
                </span>
              </span>
              <span class="qna-li-a">
                <span class="qna-li-a-text">
                  걱정하지 마세요! 사업자 회원은 관리자와 이용자로 나누어져 있어
                  카카오톡 계정을 공유할 필요가 없어요. <br />
                  관리자는 직원(이용자)을 등기데이터로 초대해 포인트를 공유하고
                  함께 서비스를 이용하실 수 있어요. <br />
                  또한, 관리자는 직원(이용자)리스트를 관리하고 직원이 발급받은
                  등기 발급 내역을 확인하실 수 있어요.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <button class="scroll-top" @click="scrollTop">
        <img src="@/assets/images/scroll-top.svg" alt="탑 아이콘" />
      </button>
    </section>
  </div>
  <ReFooter />
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import ReviewMobile from '@/components/remain/ReviewMobile.vue';
import ReviewPC from '@/components/remain/ReviewPC.vue';
import ReFooter from '@/components/remain/ReFooter.vue';
import ReHeader from '@/components/remain/ReHeader.vue';

// 20240125 스크롤시 비디오 재생
// const mainVideo = ref<HTMLVideoElement>();
// const videoPoster = ref<HTMLDivElement>();
// const hasPlayed = ref(false);
// const checkScroll = () => {
//   if(mainVideo.value && !hasPlayed.value){
//     const rect = mainVideo.value.getBoundingClientRect();
//     const isVisible = (rect.top >= -300 && rect.bottom <= window.innerHeight + 300);
//     console.log(window.innerHeight, rect.top, rect.bottom)
//     if(isVisible){
//       const userAgent = navigator.userAgent;
//       const iOSVersionMatch = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s+(\d+[._]\d+[._]?\d*)/i);
//       if(iOSVersionMatch){
//         mainVideo.value.setAttribute('playsinline', 'true');
//       }
//       mainVideo.value.play();
//       hasPlayed.value = true;
//     } else {
//       mainVideo.value.setAttribute('playsinline', 'false');
//       mainVideo.value.pause();
//     }
//   }
// }
// const resetVideo = () => {
//   hasPlayed.value = false;
//   if(videoPoster.value){
//     videoPoster.value.style.display = 'flex';
//   }
// }
// const playVideo = () => {
//   if(mainVideo.value){
//     mainVideo.value.play();
//     hasPlayed.value = true;
//     if(videoPoster.value){
//       videoPoster.value.style.display = 'none';
//     }
//   }
// }
// onMounted(() => {
//   window.addEventListener('scroll', checkScroll);
//   if(mainVideo){
//     mainVideo.value?.addEventListener('ended', resetVideo);
//   }
// })
// onUnmounted(() => {
//   window.removeEventListener('scroll', checkScroll);
// if(mainVideo){
//   mainVideo.value?.removeEventListener('ended', resetVideo);
// }
// })

const mainVideo = ref<HTMLVideoElement>();
const videoPoster = ref<HTMLDivElement>();

const playVideo = () => {
  if(mainVideo.value){
    mainVideo.value.play();
    if(videoPoster.value){
      videoPoster.value.style.display = 'none';
    }
  }
}

const onVideoEnded = () => {
  if(videoPoster.value){
    videoPoster.value.style.display = 'flex';
  }
}

const handleScroll = () => {
  const sectionActive = document.querySelectorAll('.sc-view');
  const gnbLi = document.querySelectorAll('.gnb-li');
  const scrollPosition = window.scrollY;
  // 추가적인 섹션들에 대한 참조

  sectionActive.forEach((el, i) => {
    const elPositon = el.getBoundingClientRect().top + window.scrollY;
    const elFisrtPositon =
      sectionActive[0].getBoundingClientRect().top + window.scrollY;
    if (scrollPosition + 300 >= elPositon) {
      gnbLi.forEach((li, liI) => {
        if (i == liI) {
          li.classList.add('active');
        } else {
          li.classList.remove('active');
        }
      });
    } else if (scrollPosition < elFisrtPositon) {
      gnbLi[0].classList.remove('active');
    }
  });
  // 추가적인 섹션들의 bounding rect
};

const scrollTop = () => {
  window.scrollTo({ top: 0, left: 0 });
};

onMounted(() => {
  // 스크롤에 따른 헤더
  const header = document.querySelector('.header') as HTMLElement;
  let downScrollBaseline = 0;
  let currentScrollTop = 0;

  window.onscroll = () => {
    let a = document.documentElement.scrollTop;
    let menuHideThreshold = 36;

    currentScrollTop = a;

    if (downScrollBaseline < currentScrollTop && a > 2 * menuHideThreshold) {
      header.classList.add('header-up');
    } else if (downScrollBaseline > currentScrollTop && a > menuHideThreshold) {
      header.classList.remove('header-up');
    }
    downScrollBaseline = currentScrollTop;
  };

  window.addEventListener('scroll', () => {
    // const windowY = window.scrollY
    const video = document.querySelector('.video-container') as HTMLElement;
    const videoTop = video.getBoundingClientRect().top + window.pageYOffset;
    if (
      videoTop - video.offsetHeight / 2 < window.scrollY &&
      videoTop + video.offsetHeight / 2 > window.scrollY
    ) {
      video.classList.add('ani-on');
    } else {
      video.classList.remove('ani-on');
    }

    handleScroll();
  });

  // 자주묻는질문
  const qnaLi = document.querySelectorAll('.qna-li');
  const qnaLiAn = document.querySelectorAll('.qna-li-a');
  const qnaLiText = document.querySelectorAll('.qna-li-a-text');
  qnaLi.forEach((li, i) => {
    li.addEventListener('click', () => {
      const qnaType = qnaLiAn[i] as HTMLElement;
      const qnaLiTextType = qnaLiText[i] as HTMLElement;
      const qnaLiTextTypeH = qnaLiTextType.offsetHeight;

      if (li.classList.contains('active')) {
        qnaType.style.height = '0';
        qnaLi[i].classList.remove('active');
      } else {
        qnaLi.forEach((li) => {
          li.classList.remove('active');
        });
        qnaLiAn.forEach((closeLi) => {
          const closeLiType = closeLi as HTMLElement;
          closeLiType.style.height = '0';
        });
        qnaType.style.height = qnaLiTextTypeH + 30 + 'px';
        li.classList.add('active');
      }
    });
  });

  // 애니메이션
  const observerAni = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani-on');
        entry.target.classList.remove('ani-off');
      } else {
        entry.target.classList.remove('ani-on');
        entry.target.classList.add('ani-off');
      }
    });
  });

  const offAni = document.querySelectorAll('.ani-off');

  // 반복문을 돌려 모든 DOM에 적용
  offAni.forEach((AniOn) => observerAni.observe(AniOn));
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.scroll-top {
  position: absolute;
  right: 60px;
  bottom: 60px;
  background-color: #fff;
  border: 1px solid #e4e8ee;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  width: 70px;
  height: 70px;
  border-radius: 8px;
  @media (max-width: 1024px) {
    width: 40px;
    height: 40px;
    padding: 10px;
    right: 20px;
    bottom: 20px;
  }
}
.red {
  color: red;
}
</style>
