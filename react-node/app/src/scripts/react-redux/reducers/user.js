import {CHANGEUSERRIJIS,CHANGESEARCHARR,CHANGEGUANJIANZI,CHANGEFENLEIARR,CHANGEUSERRIJISFENLEI,
    CHANGEZUIXINORZUIRE,CHANGEUSERAVATAR,CHANGEUSERAVATARGET,CHANGEUSERINFO,CUNQUNICHENG,CUNQUQIANMING} from './../actions/index'

const defautState = {
    username:'',
    userRiJiS:[], //用户日记首页列表数据
    searchArr:[], //用户搜索出来的数据
    fenLeiStr:'', //当前分类的关键字
    fenLeiArr:[], //当前用户的分类集合
    zuiXinOrReArr:[] , //当前最新或者最热的日记集合
    avatarStr:'', //这里是用户的头像
    userinfo:'', //这里是用户的信息
    userNiCheng:'', //这里是用户的昵称
    userQianMing:'', //这里是用户的签名
}

const userReducer = (state=defautState,action)=>{
    switch(action.type){
        case CUNQUQIANMING:
            return {...state,userQianMing:action.newQianming}
        break;
        case CUNQUNICHENG:
            return {...state,userNiCheng:action.newNiCheng}
        break;
        case CHANGEUSERINFO:
            return {...state,userinfo:action.newInfo}
        break;
        case CHANGEUSERAVATARGET:
            return {...state,avatarStr:action.NewAvatar}
        break;
        case CHANGEUSERAVATAR:
            return {...state,avatarStr:action.NewAvatar}
        break;
        case CHANGEZUIXINORZUIRE :
            return {...state,zuiXinOrReArr:action.NewArr}
        break;
        case CHANGEUSERRIJISFENLEI:
            return {...state,userRiJiS:[...action.NewArr]}
        break;
        case CHANGEFENLEIARR: 
            return {...state,fenLeiArr:action.NewArr}
        break;
        case CHANGEGUANJIANZI:
            return {...state,fenLeiStr:action.NewStr}
        break;
        //  清空 searchArr
        case "kongtwo": 
            return  {...state,searchArr:[]}
        break; 
        // 清空 userRiJiS
        case "kongUserRiJiS":
            return  {...state,userRiJiS:[]}
        break;
        // 清空 avatarStr
        case "kongAvatarStr":
            return  {...state,avatarStr:''}
        break;
        case CHANGESEARCHARR:
            return  {...state,searchArr:action.NewArr}
        break;
        case CHANGEUSERRIJIS:
            return {...state,userRiJiS:[...action.NewUserRiJiS]}
        break;
        default:
            return state
        break;
    }
}

export default userReducer