<template>
  <div>
    <el-table
      :data="listFavor"
      height="500"
      border
      style="width: 100%;color: coral">
      <el-table-column label="操作">
        <template #default={row}>
        <el-button  type="danger" @click="deleteFavor(row)">删除</el-button>
        </template>
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
      <el-table-column prop="id" label="操作">
        <template #default={row}>
          <el-button v-if="true" type="primary" @click="toOrder(row)">预订</el-button>
        </template>
        <!--        <el-button v-else="true" disabled>评价完成</el-button>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Favor",
  data(){
    return{
      listFavor:[],
    }
  },methods:{
    toOrder(row){

    },deleteFavor(row){
      let state1=JSON.parse(sessionStorage.getItem("state"));
      axios.put("http://" + sessionStorage.getItem('ip') + ":8080/consumer/deleteCollect/"+state1.user.name+"/"+row.hotelName+"/"+row.roomNumber).then(
        (res)=>{
          this.listFavor=res.data.data;
        }
      ).catch((error)=> {
        console.log(error)
      });
    }
  },mounted() {
    //read the data for backside
    let state1=JSON.parse(sessionStorage.getItem("state"));
    axios.get("http://" + sessionStorage.getItem('ip') + ":8080/consumer/collect/"+state1.user.name).then(
      (res)=>{
        this.listFavor=res.data.data;
      }
    ).catch((error)=> {
      console.log(error)
    });
  }
}
</script>

<style scoped>

</style>
