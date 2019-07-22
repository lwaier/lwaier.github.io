import Axios from 'axios';
import { Modal, Toast } from 'antd-mobile';
import {history} from './../ultis/index'

const alert = Modal.alert;



    //设置请求拦截器
    Axios.interceptors.request.use((config)=>{

        let token = "";
Axios.defaults.withCredentials = false;
Axios.defaults.headers.common['token'] = token;   // 请求头  token 空 
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

        let userinfo = window.sessionStorage.userinfo;
        if(userinfo){
            userinfo = JSON.parse(userinfo);
            token = userinfo.token;
        }
        console.log(token)
        // Toast.loading({
        //     duration: 1000,       // 持续展示 toast
        //     forbidClick: true, // 禁用背景点击
        //     loadingType: 'spinner',
        //     message: '加载中'
        // });
        config.headers.common['token'] = token;
        return config
    },(err)=>{
        // Toast.fail('未知错误');
        return Promise.reject(err);
    })

    //设置响应拦截器
    Axios.interceptors.response.use(function (response) {
        if(response.data.code =="401"){
            alert('您还没有登录', '是否立即去登录???', [
                { text: '取消', onPress: () => {} },
                { text: '立即登录', onPress: () => {
                    history.push('/login')
                }},
              ])
        }
        return response;
      }, function (error) {
        // Toast.fail('未知错误');
        return Promise.reject(error);
      })

export default Axios;