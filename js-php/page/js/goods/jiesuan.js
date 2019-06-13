import{
    jieSuanData,
    dingToGouwu,
    gouWuDeleteData
} from './../global-js/gouwuData.js'

import{
    setCookie,
    getCookie
} from './../global-js/cookie.js'

import{
    indexHeader
} from './../global-js/index_header.js'

//地址信息
import{
    //新增方法
    shouHuoData,
    //输出方法
    shouHuoChuData,
    shouHuoShanChu
} from './../global-js/goodsData.js'

indexHeader();
$('.login_header').load('../global-html/login_header.html',function(){
    $(this).css({'marginTop':'30px'})
    $('.login_header .server').css('display','none')
})

//声明变量初始化地址值
let shouHuoRenZhi = '' //初始化收货人的值
let shouHuoPhoneZhi = ''  //初始化收货手机的值
let shouHuoDiquZhiAll = '' //初始化收货地址区域的值

//如果想做收货信息修改也很简单 得到的收货数据中有个shouhuodiqu，用split将其以‘&nbsp;&nbsp;’
//分开，得到对应的省或市或区  可以获取数组的长度 长度为2就该对应的省和市，长度为3就该
//对应的省市区  其他值也可以直接改 我们可以直接用我们新增的盒子修改
//写个标量，默认为true，当标量为true时，做我们之前新增的事，当标量为false时，做修改的事，
//但是修改完，点击保存或取消就一定要重新将标量改为true 不然新增会出问题 因为我们点击保存的事
//发生了改变，这点可以优化，有时间再弄


var userid = getCookie('userid');


//设置一个数据存储获取该订单中所有商品的id
var idList = []
//封装一个函数 显示订单的商品
function shangPinDingDan (){
    
    
    jieSuanData(userid).then(function(data){
        let moneyCount = 0;
        let html=''
        data.forEach((value)=>{
            var {
                id,
                goodsid,
                liebie,
                liebieid,
                liebietwo,
                liebietwoid,
                goodnum,
                goodname,
                goodprivce,
                goodimg
            }=value
            html+=`<ul data-gouwucheid="${id}" data-goodid="${goodsid}" >
            <li onFnTwo="${id}"  draggable="false">
                <img onFnThree="${goodsid}" src="../../images/goodinfoimg/${goodimg}" alt="">
                ${goodname}
            </li>
            <li onFnTwo="${id}" draggable="false">${liebie} ${liebietwo}</li>
            <li onFnTwo="${id}"  draggable="false">${goodprivce}</li>
            <li onFnTwo="${id}"  draggable="false">${goodnum}</li>
            <li onFnFour="${id}" draggable="false">${(goodnum*goodprivce).toFixed(2)}</li>
            </ul>`
            moneyCount=moneyCount+goodnum*goodprivce

            //存储所有的id
            idList.push(parseInt(id))
        })
    
        $('.dingdanbottom').html(html);
        $('#zongji').html(moneyCount.toFixed(2)+'元')
    
        
    
        //删除该商品
        // $(window).on('on',function(){
        //     let yuanSu = e.target;
        //     if($(yuanSu).attr('onFnTwo')||$(yuanSu).attr('onFnThree')){
        //         alert(3)
        //     }
        // })
    
    })
}
        //做一些小的功能
        //单击空白处返回购物车
        //单击图片处进入商品详情
        //双击删除该商品
        $(window).click(function(e){
            let yuanSu = e.target;
            if($(yuanSu).attr('onFnTwo')){
    
                if(window.confirm('您确定要将该商品返回购物车吗')){
                    let Id = $(yuanSu).attr('onFnTwo')
                    dingToGouwu(Id).then(function(data){
                        if(data.flagnum==1){
                            //返回成功
                            //不要删除，刷新一波即可
                            shangPinDingDan()
                            
                        }else{
                            alert(msg)
                        }
                    })
                }
            }else if($(yuanSu).attr('onFnThree')){
                let goodsid = $(yuanSu).attr('onFnThree')
                window.location.href=`good.html?goodsId=${goodsid}`
            }
        })

        $(window).on('mousedown',function(e){

            let yuanSu = e.target;

            if($(yuanSu).attr('onFnFour')){
                let Id = $(yuanSu).attr('onFnFour');

                let startX = e.pageX

                yuanSu.onmouseup = function(e){
                    let endX = e.pageX
                    if(Math.abs(endX-startX)>=30){
                        if(window.confirm('您确定要删除该商品吗')){
        
                            let Id = $(yuanSu).attr('onFnFour')
                            gouWuDeleteData(Id).then(function(data){
                            if(data.flagnum==1){
                                //返回成功
                                //不要删除，刷新一波即可
                                shangPinDingDan()
                                
                            }else{
                                alert(msg)
                            }
                        })

                        }
                    }
                }

            }
            
        })

