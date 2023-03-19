<template>
  <div>
    <br>
    <br>
    <br>
    <el-card class="box-card">
      <div>
        酒店：{{ this.curHotel }}
        <br>
        选择的房间号：{{ this.selRoom }}
        <br>
<!--        价格：{{ this.price }}-->
      </div>
    </el-card>
    <div id="inputs">
      <el-date-picker
        v-model="start_time"
        type="date"
        placeholder="选择入住开始时间"
      ></el-date-picker>
      <el-date-picker
        v-model="end_time"
        type="date"
        placeholder="选择入住结束时间"
      ></el-date-picker>
      <br>
      <el-input
        placeholder="请输入入住人姓名"
        style="width: 500px"
        suffix-icon="el-icon-date"
        v-model="cus_name">
      </el-input>
      <br>
      <el-input
        style="width: 500px"
        placeholder="请输入入住人手机号"
        suffix-icon="el-icon-date"
        v-model="cus_phone">
      </el-input>

      <br>
      <br>
    </div>

    <div>
      <el-button id="Sure" @click="sureOrder($event)">确认下单</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {DatePicker} from 'element-ui'

export default {
  name: "Pay",
  components: {
    DatePicker
  },
  data() {
    return {
      curHotel: '',
      selRoom: 0,
      roomType: '',
      price: 0,
      start_time: '',
      end_time: '',
      cus_name: '',
      cus_phone: ''
    }
  },
  created() {
    this.getFromSelectHotel();
    // let data = JSON.parse(this.getData('http://192.168.43.39:8080/consumer/chooseRoom/' + this.curHotel + '/' + this.selRoom)).data;
  },
  methods: {
    getFromSelectHotel() {
      this.selRoom = this.$route.params.selRoom;
      this.curHotel = this.$route.params.curHotel;
    },
    getData(url) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
      } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.open("GET", url, false);
      xmlhttp.send();
      return xmlhttp.response;
    },
    sureOrder(e) {
      function getNextDate(date, day) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
      };
      this.start_time = this.start_time.toISOString().slice(0, 10);
      this.end_time = this.end_time.toISOString().slice(0, 10);
      this.start_time= getNextDate(this.start_time,1);
      this.end_time=getNextDate(this.end_time,1);
      let state1 = JSON.parse(sessionStorage.getItem("state"));

      axios.put('http://' + sessionStorage.getItem('ip') + ":8080/consumer/reserve/" +
        state1.user.name + '/' + this.curHotel + '/' + this.selRoom +
        '/' + this.start_time + '/' + this.end_time + '/' + this.cus_name + '/' + this.cus_phone);
      this.$message("下单成功，请进入个人订单界面支付")
      this.$router.push({ name:'UserCenter'})
      // alert(sessionStorage.getItem('ip') + ":8080/consumer/reserve/" +
      //   state1.user.name + '/' + this.curHotel + '/' + this.selRoom +
      //   '/' + this.start_time + '/' + this.end_time + '/' + this.cus_name + '/' + this.cus_phone);

    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getFromSelectHotel'
  }
}
</script>

<style scoped>

</style>
