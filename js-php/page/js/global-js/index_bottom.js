import{
    HOSTNAME
} from './config.js'

function indexBottom (index){
    $('.index_bottom').load(HOSTNAME+'page/html/global-html/index_bottom.html',function(){
        $('.index_bottom a').eq(index).css('color','#ff464e');
        $('#home').attr('href',HOSTNAME+'index.html')
        $('#nvzhuang').attr('href',HOSTNAME+'page/html/index/nvzhuang.html')
        $('#nanzhuang').attr('href',HOSTNAME+'page/html/index/nanzhuang.html')
        $('#xiezi').attr('href',HOSTNAME+'page/html/index/xiezi.html')
        $('#xiangbao').attr('href',HOSTNAME+'page/html/index/xiangbao.html')
        $('#muyin').attr('href',HOSTNAME+'page/html/index/muyin.html')
        $('#meizhuang').attr('href',HOSTNAME+'page/html/index/meizhuang.html')
        $('#jujia').attr('href',HOSTNAME+'page/html/index/jujia.html')
        $('#jiafang').attr('href',HOSTNAME+'page/html/index/jiafang.html')
        $('#wenti').attr('href',HOSTNAME+'page/html/index/wenti.html')
        $('#meishi').attr('href',HOSTNAME+'page/html/index/meishi.html')
        $('#shuma').attr('href',HOSTNAME+'page/html/index/shuma.html')
        $('#dianqi').attr('href',HOSTNAME+'page/html/index/dianqi.html')
        $('#neiyi').attr('href',HOSTNAME+'page/html/index/neiyi.html')
        $('#peishi').attr('href',HOSTNAME+'page/html/index/peishi.html')
        $('#jijiangshangxian').attr('href',HOSTNAME+'page/html/index/jijiangshangxian.html')
    })
}

export{
    indexBottom
}

