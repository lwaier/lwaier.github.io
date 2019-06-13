import{
    HOSTNAME
} from './config.js'

import{
    pageChajian
} from './goodspage.js'

import{
    goodsCount
} from './goodsData.js'

//封装一个加载商品列表模块的方法,此方法接受两个参数
//goodsYiju 该方法加载依据 是依据商品的名称还是商品的id还是商品的价格和类型查找
//goodsKey 依据的具体值 如我依据id查找 但是我要查id为6的记录 就可以将goodsKey设置为6 

    function goodsListModule (goodsYiju,goodsKey){

        $('.goodsList').load(HOSTNAME+'page/html/global-html/goodsList.html',function(){
    var ziDuan = 'id'
    var paXuFangShi = 'asc'
    

    $('.paxu .ziduan').eq(0).prop('checked','checked')
    $('.paxu .sj').eq(0).prop('checked','checked')

    $('.paxu .ziduan').click(function(){
        ziDuan=$(this).val()
        showGoods(ziDuan,paXuFangShi)
    })
    $('.paxu .sj').click(function(){
        paXuFangShi=$(this).val()
        showGoods(ziDuan,paXuFangShi)
    })

    showGoods(ziDuan,paXuFangShi)

    function showGoods (ziDuan,paXuFangShi){

goodsCount(goodsYiju,goodsKey).then((data)=>{
    let count = data.count
    if(count>0){

    }else{
        alert('没有找到对应的商品哦')
    }
    new pageChajian ('fenye',{
        dataAll:count,    //一共的数据
        dataEveryPage:10,  //每一页显示多少数据
        showPage:3 ,  //显示的页码长度
        callback:function(pageIndex){
                    $.ajax({
                        type:'get',
                        url:HOSTNAME+'php/goods/goodsList.php',
                        jparse:'json',
                        data:{
                            ziDuan:ziDuan,
                            paXuFangShi:paXuFangShi,
                            pageIndexNum:pageIndex,
                            dataEveryPage:10,
                            goodsKey:goodsKey,
                            goodsYiju:goodsYiju
                        },
                        dataType:'json',
                        success:function(data){
                            let goodsList=data;
                            let html = ''
                        goodsList.forEach((value)=>{
                            var {
                                id,
                                goodsname,
                                goodsprivce,
                                goodstype,
                                goodsjieshao,
                                goodstese,
                                goodsbrand,
                                goodsjifen,
                                goodsimg,
                                goodsyuanjia
                            }=value
                        
                            html+=`<li>
                            <a>
                                <p><img src="${HOSTNAME}page/images/goosList/${goodsimg}" alt=""  good-id="${id}"  toxiangqifn="fnforclick"></p>
                                <p><span class="dotted3">￥${goodsprivce}</span><span class="dotted3"  good-id="${id}"  toxiangqifn="fnforclick">￥${goodsyuanjia}</span></p>
                                <p><span class="dotted3">${goodsname}</span><span class="dotted3"  good-id="${id}"  toxiangqifn="fnforclick">${goodstese}</span></p>
                            </a>
                        </li>`
                        })
                        $('#ulList').html(html);

                        //给每个商品跳转事件
                        $(window).click(function(e){
                            let evt = e.target
                            if(evt.getAttribute('toxiangqifn')=='fnforclick'){
                                window.location.href=`${HOSTNAME}page/html/goods/good.html?goodsId=${evt.getAttribute('good-id')}`
                            }
                        })

                        }
                    })

                    //给每个li添加跳转事件
                    


                    //动态设置page的宽度 方便其css让他居中;
                    let prevPageW = parseInt($('#prevPage').css('width'))
                    let contentPageW =parseInt($('#contentPage').css('width'))
                    let nextPagew =parseInt($('#nextPage').css('width'))
                    var pageKuan =prevPageW+contentPageW+nextPagew+10+'px'
                    $('#fenye').css('width',pageKuan)
                    //优化结束
        }
    })
})

    }

    

    })//这里是加载完html执行的时

    

}

export{
    goodsListModule
}
