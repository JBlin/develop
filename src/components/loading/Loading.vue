<template>
  <div id="loading-overlay">
    <div id="loading">
      <div class="Loader">
        <svg class="circular-loader" viewBox="25 25 50 50">
          <circle
            class="loader-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#2961FF"
            stroke-width="4"
          />
        </svg>
      </div>
      <h2 class="loading-text">
        {{ props.content.text ? props.content.text : '로딩 중...' }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
}
const props = defineProps<{ content: Props }>();
</script>

<style lang="scss">
#loading-overlay {
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  //   display: none;
  transition: 0.4s all ease-in-out;
  z-index: 200;
}
#loading {
  position: absolute;
  width: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
}
.loading-text {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  top: 35px;
}
.Loader {
  width: 40px;
  height: 40px;
}
.loader:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.circular-loader {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
}

.loader-path {
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}
@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@-webkit-keyframes color {
  0% {
    stroke: #2961ff;
  }
  40% {
    stroke: #2961ff;
  }
  66% {
    stroke: #2961ff;
  }
  80%,
  90% {
    stroke: #2961ff;
  }
}
@keyframes color {
  0% {
    stroke: #2961ff;
  }
  40% {
    stroke: #2961ff;
  }
  66% {
    stroke: #2961ff;
  }
  80%,
  90% {
    stroke: #2961ff;
  }
}
.LoaderBalls img {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  /* animation: circle 1.4s ease-in-out infinite; */
}
/* .LoaderBalls__item:nth-child(1) {
       animation: bouncing 0.4s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
   }
   .LoaderBalls__item:nth-child(2) {
       animation: bouncing 0.4s 0.1s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
   }
   .LoaderBalls__item:nth-child(3) {
       animation: bouncing 0.4s 0.2s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
   } */
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
