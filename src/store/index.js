import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/User"
Vue.use(Vuex);
//全局对象，用来保存所有组件的公共数据

export default new Vuex.Store({
  modules:{
    user
  }
})


