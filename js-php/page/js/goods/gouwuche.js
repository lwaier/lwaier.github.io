import{
    indexHeader
} from './../global-js/index_header.js'

import{
    gouwuChuData,
    gouWuDeleteData,
    gouWuDingDanDoingData,
    numUpData
} from './../global-js/gouwuData.js'

import{
    setCookie,
    getCookie
} from './../global-js/cookie.js'

indexHeader();
$('.login_header').load('../global-html/login_header.html',function(){
    $(this).css({'marginTop':'30px'})
    $('.login_header .server').css('marginRight','0px')
})

    var userid = getCookie('userid');



//购物车功能
var  numall=0
    var  moneyall=0

    gouwuChuData(userid).then(function(data){

        $.each(data,function(i,value){
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
            }=value;

            $("#box_center").append(`
                <ul>
                    <li><input type="checkbox" class="check" data-id="${id}" goods-id="${goodsid}" libie-id="${liebieid}" liebietwo-id="${liebietwoid}"></li>
                    <li>
                        <img src="../../images/goodinfoimg/${goodimg}" class="tiaozhuan" goods-id="${goodsid}">
                        <span class="img_js">${goodname}</span>
                        <span class="selected">${liebie} ${liebietwo}</span>
                    </li>
                    <li><span class="img_danjia">${goodprivce}</span></li>
                    <li>
                        <input type="button" class="left_button" data-id="${id}" value="${goodnum>1?'-':''}" data-prive="${goodprivce}">
                        <input type="text" class="middle_text" value="${goodnum}">
                        <input type="button" class="right_button" data-id="${id}"  value="+" data-prive="${goodprivce}">
                    </li>
                    <li><span class="img_xiaoji">${(goodprivce*goodnum).toFixed(2)}$</span></li>
                    <li><span class="img_shanchu">删除</span></li>
                </ul>`)
        })
    
        
        var maxCount = $('.check').length
        var count=0
    
    
        $(window).on('click',function(e){
            let evt = e||window.event;
            let input = evt.target||evt.srcElement
           if(input.className=='tiaozhuan'){
            let goodsId = $(input).attr('goods-id')
            window.location.href=`good.html?goodsId=${goodsId}`
           }
            if(input.className=="left_button"||input.className=="right_button"){
                changeNum(input.getAttribute('data-prive'),input)
                bottomFn()
            }
            if(input.className=="img_shanchu"){
                let flag =input.parentNode.parentNode
                var ino = flag.getElementsByClassName('check')[0]
                let id = $(ino).attr('data-id')


                if(window.confirm('您确定要删除此商品吗?')){
                    
                 gouWuDeleteData(id).then(function(data){
                    if(data.flagnum==1){
                        alert(data.msg)
                        input.parentNode.parentNode.remove()
                        maxCount=$('.check').length
                        if(ino.checked){
                            count--
                        }
                        if(count==maxCount){
                        $("#checkAll").prop('checked',true)
                        }else{
                        $("#checkAll").prop('checked',false)
                        }
                        bottomFn()
                    }else{
                        alert(data.msg)
                    }
                 })
                }                
            }
        })
    
        function changeNum (prive,anniu) {
            $(anniu).attr('disabled','true')
            if(anniu.className=="left_button"){ 
                let sumInput=anniu.nextElementSibling
                //知道了 不能直接改 用set来该最好
                sumInput.setAttribute('value',--sumInput.value)
                //为什么页面不变
                if(sumInput.value<=1){
                    sumInput.value=1
                    anniu.value=""
                }

                let goodNum = $(sumInput).val()
                let goodId = $(anniu).attr('data-id')
                numUpData(goodId,goodNum).then(function(data){
                    
                    if(data.flagnum==0){
                        alert('数据存入失败,请刷新后重新更改')
                    }else{
                        sumInput.parentNode.nextElementSibling.firstChild.innerHTML=(parseFloat(prive)*sumInput.value).toFixed(2)
                        anniu.removeAttribute('disabled')
                    }
                })

            }else{
                let sumInput=anniu.previousElementSibling
                //知道了 不能直接改 用set来该最好
                sumInput.setAttribute('value',++sumInput.value)
                if(sumInput.value>1){
                    sumInput.previousElementSibling.value="-"
                }
                if(sumInput.value>999){
                    sumInput.value=999
                }
                let goodNum = $(sumInput).val()
                let goodId = $(anniu).attr('data-id')
                numUpData(goodId,goodNum).then(function(data){
                    
                    if(data.flagnum==0){
                        alert('数据存入失败,请刷新后重新更改')
                    }else{
                        sumInput.parentNode.nextElementSibling.firstChild.innerHTML=(parseFloat(prive)*sumInput.value).toFixed(2)
                        anniu.removeAttribute('disabled')
                    }
                })
               
            }
        }
    
    
        //全选反选功能
        
        $("#checkAll").click(function(){
            let flag = $(this).prop('checked')
            $('.check').prop('checked',flag)
            count=flag?maxCount:0
            bottomFn()
        })
    
        $('.check').click(function(){
            if($(this).prop('checked')){
                count++
            }else{
                count--
            }
            if(count==maxCount){
                $("#checkAll").prop('checked',true)
            }else{
                $("#checkAll").prop('checked',false)
            }
            bottomFn()
        })
    
       
        function bottomFn (){
            numall=0
            moneyall=0
            $.each($(".check:checked") ,function(i,value){
            numall+=parseFloat($(value).parent().nextAll().eq(2).children().eq(1).attr("value"))
            moneyall+=parseFloat($(value).parent().nextAll().eq(3).children().html())
            })
            $("#shuliangCountSpan").html(numall)
            $("#moneyCountSpan").html(moneyall.toFixed(2))
        }
    
        //批量删除功能 
        $('#shanchuBottom').click(function(){

            if(window.confirm('您真的要删除这些商品吗?')){
                var idListArr = []
            $.each($('.check:checked'),function(index,value){
                idListArr.push($(value).attr('data-id'))
             })
             var idListKey = idListArr.join(',')
             
             //数据库删除
             gouWuDeleteData(idListKey).then(function(data){
                if(data.flagnum==1){
                    alert(data.msg)
                    $('.check:checked').parent().parent().remove()
                    maxCount=$('.check').length;
                    bottomFn()
                }else{
                    alert(data.msg)
                }
             })
            }
            
             
        })
    
        //结算功能
        $('#jieSuan').click(function(){

            if($('.check:checked').length==0){
                alert('请选中商品')
                return
            }

            var idListArr = []//准备好集合 为接下来要传的参数做准备
            $.each($('.check:checked'),function(index,value){
               idListArr.push($(value).attr('data-id'))
               count--
            })
            var idListKey = idListArr.join(',')//拼接好要传的参数

            //数据库改变
            gouWuDingDanDoingData(idListKey).then(function(data){
                if(data.flagnum==1){
                    $('.check:checked').parent().parent().remove()
                    maxCount=$('.check').length;
                    bottomFn()
                    window.location.href='jiesuan.html'
                }else{
                    alert(data.msg)
                }
             })  
        })



    })


    
