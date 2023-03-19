<template>
  <div>
    <h1>酒店管理员管理系统    <el-button type="danger" @click="Logout">退出登录</el-button></h1>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-set-up"></i>房间信息修改</span>
        <div>
          <el-form>
            <el-form-item label="酒店名" label-width="200px"><el-input v-model="upd.hot_name"></el-input></el-form-item>
            <el-form-item label="房间名" label-width="200px"><el-input v-model="upd.room_name"></el-input></el-form-item>
            <el-form-item label="房间类型" label-width="200px"><el-input v-model="upd.room_type"></el-input></el-form-item>
            <el-form-item label="房间介绍" label-width="200px"><el-input v-model="upd.info"></el-input></el-form-item>
            <el-form-item label="房间价格" label-width="200px"><el-input v-model="upd.price"></el-input></el-form-item>
            <br>
            <el-button id="makeSure_upd" @click="doUpd">提交</el-button>
          </el-form>
        </div>

      </el-tab-pane>
      <el-tab-pane><span slot="label"><i class="el-icon-search"></i> 客户订单查询</span>
        <div>
          <el-form>
            <el-form-item label="客户用户名" label-width="200px" >
              <el-input v-model="cus_name"></el-input>
            </el-form-item>
            <el-form-item label="指定酒店名" label-width="200px">
              <el-input v-model="hot_name"></el-input>
            </el-form-item>
            <el-button id="makeSure" @click="sure">提交</el-button>
          </el-form>

          <el-table :data="this.orders">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="consumerName" label="Consumer Name" width="150"></el-table-column>
            <el-table-column prop="hotelName" label="Hotel Name" width="150"></el-table-column>
            <el-table-column prop="roomNumber" label="Room Number" width="100"></el-table-column>
            <el-table-column prop="startTime" label="Start Time" width="200"></el-table-column>
            <el-table-column prop="endTime" label="End Time" width="200"></el-table-column>
            <el-table-column prop="price" label="Price" width="100"></el-table-column>
            <el-table-column prop="roomType" label="Room Type" width="100"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-set-up"></i>营业统计</span>
        <div>
          <el-tabs type="border-card">

            <el-tab-pane>
              <span slot="label"><i class="el-icon-set-up"></i>统计房间订购量</span>
              <div>
                <el-form>
                  <el-form-item label="酒店名" label-width="200px"><el-input v-model="que.hot_name"></el-input></el-form-item>
<!--                  <el-form-item label="房间名" label-width="200px"><el-input v-model="que.room_name"></el-input></el-form-item>-->
<!--                  <el-form-item label="房间类型" label-width="200px"><el-input v-model="que.room_type"></el-input></el-form-item>-->
                  <el-date-picker
                    v-model="que.start_time"
                    type="date"
                    placeholder="开始时间"
                  ></el-date-picker>
                  <br>
                  <el-date-picker
                    v-model="que.end_time"
                    type="date"
                    placeholder="结束时间"
                  ></el-date-picker>
                  <br>
                  <el-button id="makeSure1" @click="echarts('main',1)">按天统计</el-button>
                  <el-button id="makeSure1" @click="echarts('main',2)">按房型统计</el-button>


                  <!--                  <div>-->
<!--                    <p>房间订购量 : {{ this.roomOrderCount }}</p>-->
<!--                  </div>-->
                  <div id="main" style="width: 1000px;height:400px;"></div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="el-icon-set-up"></i>统计酒店营业额</span>
              <div>
                <el-form>
                  <el-form-item label="酒店名" label-width="200px"><el-input v-model="que.hot_name"></el-input></el-form-item>
<!--                  <el-form-item label="房间名" label-width="200px"><el-input v-model="que.room_name"></el-input></el-form-item>-->
<!--                  <el-form-item label="房间类型" label-width="200px"><el-input v-model="que.room_type"></el-input></el-form-item>-->
                  <el-date-picker
                    v-model="que.start_time"
                    type="date"
                    placeholder="开始时间"
                  ></el-date-picker>
                  <br>
                  <el-date-picker
                    v-model="que.end_time"
                    type="date"
                    placeholder="结束时间"
                  ></el-date-picker>
                  <br>
                  <el-button id="makeSure2" @click="echarts('main2',1);">按天统计</el-button>
                  <el-button id="makeSure2" @click="echarts('main2',2);">按房型统计</el-button>


                  <!--                  <div>-->
<!--                    <p>总收入金额 : {{ this.totalMoney }}</p>-->
<!--                  </div>-->

                  <div id="main2" style="width: 1000px;height:400px;" ></div>

                </el-form>

              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-message"></i>消息系统</span>
        <adminservice/>
      </el-tab-pane>

    </el-tabs>

    <!--支持修改房间基本信息等，支持按照特定筛选条件查询顾客的订房记
    录-->

  </div>
</template>

<script>
import axios from "axios";
import Adminservice from "../../components/Admin/Adminservice";
import * as echarts from 'echarts';// 基于准备好的dom，初始化echarts实例

