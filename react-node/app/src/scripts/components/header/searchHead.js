import React, {Component} from 'react';
import { NavBar } from 'antd-mobile';
import {history} from './../../../ultis/index'


export default class SearchHeader extends Component {
    render(){
        return (
            <div style={{position:'fixed',top:'0',left:'0',width:'100%',zIndex:'100'}}>
                 <NavBar
                mode="light"
                icon={
                <div>
                <i className="iconfont icon-fanhui" style={{fontSize:'.60rem',color:'white',marginRight:'.5rem'}}
                onClick={() =>history.go(-1)}
                ></i>
                </div>
                }
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}>搜索</i>
                </NavBar>
            </div>
        )
    }
}