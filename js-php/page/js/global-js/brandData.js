import{
    HOSTNAME
} from './config.js'

let brand = {
    //banner图,品牌推广位处的图片请求
    brandBaner : function(){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/brand/index_brand_banner.php',
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    },

    //banner图下面的今日品牌位信息的请求
    brandNow : function(){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/brand/index_brand_nowdate.php',
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p
    } ,

    //今日品牌中的其他品牌推广位的品牌信息请求
    brandBottom : function(){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/brand/index_brand_nowbottom.php',
                dataType:'json',
                success:function(data){
                    resolve(data)
                }
            })
        })
        return p 
    },

    //获取对应品牌的信息
    brandGoodData : function(Id){
        let p = new Promise(function(resolve,reject){
            $.ajax({
                type:'get',
                url:HOSTNAME+'php/brand/brandgood.php',
                data:{
                    Id:Id
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

let brandBannerData = brand.brandBaner;
let brandNowData = brand.brandNow;
let brandBottomData = brand.brandBottom;
let brandGoodData=brand.brandGoodData

export{
    brandBannerData,
    brandNowData,
    brandBottomData,
    brandGoodData
}