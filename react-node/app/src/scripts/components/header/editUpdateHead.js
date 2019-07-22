import React, {Component} from 'react';
import { NavBar,Toast } from 'antd-mobile';
import {history} from './../../../ultis/index'
import store from './../../react-redux/store' ;
import axios from 'axios';

function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}

export default class EditUpdateHead extends Component {
    baocun=()=>{
        let dateBeforeUpdateText = store.getState().dataReducer.dateBeforeUpdateText
        let id = store.getState().dataReducer.dateBeforeUpdateId
        let dateText = store.getState().dataReducer.dateText
        console.log(id)
        console.log(dateText)
        if(dateText&&dateText!=dateBeforeUpdateText){
            axios.post("/react/yz/updateriji",{
                id,
                text:dateText
            }).then(res=>{
                if(res.data.type===1){
                    successToast('更新成功')
                    history.push("/index/riji")
                    store.dispatch({type:'kong'})
                }
            })
        }else{
            failToast('请输入新内容')
        }
        
    }
    back=()=>{
        store.dispatch({type:"kong"})
        history.go(-1)
    }
    render(){
        return (
            <div style={{position:'fixed',top:'0',left:'0',width:'100%',zIndex:'100'}}>
                 <NavBar
                mode="light"
                icon={
                <div>
                <i className="iconfont icon-quxiao" 
                onClick={this.back}
                style={{fontSize:'.60rem',color:'white',marginRight:'.5rem'}}></i>
                </div>
                }
                rightContent={[
                    <i key="1" onClick={this.baocun} className="iconfont icon-wancheng" style={{fontSize:'.60rem',color:'white'}}></i>,
                ]}
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}>未分类</i>
                </NavBar>
            </div>
        )
    }
}