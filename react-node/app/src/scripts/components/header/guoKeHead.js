import React, {Component} from 'react';
import { NavBar,Toast,Tabs,Badge  } from 'antd-mobile';
import {history} from './../../../ultis/index'
import store from './../../react-redux/store' ;
import axios from 'axios';
import List from '../list/xinOrRe';
import {changeZuiXinOrZuiRe,changeUserRiJiS} from './../../react-redux/actions/index'



console.log(document.documentElement.clientHeight)


function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}

const tabs = [
    { title: <Badge >推荐</Badge> },
    { title: <Badge >最热</Badge> },
    { title: <Badge dot>我的</Badge> },
];

export default class GuoKeHead extends Component {
    componentWillMount(){
        store.dispatch(changeZuiXinOrZuiRe('zuire'))
    }
    render(){
        console.log(store.getState())
        let {
            zuiXinOrReArr,
            userRiJiS
        } = store.getState().userReducer
        let heightWinodw = document.documentElement.clientHeight-100
        return (
            <div style={{position:'fixed',top:'0',left:'0',width:'100%',zIndex:'1'}}>
                
            <Tabs tabs={tabs}
            initialPage={1}
            tabBarUnderlineStyle={{border:'2px solid #eae4e3'}}
            tabBarBackgroundColor="rgb(66,206,115)"
            tabBarActiveTextColor="rgba(255,255,255,1)"
            tabBarInactiveTextColor="rgba(255,255,255,.6)"
            onChange={(tab, index) => { 
               
                
                
            }}
            onTabClick={(tab, index) => { 
                store.dispatch({type:'kongUserRiJiS'})
                let ziduan = tab.title.props.children
                ziduan= ziduan === '最热' ? 'zuire' : ziduan === '推荐' ? 'zuixin' : 'mine'
                if(ziduan==='zuixin'||ziduan==='zuire'){
                    store.dispatch(changeZuiXinOrZuiRe(ziduan))
                }else{
                    console.log(100000000)
                    axios.post("/react/yz/getallriji").then(res=>{
                        console.log(res)
                        if(res.data.type===1){
                            store.dispatch(changeUserRiJiS(res.data.result))
                        }
                    })
                }
            }}
            >
                
            <div style={{ height:heightWinodw+'px'}}>
                <List arr={zuiXinOrReArr} />
            </div>
            <div style={{ height:heightWinodw+'px'}}>
                <List arr={zuiXinOrReArr}/>
            </div>
            <div style={{ height:heightWinodw+'px'}}>
                <List arr={userRiJiS}/>
            </div>
            
            </Tabs>

            </div>
        )
    }
}