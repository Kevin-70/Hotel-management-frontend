<template>
  <div>
    <el-descriptions title="用户信息" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogFormVisible = true" >点击充值余额</el-button>
        <!--     打开dialog进行充值 -->
      </template>

      <el-descriptions-item label="用户名"  >{{username}}</el-descriptions-item>
      <el-descriptions-item label="余额" label-class-name="my-label" content-class-name="my-content">
        <el-tag size="large">{{balance}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog title="余额充值" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="请输入密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-select v-model="form.amount" placeholder="（单位：人民币）">
            <el-option label="50" value="50"></el-option>
            <el-option label="100" value="100"></el-option>
            <el-option label="200" value="200"></el-option>
            <el-option label="1000" value="1000"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="chargeBalance">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Userinfo",
  data(){
    return {
      username: "姓名",
      balance:'',
      dialogFormVisible: false,
      form: {
        password: '',
        amount: '',
        date2: '',
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },beforeMount() {

    this.updateBalance();

  },methods:{
    updateBalance(){

      let state1=JSON.parse(sessionStorage.getItem("state"));
      this.username=state1.user.name;
      console.log(this.username)
      axios.get("http://"+sessionStorage.getItem('ip')+":8080/consumer/balance/"+state1.user.name).then(
      (response)=>{
        if ( response.data.flag){
          this.balance=response.data.data;
        }
    }).catch((error)=> {
        console.log(error)
      });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },chargeBalance(){
      if (this.form.password==null||this.form.password==""){
        this.$message("请输入正确的支付密码");
       return
      }
      this.dialogFormVisible=false;
      axios.put("http://"+sessionStorage.getItem('ip')+":8080/consumer/charge/"+this.username+"/"+this.form.amount).then(
        (response)=>{
          this.balance=Number(this.balance)+Number(this.form.amount)

        }).catch((error)=> {console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.my-label {
  background: #E1F3D8;
}

.my-content {
  background: #FDE2E2;
}
</style>
