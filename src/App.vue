<template>
  <div id="app">

    <router-link to="/" class="hollow">首页</router-link>
    <router-link to="/userlogin" class="hollow">用户登录</router-link>
    <router-link to="/adminlogin" class="hollow">管理员登录</router-link>
    <!--    routerlink等价于a，to等价于herf-->
    <router-link to="/user" class="hollow">个人中心</router-link>
    <router-link to="/admin" class="hollow">管理员中心</router-link>
    <router-view/>
    <!--    把路由配置跳转的组件放在这里-->
    <!--    <HelloWorld/>-->
  </div>
</template>
<!--在vue里'='表示赋值，':'表示值的传递-->
<script>
export default {
  name: 'App',
  components: {

  },data(){
    return {
      reload:this.reload()
    }
  },provide(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    saveState(){ //当刷新页面时保存用户状态到不会被刷新的sessionStorage中
      sessionStorage.setItem("state",JSON.stringify(this.$store.state.user));
    },reload(){
      this.isRouterAlive=false;
      this.$nextTick(function (){
        this.isRouterAlive=true;
      });
    },
  },mounted(){
    // window.addEventListener("unload",this.saveState()); //按下刷新键或者离开页面
  },beforeRouteLeave(to,from,next){
    let state1=sessionStorage.getItem("logintype");
    if (to.path==="/admin" && !(state1==="admin")){
      this.$message.error("请管理员登录后再进入个人中心");
    }else if (to.path==="/user" && !(state1==="user")){
      this.$message.error("请用户登录后再进入用户中心")
    }else {
      next();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.hollow{
  font-size: 30px;
  color: #fefefe;
  text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
}
</style>
