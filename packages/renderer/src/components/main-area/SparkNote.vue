<template>
  <div class="spark-note-page">
    <div class="title-area">
      <span class="page-title">星火笔记</span>
      <div class="title-search">
        <el-input
          v-model="keyword"
          class="w-50 m-2"
          placeholder="search something"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div class="edit-area">
      <el-input
        v-model="newNote"
        :autosize="{minRows: 3, maxRows: 5}"
        resize="none"
        type="textarea"
        placeholder="记点什么"
      />
      <el-button
        class="confirm-buttom"
        color="azure"
        @click="confirmAddNote"
      >
        <el-icon color="coral"><Promotion /></el-icon>
      </el-button>
    </div>
    <el-scrollbar class="scroll-area">
      <div class="note-list">
        <el-card
          v-for="note in notes"
          :key="note.id"
          shadow="hover"
          class="rounded-[12px]"
        >
          <template #header>
            <div class="card-header">
              <span class="text-gray-400">{{ note.time }}</span>
              <el-button
                class="button"
                text
                @click="handleDigDeep"
              >
                <el-icon color="#fde047"><Opportunity /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="note-content">
            {{ note.content }}
          </div>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {Opportunity, Search, Promotion} from '@element-plus/icons-vue';
import {getTodoDb, createItem} from '#preload';
import dayjs from 'dayjs';
import mitter from '/@/hooks/useHanldeEventBus';

const keyword = ref('');
const newNote = ref('');
const notes = ref();

async function getData() {
  try {
    const todoDb = await getTodoDb();
    todoDb.forEach((item: any) => {
      item.time = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    });
    notes.value = todoDb;
  } catch (error) {
    console.log('读取数据库失败', error);
  }
}
getData();

// 添加
function confirmAddNote() {
  const content = newNote.value;
  if (!content) return;
  createItem({
    content,
    isDone: false,
  });
  newNote.value = '';
  getData();
  notifyAddNote('add-note');
}

// 事件通知
function notifyAddNote(eventName: string, data?: any) {
  mitter.emit(eventName, data);
}

function handleDigDeep() {
  /**
   * 点击跳转到新的一页
   * 在这一页关于这个话题深入的描述
   *
   * updateNote，加上一个链接属性，链接对应的是深入的内容
   * */
}

/**
 * TODO
 * 1. 搜索
 * 2. 富文本，支持插入链接，插入图片，插入事件tag
 *
 * */
</script>

<style scoped lang="less">
@scroll-bar-width: 10px;

.spark-note-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.title-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: @scroll-bar-width;
  .page-title {
    font-weight: 800;
    font-size: 28px;
  }
}
.edit-area {
  margin-bottom: 32px;
  padding: @scroll-bar-width;
  position: relative;
  .confirm-buttom {
    position: absolute;
    right: calc(@scroll-bar-width * 2);
    bottom: calc(@scroll-bar-width * 2);
  }
}
.scroll-area {
  flex: 1;
}
.note-list {
  margin-bottom: 32px;
  :deep(.el-card) {
    margin: 10px @scroll-bar-width 32px @scroll-bar-width;
    .el-card__header {
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.note-content {
  text-align: left;
  white-space: pre-wrap; // 保留连续空白，换行符、br元素，或者填充盒子需要，启动换行
}
</style>