shangPinDingDan()


//输出该用户的地址
function shuChiDiZhi (){
    shouHuoChuData(userid).then(function(data){
        if(data[0]){
            let html = ""
            let morenHtml = ""
            data.forEach((value)=>{
                var {
                    id,
                    shouhuoren,
                    shouhuophone,
                    shouhuodiqu,
                    shouhuojiedao,
                    moren
                }=value
                if(moren=='true'){
                    morenHtml = `<li class="selected" onFn="onfn">
                    <p datadi="${shouhuoren}">${shouhuoren}收</p>
                    <p datadi="${shouhuodiqu}  ${shouhuojiedao}">${shouhuodiqu}  ${shouhuojiedao}</p>
                    <p datadi="${shouhuophone}">${shouhuophone} <span class="phonedelete" data-id="${id}">删除</span></p>
                </li>`
                shouHuoRenZhi=shouhuoren
                shouHuoDiquZhiAll=`${shouhuodiqu}  ${shouhuojiedao}`
                shouHuoPhoneZhi=shouhuophone
                }else{
                    html+=`<li onFn="onfn">
                    <p datadi="${shouhuoren}">${shouhuoren}收</p>
                    <p datadi="${shouhuodiqu}  ${shouhuojiedao}">${shouhuodiqu}  ${shouhuojiedao}</p>
                    <p datadi="${shouhuophone}">${shouhuophone} <span class="phonedelete" data-id="${id}">删除</span></p>
                </li>`
                }
                
            })
            let xinzenfHtml = `<li id="addDiZhi">+ 新增地址</li>`
            let htmlAll = morenHtml+html+xinzenfHtml
            $('.dizhisu').html(htmlAll)
        }else{
            let html= `<li id="addDiZhi">+ 新增地址</li>`
            $('.dizhisu').html(html)
        }
        //删除地址
        $('.phonedelete').click(function(){
            let id = $(this).attr('data-id')
            shouHuoShanChu(id).then(function(data){
                if(data.flagnum==1){
                    alert(data.msg)
                    shuChiDiZhi()
                }else{
                    alert(data.msg)
                }
            })
        })

        $('#addDiZhi').click(function(){
            if(userid){
                $('.xinzeng').show()
            }else{
                if(window.confirm('您还没有登录,是否立即登录')){
                    localStorage.setItem('bgUrl',window.location.href)
                    window.location.href="../user/login.html"
                }
            }
        })

        $('[onFn]').click(function(){
            $('.dizhisu li').attr('class','')
            $(this).attr('class','selected')

            //将地址信息中初始化的值赋值给选中的值

            let pList=this.getElementsByTagName('p')
            shouHuoRenZhi=pList[0].getAttribute('datadi')
            shouHuoDiquZhiAll=pList[1].getAttribute('datadi')
            shouHuoPhoneZhi=pList[2].getAttribute('datadi')
            shouHuoXinXi()
        })
        shouHuoXinXi()
    })
}
shuChiDiZhi()



