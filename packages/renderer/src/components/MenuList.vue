<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    router
  >
    <el-menu-item index="/">
      <el-icon><Memo /></el-icon>
      <span>星火笔记</span>
    </el-menu-item>
    <el-menu-item index="/daily-review">
      <el-icon><icon-menu /></el-icon>
      <span>每日回顾</span>
    </el-menu-item>
    <el-menu-item index="/weekly-review">
      <el-icon><document /></el-icon>
      <span>周周报道</span>
    </el-menu-item>
    <el-menu-item index="/event-line">
      <el-icon><Notebook /></el-icon>
      <span>事件纵览</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {Document, Menu as IconMenu, Memo, Notebook} from '@element-plus/icons-vue';

const defaultActive = ref('/');
</script>

<style scoped lang="less">
.el-menu-item {
  font-weight: 600;
}
</style>
