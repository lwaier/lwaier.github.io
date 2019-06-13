import{
    indexHeaderTop
} from './../global-js/index_header_top.js'
import{
    goodsListModule
} from './../global-js/goodsList.js'
import{
    brandGoodData
} from './../global-js/brandData.js'

indexHeaderTop();

let strLocationKey = window.location.search.split('=')[1]


brandGoodData(strLocationKey).then(function(data){

   let result = data[0]
    var {
        id,
        brandname,
        brandnowdatebadimg,
        brandnowdatefutureactive,
        brandadname
    }=result

    let imgHtml = `<img src="../../images/goodsbrand/${brandnowdatebadimg}" alt="">`
    $('#brandName').html(brandname)
    $('#brandIcon').html(imgHtml)
    $('#activeName').html(brandadname)

    setInterval(function(){
        updata()
    },1000)

    function updata (){
        //更新时间
        //获取当前时间
        let nowdate = new Date()
        //获取活动截止时间
        let actividate = new Date(brandnowdatefutureactive)
    
        let haomiao = actividate-nowdate;
    
        let miao = parseInt(haomiao/1000);
        let tian = parseInt(miao/86400)
        let shi = parseInt((miao%86400)/3600) 
        let fen = parseInt((miao%3600)/60) 
        let second = parseInt((miao%60)) 

        $('#activeTime').html('本店活动&nbsp;&nbsp;&nbsp;'+'<i class="iconfont icon-daojishi"></i>'+"剩余"+tian+"天"+shi+"小时"+fen+"分"+second+"秒")
    }

    updata()


})

goodsListModule('goodsbrandid',strLocationKey)