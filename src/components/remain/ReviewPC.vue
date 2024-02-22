<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
// import SwiperType from 'Swiper/types'
// import {ref,onMounted } from 'vue'

const modules = [Autoplay];
</script>

<template>
  <div class="review-contents pc">
    <div class="max-container">
      <Swiper
        class="review-row ani-swiper ani-off"
        :modules="modules"
        :space-between="70"
        direction="vertical"
        :loop="true"
        :slides-per-view="2"
        :looped-slides="2"
        :allow-touch-move="false"
        :speed="6500"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false
        }"
        :resize-observer="true"
        :observer="true"
      >
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">개인</span>
            <span class="name">한*구님</span>
          </span>
          <span class="review-text">
            “전세사기 관련 뉴스를 보면서 계속해서 신경 쓰이던 점을 열람 한
            번으로 등기 변동에 대한 카카오 알림까지 받을 수 있어 정말
            좋았습니다. 또한, 등기부등본을 보더라도 항상 어려운 부분이 있어서
            이해하기 어려웠는데, 등기데이터에선 깔끔하게 재가공해주는 서비스가
            제공되어서 만족스러웠습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**메디팜 | 개인사업자</span>
          </span>
          <span class="review-text">
            “업무상 등기부등본 출력할 일이 종종 있어 인터넷 등기소를 이용했는데
            어느 날은 출력이 되었지만 또 다른 날은 같은 방법으로 시도했음에도
            오류 창이 뜨는 무한 반복 현상이 발생한 적이 있습니다. 오류
            수정하려고 네이버 검색하다 정작 중요한 일은 못해 정말 짜증났던 적이
            많았는데, 등기데이터는 발급까지 절차가 간편하고 깔끔해서 잘 이용하고
            있습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">개인</span>
            <span class="name">한*구님</span>
          </span>
          <span class="review-text">
            “전세사기 관련 뉴스를 보면서 계속해서 신경 쓰이던 점을 열람 한
            번으로 등기 변동에 대한 카카오 알림까지 받을 수 있어 정말
            좋았습니다. 또한, 등기부등본을 보더라도 항상 어려운 부분이 있어서
            이해하기 어려웠는데, 등기데이터에선 깔끔하게 재가공해주는 서비스가
            제공되어서 만족스러웠습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**메디팜 | 개인사업자</span>
          </span>
          <span class="review-text">
            “업무상 등기부등본 출력할 일이 종종 있어 인터넷 등기소를 이용했는데
            어느 날은 출력이 되었지만 또 다른 날은 같은 방법으로 시도했음에도
            오류 창이 뜨는 무한 반복 현상이 발생한 적이 있습니다. 오류
            수정하려고 네이버 검색하다 정작 중요한 일은 못해 정말 짜증났던 적이
            많았는데, 등기데이터는 발급까지 절차가 간편하고 깔끔해서 잘 이용하고
            있습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">개인</span>
            <span class="name">한*구님</span>
          </span>
          <span class="review-text">
            “전세사기 관련 뉴스를 보면서 계속해서 신경 쓰이던 점을 열람 한
            번으로 등기 변동에 대한 카카오 알림까지 받을 수 있어 정말
            좋았습니다. 또한, 등기부등본을 보더라도 항상 어려운 부분이 있어서
            이해하기 어려웠는데, 등기데이터에선 깔끔하게 재가공해주는 서비스가
            제공되어서 만족스러웠습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
      </Swiper>
      <Swiper
        class="review-row ani-swiper ani-off delay-4"
        :modules="modules"
        :space-between="70"
        :allow-touch-move="false"
        direction="vertical"
        :loop="true"
        :slides-per-view="2"
        :looped-slides="2"
        :speed="7000"
        :observer="true"
        :observe-parents="true"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false
        }"
      >
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**이코노미 | 영업팀</span>
          </span>
          <span class="review-text">
            “새로운 거래처와 계약하기 전에 반드시 확인하는 것 중 하나가 법인
            등기부등본인데 항상 인터넷 등기소에서 열람 해놓고 저장을 안해서 추가
            결제를 하는 경우가 빈번했습니다. 하지만 등기데이터 서비스는 재열람에
            기한을 두고 있지 않고 로그인만 하면 발급 이력을 언제든 확인할 수
            있어 편리하게 사용하고 있습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">개인</span>
            <span class="name">오*정님</span>
          </span>
          <span class="review-text">
            “처음으로 집 계약하는 사회초년생입니다. 집 계약하기 전 등기부 확인이
            필수라고는 하는데 왜 봐도 봐도 어려운지… 등기데이터 서비스를
            이용하게 된 계기가 등기부를 좀 더 깔끔하게 보여준다고 해서
            이용해봤습니다. 정말 비교해보면 둘 다 같은 내용인데 정말 보기 편해
            더 꼼꼼히 체크할 수 있었습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**이코노미 | 영업팀</span>
          </span>
          <span class="review-text">
            “새로운 거래처와 계약하기 전에 반드시 확인하는 것 중 하나가 법인
            등기부등본인데 항상 인터넷 등기소에서 열람 해놓고 저장을 안해서 추가
            결제를 하는 경우가 빈번했습니다. 하지만 등기데이터 서비스는 재열람에
            기한을 두고 있지 않고 로그인만 하면 발급 이력을 언제든 확인할 수
            있어 편리하게 사용하고 있습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">개인</span>
            <span class="name">오*정님</span>
          </span>
          <span class="review-text">
            “처음으로 집 계약하는 사회초년생입니다. 집 계약하기 전 등기부 확인이
            필수라고는 하는데 왜 봐도 봐도 어려운지… 등기데이터 서비스를
            이용하게 된 계기가 등기부를 좀 더 깔끔하게 보여준다고 해서
            이용해봤습니다. 정말 비교해보면 둘 다 같은 내용인데 정말 보기 편해
            더 꼼꼼히 체크할 수 있었습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**이코노미 | 영업팀</span>
          </span>
          <span class="review-text">
            “새로운 거래처와 계약하기 전에 반드시 확인하는 것 중 하나가 법인
            등기부등본인데 항상 인터넷 등기소에서 열람 해놓고 저장을 안해서 추가
            결제를 하는 경우가 빈번했습니다. 하지만 등기데이터 서비스는 재열람에
            기한을 두고 있지 않고 로그인만 하면 발급 이력을 언제든 확인할 수
            있어 편리하게 사용하고 있습니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
      </Swiper>
      <Swiper
        class="review-row ani-swiper ani-off delay-2"
        :modules="modules"
        :space-between="70"
        direction="vertical"
        :loop="true"
        :slides-per-view="2"
        :looped-slides="2"
        :speed="6000"
        :allow-touch-move="false"
        :observer="true"
        :observe-parents="true"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false
        }"
      >
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**너머뭉티 | 개인사업자</span>
          </span>
          <span class="review-text">
            “개인사업 운영하면서 등기부 한 통 열람하려고 보안프로그램 설치하고,
            입력 조금 하다가 잠깐 손님 보고 오면 로그아웃 되어 있고, 다시
            입력하고.. 심지어 열람했다가 재열람 시간이 초과되어 새로 열람한 적도
            있습니다. 우연히 광고보고 등기데이터 서비스를 이용해봤는데
            보안프로그램 설치 없이 진짜 1분이면 끝나네요. 생각날 때 다시
            접속해서 출력하면 되니 편합니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">법인</span>
            <span class="name">***마크 | 경영관리부</span>
          </span>
          <span class="review-text">
            “임원 임기 만료 알림 서비스 하나 때문에 가입했어요! 일전에
            사내이사님 등기기한을 놓쳐 과태료를 낸 적이 있어요🥲 어차피 등기도
            한 통 필요해 발급하면서 임원 임기만료일 세팅했는데 정말 딱 30일 전에
            카톡 알림 오는 거 보고 무한 신뢰❤️”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**너머뭉티 | 개인사업자</span>
          </span>
          <span class="review-text">
            “개인사업 운영하면서 등기부 한 통 열람하려고 보안프로그램 설치하고,
            입력 조금 하다가 잠깐 손님 보고 오면 로그아웃 되어 있고, 다시
            입력하고.. 심지어 열람했다가 재열람 시간이 초과되어 새로 열람한 적도
            있습니다. 우연히 광고보고 등기데이터 서비스를 이용해봤는데
            보안프로그램 설치 없이 진짜 1분이면 끝나네요. 생각날 때 다시
            접속해서 출력하면 되니 편합니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">법인</span>
            <span class="name">***마크 | 경영관리부</span>
          </span>
          <span class="review-text">
            “임원 임기 만료 알림 서비스 하나 때문에 가입했어요! 일전에
            사내이사님 등기기한을 놓쳐 과태료를 낸 적이 있어요🥲 어차피 등기도
            한 통 필요해 발급하면서 임원 임기만료일 세팅했는데 정말 딱 30일 전에
            카톡 알림 오는 거 보고 무한 신뢰❤️”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
        <swiper-slide class="review-row-box">
          <span class="review-writer">
            <span class="division">사업자</span>
            <span class="name">**너머뭉티 | 개인사업자</span>
          </span>
          <span class="review-text">
            “개인사업 운영하면서 등기부 한 통 열람하려고 보안프로그램 설치하고,
            입력 조금 하다가 잠깐 손님 보고 오면 로그아웃 되어 있고, 다시
            입력하고.. 심지어 열람했다가 재열람 시간이 초과되어 새로 열람한 적도
            있습니다. 우연히 광고보고 등기데이터 서비스를 이용해봤는데
            보안프로그램 설치 없이 진짜 1분이면 끝나네요. 생각날 때 다시
            접속해서 출력하면 되니 편합니다.”
          </span>
          <span class="review-score"> </span>
        </swiper-slide>
      </Swiper>
    </div>
    <div class="hide-bg top"></div>
    <div class="hide-bg bottom"></div>
  </div>
</template>

<style lang="scss" scope></style>
