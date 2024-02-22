<template>
  <div class="contents-container">
    <div class="contents-center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contents-container {
  width: 100%;
  height: 100vh;
  background-color: #f8f9fb;
  overflow: auto;

  .contents-center {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
