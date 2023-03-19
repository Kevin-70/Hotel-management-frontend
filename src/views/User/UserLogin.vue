<template>
<div>
  <el-form ref="form" :model="form" :rules="rules" class="login-box">
    <el-card>欢迎光临好客酒店</el-card>
    <el-button type="primary" @click="toRegister()">用户注册</el-button>
    <el-form-item label="邮箱" prop="email">
      <el-input type="text" placeholder="请输入邮箱" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
    </el-form-item>
    <el-button type="primary" @click="onLogin('form')">登录</el-button>
  </el-form>
</div>
</template>

<script>
import axios from "axios";
// import store from "store"
export default {
  name: "login",
  data(){
    return {
      form:{
        email:"",
        password:""
      },rules:{
        email: [{
          required:true,
          message:"请输入邮箱",
          trigger:"blur"
        }],
        password: [{
          required:true,
          message:"请输入密码",
          trigger:"blur"
        }]
      },logined:false
    }
  },
  methods:{

    onLogin(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        // let login=false;
        axios.get("http://"+sessionStorage.getItem('ip')+":8080/firstPage/"+this.form.email+"/"+this.form.password).then(
          (response)=>{
            console.log(response.data);
            if (response.data.data==null){
              this.logined=false
            }else {
              this.logined=true
            }
            if (this.logined){
              sessionStorage.setItem('isLogin',"true");
              console.log(response.data)
              this.$store.dispatch("asyncUpdateUser",{email:this.form.email,name:response.data.data.consumerName});
              this.$message.success("登录成功");
              sessionStorage.setItem("state",JSON.stringify(this.$store.state.user));
              sessionStorage.setItem("logintype","user");
              this.$router.push({ name:'UserCenter',params:{email:this.form.email}});
            }else {
              this.$message.warning("邮箱或密码错误")
              return false;
            }
            // this.logined=true
          }).catch((error)=> {
          console.log(error)
        });
        // console.log(this.logined)

        // console.log(login)
      } else {
        this.$message.warning("邮箱或密码输入格式错误")
        return false;
      }
  });
},toRegister(){
      this.$router.push("/userlogin/userregister")
    }
  }
}
</script>

<style scoped >
.login-box{
  width: 350px;
  margin: 150px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 6px;
  /*round corner in bound*/
  box-shadow: 5px 5px 20px gray;/*x轴偏移，y轴偏移，阴影宽度，颜色*/
}

</style>
