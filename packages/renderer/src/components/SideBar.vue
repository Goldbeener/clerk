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
        ref="nameMakerRef"
        class="max-w-5/6 h-9 leading-9 font-bold text-center truncate"
        contenteditable="true"
        @blur="handleChangeName"
      >
        {{ name }}
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
import {getCount, getPersistentCount, getUserInfo, setUserInfo} from '#preload';
import mitter from '/@/hooks/useHanldeEventBus';

const collecttions = [pixelArt, bottts, thumbs, botttsNeutral, croodles, shapes, adventurerNeutral];
const name = ref('Hello World');
const avatar = ref();
const total = ref(0);
const persistentCount = ref(0);
const nameMakerRef = ref<HTMLElement>();

/**
 * 初始化用户信息
 */
async function initUserInfo() {
  const data = await getUserInfo();
  if (!data) {
    avatar.value = getRandomAvatar();
  } else {
    avatar.value = data.avatar;
    name.value = data.name;
  }
}
initUserInfo();

/**
 * 初始化总数据
 * */
async function initTotal() {
  total.value = await getCount();
}
initTotal();

/**
 * 初始化持续天数
 */
async function initPersistent() {
  const data = await getPersistentCount();
  persistentCount.value = data.lastDays;
}
initPersistent();

/**
 * 新增笔记时 更新笔记总数和记录天数
 */
mitter.on('add-note', () => {
  initTotal();
  initPersistent();
});

/**
 * 获取随机头像
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
// 切换并保存头像
function handleRandomAvatar() {
  const newAvatar = getRandomAvatar();
  avatar.value = newAvatar;
  setUserInfo({avatar: newAvatar});
}
// 修改并保存名字
function handleChangeName() {
  const newName = (nameMakerRef.value as HTMLElement).innerText.trim();
  if (newName !== name.value) {
    name.value = newName;
    setUserInfo({name: newName});
  }
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
}
.menu-wrapper {
  // deep 选择器必须在scoped、有父级选择器，在less中必须是直接父级
  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }
}
</style>
