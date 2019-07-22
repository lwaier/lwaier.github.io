import React, {Component} from 'react';
import "./index.scss"
import {WingBlank, WhiteSpace,InputItem,Button,Toast,} from 'antd-mobile';
import axios from 'axios'
import {history} from './../../../ultis/index'

var timer =null

function successToast(name) {
    Toast.success(name, 2);
}

function failToast(name) {
    Toast.fail(name, 2);
}
export default class Login extends Component {
    state={
        phone:'',
        code:'',
        phoneFlag:true,
        yzmFlag:true,
        yzmButtonFlag:false,
        yzmButtonText:'发送验证码',
        count:181
    }
    changePhone=(data)=>{
        let RegExpTest = /^1(3|5|7|8|9)[0-9]{9}$/
        this.setState({
            phone:data,
            phoneFlag:!RegExpTest.test(data)
        })
    }
    zhufuFn=(data)=>{
        let RegExpTest = /^[0-9]{4}$/
        this.setState({
            code:data,
            yzmFlag:!RegExpTest.test(data)
        })
    }
    sendCode=()=>{
        this.setState({
            yzmButtonFlag:true,
            yzmButtonText:'倒计时',
            count:--this.state.count
        })
        timer=setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    yzmButtonFlag:true,
                    yzmButtonText:'倒计时',
                    count:--this.state.count
                })
            }else{
                clearInterval(timer)
                this.setState({
                    yzmButtonFlag:false,
                    yzmButtonText:'发送验证码',
                    count:181
                })
            }
        },1000)
        axios.post("/react/duanxin",{
            mobile:this.state.phone
        }).then(res=>{
            if(res.data.type===1){
                successToast('发送成功')
            }else{
                failToast("发送失败")
            }
        })
    }
    login=()=>{
        axios.post("/react/login",{
            username:this.state.phone,
            code:this.state.code
        }).then(res=>{
            if(res.data.type===1){
                let userinfo = {
                    token:res.data.token
                }
                userinfo=JSON.stringify(userinfo)
                sessionStorage.userinfo=userinfo
                successToast('登录成功')
                setTimeout(()=>{
                    history.push("/index/riji")
                },2000)
            }else{
                failToast(res.data.msg)
            }
        })
    }
    render(){
        return (
            <div>
                <div>
                <WingBlank>

                <WhiteSpace></WhiteSpace>

                <InputItem
                type="number"
                placeholder="请输入手机号"
                clear
                moneyKeyboardAlign="left"
                maxLength="11"
                onChange={this.changePhone}
                >手机号:</InputItem>

                <WhiteSpace></WhiteSpace>

                <InputItem
                type="number"
                placeholder="验证码"
                clear
                moneyKeyboardAlign="left"
                onChange={this.zhufuFn}
                maxLength="4"
                >验证码:</InputItem>
                <Button  size="small" inline className="yzmbutton" 
                disabled={this.state.phoneFlag||this.state.yzmButtonFlag}
                onClick={this.sendCode}>{this.state.yzmButtonText==="倒计时"?this.state.yzmButtonText+this.state.count:this.state.yzmButtonText}</Button>
                <Button disabled={this.state.phoneFlag||this.state.yzmFlag} onClick={this.login}>登录</Button>
                </WingBlank>
                </div>
            </div>
        )
    }
}