<template>
  <div>
    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单号"
        width="40"></el-table-column>
      <el-table-column
        prop="paid"
        label="订单状态">
      </el-table-column>
      <el-table-column label="付款">
        <template #default={row}>
          <el-button v-if="row.paid=='未支付'" type="success" @click="toPay(row)">支付</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="hotelName"
        label="酒店名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roomNumber"
        label="房间号">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="roomType"
        label="房间类型">
      </el-table-column>
      <el-table-column prop="id" label="评价">
        <template #default={row}>
          <el-button v-if="row.paid!='未支付'" type="primary" @click="toRemark(row.star,row.comments,row.id)">评价</el-button>
        </template>
        <!--        <el-button v-else="true" disabled>评价完成</el-button>-->
      </el-table-column>
      <el-table-column prop="id" label="编辑">
        <template #default={row}>
          <el-button v-if="row.paid=='未支付'" type="warning" @click="toEdit(row)">编辑</el-button>
        </template>
        <!--        <el-button v-else="true" disabled>评价完成</el-button>-->
      </el-table-column>
    </el-table>

    <el-dialog title="订单评价" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="对本订单打分" :label-width="formLabelWidth">
          <el-rate
            v-model="form.star"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </el-form-item>
        <el-form-item label="输入您的文字评价" :label-width="formLabelWidth">
          <el-input v-model="form.content" placeholder="您的每一句话都有可能对我们启发巨大">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRemark()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="支付订单" :visible.sync="dialogFormVisible3">
      <el-form :model="form3">
        <el-form-item label="入住时间" :label-width="formLabelWidth3">
         {{form3.time1}}
        </el-form-item>
        <el-form-item label="住到" :label-width="formLabelWidth3">
          {{form3.time2}}
        </el-form-item>
        <el-form-item label="入住人" :label-width="formLabelWidth3">
          {{form3.name}}
        </el-form-item>
        <el-form-item label="总价格" :label-width="formLabelWidth3">
          <el-tag>{{form3.price}}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="setPay()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="订单内容修改" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="修改起止时间" :label-width="formLabelWidth2">
          <el-date-picker
            v-model="form2.time1"
            type="datetime"
            placeholder="入住开始时间">
          </el-date-picker>
          <el-date-picker
            v-model="form2.time2"
            type="datetime"
            placeholder="结束入住时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改入住人" :label-width="formLabelWidth2">
          <el-input v-model="form2.name" placeholder="入住人姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="修改手机号" :label-width="formLabelWidth2">
          <el-input v-model="form2.phonenum" placeholder="请输入入住人的手机号">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="setEdit()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import axios from "axios";
import store from "../../store";

