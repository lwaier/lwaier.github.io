import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace,Button,Modal} from 'antd-mobile';
import {getRiQi} from './../../../ultis';
import store from './../../react-redux/store';
import {changeEditId,changeEditText} from './../../react-redux/actions'
import {history} from './../../../ultis/index'
import imgone from './../../../assect/avatar.svg'
import axios from './../../../ultis/axios'

const antdAlert = Modal.alert

export default class XinOrReList extends Component {
    watchUserinfo=(id)=>{
        
        axios.post("/react/yz/getuserinfoforone",{
            id
        }).then(res=>{
            let {
                nicheng,
                qianming,
                avatar
            } = res.data.obj
            avatar = avatar?avatar.replace(/public/,'http://localhost:4211'):''

            //接着做这里 把用户的信息弹出来
            antdAlert(<img src={avatar}/>, 'Are you sure???', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => console.log('ok') },
            ])
        })
    }
    toEdit=(id)=>{
        store.dispatch(changeEditId(id))
        store.dispatch(changeEditText(id))
        // history.push("/editupdate")
    }
    render(){
        let luyou = window.location.hash.split('#/')[1]
        let arr = this.props.arr
        if(arr.length>0){
            var Items = arr.map((item,index)=>{
                let {
                    week,
                    year,
                    month,
                    minutes,
                    hour,
                    ri
                }=getRiQi(item.time)
                var imgsrc = item.avatar?item.avatar.replace(/public/,'http://m.lixiaobaicc.cn:4211'):''
                return (
                    <div key={index}>
                        <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                        <Card>


                        <Card.Header
                            title={
                            <div>

                                <p style={{width:'.8rem',height:'.8rem',borderRadius:'50%',overflow:'hidden',float:'left'}}>
                                <img src={imgsrc?imgsrc:imgone}
                                style={{width:'100%',height:'100%'}}></img>
                                </p>
                            
                                <p style={{height:'.8rem',overflow:'hidden',float:'left',lineHeight:'.8rem',marginLeft:'.3rem'}}>
                                    
                                </p>

                            </div>
                            
                            }

                            extra={
                                <i className="iconfont icon-yanjing" 
                                    style={{fontSize:'.5rem',color:'white',marginRight:'.5rem',color:'green'}}
                                    onClick={()=>{this.watchUserinfo(item._id)}}
                                    ></i>
                            }
                        />


                        <Card.Body>
                            <div>{item.text}</div>
                        </Card.Body>


                        <Card.Footer content={`${year}.${month}.${ri}`} extra={<div>

                            {           
                                item.mine&&<i className="iconfont icon-bianji" 
                                style={{fontSize:'.5rem',color:'white',marginRight:'.5rem',color:'green'}}
                                onClick={()=>{this.toEdit(item._id)}}
                                ></i>
                            }

                        </div>} />




                        </Card>

                        </WingBlank>   
                    </div>
                )
            })
        }

        let flag = !Items ? true : false
        let flagOne = flag&&luyou!=="search"
        let flagTwo = flag&&luyou==="search"
        
        
        return (
            <div  style={{width:'100%'}}>
                {Items&&Items}   
                {flagTwo&&<div style={{marginTop:'.5rem',textAlign:'center'}}>还没有搜索到数据哦</div>}
                {flagOne&&<div style={{marginTop:'.5rem'}}><WingBlank><Button
                onClick={()=>{history.push("/edit")}}
                >还没有数据哦,点我添加数据</Button></WingBlank></div>}
            </div>
            
        )
    }
}