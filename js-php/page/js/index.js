import{
    indexHeaderTop
} from './global-js/index_header_top.js'

import{
    brandBannerData,
    brandNowData,
    brandBottomData
} from './global-js/brandData.js'

import{
    goodsListModule
} from './global-js/goodsList.js'

indexHeaderTop(0)


//异步加载banner推广位相关品牌信息后,完成DOM(增加DOM,轮播)操作,并加入对应的数据,以便跳转传参

brandBannerData().then(function(data){
    //轮播效果//
    var bannertimer = null;
    var bannerliIndex = 0 ; //默认第一张图片

    var bannerDataHtml =""
    var bannerSpanHtml =""
    data.forEach(function(value){
        bannerDataHtml+=`<li><a href="javaScript:void(0)" brand-id="${value.id}" brand-name="${value.brandname}"><img src="page/images/brandAd/${value.brandadimg}" alt=""></a></li>`
        bannerSpanHtml+=`<span></span>`
    })
    $('#bannerData').html(bannerDataHtml)
    $('.bannerBox p').html(bannerSpanHtml)
    $('.bannerBox li').eq(bannerliIndex).css('zIndex','1')
    $('.bannerBox span').eq(bannerliIndex).attr('class','selected')

    //跳转事件
    $('#bannerData a').click(function(){
        let brandid = $(this).attr('brand-id')
        window.location.href=`page/html/brand/brandgood.html?brandid=${brandid}`
    })

    //移入下面轮播导航轮播
    $('.bannerBox span').on('mouseover',function(){
        clearInterval(bannertimer)
        bannerliIndex=$(this).index()
        bannerShow()
        $(this).on('mouseout',function(){
            bannerTimerShow()
        })
    })

        //定时自动轮播
    function bannerTimerShow () {
        clearInterval(bannertimer);
        bannertimer = setInterval(function(){
            bannerliIndex++
            if(bannerliIndex==$('.bannerBox li').length){
                bannerliIndex=0
            }
            bannerShow()
        },4000)
    }
    bannerTimerShow()


    //出现对应的轮播图
    function bannerShow (){
        $('.bannerBox span').attr('class','')
        $('.bannerBox span').eq(bannerliIndex).attr('class','selected')
        $('.bannerBox li').css('zIndex','0');
        $('.bannerBox li').eq(bannerliIndex).css({'zIndex':'1','opacity':'0.5'})
        $('.bannerBox li').eq(bannerliIndex).stop(true,true).animate({
            opacity:1
        },300)
    }

    //左边事件
    $('.bannerPrev').click(function(){
        bannerLeftRightShow(-1)
    })
    //控制定时器,优化用户体验
    $('.bannerPrev').on('mousedown',function(){
        clearInterval(bannertimer)
    })
    $('.bannerPrev').on('mouseup',function(){
        bannerTimerShow()
    })
    //右边事件
    $('.banenrNext').click(function(){
        bannerLeftRightShow(1)
    })
    //控制定时器,优化用户体验
    $('.banenrNext').on('mousedown',function(){
        clearInterval(bannertimer)
    })
    $('.banenrNext').on('mouseup',function(){
        bannerTimerShow()
    })

    function bannerLeftRightShow(flagNum){
        bannerliIndex=bannerliIndex+flagNum;
        if(bannerliIndex==$('.bannerBox li').length){
            bannerliIndex=0
        }
        if(bannerliIndex<0){
            bannerliIndex=$('.bannerBox li').length-1
        }
        bannerShow()
    }

    
})


//异步加载今日品牌推广位相关品牌信息后,完成DOM(增加DOM)操作,并加入对应的数据,以便跳转传参
brandNowData().then(function(data){
    var nowDataAdHtml = ""
    data.forEach(function(value,index){     
        nowDataAdHtml+=`<a href="javaScript:void(0)" brand-id="${value.id}">
        <div>
            <p>
                <img src="page/images/index/nowDateAd/${value.brandadimg}" alt="">
                <em class=".dotted3"><i class="iconfont icon-daojishi"></i>剩余2天13小时56分1秒</em>
            </p>
            <p>
                <span class=".dotted3">${value.brandadname}</span>
                <span class=".dotted3">进入活动</span>
            </p>
        </div>
    </a>`
    })
    $('.middle_zhong').html(nowDataAdHtml)
    //获取到了这部分数据后 动态生成在前端页面即可,页面加入数据

    //跳转事件
    $('.middle_zhong a').click(function(){
        let brandid = $(this).attr('brand-id')
        window.location.href=`page/html/brand/brandgood.html?brandid=${brandid}`
    })

    //更新活动时间
    data.forEach(function(value,index){
        setInterval(function(){
        //更新时间
        //获取当前时间
        let nowdate = new Date()
        //获取活动截止时间
        let actividate = new Date(value.brandnowdatefutureactive)
    
        let haomiao = actividate-nowdate;
    
        let miao = parseInt(haomiao/1000);
        let tian = parseInt(miao/86400)
        let shi = parseInt((miao%86400)/3600) 
        let fen = parseInt((miao%3600)/60) 
        let second = parseInt((miao%60)) 

        $('.middle_zhong em').eq(index).html('<i class="iconfont icon-daojishi"></i>'+"剩余"+tian+"天"+shi+"小时"+fen+"分"+second+"秒")
    },1000)
   
    })
})

//异步加载今日品牌下方其他品牌推广位相关品牌信息后,完成DOM(增加DOM)操作,并加入对应的数据,以便跳转传参
//使用一波es6箭头函数和解构赋值,应该不会有兼容问题,大部分浏览器已支持es6

brandBottomData().then(function(data){
    var brandBottomHtml = ""
    data.forEach((value,index)=>{
        var {
            id,
            brandname,
            brandnowdatebadimg
        } = value
        brandBottomHtml+=`<li><a href="javascript:void(0)" brand-id="${id}" brand-name="${brandname}"><img src="page/images/index/nowDatebottom/${brandnowdatebadimg}" alt=""></a></li>`
    })
    $("#moreBrand").html(brandBottomHtml)
    $('#moreBrand a').click(function(){
        let brandid = $(this).attr('brand-id')
        window.location.href=`page/html/brand/brandgood.html?brandid=${brandid}`
    })
})


//异步加载所有首页的商品数据
//传入%表示加载所有的数据 因为我后台写的是模糊匹配
goodsListModule('goodsname','%')




