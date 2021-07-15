const { dbUrl, dbName } = require('./config');
var MongoClient = require('mongodb').MongoClient;

class DB {
  // * 单例模式
  static getInstance() {
    if (!this.clientInstance) {
      this.clientInstance = new DB();
    }
    return this.clientInstance;
  }
  constructor() {
    this.connect();
    this.clientInstance = '';
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (this.clientInstance) {
        resolve(this.clientInstance);
      } else {
        MongoClient.connect(dbUrl, (err, client) => {
          if (err) {
            reject(err);
          }
          this.clientInstance = client.db(dbName);
          resolve(this.clientInstance);
        });
      }
    });
  }
  find(collectionName, obj) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result = db.collection(collectionName).find(obj);
        result.toArray((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
      });
    });
  }
  insert(collectionName, obj) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName)
          .insertOne(obj)
          .then((docs) => {
            resolve(docs.acknowledged);
          });
      });
    });
  }
  update(collectionName, obj, obj1, bool) {
    const action = bool ? 'updateMany' : 'updateOne';
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName)
          [action](obj, { $set: obj1 })
          .then((docs) => {
            console.log(`docs`, docs);
            resolve(docs.acknowledged);
          });
      });
    });
  }
  delete(collectionName, obj) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName)
          .remove(obj).then((docs) => {
            console.log(`docs`, docs);
            resolve(docs.acknowledged);
          });
      });
    });
  }
}

module.exports = DB.getInstance();