//引入原生写的省市级联动插件
    var selectList = document.querySelectorAll('select')
    var request = new XMLHttpRequest()
    request.open('get','http://api.yytianqi.com/citylist/id/2',true)
    request.send()
    request.onreadystatechange=function(){
        if(request.readyState==4&&request.status==200){
            let result = request.responseText;
            let resultList = JSON.parse(result) //获取在线的JSON地址中的数据
            let previce =resultList.list //获取省份地址
            previce.forEach((value)=>{
                let option = document.createElement('option')
                option.setAttribute('value',value.name)
                option.innerHTML=value.name
                selectList[0].appendChild(option)
            })

            //当省级联动发生改变的时候
            selectList[0].onchange=function(){
                selectList[1].innerHTML=`<option value="">请选择城市</option>`
                selectList[2].innerHTML=`<option value="">请选择区县</option>`
                let previceValue = this.value;
                let previceInfo = previce.filter((value)=>{
                    if(previceValue=="上海"||previceValue=="北京"||previceValue=="天津"||previceValue=="重庆"){
                            selectList[2].style.opacity='0'
                            selectList[1].innerHTML=`<option value="">请选择区县</option>`
                        }else{
                            selectList[2].style.opacity='1'
                        }
                    return previceValue==value.name;
                })[0]
                let cityList = previceInfo.list
                cityList.forEach((value)=>{
                    let option=document.createElement('option')
                    option.setAttribute('value',value.name)
                    option.innerHTML=value.name
                    selectList[1].appendChild(option)
                })

                //当市级联动发生改变的时候
                selectList[1].onchange=function(){
                    selectList[2].innerHTML=`<option value="">请选择区县</option>`
                    let cityValue = this.value;
                    let cityInfo = cityList.filter((value)=>{
                        if(previceValue=="上海"||previceValue=="北京"||previceValue=="天津"||previceValue=="重庆"){
                            selectList[2].style.opacity='0'
                        }else{
                            selectList[2].style.opacity='1'
                        }
                        return cityValue==value.name                       
                    })[0]
                    let auupList = cityInfo.list
                    auupList.forEach((value)=>{
                        let option = document.createElement('option')
                        option.setAttribute('value',value.name)
                        option.innerHTML=value.name
                        selectList[2].appendChild(option)
                    })
                }
            }


        }
    }

//结算页的业务逻辑;


//地址的表单验证
var shouhuoRFlag = false; //初始化收货人姓名 标量
var shouhuoPFlag = false; //初始化收货人电话 标量
var shouhuoDflag = 0 ; //初始化收货人地址计量标量
var shouhuoDendFlag = false //收货人地址最终标量 通过计量控制
var shouhuoJieDaoFlag = false //初始化街道标量
var morenDizhiFlag = '' //初始化默认标量

$('#shouHuoR').on('blur',function(){
    var userNameReg = /[0-9a-zA-Z\u4e00-\u9fa5]{1,}/gi
    let userName = $(this).val();
    if(userNameReg.test(userName)){
        $('#shouHuoRT').html('输入正确')
        shouhuoRFlag=true
    }else{
        $('#shouHuoRT').html('您的收货人信息不合法哦!!!')
    }
})
$('#shouHuoPhone').on('blur',function(){
    var userPhoneReg = /^1[3-9][0-9]{9}$/g
    let userPhone = $(this).val();
    if(userPhoneReg.test(userPhone)){
        shouhuoPFlag=true;
        $('#shouHuoPhoneT').html('输入正确')
    }else{
        $('#shouHuoPhoneT').html('您的收货人手机号不合法哦!!!')
    }
})
$('#shouHuoJieDao').on('blur',function(){
    let shouHuoJieDao = $(this).val();
    if(shouHuoJieDao){
        shouhuoJieDaoFlag=true
        $('#shouHuoJieDaoT').html('')
    }else{
        shouhuoJieDaoFlag=false
        $('#shouHuoJieDaoT').html('请输入街道地址')
    }
})




