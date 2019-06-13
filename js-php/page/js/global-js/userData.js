import{
    HOSTNAME
} from './config.js'

let user = {

    //注:里面的ajax方法是使用的jquer方法 引入此方法的模块js之前需要引入jquery哦
    login:function(username,userpwd){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/user/login.php',
                data:{
                    userName:username,
                    userPwd:userpwd
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p ;
    },

    register1:function(username){
        //此方法是注册的预检测 以期待给用户良好的体验
        let p =new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/user/register1.php',
                data:{
                    userName:username
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    } ,

    register2:function(username,userpwd){
        //此方法紧接着上一方法 用来调用api向数据库中存用户信息的
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/user/register2.php',
                data:{
                    userName:username,
                    userPwd:userpwd
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    userNiChengCount:function(userId){
        //此方法是注册的预检测 以期待给用户良好的体验
        let p =new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/user/loginnicheng.php',
                data:{
                    userId:userId
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    userNiChengXg:function(userId,userNi){
        //此方法是注册的预检测 以期待给用户良好的体验
        let p =new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/user/loginnichengxg.php',
                data:{
                    userId:userId,
                    userNi:userNi
                },
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    }

}


let userLoginData = user.login;
let userRegisterData1=user.register1;
let userRegisterData2=user.register2;
let userNiChengCountData = user.userNiChengCount;
let userNiChengXgData = user.userNiChengXg
export{
    userLoginData,
    userRegisterData1,
    userRegisterData2,
    userNiChengCountData,
    userNiChengXgData
}


