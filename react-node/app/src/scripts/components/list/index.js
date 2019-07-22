import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace,Button} from 'antd-mobile';
import {getRiQi} from './../../../ultis';
import store from './../../react-redux/store';
import {changeEditId,changeEditText} from './../../react-redux/actions'
import {history} from './../../../ultis/index'


export default class List extends Component {
    
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
                return (
                    <div key={index} onClick={()=>{this.toEdit(item._id)}}>
                        <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                        <Card>
                        <Card.Header
                            title={`${year}.${month}.${ri}`}
                            extra={<span>{`${hour}:${minutes}`}</span>}
                        />
                        <Card.Body>
                            <div>{item.text}</div>
                        </Card.Body>
                        <Card.Footer content={week} extra={<div>{item.dizhi}</div>} />
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