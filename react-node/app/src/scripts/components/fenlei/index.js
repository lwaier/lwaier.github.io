//这是首页上方的分类按钮

import React, {Component} from 'react';
import store from "./../../react-redux/store"
import {changeGuanJianZi,changeFenLeiArr,changeUserRiJiSFenlei,changeUserRiJiS} from './../../react-redux/actions'
import {history} from './../../../ultis/index'
import axios from 'axios'
import "./index.scss"

export default class Fenlei extends Component {
    componentWillMount(){
        store.dispatch(changeGuanJianZi(''))
        store.dispatch(changeFenLeiArr())
    }
    state={
        show:false
    }
    showChildren=()=>{
        this.setState({
            show:!this.state.show
        })
    }
    changeGuanJianZi=(data)=>{
        //如果数据是全部 一定要将其换成空字符串来查询

        this.setState({
            show:!this.state.show
        })
        store.dispatch(changeGuanJianZi(data))
        if(data){
            store.dispatch(changeUserRiJiSFenlei(data))
        }else{
            
            axios.post("/react/yz/getallriji").then(res=>{
            
                if(res.data.type===1){
                    store.dispatch(changeUserRiJiS(res.data.result))
                }
               
            })

        }
        
    }
    render(){
        return (
            <div>
                <div className="topdiv">
                    <p className="topp" onClick={this.showChildren} >
                        <span>
                        {store.getState().userReducer.fenLeiStr?store.getState().userReducer.fenLeiStr:'全部'}
                        <i className="iconfont icon-xiajiantou" 
                        style={{fontSize:'.5rem',marginRight:'10px',float:'right'}}
                        >
                        </i></span>
                    </p>
                    <div className="childrendiv" style={{display:this.state.show?'block':'none'}}>
                        {/* 此处需要循环输出所有的分类 第一个分类是全部按钮 第二个分类是添加分类按钮 */}
                        
                        
                        <p className="childrenp" onClick={()=>{this.changeGuanJianZi("")}}
                        style={{borderRadius:'5px 5px 0 0',background:'rgba(0,0,0)'}}
                        >
                        <i className="iconfont icon-yuanquan" 
                        style={{fontSize:'.5rem',marginLeft:'.1rem',float:'left'}}
                        ></i>
                            <span>全部</span>
                        </p>
                        {
                            store.getState().userReducer.fenLeiArr.map((item,index)=>{
                                return (
                                    <p className="childrenp" key={index} onClick={()=>{this.changeGuanJianZi(item.fenleiming)}}>
                                    <i className="iconfont icon-yuanquan" 
                                    style={{fontSize:'.5rem',marginLeft:'10px',float:'left'}}
                                    ></i>
                                        <span>{item.fenleiming}</span>
                                    </p>
                                )
                            })
                        }
                        <p className="childrenp" onClick={()=>{history.push('/addfenlei')}}
                        style={{borderRadius:' 0 0 5px 5px ',background:'rgba(0,0,0)'}}
                        >
                        <i className="iconfont icon-yuanquan" 
                        style={{fontSize:'.5rem',marginLeft:'.1rem',float:'left'}}
                        ></i>
                            <span>编辑分类</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}