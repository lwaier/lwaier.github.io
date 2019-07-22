import React, {Component} from 'react';
import { TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import {changeText} from './../../react-redux/actions'
import store from './../../react-redux/store'

class EditBody extends Component {
    getText=(data)=>{
        store.dispatch(changeText(data))
    }
    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div style={{position:'fixed',top:'1.1rem',left:'0',width:'100%'}}>
                <TextareaItem
                    {...getFieldProps('count', {
                    initialValue: store.getState().dataReducer.dateBeforeUpdateText,
                    })}
                    rows={10}
                    count={300}
                    clear="true"
                    onBlur={this.getText}
                />
            </div>
        )
    }
}

const EditBodyComponent = createForm()(EditBody);

export default EditBodyComponent