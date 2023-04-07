import {ipcMain} from 'electron';
import {
  getCount,
  getPersistent,
  getUserInfo,
  setUserInfo,
  getNoteDb,
  getToday,
  getWeek,
  createItem,
} from './db/operations';

export function loadDb() {
  ipcMain.handle('db:query:count', getCount);
  ipcMain.handle('db:query:persistent', getPersistent);
  ipcMain.handle('db:query:userInfo', getUserInfo);
  ipcMain.handle('db:update:userInfo', (e, data) => {
    setUserInfo(data);
  });

  ipcMain.handle('db:query:all', getNoteDb);
  ipcMain.handle('db:query:today', getToday);
  ipcMain.handle('db:query:week', getWeek);

  // 注意参数
  ipcMain.handle('db:update:create', (e, params) => {
    createItem(params);
  });
}
