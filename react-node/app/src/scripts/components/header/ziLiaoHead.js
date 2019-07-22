import React, {Component} from 'react'
import {history} from './../../../ultis/index'
import {NavBar} from 'antd-mobile'
import store from './../../react-redux/store';
import axios from './../../../ultis/axios';

export default class ZiLiaoHead extends Component {
    render(){
        return(
            <div>
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
                rightContent={[
                    <i key="1" style={{fontSize:'.60rem',color:'white',marginRight:'.5rem',fontStyle:'normal',fontSize:'.40rem',textDecoration:'underline'}}
                    onClick={() =>{
                        let {
                            userNiCheng,
                            userQianMing
                        } = store.getState().userReducer
                        axios.post("/react/yz/updateniorming",{
                            usernicheng:userNiCheng,
                            userqianming:userQianMing
                        }).then(res=>{
                            if(res.data.type===1){
                                history.push("/index/mine")
                            }
                        })

                    }}
                    >保存</i>
                ]}
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}>资料编辑</i>
                </NavBar>
            </div>
            </div>
        )
    }
}