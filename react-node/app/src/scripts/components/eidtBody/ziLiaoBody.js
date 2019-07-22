import React, {Component} from 'react';
import {WhiteSpace,WingBlank,TextareaItem} from 'antd-mobile'
import { createForm } from 'rc-form';
import store from './../../react-redux/store';
import {cunQuQianMing} from './../../react-redux/actions'

class ZiLiaoBody extends Component {
    render(){
        const { getFieldProps } = this.props.form;
        const {
            userqianming,
        } = store.getState().userReducer.userinfo
        return (
            <div>
                <TextareaItem 
                    {...getFieldProps('count', {
                    initialValue: '',
                    })}
                    rows={3}
                    count={30}
                    clear="true"
                    onBlur={this.getText}
                    placeholder={userqianming}
                    onBlur={(data)=>{
                        store.dispatch(cunQuQianMing(data))
                    }}
                    ref="qianming"
                />
        </div>
        )
    }
}

const ZiLiaoBodyComponent = createForm()(ZiLiaoBody);

export default ZiLiaoBodyComponent





