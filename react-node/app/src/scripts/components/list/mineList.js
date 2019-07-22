import React, {Component} from 'react';
import { List,WhiteSpace } from 'antd-mobile';
import {history} from '../../../ultis'

const Item = List.Item;


export default class MineList extends Component {
    render(){
        return (
            <div>
                <List>
                    <WhiteSpace size="lg" style={{background:'#f5f4f0'}}/>

                <Item
                thumb={ <i className="iconfont icon-yonghuziliaoxiugai" style={{fontSize:'.60rem',color:'#42ce73'}}></i>}
                arrow="horizontal"
                onClick={() => {
                    history.push("/ziliao")
                }}
                >资料修改</Item>
                <Item
                thumb={ <i className="iconfont icon-update" style={{fontSize:'.60rem',color:'#42ce73'}}></i>}
                arrow="horizontal"
                onClick={() => {}}
                >升级高级账户</Item>

                    <WhiteSpace size="lg" style={{background:'#f5f4f0'}}/>


                 <Item
                thumb={ <i className="iconfont icon-tongzhi" style={{fontSize:'.60rem',color:'#42ce73'}}></i>}
                arrow="horizontal"
                onClick={() => {}}
                >系统通知</Item>
                
                  <WhiteSpace size="lg" style={{background:'#f5f4f0'}}/>


                 <Item
                thumb={ <i className="iconfont icon-shezhi" style={{fontSize:'.60rem',color:'#42ce73'}}></i>}
                arrow="horizontal"
                onClick={() => {}}
                >设置</Item>
                <Item
                thumb={ <i className="iconfont icon-gengduo" style={{fontSize:'.60rem',color:'#42ce73'}}></i>}
                arrow="horizontal"
                onClick={() => {}}
                >更多功能</Item>
                 <WhiteSpace size="lg" style={{background:'#f5f4f0'}}/>
                 <Item
                thumb={ <i className="iconfont icon-italic" style={{fontSize:'.60rem',color:'#d8e61b'}}></i>}
                arrow="horizontal"
                onClick={() => {}}
                >关于开发者</Item>

            </List>
            </div>
        )
        }
    }