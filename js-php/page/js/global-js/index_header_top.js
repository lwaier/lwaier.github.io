
import{
    indexHeader
} from './index_header.js'

import{
    indexTop
} from './index_top.js'

function indexHeaderTop (index){
    indexHeader()
    indexTop(index)
}

export{
    indexHeaderTop
}

//此方法是为了方便一起调用两个模板,避免每次都需要写,哪个页面需要这两个模块,直接引入这个方法,并执行即可