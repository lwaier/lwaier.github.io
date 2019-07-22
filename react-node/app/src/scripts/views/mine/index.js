import React, {Component} from 'react'
import MineHead from '../../components/header/mineHead';
import MineList from '../../components/list/mineList';
import {Button,WhiteSpace,WingBlank} from 'antd-mobile';
import store from "./../../react-redux/store";
import {history} from './../../../ultis/index'
import {changeUserinfo} from './../../react-redux/actions'


export default class Mine extends Component {
    componentWillMount(){
        if(sessionStorage.userinfo){
            store.dispatch(changeUserinfo())
        }
    }
    tuichu=()=>{
        sessionStorage.clear('userinfo')
        store.dispatch({type:'kongAvatarStr'})
    }
    denglu=()=>{
        history.push("/login")
    }
    render(){
        return (
            <div>   
                <MineHead/>
                <MineList/>
                <WhiteSpace size="lg" />
                <Button type="warning" inline style={{width:'90%',marginLeft:'5%'}} size="small"
                onClick={this.tuichu} style={{display:store.getState().userReducer.avatarStr?'block':'none'}}>
                    退出登录
                </Button>
                <Button type="primary" inline style={{width:'90%',marginLeft:'5%'}} size="small"
                style={{display:store.getState().userReducer.avatarStr?'none':'block'}}
                onClick={this.denglu}>
                    登录
                </Button>
                
            </div>

        )
    }
}