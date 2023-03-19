<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <el-card>请输入信息进行用户注册</el-card>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" placeholder="请输入姓名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password1">
        <el-input type="password" placeholder="请输入密码" v-model="form.password1"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" placeholder="请确认密码" v-model="form.password2"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onRegister('form')">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data(){
    var ValidPass2=(rule,value,callback) =>{
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
    }
    return {
      form:{
        email:"",
        name:"",
        password1:"",
        password2:""
      },rules:{
        name: [{
          required:true,
          message:"请输入您的名字",
          trigger:"blur"
        }],
        email: [{
          required:true,
          message:"请输入邮箱",
          trigger:"blur"
        }],
        password1: [{
          required:true,
          message:"请输入密码",
          trigger:"blur"
        }],password2: [{
          required:true,
          validator:ValidPass2,
          message:"输入密码与第一次密码不一致",
          trigger:"blur"
        }]

      }
    }
  },
  methods:{
    onRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data1 = {"consumerName":this.form.name,
            "password":this.form.password2,
            "email":this.form.email
          };

          // let login=false;
          axios.post("http://"+sessionStorage.getItem('ip')+":8080/firstPage/consumerRegister",data1).then(
            (response)=>{
              // this.logined=true
            }).catch((error)=> {
            console.log(error)
          });
          this.$message.success("用户注册成功")
          this.$router.push("/userlogin");
        } else {
          this.$message.warning("输入信息无效或冲突")
          return false;
        }
      });
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
  box-shadow: 0px 0px 20px green;/*x轴偏移，y轴偏移，阴影宽度，颜色*/
}

</style>
