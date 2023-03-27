<template>
  <div class="side-bar-wrapper">
    <div class="user-info">
      <div class="user-info__avatar"></div>
      <span class="user-info__name">Adu</span>
    </div>
    <div class="calendar"></div>
    <div class="menu-wrapper">
      <MenuList />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.side-bar-wrapper {
  padding: 24px 0;
  box-sizing: border-box;
  background-color: azure;
  height: 100vh;
}
.user-info {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  &__avatar {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background-color: aqua;
  }
  &__name {
    line-height: 36px;
  }
}
.menu-wrapper {
  // deep 选择器必须在scoped、有父级选择器，在less中必须是直接父级
  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }
}
</style>
