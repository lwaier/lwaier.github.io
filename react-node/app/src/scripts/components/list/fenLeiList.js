import React, {Component} from 'react';
import FenLeiListItem from './fenLeiItem';
import {  List ,WhiteSpace} from 'antd-mobile';
import store from './../../react-redux/store'



export default class FenLeiList extends Component {
    render(){
        return (
            <div>
                
                <List>
                    { store.getState().userReducer.fenLeiArr.map((item,index)=>{
                        return (
                            <div key={index}>
                                 <FenLeiListItem item={item}/>
                            </div>
                        )
                    })
                    }
                   

                </List>

            </div>
        )
    }
}