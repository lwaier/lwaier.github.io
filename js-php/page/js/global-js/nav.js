import{
    indexHeaderTop
} from './index_header_top.js'

import{
    indexBottom
} from './index_bottom.js'

import{
    goodsListModule
} from './goodsList.js'


import{
    HOSTNAME
} from './config.js'

function nav (indexone,indextwo,indexthree){
    indexHeaderTop(indexone)
    goodsListModule('goodstype',indextwo)
    indexBottom(indexthree)
}

export{
    nav
}

