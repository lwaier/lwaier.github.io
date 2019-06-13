import{
    HOSTNAME
} from './config.js'
import{
    setCookie,
    getCookie
} from './cookie.js'

function indexHeader (){
        $('.index_header_top').load(HOSTNAME+'page/html/global-html/index_header.html',function(){
        $('#setCurUrl').attr('src',HOSTNAME+'page/images/index/cur.gif')
        //手动给各个a连接添加路径 因为涉及到后期各个网页需要用,我们必须给绝对路径,又因为
        // 上线地址可能会变 所以我们需要用js动态手写路径,

        //该公共html的各个a连接的设置开始
        $('#loginHref').attr('href',HOSTNAME+'page/html/user/login.html')
        $('#registerHref').attr('href',HOSTNAME+'page/html/user/register.html')
        
        //该公共html的各个a连接的设置结束

        if(getCookie('username')){
            $('#gouwuche').attr('href',HOSTNAME+'page/html/goods/gouwuche.html')
            $('#dingdan').attr('href',HOSTNAME+'page/html/goods/jiesuan.html')
        }else{
            $('#gouwuche').click(function(){
                if(window.confirm('您还没有登录,是否立即去登录')){
                    localStorage.setItem('bgUrl',window.location.href)
                    window.location.href=HOSTNAME+"page/html/user/login.html"
                }
            })
            $('#dingdan').click(function(){
                if(window.confirm('您还没有登录,是否立即去登录')){
                    localStorage.setItem('bgUrl',window.location.href)
                    window.location.href=HOSTNAME+"page/html/user/login.html"
                }
            })
        }
        
        if(getCookie('username')){
            $('.logined').show();
            $('.unlogined').hide();

            if(getCookie('usernicheng')){
                $('#usernc').html(getCookie('usernicheng'));
            }else{
                $('#usernc').html(getCookie('username'));
            }
            
            
        }else{
            $('.logined').hide();
            $('.unlogined').show();

        }

        $('#exit').click(function(){
            setCookie('usernicheng','shanchu',-1)
            setCookie('userid','shanchu',-1)
            setCookie('username','shanchu',-1)
            localStorage.setItem('bgUrl',window.location.href)
            window.location.href=HOSTNAME+"page/html/user/login.html"
        })

        
       
    });
}

//此方法封装引入index_header.html 并给其对应的js操作 方便后期引入模块

export{
    indexHeader
}