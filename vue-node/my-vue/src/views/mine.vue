<template>
  <div class="mine">
    <div class="headers">
        <p>
          <span><van-icon name="arrow-left" size=".4rem" class="iconone" 
          @click="$router.back()"/></span>
          个人中心
        </p>
        <h2 v-if="loginFlag">
          <!-- 这里是头像 -->
          <p @click="pimgFn">
            <img :src="imgSrc" alt="">
          </p>
          <input type="file" 
          accept="image/*" 
          class="inputimg"
          @change="inputimgFn"
          ref="inputimg">
        </h2>
        <h3>
          <em class="shangchuan"
          v-if="imgtipFlag"
          >可点击头像进行上传头像操作</em>
          <span @click="$router.push({name:'login'})" v-if="!loginFlag">登录</span>
          <span v-else @click="zhuxiao">退出登录</span>
          <!-- 此处有逻辑 如果已经登录 需要显示已登录 -->
          <span @click="$router.push({name:'register'})" v-if="!loginFlag">注册</span>
          <span @click="$router.push({name:'userinfo'})">{{username}}</span>
        </h3>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link  @click="$router.push({name:'orderment'})"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="logistics" title="我的地址" is-link @click="$router.push({name:'address'})"/>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Icon, Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
import {mapState} from 'vuex'

Vue.use(Toast);

import touxiang from './../assets/logo.png'


export default {
  data(){
    return{
      loginFlag:false,
      username:'',
      imgSrc:'',
      imgtipFlag:true
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  computed:{
    flagAvatar(){
      return localStorage.token;
    },
    ...mapState([
      'UserStore'
    ])
  },
  methods:{
    pimgFn(){
      this.$refs.inputimg.click()
    },
    inputimgFn(){
      let img = this.$refs.inputimg.files[0]
      const Data = new FormData()
      Data.append('avatar',img)
      this.$axios({
          url:'/vue/yz/uploadimg',
          method:'POST',
          contentType:false,
          processData:false,
          data:Data
      }).then(res=>{

          if(res.data.type==1){
                let imgSrc = res.data.result
                imgSrc=imgSrc.replace(/public/,'http://47.100.234.162:5200')
                this.imgSrc=imgSrc
                this.imgtipFlag=false
          }

      })
    },
    zhuxiao(){
      this.$axios.post("/vue/yz/zhuxiao").then((res)=>{
        if(res.data.type==1){
          window.sessionStorage.clear();
          Toast.success('已退出登录')
          this.loginFlag=false
          this.username=""
          this.$store.commit('carNumArrKong') //清空底部footer 购物车的数量微标
        }
      })
    }
  },
  mounted(){
        if(window.sessionStorage.userinfo){
            this.loginFlag=true
            this.$axios({
              url:'/vue/yz/gettouxiang',
              method:'POST',
            }).then(res=>{
              if(res.data.type==1){
                let imgSrc = res.data.result
                imgSrc=imgSrc.replace(/public/,'http://47.100.234.162:5200')
                this.imgSrc=imgSrc
                this.imgtipFlag=false
              }else{
                this.imgSrc=touxiang
                this.imgtipFlag=true
              }
            })
        }
        if(sessionStorage.userinfo){
          this.username = JSON.parse(sessionStorage.userinfo).username
        }
        
  }
};
</script>

<style lang="scss" scoped>
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.headers{
    padding-bottom: .5rem;
    background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png);
    color:white;
    p{
      height: .88rem;
      text-align: center;
      line-height: .88rem;
      font-size: .35rem;
      position: relative;
      span:first-child{
        position: absolute;
        left: 0;
        width: .8rem;
        padding:0 .2rem;
        height: .4rem;
      }
    }
    h2{
      height: 1.5rem;
      margin-top: .5rem;
      text-align: center;
      p{
          width: 1.5rem;
          height: 1.5rem;
          background: white;
          border-radius: 50%;
          display: inline-block;
          overflow: hidden;
          img{
            width: 100%;
            height:100%;
          }
      }
      .inputimg{
        display: none
      }
    }
    h3{
      height: .5rem;
      margin-top: .6rem;
      text-align: center;
      position: relative;
      span{
        display: inline-block;
        text-align: center;
        width: 2.72rem;
        text-align: center;
        line-height: .5rem;
        height: 100%;
      }
      .shangchuan{
        position: absolute;
        left: 0;
        top: -.4rem;
        right: 0;
        margin: auto;
        font-size: .12rem;
        font-style: normal;
      }
    }
}
</style>