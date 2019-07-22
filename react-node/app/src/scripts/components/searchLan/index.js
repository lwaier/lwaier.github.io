import React, {Component} from 'react';
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import List from './../../components/list';
import axios from 'axios';
import {changeSearchArr} from './../../react-redux/actions/index'
import store from './../../react-redux/store'


export default class SearchLan extends Component {
    submit=(data)=>{
        store.dispatch(changeSearchArr(data))
    }
    cancel=()=>{
        store.dispatch({type:'kongtwo'})
    }
    render(){
        console.log(store.getState().userReducer.searchArr)
        return (
            <div>
                <SearchBar
                placeholder="Search"
                onSubmit={this.submit}
                onCancel={this.cancel}
                style={{position:'fixed',top:'1.2rem',width:'100%',zIndex:'99'}}
                />
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="md"/>
                <List arr={store.getState().userReducer.searchArr}
                />
            </div>

        )
    }
}