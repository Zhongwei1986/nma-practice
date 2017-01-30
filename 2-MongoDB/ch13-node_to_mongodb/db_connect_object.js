var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
var client = new MongoClient(new Server('localhost', 27017, {     //服务器hostname和port
                                socketOptions: { connectTimeoutMS: 500 },   //连接在超时前等待的时间
                                poolSize: 5,      //服务器连接池中连接数量
                                auto_reconnect: true    //自动重连
                              }, {
                                numberOfRetries: 3,  //失败前的重连次数
                                retryMiliSeconds: 500 //指定重连前等待的毫秒数
                              }));
client.open(function(err, client) {
  if(err){
    console.log("Connection Failed Via Client Object.");
  } else {
    var db = client.db("test");     //连接到"test"数据库,创建一个对应的数据库对象
    if (db){   //如果test数据库存在
      console.log("Connected Via Client Object . . .");
      db.authenticate("dbadmin", "test", function(err, results){ //验证身份
        if (err){
          console.log("Authentication failed . . .");
          client.close();     //关闭到MongoDB数据库的连接
          console.log("Connection closed . . .");
        }else {
          console.log("Authenticated Via Client Object . . .");
          db.logout(function(err, result) {   //关闭到test数据库的连接
            if(!err){
              console.log("Logged out Via Client Object . . .");
            }
            client.close();
            console.log("Connection closed . . .");
          });
        }        
      });
    }
  }
});