$('#baoCun').click(function(){
    shouhuoDflag=0
    if($('#shen').val()){
        shouhuoDflag++
    }
    if($('#shi').val()){
        shouhuoDflag++
    }
    if($('#qu').val()){
        shouhuoDflag++
    }
    if($('#shen').val()=='上海'||$('#shen').val()=='北京'||$('#shen').val()=='天津'||$('#shen').val()=='重庆'){
        if(shouhuoDflag==2){
            shouhuoDendFlag=true
        }else{
            shouhuoDendFlag=false
        }
    }else{
        if(shouhuoDflag==3){
            shouhuoDendFlag=true
        }else{
            shouhuoDendFlag=false
        }
    }

    if($('#moren').prop('checked')){
        morenDizhiFlag='true'
    }else{
        morenDizhiFlag=''
    }

    //判断所有标量是否为true

    if(shouhuoRFlag&&shouhuoPFlag&&shouhuoDendFlag&&shouhuoJieDaoFlag){

        //此处继续操作 可以用下面的变量
        let userId = userid;
        let shouHuoRen = $('#shouHuoR').val();
        let shouHuoPhone = $('#shouHuoPhone').val();
        let shouHuoDiQu = $('#shen').val()+'&nbsp;&nbsp;'+ $('#shi').val()+'&nbsp;&nbsp;'+$('#qu').val();
        let shouHuoJieDao = $('#shouHuoJieDao').val();
        shouHuoData(userId,shouHuoRen,shouHuoPhone,shouHuoDiQu,shouHuoJieDao,morenDizhiFlag).then(function(data){
            if(data.flagnum==1){
                alert(data.msg)
            }else{
                alert(data.msg)
            }
            $('.xinzeng').hide()
            //初始化所有信息

            shouhuoRFlag = false; //初始化收货人姓名 标量
            shouhuoPFlag = false; //初始化收货人电话 标量
            shouhuoDflag = 0 ; //初始化收货人地址计量标量
            shouhuoDendFlag = false //收货人地址最终标量 通过计量控制
            shouhuoJieDaoFlag = false //初始化街道标量
            $('.xinzeng').hide()
            $('.xinzeng input').val('')
            $('#shouHuoJieDaoT').html('')
            $('#shouHuoPhoneT').html('')
            $('#shouHuoRT').html('')
            $('#diqu select').val('')

        shuChiDiZhi() //更新地址数据
    })
        
    }else{
        alert('您有未完成的信息没填写,请检查页面继续填写')
    }
})


$('#quXiao').click(function(){
    
    //初始化所有信息

    shouhuoRFlag = false; //初始化收货人姓名 标量
    shouhuoPFlag = false; //初始化收货人电话 标量
    shouhuoDflag = 0 ; //初始化收货人地址计量标量
    shouhuoDendFlag = false //收货人地址最终标量 通过计量控制
    shouhuoJieDaoFlag = false //初始化街道标量
    $('.xinzeng').hide()
    $('.xinzeng input').val('')
    $('#shouHuoJieDaoT').html('')
    $('#shouHuoPhoneT').html('')
    $('#shouHuoRT').html('')
    $('#diqu select').val('')

})

//更新收货信息
function shouHuoXinXi (){
    let html = `<span>收货信息：</span>
    <span>${shouHuoRenZhi}</span>
    <span>${shouHuoPhoneZhi}</span>
    <span>${shouHuoDiquZhiAll}</span>`
    $('.dizhiP').html(html)
}

//全返购物车事件
$('#fanhui').click(function(){
    let idListStr =  idList.join(',')
    if(window.confirm('您确定要返回所有商品至购物车吗')){
        dingToGouwu(idListStr).then(function(data){
            if(data.flagnum==1){
                shangPinDingDan()
                setTimeout(function(){
                    window.location.href='gouwuche.html'
                },2000)
               
            }else{
                alert(msg)
            }
        })
    }
})

//取消订单事件
$('#quxiao').click(function(){
    let idListStr =  idList.join(',')
    if(window.confirm('该操作会删除所有数据哦,如果您想保留数据,可选择上方的返回至购物车,确定要取消吗?')){
        gouWuDeleteData(idListStr).then(function(data){
            if(data.flagnum==1){
                shangPinDingDan()
            }else{
                alert(msg)
            }
        })
    }
})
//结算事件
$('#queren').click(function(){
    alert('结算失败')
    //此处应该写个php将所有付钱结算的商品标量改变 以后有时间再做
})


