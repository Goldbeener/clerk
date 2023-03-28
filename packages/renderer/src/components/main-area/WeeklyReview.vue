<template>
  <div class="mb-16px h-32px text-[26px] leading-8 text-left font-bold">一周纵览</div>
  <el-row :gutter="20">
    <el-col
      v-for="note in weeklyNotes"
      :key="note._id"
      :span="8"
      class="mb-8"
    >
      <el-card :body-style="{padding: '0px'}">
        <div style="padding: 14px">
          <div class="content">{{ note.content }}</div>
          <div class="text-slate-500 flex mt-[16px] justify-between items-center">
            <span class="text-xs font-bold">星期{{ weekMap[getDay(note.createdAt)] }}</span>
            <span class="text-xs">{{ useHandleFormatTime(note.createdAt) }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {getWeek} from '#preload';
import {useHandleFormatTime, getDay} from '/@/hooks/useHandleFormatTime';

const weeklyNotes = ref();
const weekMap = ['日', '一', '二', '三', '四', '五', '六'];

async function getWeekData() {
  weeklyNotes.value = await getWeek();
}
getWeekData();
</script>

<style scoped lang="less"></style>
