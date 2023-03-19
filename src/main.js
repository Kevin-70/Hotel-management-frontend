// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue, {h} from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from "./router";  //会自动化导入文件夹里面的js文件
import ElementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import Vuex from 'vuex'
import store  from "./store";
import main from "element-ui/packages/main";
import {config} from "shelljs";
// import cors from "cors"

Vue.use(VueRouter); //使用vue router
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false //关闭开发Warning
Vue.prototype.axios=axios;
// Vue.use(cors())

router.beforeEach((to,from,next)=>{
let  isLogin=sessionStorage.getItem("isLogin");
//log out
 if (to.path==='/userlogin' && isLogin!=null){//是否点击登录按钮
    if (isLogin==="true"){//判断是否为空
      alert("请退出登录后再次登录");
      // next({path:"/primary"})//跳转到首页
    }else {
      next();
    }
  }else{
   next()
    //没有登录
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})
sessionStorage.setItem('ip','192.168.43.39');
// sessionStorage.setItem('ip','10.25.1.105');
// sessionStorage.setItem('ip','172.20.10.2');
//JSON.stringify() JSON 通常用于与服务端交换数据。 在向服务器发送数据时一般是字符串。 我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串
//JSON.parse() JSON 通常用于与服务端交换数据。 在接收服务器数据时一般是字符串。 我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。

config.headers["Access-Control-Allow-Origin"]="http://"+sessionStorage.getItem("ip")+":8080"
