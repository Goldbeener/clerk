import noteDb from '../stores/noteItem';
import noteSummaryDb from '../stores/statistics';
import dayjs from 'dayjs';

interface TodoData {
  isDone?: boolean;
  content: string;
  createdAt?: Date;
  time?: string | Date;
}

// 获取noteSummaryDb当前信息
export async function getPersistent() {
  return await noteSummaryDb.getPersistent();
}
// 更新noteSummaryDb当前信息
export async function updatePersistent(data: any) {
  return await noteSummaryDb.updatePersistent(data);
}

// 读取笔记总数
export async function getCount(): Promise<number> {
  return await noteDb.count();
}

// 读取所有（分页）
export async function getNoteDb(): Promise<TodoData[]> {
  return await noteDb.readAll();
}

// 创建新的笔记
export async function createItem(data: TodoData): Promise<TodoData> {
  getPersistent().then(res => {
    console.log('???当前持续性信息', res);
    if (!res) {
      updatePersistent({lastDay: dayjs().valueOf(), lastDays: 1});
    } else {
      const {lastDay, lastDays} = res;
      if (dayjs(lastDay).isBefore(dayjs(), 'day')) {
        console.log('再次更新');
        // 判断是否超过一天
        if (dayjs(lastDay).isSame(dayjs().subtract(1, 'day'), 'day')) {
          // 不超过一天 加1
          updatePersistent({lastDay: dayjs().valueOf(), lastDays: lastDays + 1});
        } else {
          // 超过一天 重新计算
          updatePersistent({lastDay: dayjs().valueOf(), lastDays: 1});
        }
      }
    }
  });

  return noteDb.create(data);
}

// 获取当天数据
export function getToday(): Promise<TodoData> {
  const query = {
    timestamp: {
      $gte: dayjs().startOf('date').valueOf(),
      $lte: dayjs().add(1, 'day').startOf('date').valueOf(),
    },
  };
  return noteDb.readRange(query, {timestamp: -1});
}

// 获取本周数据
export function getWeek(): Promise<TodoData> {
  const query = {
    timestamp: {
      $gte: dayjs().startOf('week').valueOf(),
      $lte: dayjs().add(1, 'day').startOf('date').valueOf(),
    },
  };
  return noteDb.readRange(query, {timestamp: -1});
}
