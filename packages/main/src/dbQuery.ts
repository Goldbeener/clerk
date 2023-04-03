import {ipcMain} from 'electron';
import {getCount, getNoteDb, getToday, getWeek, createItem} from './db/operations';

export function loadDb() {
  ipcMain.handle('db:query:count', getCount);
  ipcMain.handle('db:query:all', getNoteDb);
  ipcMain.handle('db:query:today', getToday);
  ipcMain.handle('db:query:week', getWeek);

  // 注意参数
  ipcMain.handle('db:update:create', (e, params) => {
    createItem(params);
  });
}
