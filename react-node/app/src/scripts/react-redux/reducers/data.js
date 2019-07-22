import {CHANGEDATANOW,CHANGETEXT,CHANGEEDITID,CHANGEEDITTEXT} from './../actions/index'

//这里是一些页面的数据
const defautState = {
    dateNowObj:"", //用户选中的日期
    dateText:"", //用户即将提交的文本
    dateBeforeUpdateId:'',  //用户点击编辑后 得到该信息对应的id
    dateBeforeUpdateText:'', //用户点击编辑后 得到数据库中该信息的初始text文本
}

const dataReducer = (state=defautState,action)=>{
    console.log(action)
    switch(action.type){
        case CHANGEEDITTEXT:
            return {...state,dateBeforeUpdateText:action.NewText}
        break;
        case CHANGEEDITID:
            return {...state,dateBeforeUpdateId:action.NewId}
        break;
        case CHANGETEXT:
            return {...state,dateText:action.textNew}
        break;
        case CHANGEDATANOW:
            return {...state,dateNowObj:action.dateNew}
        break;
        case "kong":
            return {...state,dateText:'',dateBeforeUpdateId:'',dateBeforeUpdateText:'',dateNowObj:''}
        break;
        default:
            return state
        break;
    }
}

export default dataReducer