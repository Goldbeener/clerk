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
  <template v-if="weeklyNotes && weeklyNotes.length">
    <el-row
      v-if="!mode"
      :gutter="20"
    >
      <el-col
        v-for="note in showWeekData"
        :key="note._id"
        :span="8"
        class="mb-8"
      >
        <el-card :body-style="{padding: '0px'}">
          <div style="padding: 14px">
            <KeyWord
              class="content whitespace-pre-wrap text-left"
              :sentence="note.content"
            />

            <div class="text-slate-500 flex mt-[16px] justify-between items-center">
              <span class="text-xs font-bold">{{ note.weekDay }}</span>
              <span class="text-xs">{{ useHandleFormatTime(note.createdAt) }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div
      v-else
      class="list-mode"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(dayList, key) in showWeekData"
          :key="key"
          :timestamp="key"
          placement="top"
        >
          <el-card>
            <div
              v-for="note in dayList"
              :key="note._id"
              class="flex justify-start items-baseline mb-3"
            >
              <span class="mr-[16px] text-xs"> {{ useHandleFormatTime(note.createdAt) }}</span>
              <KeyWord
                class="hover:bg-stone-300 whitespace-pre-wrap text-left"
                :sentence="note.content"
              />
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
  <el-empty
    v-else
    description="本周还没有开始记录"
  />
</template>

<script setup lang="ts">
import {getWeek, clipboardWriteText} from '#preload';
import {Grid, Tickets, CopyDocument} from '@element-plus/icons-vue';
import {useHandleFormatTime, getDay} from '/@/hooks/useHandleFormatTime';
import {ElMessage} from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

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
const showWeekData = computed(() => {
  if (!weeklyNotes.value) return [];
  return !mode.value ? [...weeklyNotes.value] : formatWeekData([...weeklyNotes.value]);
});
/**
 * 获取一周数据
 */
async function getWeekData() {
  const data = (await getWeek()) || [];
  data.forEach((note: (typeof weeklyNotes.value)[number]) => {
    note.weekDay = `星期${weekMap[getDay(note.createdAt)]}`;
  });

  weeklyNotes.value = data;
}
getWeekData();

// 切换视图
function handleChangeMode() {
  mode.value = 1 ^ mode.value;
}
function formatWeekData(data: typeof weeklyNotes.value) {
  const map = {} as {[key: string]: typeof weeklyNotes.value};
  data.forEach((note: (typeof weeklyNotes.value)[number]) => {
    if (map[note.weekDay]) {
      map[note.weekDay].push(note);
    } else {
      map[note.weekDay] = [note];
    }
  });
  return map;
}

type NoteItem = (typeof weeklyNotes.value)[number];
// 复制
function handleCopyDaily() {
  /**
   * {
   *    星期一： [{}, {}],
   *    星期二： [{}, {}]
   * }
   */
  const data = mode.value ? showWeekData.value : formatWeekData([...weeklyNotes.value]);
  let target = '';
  for (const key in data) {
    target +=
      key +
      ':' +
      data[key].reduce((prev: string, cur: NoteItem) => prev + '\n' + cur.content, '') +
      '\n' +
      '\n';
  }
  console.log('copy', target);
  try {
    clipboardWriteText(target);
    ElMessage.success('复制成功');
  } catch (error) {
    ElMessage.error('复制失败，请重试');
  }
}
</script>

<style scoped lang="less">
.list-mode :deep(.el-timeline-item__timestamp) {
  text-align: left;
}
</style>
