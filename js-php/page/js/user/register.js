import{
    userRegisterData1,
    userRegisterData2
} from './../global-js/userData.js'

$('.login_header').load('../global-html/login_header.html')
$('.login_footer').load('../global-html/login_footer.html')

let phoneFlag = false;
let pwdFlag = false;
let yzmFlag = false;
let xieyiFlg = false;
//四个标量 分别对应账号密码和验证码以及是否同意协议,初始值都为false;

function jiance (userValue,userReg,tipP,usertip){
    if(userReg.test(userValue)){
        tipP.innerHTML='检测可用'
        tipP.style.color='green'
        return true
    }else{
        tipP.innerHTML=usertip
        tipP.style.color='red'
        return false
    }
}

//检测账号
$('#isUserPhone').on('blur',function(){
    let str = /^1[3-9][0-9]{9}$/g
    if(str.test($(this).val())){
        userRegisterData1($(this).val()).then(function(data){
            if(data.flagnum==1){
                $('#phoneTip').html(data.msg)
                $('#phoneTip').css('color','green');
                phoneFlag=true
            }else{
                $('#phoneTip').html(data.msg)
                $('#phoneTip').css('color','red');
                phoneFlag=false
            }
        })
    }else{
        $('#phoneTip').html('请输入正确的手机号码')
        $('#phoneTip').css('color','red');
        phoneFlag=false
    }
})


//检测密码开始

$('#isUserPwd').on('focus',function(){
    $('#pwdTip1').html('6-16位数字或密码,字母区分大小写')
    $('#pwdTip1').css('color','#666')
})

//生成密码库
        var upperCodeList = [];
        var lowerCodeList = [];
        var numCodeList = [];
        var otherCodeList = ["$", "_"];
        for (var i = 97; i < 97 + 26; i++) { //表示小写的编码 范围
            var code = String.fromCharCode(i); //把编码转成了对应小写字符
            lowerCodeList.push(code);
            var upperCode = String.fromCharCode(i - 32); //97 65
            upperCodeList.push(upperCode);
        }
        for (var i = 0; i < 10; i++) {
            numCodeList.push(String(i));
        }
        var bigList = otherCodeList.concat(upperCodeList, lowerCodeList, numCodeList);
        //产生对应的字符库 用于生成验证码，取值，后期规则验证等

        

        function checkUserpwd(userpwd1, userpwd2) {
            if (userpwd1 == userpwd2) {
                if (userpwd1.length >= 6 && userpwd1.length <= 16) {
                    //是否含有非法字符
                    for (var i = 0; i < userpwd1.length; i++) {
                        var char = userpwd1.charAt(i);
                        if (numCodeList.indexOf(char) == -1 && upperCodeList.indexOf(char) == -1 && lowerCodeList.indexOf(
                                char) == -1) {
                            $('#pwdTip1').html( "密码含有非法字符")
                            $('#pwdTip1').css('color','red')
                            pwdFlag=false;
                            return false;
    
                        }
                    }
    
                    //这里就表示了密码的合法性
                    //组成数字小写大写
                    //弱 只有一类
                    //中 有两类
                    //强 有三类
                    var numCount = 0;
                    var upperCount = 0;
                    var lowerCount = 0;
    
                    for (var i = 0; i < userpwd1.length; i++) {
                        var char = userpwd1.charAt(i);
                        if (numCodeList.indexOf(char) != -1) {
                            numCount = 1;
                        }
                        if (upperCodeList.indexOf(char) != -1) {
                            upperCount = 1;
                        }
                        if (lowerCodeList.indexOf(char) != -1) {
                            lowerCount = 1;
                        }
                    }
                    //统计法
                    switch (numCount + upperCount + lowerCount) {
                        case 1:
                        $('#pwdTip1').html( "<em class='pwdPowruo'></em>"+'<strong>弱</strong>');
                            break;
                        case 2:
                        $('#pwdTip1').html("<em class='pwdPowZhong'></em><em class='pwdPowZhong'></em>"+'<strong>中</strong>')
                            break;
                        case 3:
                        $('#pwdTip1').html("<em class='pwdPowQiang'></em><em class='pwdPowQiang'></em><em class='pwdPowQiang'></em>"+'<strong>强</strong>')
                            break;
                    }
                    pwdFlag=true
                    return true;
    
    
                } else {
                    $('#pwdTip1').html("密码的长度不合法")
                    $('#pwdTip1').css('color','red')
                    pwdFlag=false
                    return false;
                }
            } else {
                $('#pwdTip1').html("两次输入的密码不一致")
                $('#pwdTip1').css('color','red')
                pwdFlag=false
                return false;
            }
    
        }

    $('#isUserPwdQ').on('blur',function(){
        var userPwd1 = $('#isUserPwd').val();
        var userPwd2 = $('#isUserPwdQ').val();
        checkUserpwd(userPwd1,userPwd2)
    })

    //检测密码结束


    //检测验证码开始

    //封装一个函数用来生成密码库中的字符组成的验证码,第一个参数是验证码的长度,第二个参数是密码库(指定元素组成的数组)
    function showRandCode(len, list) {
        var html = "";
        for (var i = 0; i < len; i++) {
            var randIndex = Math.round(Math.random() * (list.length - 1));
            var randCode = list[randIndex];
            //根据随机的下标 找到随机的数
            html += randCode;
        }
        return html;
    }

    $('#showyzm').html(showRandCode(6, bigList)) 
    $('#showyzm').click(function(){
        $('#showyzm').html(showRandCode(6, bigList)) 
    })
        


    function checkUserCode() {
        if ($('#isUserYzm').val().toUpperCase() == $('#showyzm').html().toUpperCase()) {
            $('#yzmTip').html("验证码输入正确") 
            $('#yzmTip').css('color',"green") 
            yzmFlag=true
            return true;
        } else {
            $('#yzmTip').html("输入的验证码不一致") 
            $('#yzmTip').css('color',"red") 
            $('#showyzm').html(showRandCode(6, bigList)) 
            yzmFlag=false;
            return false;
        }
    }

    $('#isUserYzm').on('blur',function(){
        checkUserCode()
    })

    //检测验证码结束

    //注册事件开始
    $('#userRegister').click(function(){
        let username = $('#isUserPhone').val();
        let userpwd = $('#isUserPwd').val();
        let flag = $('#xieyi').prop('checked');
        xieyiFlg=flag;
        if(phoneFlag&&pwdFlag&&yzmFlag&&xieyiFlg){
            userRegisterData2(username,userpwd).then(function(data){
                if(data.flagnum==1){
                    if(confirm('手机用户注册成功,是否立即去登录')){
                        window.location.href='login.html'
                    }else{
                        window.location.assign()
                    }
                }else{
                    alert(data.msg)
                }
            })
        }else{
            if(phoneFlag&&pwdFlag&&yzmFlag&&(!xieyiFlg)){
                alert('请同意用户协议')
            }else{
                alert('输入有错误,请根据页面提示修改')
            }
        }
    })