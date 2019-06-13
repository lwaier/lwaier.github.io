import{
    userLoginData,
    userNiChengCountData,
    userNiChengXgData
} from './../global-js/userData.js'
import{
    setCookie,
    getCookie
} from './../global-js/cookie.js'

$('.login_header').load('../global-html/login_header.html')
$('.login_footer').load('../global-html/login_footer.html')
if(getCookie('usernicheng')){
    window.location.href="../index.html"
}
$('#userlogin').click(function(){
    let username = $('#isUserName').val();
    let userpwd =$('#isUserPassword').val();
    let userdateFlag = $('#isSavePassword').prop('checked')
    userLoginData(username,userpwd).then(function(data){

        //存储该id
        let idId = data.userid
        let nameN = data.username
        let niChen = data.usernicheng
        if(data.flag==1){

            userNiChengCountData(data.userid).then(function(data){
                if(data.usernicheng){
                    if(userdateFlag){
                        setCookie('usernicheng',data.usernicheng,14)
                        setCookie('username',nameN,14)
                        setCookie('userid',idId,)
                    }else{
                        setCookie('usernicheng',data.usernicheng)
                        setCookie('username',nameN)
                        setCookie('userid',idId)
                    }
                    if(localStorage.getItem('bgUrl')){
                        window.location.href=localStorage.getItem('bgUrl')
                    }else{
                        window.location.href='../../../index.html'
                    }
                }else{
                    if(window.confirm('检测到您还没有昵称,是否设置昵称')){
                        let str = window.prompt('请输入您的昵称')
                        userNiChengXgData(idId,str).then(function(dataThree){
                            if(dataThree.flagnum==1){

                                if(userdateFlag){
                                    setCookie('usernicheng',str,14)
                                    setCookie('username',nameN,14)
                                    setCookie('userid',idId,)
                                }else{
                                    setCookie('usernicheng',str)
                                    setCookie('username',nameN)
                                    setCookie('userid',idId)
                                }

                                if(localStorage.getItem('bgUrl')){
                                    window.location.href=localStorage.getItem('bgUrl')
                                }else{
                                    window.location.href='../../../index.html'
                                } 
                            }else{
                                alert(dataThree.msg)
                                if(userdateFlag){
                                    setCookie('usernicheng',niChen,14)
                                    setCookie('username',nameN,14)
                                    setCookie('userid',idId,)
                                }else{
                                    setCookie('usernicheng',niChen)
                                    setCookie('username',nameN)
                                    setCookie('userid',idId)
                                }

                                if(localStorage.getItem('bgUrl')){
                                    window.location.href=localStorage.getItem('bgUrl')
                                }else{
                                    window.location.href='../../../index.html'
                                } 
                            }
                        })

                    }else{
                        if(userdateFlag){
                            setCookie('usernicheng',niChen,14)
                            setCookie('username',nameN,14)
                            setCookie('userid',idId,)
                        }else{
                            setCookie('usernicheng',niChen)
                            setCookie('username',nameN)
                            setCookie('userid',idId)
                        }
                        if(localStorage.getItem('bgUrl')){
                            window.location.href=localStorage.getItem('bgUrl')
                        }else{
                            window.location.href='../../../index.html'
                        } 
                    }
                }
            })
            
        }else{
            alert(data.msg)
        }
    })
})

