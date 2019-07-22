//点击编辑已经有的记录(包括更新和删除和标记为已处理等功能)

import React, {Component} from 'react';
import EditUpdateHead from './../../components/header/editUpdateHead'
import EditUpdateBodyComponent from './../../components/eidtBody/editUpdateBody';
import store from './../../react-redux/store'




export default class EditUpdate extends Component {
    render(){
        return(
            <div>
                <EditUpdateHead/>
                <EditUpdateBodyComponent/>
            </div>
        )
    }
}