export default {
  name: 'Orders',
  inject:['reload'],
  data() {
    return {
      num_row: 0,
      tableData: []
      ,state1:{}//记录当前登录用户的信息
      , form: {
        star: 5,
        content: '',
        id: 0,
      }, form2: {
        time1: 5,
        time2: 6,
        name: '',
        phonenum: '',
        id: 0,
      },form3:{
        price:"",
        time1: "",
        time2: "",
        name: "",
        id:"",
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3:false,
      formLabelWidth: '120px',
      formLabelWidth2: '120px',
      formLabelWidth3: '100px',
      iconClass: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      rules: {
        star: [{
          required: true,
          message: "请输入打分内容",
          trigger: "blur"
        }],
        content: [{
          required: true,
          message: "请输入评价文字",
          trigger: "blur"
        }]
      }
      ,
    }
  }
  , methods: {
    toRemark(star, comments, id) {
      this.dialogFormVisible = true
      this.form.star = star
      this.form.content = comments
      this.form.id = id
    }, setRemark() {
      axios.put("http://" + sessionStorage.getItem('ip') + ":8080/orders/star/" + this.form.id + "/" + this.form.star)
      axios.put("http://" + sessionStorage.getItem('ip') + ":8080/orders/comment/" + this.form.id + "/" + this.form.content)
      this.dialogFormVisible = false
    }, toEdit(row) {
      // console.log(row)
      this.dialogFormVisible2 = true
      this.form2.time1 = row.startTime
      this.form2.time2 = row.endTime
      this.form2.name = row.liver
      this.form2.phonenum = row.phone
      this.form2.id = row.id
    }, setEdit() {
      function getNextDate(date, day) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
      };
      // console.log(this.form2.time1.toISOString().slice(0,10),typeof this.form2.time1.toISOString());
      // console.log(this.form2.time2,typeof this.form2.time2);
//这里两个日期都要改一下
      let t1 = this.form2.time1.toString().slice(4,5)==='-'?this.form2.time1.substring(0,10): this.form2.time1.toISOString().slice(0,10);
      let t2 = this.form2.time2.toString().slice(4,5)==='-'?this.form2.time2.substring(0,10): this.form2.time2.toISOString().slice(0,10);
      t1=getNextDate(t1,1);
      t2=getNextDate(t2,1)
      axios.put("http://" + sessionStorage.getItem('ip') + ":8080/consumer/modify/" + this.form2.id + "/" + t1 + "/" + t2 + "/" +
        this.form2.name + "/" + this.form2.phonenum, "").then((res) => {
        console.log(res.data)

      });
      console.log(this.form2.id)
      this.dialogFormVisible2 = false;
      // this.reload()
      // this.$router.push("/user/orders");
    }, dateTimeToString(date) {
      var y = date.getFullYear();
      var M = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
    },toPay(row){
      axios.get("http://" + sessionStorage.getItem('ip') +":8080/" +"consumer/check/"+row.id+"/"+row.startTime.substring(0,10)+"/"+row.endTime.substring(0,10)
      ).then(res=>{
        this.form3.price=res.data.data;
        console.log(res.data)

      }).catch((error)=> {
        console.log(error)
      });
      this.form3.name=row.liver
      this.form3.time1=row.startTime
      this.form3.time2=row.endTime
      this.form3.id=row.id;
      this.dialogFormVisible3=true;

    },setPay(){
      axios.put("http://"+ sessionStorage.getItem('ip') +":8080/consumer/pay/"+this.state1.user.name+"/"+this.form3.id+"/"+this.form3.price).then(res=>{
        console.log(res.data.flag)
        if (res.data.flag){
          this.$message.success("订单支付成功！")
          this.dialogFormVisible3=false;
        }else {
          this.$message.error("余额不足请，进入“个人信息”界面进行充值");
          this.dialogFormVisible3=false;
        }
      }).catch((error)=> {
        console.log(error)
      });
    }
  }
  , mounted() {
    this.state1=JSON.parse(sessionStorage.getItem("state"));
  }, beforeMount() {
    function getNextDate(date, day) {
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    };
    let state1 = JSON.parse(sessionStorage.getItem("state"));
    axios.get("http://" + sessionStorage.getItem('ip') + ":8080/orders/" + state1.user.name).then(
      (response) => {

        console.log(response.data);
        this.tableData = []
        this.tableData = response.data.data;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].endTime= this.tableData[i].endTime.split('T')[0]
          this.tableData[i].startTime= this.tableData[i].startTime.split('T')[0]
          console.log(this.tableData[i].endTime,typeof this.tableData[i].endTime)
          this.tableData[i].endTime=getNextDate(this.tableData[i].endTime,1);
          this.tableData[i].startTime=getNextDate(this.tableData[i].startTime,1);
          // this.tableData[i].endTime = this.tableData[i].endTime.split('T')[0] + " " + this.tableData[i].endTime.split('T')[1].split(".")[0]
          // this.tableData[i].startTime = this.tableData[i].startTime.split('T')[0] + " " + this.tableData[i].startTime.split('T')[1].split(".")[0]
          this.tableData[i].paid = this.tableData[i].paid ? "已支付" : "未支付"
        }

      }).catch((error) => {
      console.log(error)
    });

  }
}
</script>

<style scoped>

</style>
