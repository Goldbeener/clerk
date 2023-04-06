<template>
  <div class="side-bar-wrapper divide-y">
    <div class="user-info mb-[16px]">
      <div
        class="w-[66px] h-[66px] rounded-full overflow-hidden"
        @click="handleRandomAvatar"
      >
        <img
          :src="avatar"
          alt="Avatar"
        />
      </div>
      <span
        class="max-w-5/6 h-9 leading-9 font-bold text-center truncate"
        contenteditable="true"
      >
        Adu
      </span>
      <div class="w-5/6 flex justify-between mt-[12px]">
        <div class="flex flex-col">
          <span class="font-bold text-cyan-400">{{ total }}</span>
          <span class="text-xs text-slate-400">笔记总数</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-cyan-400">{{ persistentCount }}</span>
          <span class="text-xs text-slate-400">连续记录</span>
        </div>
      </div>
    </div>
    <div class="menu-wrapper">
      <MenuList />
    </div>
  </div>
</template>

<script setup lang="ts">
import {createAvatar} from '@dicebear/core';
import type {Style, StyleOptions} from '@dicebear/core';
import {
  pixelArt,
  bottts,
  thumbs,
  botttsNeutral,
  croodles,
  shapes,
  adventurerNeutral,
} from '@dicebear/collection';
import {getRandom} from '/@/utils/getRandom';
import {getCount, getPersistentCount} from '#preload';

const collecttions = [pixelArt, bottts, thumbs, botttsNeutral, croodles, shapes, adventurerNeutral];
const avatar = ref(getRandomAvatar());
const total = ref(0);
const persistentCount = ref(0);

/**
 * 初始化总数据
 * TODO 当新增数据的时候需要刷新
 * */
async function initTotal() {
  total.value = await getCount();
}
initTotal();

async function initPersistent() {
  const data = await getPersistentCount();
  console.log('持续天数', data);

  persistentCount.value = data.lastDays;
}
initPersistent();
/**
 * TODO 统计连续记录天数
 * mongodb语句写法
 * 插入的时候直接计算，最近记录天数
 */

function getRandomAvatar() {
  const idx = getRandom(collecttions.length - 1);
  const style = collecttions[idx] as Style<0>;
  const options = {
    size: 128,
    radius: 50,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
    backgroundType: ['gradientLinear', 'solid'],
  } as StyleOptions<0>;

  return createAvatar(style, options).toDataUriSync();
}
// 切换头像
function handleRandomAvatar() {
  avatar.value = getRandomAvatar();
}
</script>

<style scoped lang="less">
.side-bar-wrapper {
  padding: 24px 0;
  box-sizing: border-box;
  background-color: azure;
  height: 100vh;
}
.user-info {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  &__avatar {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background-color: aqua;
  }
}
.menu-wrapper {
  // deep 选择器必须在scoped、有父级选择器，在less中必须是直接父级
  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }
}
</style>
