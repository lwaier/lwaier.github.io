let express = require('express')
let app = express()
// app.use(express.static('public'));  
let http  = require('http')

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

//引入https加密
var fs = require('fs');
//var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./public/2_m.lixiaobaicc.cn.key', 'utf8');
var certificate = fs.readFileSync('./public/1_m.lixiaobaicc.cn_bundle.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 5200;
var SSLPORT = 5201;



//let server = http.createServer(app)

let tokenuse = require('./utils/tokenyz') //token验证中间件 保证接口安全


let vuep = require('./vue')  //总路由
let Lr = require('./lr')  //登录注册的路由
let Yz = require('./yz')  //

app.use(express.static('public'));   // 设置 express 静态文件 目录 

app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 
app.use(express.urlencoded({ extended: false }));

//引入express-session模块
var session = require("express-session");

// 设置 session 中间件  在路由中间件之前 
app.use(session({
  secret:"test",
  name:"appTest",
  cookie:{maxAge:20*60*1000},
  resave:false,
  saveUninitialized:true
}));
//token验证中间件


app.use('/vue/lr',Lr) //登录和注册中间件
app.use('/vue',vuep)

app.use(tokenuse) 
app.use('/vue/yz',Yz)





let serverListen = {
    hostname:'0.0.0.0',
    port:5200
}

let {
    hostname,
    port
} = serverListen



// server.listen(port,hostname,()=>{
//     console.log(`my server is runing at http://${hostname}:${port}`)
// })
httpServer.listen(PORT,hostname, function() {
  console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT,hostname, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
