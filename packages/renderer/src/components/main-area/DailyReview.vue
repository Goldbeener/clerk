<template>
  <div>
    <div>每日回顾</div>
  </div>
</template>

<script setup lang="ts">
import {getToday} from '#preload';

async function getTodayData() {
  const data = await getToday();
  console.log('??今天的数据', data);
}
getTodayData();

/**
 * 代办事项？ 需要确认是否完成？
 *
 * @xxx 时间点 确定在某时某刻做 算是一个日历行程
 * #xxx 事件flag  用于做事件线timeline
 */
</script>

<style scoped></style>
