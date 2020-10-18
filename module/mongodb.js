/**
 * 1、FindDoc(dbName, collectionName, [fliter])
 *    查询文档
 * 2、CreateDoc(dbName, collectionName, obj)
 *    创建文档
 * 3、UpdataDoc(dbName, collectionName, fliter_id, DocObj)
 *    更新文档
 * 4、DelleteDoc(dbName, collectionName, fliter_id)
 *    删除文档
 * 5、GetCount(dbName, collectionName)
 *    获取文档数量
 */

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.102.135:27017';
// 连接数据库

/* 查询文档 */
module.exports.FindDoc = function (dbName, collectionName, fliter) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.error(err);
        return;
      }
      let dbo = db.db(dbName)
      fliter = fliter ? fliter : {}
      //查询数据
      dbo.collection(collectionName).find(fliter).toArray((err, doc) => {
        if (err) {
          console.error(err);
        }
        resolve(doc)
        db.close();
      })
    });
  })
}

/* 创建文档 */
module.exports.CreateDoc = function (dbName, collectionName, obj) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.error(err);
        return;
      }
      let dbo = db.db(dbName)

      //添加数据
      dbo.collection(collectionName).insertOne(obj, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          resolve(result)
        }
      })
    });
  })
}

/* 更新文档 */
module.exports.UpdataDoc = function (dbName, collectionName, fliter_id, DocObj) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.error(err);
        return;
      }
      let dbo = db.db(dbName)

      //更新数据
      dbo.collection(collectionName).updateOne({ id: fliter_id }, { $set: DocObj }, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          resolve(result)
        }
      })
    });
  })
}

/* 删除文档 */
module.exports.DelleteDoc = function (dbName, collectionName, fliter_id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.error(err);
        return;
      }
      let dbo = db.db(dbName)

      //删除数据
      dbo.collection(collectionName).deleteOne({ id: fliter_id }, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          resolve(result)
        }
      })
    });
  })
}

/* 获取文档数量 */
module.exports.GetCount = function (dbName, collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.error(err);
        return;
      }
      let dbo = db.db(dbName)

      //删除数据
      dbo.collection(collectionName).countDocuments({}, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          resolve(result)
        }
      })
    });
  })
}
