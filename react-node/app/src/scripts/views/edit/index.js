import React, {Component} from 'react';
import EditHead from './../../components/header/editHead'
import EditBodyComponent from '../../components/eidtBody';
import store from './../../react-redux/store'




export default class Edit extends Component {
    render(){
        return(
            <div>
                <EditHead/>
                <EditBodyComponent/>

            </div>
        )
    }
}

