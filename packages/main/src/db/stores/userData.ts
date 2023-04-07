import {app} from 'electron';
import Datastore from 'nedb-promises';

class UserInfoStore {
  db: any;
  constructor() {
    const dbPath =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/userinfo.db`
        : `${app.getPath('userData')}/data/userinfo.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  getUserInfo() {
    return this.db.findOne({key: 'userInfo'}, {createdAt: 0, updatedAt: 0, _id: 0, key: 0}).exec();
  }
  setUserInfo(data: any) {
    return this.db.updateAsync({key: 'userInfo'}, {$set: data}, {upsert: true});
  }
}

const UserInfoDb = new UserInfoStore();
export default UserInfoDb;
