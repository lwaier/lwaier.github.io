
import {history} from './../../../ultis/index'
// import axios from 'axios'
import axios from './../../../ultis/axios'

//该变当前date的值
export const CHANGEDATANOW = "changeDateNow"
export const changeDateNow = (date)=>{
    return {
        type:CHANGEDATANOW,
        dateNew:date
    }
}

//改变当前text的值
export const CHANGETEXT = "changeText"
export const changeText = (text)=>{
    return {
        type:CHANGETEXT,
        textNew:text
    }
}

//改变当前获取到的商品数组的值
export const CHANGEUSERRIJIS = "changeUserRiJiS"
export const changeUserRiJiS = (arr)=>{
    return {
        type:CHANGEUSERRIJIS,
        NewUserRiJiS:arr
    }
}

//改变点击编辑记事卡片对应卡片的id
export const CHANGEEDITID = "changeEditId"
export const changeEditId = (id)=>{
    return {
        type:CHANGEEDITID,
        NewId:id
    }
}

//改变点击编辑记事卡片对应卡片的文本
export const CHANGEEDITTEXT = "changeEditText"

//警告出现的原因:npm和loder版本不合导致babel无法使用,此处先不使用async await 使用最基本的解决方案先保证项目流程
export const changeEditText = (id)=>{

    return axios.post("/react/yz/getdangqianriji",{
        id
    }).then(res=>{
        history.push('/editupdate')
        return {
            type:CHANGEEDITTEXT,
            NewText:res.data.result.text
        }
    })

}


//改变搜索列表数组
export const CHANGESEARCHARR = "changeSearchArr"
export const changeSearchArr = (data)=>{
    return axios.post("/react/yz/search",{
        valueText:data
    }).then(res=>{
        if(res.data.type===1){
            return {
                type:CHANGESEARCHARR,
                NewArr:res.data.result
            }
        }else{
            return {
                type:CHANGESEARCHARR,
                NewArr:[]
            }
        }
    })
}

//改变当前分类的关键词
export const CHANGEGUANJIANZI = "changeGuanJianZi"
export const changeGuanJianZi = (str)=>{
    return {
        type:CHANGEGUANJIANZI,
        NewStr:str
    }
}

//获取当前的分类集合
export const CHANGEFENLEIARR = "changeFenLeiArr"
export const changeFenLeiArr = ()=>{
    return axios.post("/react/yz/getallfenlei").then(res=>{
        if(res.data.type===1){
            return {
                type:CHANGEFENLEIARR,
                NewArr:res.data.result
            }
        }else if(res.data.type===0){
            return {
                type:CHANGEFENLEIARR,
                NewArr:[]
            }
        }
    })
}


//获取当前的分类的日记的集合 
export const CHANGEUSERRIJISFENLEI = "changeUserRiJiSFenlei"
export const changeUserRiJiSFenlei = (fenleiming)=>{
    console.log(fenleiming)
    return axios.post("/react/yz/getfenleiriji",{
        fenleiming
    }).then(res=>{
        if(res.data.type===1){
            console.log(res.data.result)
            return {
                type:CHANGEUSERRIJISFENLEI,
                NewArr:res.data.result
            }
        }else if(res.data.type===0){
            return {
                type:CHANGEUSERRIJISFENLEI,
                NewArr:[]
            }
        }
    })
}


//获取最新的日记的集合 
export const CHANGEZUIXINORZUIRE = "changeZuiXinOrZuiRe"
export const changeZuiXinOrZuiRe = (ziduan)=>{
    console.log(ziduan)
    return axios.post("/react/getzuixinorzuire",{
        ziduan
    }).then(res=>{
        if(res.data.type===1){
            console.log(res.data.result)
            return {
                type:CHANGEZUIXINORZUIRE,
                NewArr:res.data.result
            }
        }else if(res.data.type===0){
            return {
                type:CHANGEZUIXINORZUIRE,
                NewArr:[]
            }
        }
    })
}

//上传头像 
export const CHANGEUSERAVATAR = "changeUserAvatar"
export const changeUserAvatar = (Data)=>{
    return axios({
        url:'/react/yz/uploadimg',
        method:'POST',
        contentType:false,
        processData:false,
        data:Data
    }).then(res=>{
        if(res.data.type===1){
            let imgSrc = res.data.result
            imgSrc=imgSrc.replace(/public/,'http://m.lixiaobaicc.cn:4211')
            return {
                type:CHANGEUSERAVATAR,
                NewAvatar:imgSrc
            }
        }else if(res.data.type===0){
            return {
                type:CHANGEUSERAVATAR,
                NewAvatar:''
            }
        }
    })
}

//获取头像
export const CHANGEUSERAVATARGET = "changeUserAvatarGet"
export const changeUserAvatarGet = (Data)=>{
    return axios({
        url:'/react/yz/getavatar',
        method:'POST',
    }).then(res=>{
        if(res.data.type===1){
            let imgSrc = res.data.result.avatar
            imgSrc=imgSrc.replace(/public/,'http://m.lixiaobaicc.cn:4211')
            return {
                type:CHANGEUSERAVATARGET,
                NewAvatar:imgSrc
            }
        }else if(res.data.type===0){
            return {
                type:CHANGEUSERAVATARGET,
                NewAvatar:''
            }
        }
    })
}


//获取头像
export const CHANGEUSERINFO = "changeUserinfo"
export const changeUserinfo = ()=>{
    return axios({
        url:'/react/yz/getuserinfo',
        method:'POST',
    }).then(res=>{
        if(res.data.type===1){
            return {
                type:CHANGEUSERINFO,
                newInfo:res.data.result
            }
        }else{
            return {
                type:CHANGEUSERINFO,
                newInfo:''
            }
        }
    })
}



//存储昵称
export const CUNQUNICHENG = "cunQuNiCheng"
export const cunQuNiCheng = (data)=>{
    return {
        type:CUNQUNICHENG,
        newNiCheng:data
    }
}

//存储个性签名
export const CUNQUQIANMING = "cunQuQianMing"
export const cunQuQianMing = (data)=>{
    return {
        type:CUNQUQIANMING,
        newQianming:data
    }
}


