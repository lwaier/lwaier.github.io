import{
    indexHeaderTop
} from './../global-js/index_header_top.js'

import{
    goodImg,
    goodLeiBieTwo,
    goodInfo
} from './../global-js/goodsData.js'

import{
    setCookie,
    getCookie
} from './../global-js/cookie.js'

import{
    gouWuData
} from './../global-js/gouwuData.js'

indexHeaderTop();

var userid = getCookie('userid') //用户id
var leiBieZhi = null ; //初始化第一个类别的值
var leiBieIdzhi = null //初始化第一个类别的id值
var leiBieTwoZhi = null; //初始化第二个类别的值
var leiBieTwoIdZhi = null //初始化第二个类别的id值
var numCountZhi = 1 //初始化商品数量
var goodname = null //初始化商品名称
var goodprivce = null //初始化商品价格
var goodImgGou = null //初始化商品图片


let goodsId = window.location.search.split('=')[1]
//得到商品id

goodImg(goodsId).then(function(data){
    let html = ""
    data.forEach((value,index)=>{
        var {
            imgid,
            imgsrc
        }=value
        html+=`<p><img zifn="imgclick" imgdata-src="${imgsrc}" src="../../images/goodinfoimg/${imgsrc}" alt=""></p>`

        if(index==0){
            let imgHtml=`<img src="../../images/goodinfoimg/${imgsrc}" draggable="false">`
            $('#img').html(imgHtml)
            let src = `url(../../images/goodinfoimg/${imgsrc}) center center no-repeat`
            $('.shandowshi').css({'background':src,'backgroundSize':'800px 800px'})
            goodImgGou=imgsrc
        }
    })
    $('.imgList').html(html)
    //初始化选中的图片
    $('.imgList img').eq(0).attr('class','selected')
    $('.imgList img').attr('draggable','false')

    function fangDaFn () {
        let boxLeftl = parseInt($('.fangda').offset().left)
        let boxTopt = parseInt($('.fangda').offset().top)
        let fangDawidth=parseInt($('.shandow').css('width'))
        let fangDaHeight=parseInt($('.shandow').css('height'))
        let boxTopWidth=parseInt($('.fangda').css('width'))
        let boxTopHeight=parseInt($('.fangda').css('height'))
        $('.fangda').on('mousemove',function(e){
            let evt = window.event||e
            $('.shandow').css('display','block')
            $('.shandowshi').css('display','block')
            let fangDaLeft = evt.pageX-boxLeftl-fangDawidth/2
            if(fangDaLeft>=boxTopWidth-fangDawidth){
                fangDaLeft=boxTopWidth-fangDawidth
            }else if(fangDaLeft<=0){
                fangDaLeft=0
            }
            let fangDaTop  = evt.pageY-boxTopt-fangDaHeight/2
            if(fangDaTop>boxTopHeight-fangDaHeight){
                fangDaTop=boxTopHeight-fangDaHeight
            }else if(fangDaTop<=0){
                fangDaTop=0
            }
            $('.shandow').css({'left':fangDaLeft+'px','top':fangDaTop+'px'})
            

            $('.shandowshi').css({'backgroundPositionX':-2*fangDaLeft+'px','backgroundPositionY':-2*fangDaTop+'px'})

        })  


        $('.fangda').on('mouseout',function(){
            $('.shandow').css('display','none')
            $('.shandowshi').css('display','none')
        })
    }
    fangDaFn();
    
})


goodLeiBieTwo(goodsId).then(function(data){
    if(data[0]){
        $('.leibietwo').show()
    }
    let html = ""
    data.forEach((value,index)=>{
        var {
            id,
            liebietwo
        }=value
        html+=`<span zifn="leibietwoclick" liebietwo-name="${liebietwo}" liebietwo-id="${id}">${liebietwo}</span>`
        if(index==0){
            leiBieTwoZhi=liebietwo
            leiBieTwoIdZhi = id
        }//初始化第一个数据的值
    })
    $('#leiBieTwo').html(html)
    //初始化选中的类别
    $('#leiBieTwo span').eq(0).attr('class','selected')
    $('#leiBieTwo span').attr('draggable','false')
})
goodInfo(goodsId).then(function(data){

    //品牌加载
    let brandInfo = data.brandinfo;
    var  {
        brandname,
        brandid,
        brandicon,
        brandadname,
        acitivetime
    } = brandInfo
    $('.tobrand').click(function(){
        window.location.href=`../brand/brandgood.html?brandid=${brandid}`
        //跳转到对应品牌
    })
    let brandImgHtml = `<img src="../../images/goodsbrand/${brandicon}" alt=""></img>`
    $('.brandimg').html(brandImgHtml)

    $('.tobrand h3').html(brandname)

    $('#brandAdName').html(brandadname);

    if(brandInfo.acitivetime){
    showActiveTime()
    //活动时间更新
    setInterval(function(){
        showActiveTime()
    },1000)
    }



    //类别加载
    let leiBie = data.leibie;

    //当有数据时才显示,否则不显示
    if(leiBie[0]){
        $('.leibie').show()
    }
    let leiBieHtml=""
    leiBie.forEach((value,index)=>{
        leiBieHtml+=`<span zifn="leibieoneclick" liebieone-name="${value.leibie}" liebieone-id="${value.leibieid}">${value.leibie}</span>`
        if(index==0){
            leiBieZhi=value.leibie
            leiBieIdzhi=value.leibieid
        } //初始化第一个数据的值
    })
    $('#lieBieOne').html(leiBieHtml)
    $('#lieBieOne span').eq(0).attr('class','selected')
    $('#lieBieOne span').attr('draggable','false')

    //商品价格和名称加载
    let good = data.goodjiage;
    var {
        goodsprivce,
        goodsyuanjia,
        goodsjieshao,
        goodsname
    }=good

    $('#xianJia').html(goodsprivce)
    $('#canKaoJia').html('参考价:¥'+goodsyuanjia)
    $('#goodName').html(goodsjieshao)

    //初始化商品价格
    goodprivce=goodsprivce
    //初始化商品名称
    goodname=goodsname

    //显示倒计时的方法封装
    function showActiveTime (){
        //更新时间
           //获取当前时间
           let nowdate = new Date()
    
           //获取活动截止时间
           let actividate = new Date(acitivetime)
       
           let haomiao = actividate-nowdate;
       
           let miao = parseInt(haomiao/1000);
           let tian = parseInt(miao/86400)
           let shi = parseInt((miao%86400)/3600) 
           let fen = parseInt((miao%3600)/60) 
           let second = parseInt((miao%60)) 
   
           let html=`剩余：${tian}天${shi}时${fen}分${second}秒` 
           $('#active').html(html)
   }
   

})


