<template>
  <div class="mb-16px h-32px text-[26px] leading-8 text-left font-bold flex items-center">
    <span class="mr-[8px]">一周纵览</span>
    <el-tooltip
      effect="dark"
      content="点击切换视图模式"
      placement="right"
    >
      <el-icon
        size="20"
        class="cursor-pointer"
        @click="handleChangeMode"
      >
        <component :is="showIcon"></component>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto">
      <el-tooltip
        effect="dark"
        content="点击复制日报"
        placement="left"
      >
        <el-icon
          size="20"
          class="cursor-pointer"
          @click="handleCopyDaily"
        >
          <CopyDocument />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
  <el-row :gutter="20">
    <el-col
      v-for="note in weeklyNotes"
      :key="note._id"
      :span="8"
      class="mb-8"
    >
      <el-card :body-style="{padding: '0px'}">
        <div style="padding: 14px">
          <div class="content text-left whitespace-pre-wrap">{{ note.content }}</div>
          <div class="text-slate-500 flex mt-[16px] justify-between items-center">
            <span class="text-xs font-bold">星期{{ weekMap[getDay(note.createdAt)] }}</span>
            <span class="text-xs">{{ useHandleFormatTime(note.createdAt) }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div class="list-mode">
    <div class=""></div>
  </div>
</template>

<script setup lang="ts">
import {getWeek} from '#preload';
import {Grid, Tickets, CopyDocument} from '@element-plus/icons-vue';
import {useHandleFormatTime, getDay} from '/@/hooks/useHandleFormatTime';

const weeklyNotes = ref();
const weekMap = ['日', '一', '二', '三', '四', '五', '六'];
/**
 * mode
 * 0: grid
 * 1: detail
 */
const mode = ref(0);
const showIcon = computed(() => {
  return mode.value ? Tickets : Grid;
});
/**
 * 获取一周数据
 */
async function getWeekData() {
  weeklyNotes.value = await getWeek();
}
getWeekData();

// 切换视图
function handleChangeMode() {
  mode.value = 1 ^ mode.value;
}
// 复制
function handleCopyDaily() {
  console.log('copy');
}
</script>

<style scoped lang="less"></style>
