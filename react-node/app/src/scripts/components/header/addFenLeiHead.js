import React, {Component} from 'react';
import { NavBar , Modal, WingBlank, WhiteSpace, Toast} from 'antd-mobile';
import {history} from './../../../ultis/index'
import {changeFenLeiArr} from './../../react-redux/actions/index'
import store from './../../react-redux/store'
import axios from 'axios' ;

const prompt = Modal.prompt;

function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}

export default class AddFenLeiHead extends Component {
    componentWillMount(){
        store.dispatch(changeFenLeiArr())
    }
    render(){
        console.log(store.getState())
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
                rightContent={[
                    <i key="1" onClick={

                        () => prompt('添加分类', '请输入您的分类名称',
                            [
                            {
                                text: '关闭',
                                onPress: value => new Promise((resolve) => {
                                    resolve();
                                }),
                            },
                            {
                                text: '确认',
                                onPress: value => new Promise((resolve, reject) => {
                                    if(value.length<=4&&value.length>0){
                                        axios.post("/react/yz/addfenlei",{
                                            text:value
                                        }).then(res=>{
                                            if(res.data.type==1){
                                                successToast('添加成功')
                                                store.dispatch(changeFenLeiArr())
                                                resolve();
                                            }else if(res.data.type==0){
                                                failToast('您已经有此分类了哦')
                                            }else{
                                                failToast('未知错误')
                                            }
                                        })
                                    }else{
                                        failToast('请输入0到4个字符')
                                    }

                                    
                                }),
                            },
                            ], 'default', null, ['您的分类名'])

                    } className="iconfont icon-tianjia" style={{fontSize:'.60rem',color:'white'}}></i>,
                ]}
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}>编辑分类</i>
                </NavBar>
            </div>
        )
    }
}