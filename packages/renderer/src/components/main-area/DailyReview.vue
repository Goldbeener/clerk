<template>
  <div>
    <div class="mb-16px h-32px text-[26px] leading-8 text-left font-bold">每日回顾</div>
    <el-row :gutter="20">
      <el-col
        v-for="note in todayNotes"
        :key="note._id"
        :span="8"
      >
        <el-card :body-style="{padding: '0px'}">
          <div style="padding: 14px">
            <div class="text-left whitespace-pre-wrap">{{ note.content }}</div>
            <div class="text-slate-500 flex mt-[16px] justify-between items-center">
              <span class="text-xs">{{ useHandleFormatTime(note.createdAt) }}</span>
              <el-button
                text
                class="button"
              ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {getToday} from '#preload';
import {useHandleFormatTime} from '/@/hooks/useHandleFormatTime';

const todayNotes = ref();

async function getTodayData() {
  todayNotes.value = await getToday();
}
getTodayData();

/**
 * 代办事项？ 需要确认是否完成？
 *
 * 是否是要获取前一天的内容？
 *
 * @xxx 时间点 确定在某时某刻做 算是一个日历行程
 * #xxx 事件flag  用于做事件线timeline
 */
</script>

<style scoped lang="less"></style>
