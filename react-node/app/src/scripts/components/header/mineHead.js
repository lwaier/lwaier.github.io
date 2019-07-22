import React, {Component} from 'react'
import {changeUserAvatar,changeUserAvatarGet} from './../../react-redux/actions/index'
import store from './../../react-redux/store'
import axios from  'axios';
import "./index.scss"
import imgone from "./../../../assect/avatar.svg"

export default class MineHead extends Component {
    componentWillMount(){
        if(sessionStorage.userinfo){
            store.dispatch(changeUserAvatarGet())
        }
    }
    shanchuan=()=>{
        if(sessionStorage.userinfo){
            this.refs.one.click()
        }
    }
    shanchuanData=()=>{
        let img = this.refs.one.files[0]
        const Data = new FormData()
        Data.append('avatar',img)
        store.dispatch(changeUserAvatar(Data))
    }
    render(){
        const {
            usernicheng,
            userqianming
        } = store.getState().userReducer.userinfo
        return (
            <div className="topdivmine">
                <p className="topimgmine" onClick={this.shanchuan}>
                    <img src={store.getState().userReducer.avatarStr} alt="" style={{display:store.getState().userReducer.avatarStr?'block':'none'}}  />
                    <img src={imgone} alt="" style={{display:store.getState().userReducer.avatarStr?'none':'block'}} />
                </p>
                <input type="file" accept="image/*" style={{display:'none'}} onChange={this.shanchuanData}
                ref="one"
                />
                <p className="pusernamexingxing">
                    {usernicheng?usernicheng:'这里是您的昵称'}
                </p>
                <p className="pusernamexingxing" style={{marginTop:'.3rem'}}>
                    {userqianming?userqianming:'这里是您的个性签名'}
                </p>
            </div>

        )
    }
}