import React, {Component} from 'react';
import { SwipeAction, List  ,Toast , Modal,WhiteSpace} from 'antd-mobile';
import axios from 'axios'
import store from './../../react-redux/store'
import {changeFenLeiArr} from './../../react-redux/actions/index'

const prompt = Modal.prompt;
const alert = Modal.alert;

function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}

export default class FenLeiListItem extends Component {
    render(){
        let {
            item
        } = this.props
        return (
            <div>
                <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    left={[
                        {
                            text: '删除',
                            onPress: () => {
    
                                alert('您确定要删除吗?','会删除该分类下对应的所有日记哟', [
                                    { text: '取消'},
                                    { text: '确认', onPress: () => {

                                        axios.post('/react/yz/fenleidelete',{
                                            id:item._id,
                                            fenlei:item.fenleiming
                                        }).then(res=>{
                                            if(res.data.type===1){
                                                successToast("删除成功")
                                                store.dispatch(changeFenLeiArr())
                                            }
                                        })


                                    } },
                                ])
    
                               
                                
                            },
                            style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                        {
                        text: '修改',
                        onPress: () =>{

                            prompt('修改分类', '请输入您想修改的新名称',
                            [
                            {
                                text: '关闭',
                                onPress: value => new Promise((resolve) => {
                                    resolve();
                                }),
                            },
                            {
                                text: '确认',
                                onPress: value => new Promise((resolve, reject) => {
                                    if(value.length<=4&&value.length>0){
                                        
                                        axios.post('/react/yz/fenleiupdate',{
                                            id:item._id,
                                            fenleiming:value,
                                            oldfenleiming:item.fenleiming
                                        }).then(res=>{
                                            if(res.data.type===1){
                                                successToast("修改成功")
                                                store.dispatch(changeFenLeiArr())
                                                resolve()
                                            }
                                        })

                                    }else{
                                        failToast('请输入0到4个字符')
                                    }   
                                }),
                            },
                            ], 'default', null, ['您想设置的新的分类名'])

                            
                        },
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        
                       
                    ]}
                    onOpen={() => {
                        //这里可以做一波特效优化
                    }}
                    >
                    <List.Item
                        extra="More"
                        arrow="horizontal"
                        onClick={e => console.log(e)}
                    >
                       {item.fenleiming}
                    </List.Item>
                </SwipeAction>
            </div>
        )
    }
}