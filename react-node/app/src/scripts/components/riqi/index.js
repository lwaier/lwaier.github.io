import React , {Component} from 'react';
import { List, Calendar,Button } from 'antd-mobile';
import {history} from './../../../ultis/index'
import axios from 'axios'
import store from './../../react-redux/store'
import {changeDateNow} from './../../react-redux/actions'



const now = new Date();


export default class RiQi extends Component {

    confirm= (data) =>{
      let dateNew = new Date(data)
      console.log(dateNew.getDate())
      console.log(dateNew.getTime())
      let time = dateNew.getTime()
      console.log(time)
      axios.get('/react/yz/getdateriji',{
        params:{
          timereq:time
        }
      }).then(res=>{
        if(res.data.type==1){
          //有记录的时候跳列表组件
        }else{
          //无记录的时候跳编辑组件,并且存时间数据
          store.dispatch(changeDateNow(dateNew))
          history.push("/edit")
        }
      })
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        history.go(-1)
      }

    constructor(props) {
        super(props);
        this.state = {
          en: false,
          show: true,
          config: {},
        };
    }

    renderBtn() {
        return (
          <List.Item arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
              });
            }}
          >
          </List.Item>
        );
      }


    render(){
        return (
            <div>
                <Button type="primary"></Button>
                <Calendar
                pickTime={true}
                {...this.state.config}
                visible={this.state.show}
                onCancel={this.onCancel}
                onSelectHasDisableDate={this.onSelectHasDisableDate}
                getDateExtra={this.getDateExtra}
                defaultDate={now}
                onConfirm={this.confirm}
                type="one"
                title="选择记事日期"
                />
            </div>
        )
    }
}