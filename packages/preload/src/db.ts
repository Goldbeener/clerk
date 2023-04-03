import {ipcRenderer} from 'electron';

// 获取总数
export function getCount() {
  return ipcRenderer.invoke('db:query:count');
}
// 获取总数据 (分页)
export function getTodoDb() {
  return ipcRenderer.invoke('db:query:all');
}
// 获取当日数据
export function getToday() {
  return ipcRenderer.invoke('db:query:today');
}
// 获取本周数据
export function getWeek() {
  return ipcRenderer.invoke('db:query:week');
}
// 新增数据
export function createItem(params: any) {
  return ipcRenderer.invoke('db:update:create', params);
}
