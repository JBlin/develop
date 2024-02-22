<template>
  <div class="error-container">
    <div class="center">
      <div class="error">
        <div class="number">4</div>
        <div class="illustration">
          <div class="circle"></div>
          <div class="clip">
            <div class="paper">
              <div class="face">
                <div class="eyes">
                  <div class="eye eye-left"></div>
                  <div class="eye eye-right"></div>
                </div>
                <div class="rosyCheeks rosyCheeks-left"></div>
                <div class="rosyCheeks rosyCheeks-right"></div>
                <div class="mouth"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="number">4</div>
      </div>

      <div class="text">Oh! Page not found! ERROR</div>
      <div class="explain-text">
        죄송합니다. 페이지를 찾을 수 없습니다. <br />
        존재하지 않는 주소를 입력하셨거나 요청하신 페이지의 주소가 변경 및
        삭제되어 찾을 수 없습니다.
      </div>
      <button class="button" @click="$router.replace('/pocket/Main')">
        홈으로
      </button>
    </div>
  </div>
</template>
<style lang="scss">
/* colors */
$blue: #293b49;
$pink: #fdabaf;
$pink-light: #ffe0e6;
$green: #04cba0;
$green-dark: #01ac88;
$white: white;
.error-container {
  width: 100%;
  height: 100vh;
}
.center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.error {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.number {
  font-weight: 600;
  font-size: 200px;
  line-height: 1;
}

.illustration {
  position: relative;
  width: 180px;
  margin: 0;
  transform: scale(0.7);
}

.circle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: $blue;
}

.clip {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  width: 180px;
  height: 200px;
  border-radius: 0 0 100px 100px;
}

.paper {
  position: absolute;
  bottom: -0.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 200px;
  border: 4px solid $blue;
  background-color: $white;
  border-radius: 20px;

  &::before {
    content: '';
    position: absolute;
    top: -0.7rem;
    right: -0.7rem;
    width: 1.4rem;
    height: 1rem;
    background-color: $white;
    border-bottom: 0.3rem solid $blue;
    transform: rotate(45deg);
  }
}

.face {
  position: relative;
  margin-top: 40px;
}

.eyes {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 10px;
}

.eye {
  position: absolute;
  bottom: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: $blue;
  animation-name: eye;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  &-left {
    left: 0;
  }

  &-right {
    right: 0;
  }
}

@keyframes eye {
  0% {
    height: 0.8rem;
  }
  50% {
    height: 0.8rem;
  }
  52% {
    height: 0.1rem;
  }
  54% {
    height: 0.8rem;
  }
  100% {
    height: 0.8rem;
  }
}

.rosyCheeks {
  position: absolute;
  top: 25px;
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: $pink;

  &-left {
    left: 25px;
  }

  &-right {
    right: 25px;
  }
}

.mouth {
  position: absolute;
  top: 50px;
  left: 50%;
  width: 26px;
  height: 3px;
  border-radius: 0.1rem;
  transform: translateX(-50%);
  background-color: $blue;
}

.text {
  margin-top: 45px;
  font-size: 40px;
}

.explain-text {
  margin-top: 80px;
  font-weight: 600;
  line-height: 1.6;
  // font-size: 18px;
}

.button {
  width: 100%;
  max-width: 260px;
  margin-top: 36px;
  border-radius: 4px;
  height: 36px;
  color: $white;
  background-color: #000;
}

.by {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  text-transform: uppercase;
  color: $blue;
}

.byLink {
  color: $green;
}

@media (max-width: 768px) {
  .error {
    transform: scale(0.6);
  }
  .text {
    margin-top: 0px;
    font-size: 25px;
  }
  .explain-text {
    margin-top: 30px;
    font-size: 12px;
  }
}
</style>
