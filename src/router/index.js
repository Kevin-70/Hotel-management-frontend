import Vue from "vue";
import VueRouter from "vue-router";
import Primary from "../views/Primary";
import UserLogin from "../views/User/UserLogin";
import UserRegister from "../views/User/UserRegister";
import UserCenter from "../views/User/UserCenter";
import Userinfo from "../components/User/Userinfo";
import service from "../components/User/service";
import Orders from "../components/User/Orders";
import AdminLogin from "../views/Admin/AdminLogin";
import AdminRegister from "../views/Admin/AdminRegister";
import AdminCenter from "../views/Admin/AdminCenter";
import SelectHotel from "../views/SelectHotel";
import Abouts from "../views/PrimaryContent/Abouts/Abouts";
import Activities from "../views/PrimaryContent/Activities/Activities";
import HotelDisplays from "../views/PrimaryContent/HotelDisplays/HotelDisplays";
import Pay from "../views/Pay";
import Player from "../views/Player";
import error from "../views/error"
import userinfo from "../components/User/Userinfo";
import Favor from "../components/User/Favor";
import Credit from "../components/User/Credit";
Vue.use(VueRouter);
export default new VueRouter({
  mode:"hash",
  routes:[
    {
      path:"/primary",//路由跳转路径，是显示在浏览器上的路径
      name:"Primary",//路由名称
      component:Primary,  //路由组件
      children:[
        //酒店展示栏
        {path:"/primary/hoteldisplays/:nameh",
          name:"HotelDisplays",
          component:HotelDisplays,props:true
        },{path:"/primary/activities",
          name:"Activities",
          component:Activities
        },{path:"/primary/telephone",
          name:"Abouts",
          component:Abouts
        }
      ]
    },{//redirect
    path: "/",
      redirect:"/primary"
    },{
    path:"/userlogin",
      name:"UserLogin",
      component:UserLogin
    },{
      path:"/userlogin/userregister",
      name:"UserRegister",
      component:UserRegister
    },{
    path:"/user" ,
      name:"UserCenter",
      component:UserCenter,
      props:true,
      children:[
        {
          path:"/user/userinfo",
          name:'Userinfo',
          component:Userinfo
        },{
          path:"/user/service",
          name:'service',
          component:service
        },{
      path: "/user/orders",
          name: "Orders",
          component: Orders
        },{
      path: "/user/favor",
          name: "Favor",
          component: Favor
        },{
      path: "/user/credit",
          name: "Credit",
          component: Credit
        }
      ]
    },  {
      path:"/adminlogin",
      name:"Adminlogin",
      component:AdminLogin
    },{
      path:"/adminlogin/adminregister",
      name:"AdminRegister",
      component:AdminRegister
    },{
      path:"/admin",
      name:"AdminCenter",
      component:AdminCenter
    }
    ,{
      path:"/selecthotel",
      name:"SelectHotel",
      component:SelectHotel
    },{
      path:"/pay",
      name:"Pay",
      component:Pay
    },{
      path:"/player",
      name:"Player",
      component:Player
    },{
    path:"*",  //如果找不到就error
      component:error
    }
  ]
})
