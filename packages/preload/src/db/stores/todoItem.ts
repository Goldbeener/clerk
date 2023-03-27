import Datastore from 'nedb-promises';
import Ajv from 'ajv';
import type {ValidateFunction} from 'ajv';
import todoItemSchema from '../schemas/todoItem';

class TodoItemStore {
  schemaValidator: ValidateFunction;
  db: any;
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });
    this.schemaValidator = ajv.compile(todoItemSchema);
    const dbPath = `${process.cwd()}/todolist.db`;
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

const itemDb = new TodoItemStore();
export default itemDb;
