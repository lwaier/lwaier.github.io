let express = require('express')
let app = express()

let http  = require('https')

let server = http.createServer(app)






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



server.listen(port,hostname,()=>{
    console.log(`my server is runing at http://${hostname}:${port}`)
})

