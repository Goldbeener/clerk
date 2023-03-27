<template>
  <div>
    <div class="title">每日回顾</div>
    <el-row :gutter="20">
      <el-col
        v-for="note in todayNotes"
        :key="note._id"
        :span="8"
      >
        <el-card :body-style="{padding: '0px'}">
          <div style="padding: 14px">
            <div class="content">{{ note.content }}</div>
            <div class="bottom">
              <time class="time">{{ useHandleFormatTime(note.createdAt) }}</time>
              <el-button
                text
                class="button"
              >
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {getToday} from '#preload';
import useHandleFormatTime from '/@/hooks/useHandleFormatTime';

const todayNotes = ref();

async function getTodayData() {
  todayNotes.value = await getToday();
}
getTodayData();

/**
 * 代办事项？ 需要确认是否完成？
 *
 * @xxx 时间点 确定在某时某刻做 算是一个日历行程
 * #xxx 事件flag  用于做事件线timeline
 */
</script>

<style scoped lang="less">
.title {
  height: 32px;
  line-height: 32px;
  font-weight: bold;
  font-size: 26px;
  text-align: left;
  margin-bottom: 16px;
}
.content {
  white-space: pre-wrap;
  text-align: left;
}
.bottom {
  display: flex;
  margin-top: 16px;
  color: #999;
}
.time {
  font-size: 12px;
}
</style>
