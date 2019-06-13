

const mongoose = require("mongoose");

const CONN_DB_STR = "mongodb://localhost/wh1901";



exports.getConn = function(callback){
    mongoose.connect(CONN_DB_STR,(err)=>{
        if(err){
            console.log("数据库链接失败")
            callback(err,null)
        }else{
            console.log("数据库链接- 成功")
            callback(null,mongoose)
        }
    });
}




