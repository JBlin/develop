<template>
  <footer class="footer">
    <div class="max-container">
      <div class="footer-top">
        <div class="logo">
          <img src="@/assets/images/biz-logo.png" alt="로고" />
        </div>
        <div class="terms">
          <a href="https://www.xn--hz2b25f79dxzi7lm.com/" target="_blank"
            >회사소개</a
          >
          <router-link to="/tos">이용약관</router-link>
          <router-link to="/privacy" class="bold">개인정보처리방침</router-link>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-row">
          <span class="bold">(주)비즈비</span>
          <span class="footer-bottom-line pc-show"></span>
          <span>등기데이터</span>
          <span
            >06657 서울특별시 서초구 반포대로21길 3, IWHA B1(서초동,
            이화빌딩)</span
          >
        </div>
        <div class="footer-bottom-row">
          <span class="footer-bottom-row-box">
            <span class="bold">대표이사</span>
            <span>김태형</span>
          </span>
          <span class="footer-bottom-line pc-show"></span>
          <span class="footer-bottom-row-box">
            <span class="bold">사업자등록번호</span>
            <span>573-81-02048</span>
          </span>
          <span class="footer-bottom-line pc-show"></span>
          <span class="footer-bottom-row-box">
            <span class="bold">이메일</span>
            <span>contact@bizbee.co.kr</span>
          </span>
        </div>
        <div class="footer-bottom-row">
          <span class="footer-bottom-row-box">
            <span class="bold">대표번호</span>
            <span>02-587-5666</span>
          </span>
          <span class="footer-bottom-line pc-show"></span>
          <span class="footer-bottom-row-box">
            <span class="bold">통신판매업신고번호</span>
            <span>제 2023-서울서초-2623 호</span>
          </span>
        </div>
        <div class="copyright">Copyright © bizbee. All Rights Reserved.</div>
        <button class="more-site" @click="active">
          관련사이트
          <img src="@/assets/images/plus.svg" alt="icon" />
          <ul class="dropdown-menu">
            <li class="dropdown-menu-list">
              <a
                href="https://smarterp.xn--hz2b15nba796a8tuprd.com/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 ERP</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a href="#" class="dropdown-menu-link" target="_blank"
                >스마트 택스</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://smart-cfo.net/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 CFO</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://smarttalk.app/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트톡</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://smarttaxbill.com/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 택스빌</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://www.smart-esign.com/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 이사인</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://smartpms.co.kr/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 PMS</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="http://smartstay.xn--hz2b15nba796a8tuprd.com/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 스테이</a
              >
            </li>

            <li class="dropdown-menu-list">
              <a
                href="https://blog.naver.com/smart-bc"
                class="dropdown-menu-link"
                target="_blank"
                >스마트 비즈카드</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://www.edupure.net/"
                class="dropdown-menu-link"
                target="_blank"
                >에듀퓨어</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://www.smartwel.co.kr/"
                class="dropdown-menu-link"
                target="_blank"
                >스마트웰</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://www.buyis.co.kr/"
                class="dropdown-menu-link"
                target="_blank"
                >바이이즈</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="http://xn--v92b8yy5h64e87cs86a.com/"
                class="dropdown-menu-link"
                target="_blank"
                >세무법인 혜안</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://ticommerce.co.kr/"
                class="dropdown-menu-link"
                target="_blank"
                >티아이커머스</a
              >
            </li>
            <li class="dropdown-menu-list">
              <a
                href="https://www.junggico.co.kr/"
                class="dropdown-menu-link"
                target="_blank"
                >중기이코노미기업지원단</a
              >
            </li>
          </ul>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
function active() {
  const show = document.querySelector('.more-site') as HTMLElement;
  show.classList.toggle('active');
}
</script>