$(window).click(function(e){
    let evt = e.target
    if(evt.getAttribute('zifn')=="imgclick"){
        let imgsrc = evt.getAttribute('imgdata-src')
        let imgHtml=`<img src="../../images/goodinfoimg/${imgsrc}" alt="">`
        $('#img').html(imgHtml)
        $('.imgList img').attr('class','')
        $(evt).attr('class','selected')
        let src = `url(../../images/goodinfoimg/${imgsrc}) center center no-repeat`
        $('.shandowshi').css('background',src)
        $('.shandowshi').css('backgroundSize','800px 800px')
    }
    if(evt.getAttribute('zifn')=="leibieoneclick"){
        let liebieoneName = evt.getAttribute('liebieone-name')
        let liebieoneId = evt.getAttribute('liebieone-id')
        leiBieZhi=liebieoneName
        leiBieIdzhi=liebieoneId
        $('#lieBieOne span').attr('class','')
        $(evt).attr('class','selected')
       
    }
    if(evt.getAttribute('zifn')=="leibietwoclick"){
        let liebietwoName = evt.getAttribute('liebietwo-name')
        let liebietwoId = evt.getAttribute('liebietwo-id')
        leiBieTwoZhi=liebietwoName
        leiBieTwoIdZhi=liebietwoId
        $('#leiBieTwo span').attr('class','')
        $(evt).attr('class','selected')
    
    }
})


//商品数量控制
$('.numcount').click(function(e){
    var evt = e.target;
    let start = $('#jishu').val()
    if($(evt).attr('id')=='lod'){
        if(start==1){
            return;
        }
        start--
        $('#jishu').attr('value',start)
    }else if($(evt).attr('id')=='add'){
        if(start==999){
            return;
        }
        start++
        $('#jishu').attr('value',start)
    }
})


//点击加入购物车

//做一个事件的防抖(防止用户一瞬间多次请求),将jq对象转换为js对象,方便防抖

$('#jiagou')[0].onclick=jiaGouFn;

function jiaGouFn (){
    
    //移出事件 防抖
    if(userid){
        $('#jiagou')[0].onclick=null;
        numCountZhi=$('#jishu').val() //获得数量

        gouWuData(userid,goodsId,leiBieZhi,leiBieIdzhi,leiBieTwoZhi,leiBieTwoIdZhi,numCountZhi,goodname,goodprivce,goodImgGou).then(function(data){

            if(data.flagnum==1||data.flagnum==2){
                
                //重新添加上事件
                $('#jiagou')[0].onclick=function(){
                    jiaGouFn()
                }
                
                    $('#shangpinming').html(data.goodname)
                    if(data.lieBie||data.lieBieTwo){
                        var strA = data.lieBie+'&nbsp;&nbsp;&nbsp;'+data.lieBieTwo
                    }else{
                        var strA = '默认商品'
                    }
                    $('#leixinming').html(strA)

                    if(data.flagnum==2){
                        $('.xiaoshi').show()
                        $('#shangpinnum').html(data.startnum)
                        $('#shangpinnumtwo').html(data.addnum)
                        $('#shangpinnumthree').html(data.xinnum)
                    }else{
                        $('.xiaoshi').hide()
                    }
                    $('.tipBoxGA').show();
                    $('#jixu').click(function(){
                        $('.tipBoxGA').hide();
                    })
                
                
            }else{
                alert(data.msg)
            }
        })

    }else{
        if(window.confirm('您还没有登录,是否立即登录')){
            localStorage.setItem('bgUrl',window.location.href)
            window.location.href='../user/login.html'
        }
    }
}

//点击购买事件

$('#goumai')[0].onclick=gouMaiFn;

function gouMaiFn (){

    //移出事件 防抖
    if(userid){
        $('#goumai')[0].onclick=null;
        numCountZhi=$('#jishu').val() //获得数量

        gouWuData(userid,goodsId,leiBieZhi,leiBieIdzhi,leiBieTwoZhi,leiBieTwoIdZhi,numCountZhi,goodname,goodprivce,goodImgGou).then(function(data){

            if(data.flagnum==1||data.flagnum==2){
                $('#goumai')[0].onclick=function(){
                    gouMaiFn()
                }
                window.location.href='../../html/goods/gouwuche.html'
            }else{
                alert(data.msg)
            }
        })

    }else{
        if(window.confirm('您还没有登录,是否立即登录')){
            localStorage.setItem('bgUrl',window.location.href)
            window.location.href='../user/login.html'
        }
    }


}
    





