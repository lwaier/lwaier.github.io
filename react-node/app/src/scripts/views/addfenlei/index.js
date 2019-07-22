import React,{Component} from 'react';
import AddFenLeiHead from '../../components/header/addFenLeiHead';
import FenLeiList from '../../components/list/fenLeiList';
import {WhiteSpace} from 'antd-mobile'



export default class AddFenLei extends Component{
    render(){
        return (
            <div>
                <AddFenLeiHead/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <FenLeiList size="xl"/>
            </div>
        )
    }
}