export default {
  name: "AdminCenter",
  components: {Adminservice},
  data() {
    return {
      cus_name: '',
      hot_name: '',
      roomOrderCount: 0,
      totalMoney: 0,

      orders: [],
      form1: {},
      form2: {},
      que: {
        // hot_name: 'GZ1',
        // room_name: '103',
        // room_type: 'a',
        // start_time: '2022-11-01',
        // end_time: '2022-12-29',

        hot_name: '',
        room_name: '',
        room_type: '',
        start_time: '',
        end_time: '',
      },

      upd: {
        hot_name: '',
        room_name: '',
        room_type: '',
        info: '',
        price: ''
      },state1:{}
    }
  },
  methods: {
    echarts(id,type){
      function getNextDate(date, day) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
      };
// 基于准备好的dom，初始化echarts实例

      if (type===1){
        let myChart = echarts.init(document.getElementById(id));
        let  data1=0;
        let url1='http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticOrder/" + this.que.hot_name + '/'
          + getNextDate(this.que.start_time.toISOString().substring(0,10),1) + '/' + getNextDate(this.que.end_time.toISOString().substring(0,10),1);
        if (id!=='main'){
          url1='http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticTurnover/" + this.que.hot_name + '/'
            + getNextDate(this.que.start_time.toISOString().substring(0,10),1) + '/' + getNextDate(this.que.end_time.toISOString().substring(0,10),1);
        }
        console.log(this.que.start_time.toISOString().substring(0,10));
        data1=this.getData(url1);
        data1=JSON.parse(data1)
        data1=data1.data;
        console.log(data1);
        let  str=id=='main'?"订购量":"营业额";
        let options={
          xAxis: {
            type: 'category',name:"日期/天",
            data: data1[0]
          },
          yAxis: {
            type: 'value',name:str
          },
          series: [
            {
              data: data1[1],
              type: 'line'
            }
          ]
        };
        myChart.setOption(options);
      }else {
        let myChart = echarts.init(document.getElementById(id));
        let  data1=0;
          let url1='http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticType/" + this.que.hot_name + '/'
            + getNextDate(this.que.start_time.toISOString().substring(0,10),1) + '/' + getNextDate(this.que.end_time.toISOString().substring(0,10),1);
          if (id!=='main'){
            url1='http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticTT/" + this.que.hot_name + '/'
              + getNextDate(this.que.start_time.toISOString().substring(0,10),1) + '/' + getNextDate(this.que.end_time.toISOString().substring(0,10),1);
          }
          console.log(this.que.start_time.toISOString().substring(0,10));
          data1=this.getData(url1);
          data1=JSON.parse(data1)
          data1=data1.data;
          console.log(data1);
          let  str=id=='main'?"订购量":"营业额";
          let options={
            xAxis: {
              type: 'category',name:"房型",
              data: data1[0]
            },
            yAxis: {
              type: 'value',name:str
            },
            series: [
              {
                data: data1[1],
                type: 'bar'
              }
            ]
          };
          myChart.setOption(options);
      }
// 绘制图表

//       let myChart2 = echarts.init(document.getElementById(id2));
// // 绘制图表
//       let options2={
//         xAxis: {
//           type: 'category',name:"日期/天",
//           data: ['A', 'B', 'C']
//         },
//         yAxis: {
//           type: 'value',name:'销售额'
//         },
//         series: [
//           {
//             data: [120, 200, 150],
//             type: 'line'
//           }
//         ]
//       };
//       myChart2.setOption(options2);
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

    doUpd() {
      axios.put('http://' + sessionStorage.getItem('ip') + ":8080/manager/modify/" +
        this.upd.hot_name + '/' + this.upd.room_name +
        '/' + this.upd.room_type + '/' + this.upd.info + '/' + this.upd.price);

      alert('upd succeed!');
    },

    sure() {
      let data = this.getData('http://' + sessionStorage.getItem('ip') + ":8080/manager/inquire/" + this.cus_name + '/' + this.hot_name);
      this.orders = JSON.parse(data).data;
    },

    getRoomOrderCount() {
      console.log(typeof this.que.start_time)
      this.que.start_time = this.que.start_time.toISOString().slice(0, 10);
      this.que.end_time = this.que.end_time.toISOString().slice(0, 10);
      let data = this.getData('http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticOrder/" + this.que.hot_name + '/' + this.que.room_name + '/' + this.que.room_type + '/' + this.que.start_time + '/' + this.que.end_time);
      // alert(data);
      this.roomOrderCount = JSON.parse(data).data;
    },

    getTotalMoney() {
      this.que.start_time = this.que.start_time.toISOString().slice(0, 10);
      this.que.end_time = this.que.end_time.toISOString().slice(0, 10);
      let data = this.getData('http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticTurnover/" + this.que.hot_name + '/' + this.que.room_name + '/' + this.que.room_type + '/' + this.que.start_time + '/' + this.que.end_time);
      // alert('http://' + sessionStorage.getItem('ip') + ":8080/manager/statisticTurnover/" + this.que.hot_name + '/' + this.que.room_name + '/' + this.que.room_type + '/' + this.que.start_time + '/' + this.que.end_time);
      this.totalMoney = JSON.parse(data).data;
    },Logout(){
      console.log("退出登录");
      sessionStorage.setItem("isLogin",null);
      sessionStorage.setItem('state',null);
      this.$store.dispatch("asyncUpdateUser",{email:null,name:"unlogin"})
      this.$router.push("/adminlogin");
    }
  },
  mounted() {
    this.state1=JSON.parse(sessionStorage.getItem("state"));
    this.echarts();
  }
}
</script>

<style scoped>
h1 {

  font-family: Arial, sans-serif;

  font-size: 24px;

  color: green;

}
#main{
  align-content: center;
  margin:0 auto}
#main2{
  align-content: center;
  margin:0 auto
}

</style>
