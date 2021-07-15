const { dbUrl, dbName } = require('./config');
var MongoClient = require('mongodb').MongoClient;

class DB {
  constructor(){
    this.connect()
    this.clientInstance = ''
  }
  connect(){
    return new Promise( (resolve, reject) => {
      if(this.clientInstance){
        resolve(this.clientInstance);
      }else{
        MongoClient.connect(dbUrl, (err, client) => {
          if (err) {
            reject(err);
          }
          this.clientInstance = client.db(dbName);
          resolve(this.clientInstance);
        });
      }

    })
  }
  find(collectionName, obj){
    return new Promise( (resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).find(obj);
        result.toArray((err,docs) => {
          if(err) reject(err)
          resolve(docs);
        })
      })
    });
  }
  insert(){}
  delete(){}
}

module.exports = DB
