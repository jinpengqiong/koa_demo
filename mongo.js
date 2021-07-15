var MongoClient = require('mongodb').MongoClient
var dbUrl = 'mongodb://127.0.0.1:27017';
var dbName = 'koa_demo'
MongoClient.connect(dbUrl, (err, client) => {
  if(err) throw Error('connection failed.')
  var db = client.db(dbName)
  var collection1 = db.collection('king');
  var  result = collection1.find({ });
  result.toArray((err, docs)=> {
    console.log(`docs`, docs)
  })
});