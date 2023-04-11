<template>
  <div>
    <div class="mb-16px h-32px text-[26px] leading-8 text-left font-bold flex items-center">
      <span class="mr-8px"> 每日回顾 </span>
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
    <!-- grid mode -->
    <el-row
      v-if="!mode"
      :gutter="20"
    >
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
    <!-- detail mode -->
    <div
      v-else
      class="detail-mode"
    >
      <div
        v-for="note in todayNotes"
        :key="note._id"
        class="flex mb-[16px] items-baseline"
      >
        <span class="text-xs mr-[16px]">{{ useHandleFormatTime(note.createdAt) }}</span>
        <span class="whitespace-pre-wrap text-left">{{ note.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getToday, clipboardWriteText} from '#preload';
import {Grid, Tickets, CopyDocument} from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import {useHandleFormatTime} from '/@/hooks/useHandleFormatTime';

const todayNotes = ref();
/**
 * mode
 * 0: grid
 * 1: detail
 */
const mode = ref(0);
const showIcon = computed(() => {
  return mode.value ? Tickets : Grid;
});

async function getTodayData() {
  todayNotes.value = await getToday();
}
getTodayData();

/**
 * 切换视图模式
 */
function handleChangeMode() {
  mode.value = 1 ^ mode.value;
}

/**
 * 复制日报
 */
async function handleCopyDaily() {
  const data = todayNotes.value.reduce(
    (pre: (typeof todayNotes.value)[number], cur: (typeof todayNotes.value)[number]) => {
      // 需要注意pre类型，它是跟初始值、最终返回值保持一致的
      return `${pre}${pre ? '\n' : ''}${cur.content}`;
    },
    '', // 这个初始值最好传递，否则只有一个元素时有问题，并且这个值也代表了最后返回值的类型
  );
  try {
    clipboardWriteText(data);
    ElMessage.success('复制成功');
  } catch (error) {
    ElMessage.error('复制失败，请重试');
  }
}
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
