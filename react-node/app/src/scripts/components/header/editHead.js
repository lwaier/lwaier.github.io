import React, {Component} from 'react';
import { NavBar,Toast } from 'antd-mobile';
import {history} from './../../../ultis/index'
import store from './../../react-redux/store' ;
import axios from 'axios';
import FenLei from './../../components/fenlei/index'


function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}

export default class EditHeader extends Component {
    baocun=()=>{
        let str = store.getState().dataReducer.dateText
        if(str){
            let dateObj = store.getState().dataReducer.dateNowObj
            if(dateObj){
                axios.post("/react/yz/sendtext",{
                    timereq:dateObj.getTime(),
                    text:str,
                    fenlei:store.getState().userReducer.fenLeiStr
                }).then(res=>{
                    if(res.data.type===1){
                        successToast('创建成功')
                        setTimeout(() => {
                            history.push("/index/riji")
                            store.dispatch({type:'kong'})
                        }, 2000);
                    }
                })
            }else{
                let nowDate = new Date()
                axios.post("/react/yz/sendtext",{
                    timereq:nowDate.getTime(),
                    text:str,
                    fenlei:store.getState().userReducer.fenLeiStr
                }).then(res=>{
                    if(res.data.type===1){
                        successToast('创建成功')
                        setTimeout(() => {
                            history.push("/index/riji")
                            store.dispatch({type:'kong'})
                        }, 2000);
                    }
                })
            }
        }else{
            failToast("请输入内容")
        }
    }
    back=()=>{
        history.go(-1)
        store.dispatch({type:'kong'})
    }
    render(){
        return (
            <div style={{position:'fixed',top:'0',left:'0',width:'100%',zIndex:'100'}}>
                 <NavBar
                mode="light"
                icon={
                <div>
                <i className="iconfont icon-quxiao" style={{fontSize:'.60rem',color:'white',marginRight:'.5rem'}}></i>
                </div>
                }
                onLeftClick={this.back }
                rightContent={[
                    <i key="1" onClick={this.baocun} className="iconfont icon-wancheng" style={{fontSize:'.60rem',color:'white'}}></i>,
                ]}
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}><FenLei/></i>
                </NavBar>
            </div>
        )
    }
}