import React, {Component} from 'react';
import {InputItem,WhiteSpace,WingBlank,TextareaItem} from 'antd-mobile'
import { createForm } from 'rc-form';
import ZiLiaoHead from '../../components/header/ziLiaoHead';
import ZiLiaoBodyComponent from '../../components/eidtBody/ziLiaoBody';
import store from './../../react-redux/store';
import {changeUserinfo,cunQuNiCheng} from './../../react-redux/actions'

export default class ZiLiao extends Component {
    componentWillMount(){
        store.dispatch(changeUserinfo())
    }
    render(){
        const {
            usernicheng,
        } = store.getState().userReducer.userinfo
        return (
            <div>
                <ZiLiaoHead/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WingBlank><p>昵称</p></WingBlank>
                <WhiteSpace />
                <InputItem clear placeholder={usernicheng} ref="nicheng" onBlur={(data)=>{
                    store.dispatch(cunQuNiCheng(data))
                }}/>
                <WhiteSpace />
                <WingBlank><p>个新签名</p></WingBlank>
                <WhiteSpace />
                <ZiLiaoBodyComponent/>
        </div>
        )
    }
}



