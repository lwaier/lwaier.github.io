import React, {Component} from 'react';
import { NavBar } from 'antd-mobile';
import {history} from './../../../ultis/index';
import Fenlei from '../fenlei';



export default class Header extends Component {
    render(){
        return (
            <div style={{position:'fixed',top:'0',left:'0',width:'100%',zIndex:'100'}}>
                 <NavBar
                mode="light"
                icon={
                <div>
                <i className="iconfont icon-rili" style={{fontSize:'.60rem',color:'white',marginRight:'.5rem'}}
                onClick={() =>history.push('/add')}
                ></i>
                <i className="iconfont icon-sousuo1" style={{fontSize:'.60rem',color:'white'}} 
                onClick={()=>{history.push('/search')}}
                ></i>
                </div>
                }
                rightContent={[
                    <i key="1" onClick={()=>{history.push('/edit')}} className="iconfont icon-zhuanxierizhi" style={{fontSize:'.60rem',color:'white'}}></i>,
                ]}
                style={{background:'rgb(66,206,115)'}}
                >
                    <i style={{fontStyle:'normal',color:'white'}}>

                        <Fenlei/>

                    </i>
                </NavBar>
            </div>
        )
    }
}