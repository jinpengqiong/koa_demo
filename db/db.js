const { dbUrl, dbName } = require('./config');
var MongoClient = require('mongodb').MongoClient;

class DB {
  constructor(){
    // this.connect()
  }
  connect(){
    return new Promise( (resolve, reject) => {
      MongoClient.connect(dbUrl, (err, client) => {
        if (err){
          reject(err)
        }
        var db = client.db(dbName);
        resolve(db)
      });
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
