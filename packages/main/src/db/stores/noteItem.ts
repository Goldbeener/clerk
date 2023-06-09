import {app} from 'electron';
import Datastore from 'nedb-promises';
import Ajv from 'ajv';
import type {ValidateFunction} from 'ajv';
import noteItemSchema from '../schemas/noteItem';

class NoteStore {
  schemaValidator: ValidateFunction;
  db: any;
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });
    this.schemaValidator = ajv.compile(noteItemSchema);
    const dbPath =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/noteocean.db`
        : `${app.getPath('userData')}/data/noteocean.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: any) {
    return this.schemaValidator(data);
  }

  create(data: any) {
    const isValid = this.validate(data);
    if (isValid) {
      if (!data.timestamp) {
        data.timestamp = Date.now();
      }
      return this.db.insert(data);
    }
  }

  count() {
    return this.db.count();
  }

  read(_id: any) {
    return this.db.findOne({_id}).exec();
  }

  readRange(query: {[key: string]: any}, sort = {}) {
    return this.db.find(query).sort(sort).exec();
  }

  readAll() {
    return this.db.find({}).sort({createdAt: -1}).skip(0).limit(10).exec();
  }

  archive({_id}: {_id: any}) {
    return this.db.update({_id}, {$set: {isDone: true}});
  }
}

const itemDb = new NoteStore();
export default itemDb;
