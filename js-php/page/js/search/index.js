import{
    indexHeaderTop
} from './../global-js/index_header_top.js'

import{
    goodsListModule
} from './../global-js/goodsList.js'

import{
    HOSTNAME
} from './../global-js/config.js'

indexHeaderTop();
let strLocationKey = window.location.search.split('=')[1]
if(strLocationKey=='%'){
    strLocationKey='%'
}else{
    strLocationKey = decodeURI(strLocationKey)
    strLocationKey = '%'+strLocationKey+'%'
}

goodsListModule('goodsname',strLocationKey)


    

