import todoDb from '../stores/todoItem';
import dayjs from 'dayjs';

interface TodoData {
  isDone?: boolean;
  content: string;
  createdAt?: Date;
  time?: string | Date;
}

// 读取所有
export async function getTodoDb(): Promise<TodoData[]> {
  return await todoDb.readAll();
}

// 创建新的笔记
export function createItem(data: TodoData): Promise<TodoData> {
  return todoDb.create(data);
}

// 获取当天数据
export function getToday(): Promise<TodoData> {
  const query = {
    timestamp: {
      $gte: dayjs().startOf('date').valueOf(),
      $lte: dayjs().add(1, 'day').startOf('date').valueOf(),
    },
  };
  return todoDb.readRange(query, {timestamp: -1});
}
