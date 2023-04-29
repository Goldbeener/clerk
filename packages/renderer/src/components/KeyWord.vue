<template>
  <div>
    <template v-for="segment in result">
      <span
        v-if="segment.startsWith(eventFlag)"
        :key="`${segment}-event`"
        class="text-red-600 underline cursor-pointer"
        @click="handleCheckEvent(segment)"
      >
        {{ segment }}
      </span>
      <span
        v-else
        :key="segment"
      >
        {{ segment }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * 识别句子中的 事件标志
 * 高亮
 * 绑定事件
 *
 * 不使用v-html 而是将起拆分、识别、充足
 */
import {useRouter, useRoute} from 'vue-router';
import mitter from '/@/hooks/useHanldeEventBus';
const delimiter = '|';
const eventFlag = '@';
const props = defineProps({
  sentence: {type: String, required: true},
});

const router = useRouter();
const route = useRoute();

function handleCheckEvent(eventTag: string) {
  eventTag = eventTag.replace(eventFlag, '');
  const path = '/event-line';
  router.push({
    path,
    query: {
      ...route.query,
      eventTag,
    },
  });
  mitter.emit('update-sidebar', path);
}

const result = computed(() => {
  return props.sentence
    .replaceAll(/@[\u4e00-\u9fa5\w]+/g, match => `${delimiter}${match}${delimiter}`)
    .split(delimiter);
});
</script>

<style scoped></style>
