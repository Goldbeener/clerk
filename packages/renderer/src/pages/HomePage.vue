<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <SideBar></SideBar>
      </el-aside>
      <el-main>
        <MainArea />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100%;
  :deep(.el-container) {
    .el-main {
      height: 100vh;
      overflow: hidden;
    }
  }
}
</style>
