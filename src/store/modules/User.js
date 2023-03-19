const  user={
   state:sessionStorage.getItem("state")? JSON.parse(sessionStorage.getItem('state')):{
    user:{
      name:'L',
      email:'not login'
    }
  },
//监听state值的最新状态(计算属性)
  getters:{
    getUser(state){
      return state.user;
    }
  },
//唯一可以修改state值的方法（synchronized）
   mutations:{
    updateUser(state,user){
      state.user=user;
    }
  },
//异步执行mutations方法
   actions:{
    asyncUpdateUser(context,user){
      context.commit("updateUser",user)
      // sessionStorage.setItem('isLogin',"true");
      // sessionStorage.setItem("state",JSON.stringify(this.$store.state.user));
    },
     asyncLoginFail(){
      this.$message.warning("登录失败")
     }
  },
}


export default user;
