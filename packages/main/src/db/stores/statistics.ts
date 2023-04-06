import {app} from 'electron';
import Datastore from 'nedb-promises';
import Ajv from 'ajv';
import type {ValidateFunction} from 'ajv';
import statisticsSchema from '../schemas/statistics';

class NoteStatisticsStore {
  schemaValidator: ValidateFunction;
  db: any;
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });
    this.schemaValidator = ajv.compile(statisticsSchema);
    const dbPath =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/notesummary.db`
        : `${app.getPath('userData')}/data/notesummary.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: any) {
    return this.schemaValidator(data);
  }

  getPersistent() {
    return this.db
      .findOne({key: 'Persistent'}, {createdAt: 0, updatedAt: 0, _id: 0, key: 0})
      .exec();
  }
  updatePersistent(data: any) {
    return this.db.updateAsync({key: 'Persistent'}, {$set: data}, {upsert: true});
  }
}

const noteSummaryDb = new NoteStatisticsStore();
export default noteSummaryDb;
