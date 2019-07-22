import React, {Component} from 'react'
import Header from '../../components/header';
import List from '../../components/list';
import store from './../../react-redux/store';
import {changeUserRiJiS} from './../../react-redux/actions'
import axios from 'axios'
import {WhiteSpace} from 'antd-mobile'

export default class RiJi extends Component {
    componentWillMount(){
        if(sessionStorage.userinfo){
            axios.post("/react/yz/getallriji").then(res=>{
            
                if(res.data.type===1){
                    store.dispatch(changeUserRiJiS(res.data.result))
                }
               
            })
        }
    }
    componentWillUnmount(){
        store.dispatch({type:'kongUserRiJiS'})
    }
    render(){
        return (
            <div>
                <Header/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <List arr={store.getState().userReducer.userRiJiS} />
            </div>

        )
    }
}