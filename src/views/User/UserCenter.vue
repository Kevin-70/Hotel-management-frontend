<template>
  <div>
<!--    <router-link to="/user/:email/userinfo">个人信息</router-link>-->
<!--    <router-link to="/user/:email/service">在线客服</router-link>-->
<!--    <router-link to="/user/:email/message">消息通知</router-link>-->
<!--    <router-link to="/user/:email/queues">我的订单</router-link>-->

    <h1>酒店用户个人中心</h1>
    <el-container style="height: 40px; border: 1px solid #eee">
      <el-button :disabled="this.username=='not logined'?false : true" @click="SelectHotel">点击此处开始预订房间</el-button>
      <el-header style="text-align: right; font-size: 18px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >消息中心</el-dropdown-item>
            <el-dropdown-item v-on:click.native="Logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ email1 }}</span>
      </el-header>
    </el-container>
    <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="120px">

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <router-link to="/user/userinfo">个人信息</router-link>
            </template>
          </el-menu-item>
<!--          <el-menu-item index="2"  >-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">-->
<!--                <router-link to="/user/message" >-->
<!--                  消息通知-->
<!--                </router-link>-->
<!--              </span>-->
<!--          </el-menu-item>-->
          <el-menu-item index="2"  >
            <i class="el-icon-money"></i>
            <span slot="title">
              <router-link to="/user/orders">订单查看</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-message"></i>
            <span slot="title" >
                <router-link to="/user/service">在线客服</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-folder"></i>
            <span slot="title" >
                <router-link to="/user/favor">我的收藏</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-eleme"></i>
            <span slot="title" >
                <router-link to="/user/credit">积分商城</router-link></span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view v-if="isRouterAlive"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  props: ['email'],
  name: "UserCenter",
  provide(){
    reload:this.reload
  },
  data() {
    return {
      username: "not logined",
      email1:"",
      balance:12,
      isRouterAlive:true
    }
  },
  methods: {
    SelectHotel() {
      this.$router.push("/selecthotel")
    },
    // getData() {
    //   this.axios({ //调用axios请求-----need tomcat本地服务器启动
    //     //////////////////////////////还需要后端处理域名冲突问题
    //     method: 'get',
    //     url: 'http://localhost:8080/data.json'
    //   }).then(function (repos) {
    //     console.log(repos)
    //   }).catch(function (error) {
    //     console.log(error)
    //   })},
    Logout(){
      console.log("退出登录");
      sessionStorage.setItem("isLogin",null);
      sessionStorage.setItem('state',null);
      this.$store.dispatch("asyncUpdateUser",{email:null,name:"unlogin"})
      this.$router.push("/userlogin");
    },handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      if (key==='1'){
        function openInfo(){
        }
      }else if (key==='2'){
        function openMessage(){
        }
      }else if (key==='3'){
        function openOrder(){
        }
      }else {
        function openService(){
        }
      }
      console.log(key, keyPath);
    },reload(){
      this.isRouterAlive=false;
      this.$nextTick(function (){
        this.isRouterAlive=true;
      });
  }
  }, beforeRouteEnter: (to, from, next) => {
    if (sessionStorage.getItem("isLogin")==null){
      this.email1="unlogined";
      console.log("未登录");
    }
    console.log("进入个人中心");
    next();
    // next(vm => {
    //   vm.getData();
    // });//跳转到下一个路由
  }, beforeRouteLeave: (to, from, next) => {
    if (from.path==='/user' ){
      console.log("离开个人中心");
    }
    next();
    //跳转到下一个路由
  },mounted() {
    if (sessionStorage.getItem("isLogin") !=null && sessionStorage.getItem("isLogin") !=="null"){
      let state1=JSON.parse(sessionStorage.getItem("state"))
      console.log(state1)
      this.email1=state1.user.name
    }else {
      this.email1="unlogined"
      this.username = "not logined"
    }
  },
}
</script>

<style scoped>
.tac{
  width: 10px;
}
h1 {

  font-family: Arial, sans-serif;

  font-size: 24px;

  color: #369;

}
</style>
