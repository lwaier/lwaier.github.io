var express = require("express");

var app = express();

var hostname = "0.0.0.0";

var port = 4211;

var http = require("http");

var server = http.createServer(app);
var cookieParser = require('cookie-parser'); // 处理项目的cookies  

const TOKEN = require("./utils/token")


app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // 处理 cookies 


app.use(express.static('public'));   // 设置 express 静态文件 目录 

// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});



// router.get()
// app.get()
// app.post()
// app.set()
// app.use() 

//var {setError,aesEncrypt ,keys} = require("./utils");


var session = require("express-session");

// 设置 session 中间件  在路由中间件之前 
app.use(session({
  secret:"keyboard cat",
  name:"appTest",
  cookie:{maxAge:60*60*1000},
  resave:false,
  saveUninitialized:true
}));





var React = require("./react");
var ReactYz = require("./reactYz")

app.use("/react",React);
//这里是token中间件
app.use(TOKEN)
app.use('/react/yz',ReactYz) //这里是需要验证的接口




server.listen(
    port,hostname,()=>{
        console.log(`my server is running at http://${hostname}:${port}`)
    }
)