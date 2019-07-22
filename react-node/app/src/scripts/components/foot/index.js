import React, {Component} from 'react';
import {TabBar ,Modal} from 'antd-mobile';
import {history} from './../../../ultis/index';
import store from './../../react-redux/store';

const alert = Modal.alert;

export default class Foot extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'riji',
        };
    }

    componentDidMount(){
        let theSelectRouter = window.location.hash.split('/index/')[1]
        this.setState({
            selectedTab:theSelectRouter
        })
    }


    render(){
        return (
            <div style={{position:'fixed',bottom:'0',left:'0',width:'100%'}}>
            <TabBar
            unselectedTintColor="#949494"
            tintColor="#77ef69"
            barTintColor="white"
            style={{position:'fixed',bottom:'0',left:'0',width:'100%',zIndex:'1000'}}
            >
                <TabBar.Item
                    title="日记"
                    key="Life"
                    icon={
                        <i className="iconfont icon-ico_yaokuguanli_jinchurijichaxun" style={{fontSize:'.60rem',color:'#949191'}}></i>
                    }
                    selectedIcon={
                        <i className="iconfont icon-ico_yaokuguanli_jinchurijichaxun" style={{fontSize:'.60rem',color:'#77ef69'}}></i>
                    }
                    selected={this.state.selectedTab === 'riji'}
                    badge={store.getState().userReducer.userRiJiS.length}
                    onPress={() => {
                    
                    if(sessionStorage.userinfo){
                        history.push('/index/riji')

                        this.setState({
                            selectedTab: 'riji',
                        });

                    }else{
                        
                        alert('您还没有登录', '是否立即去登录???', [
                            { text: '取消', onPress: () => {} },
                            { text: '立即登录', onPress: () => {
                                history.push('/login')
                            }},
                          ])

                    }
                    
                    }  
                }
                    data-seed="logId"
                >
                </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-icon-dongtai" style={{fontSize:'.60rem',color:'#949191'}}></i>
                        }
                        selectedIcon={
                            <i className="iconfont icon-icon-dongtai" style={{fontSize:'.60rem',color:'#77ef69'}}></i>
                        }
                        title="过客"
                        key="Koubei"
                        badge={'new'}
                        selected={this.state.selectedTab === 'guoke'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'guoke',
                        });
                        history.push('/index/guoke')
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-wode" style={{fontSize:'.60rem',color:'#949191'}}></i>
                        }
                        selectedIcon={
                            <i className="iconfont icon-wode" style={{fontSize:'.60rem',color:'#77ef69'}}></i>
                        }
                        title="我的"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'mine'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'mine',
                        });
                        history.push('/index/mine')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}
