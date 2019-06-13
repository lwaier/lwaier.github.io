
import{
    HOSTNAME
} from './config.js'

function indexTop (index){
    $('.index_top').load(HOSTNAME+'page/html/global-html/index_top.html',function(){
        $('#indexLogo').attr('src',HOSTNAME+'page/images/index/index_logo.png')
        $('.nav a').attr('class','')
        $('.nav a').eq(index).attr('class','selected')

        //该公共html的各个a连接的设置开始
        $('#pageIndex').attr('href',HOSTNAME+'index.html')
        $('#blandIndex').attr('href',HOSTNAME+'page/html/brand/index.html')
        $('#jiujiuIndex').attr('href',HOSTNAME+'page/html/jiujiu/index.html')
        //该公共html的各个a连接的设置结束

        $('#searchto').click(function(){
            let key = $('#keyText').val()
            if(key==""){
                key='%'
            }
            window.location.href=`${HOSTNAME}page/html/search/index.html?key=${key}`
        })
    })
}

//第一个参数是index_top中的哪一个导航显示样式(当前导航提醒)


//此方法封装引入index_header.html 并给其对应的js操作 方便后期引入模块

export{
    indexTop
}
