<template>
  <div>
    <el-tag class="title">当前剩余积分：{{credit}}</el-tag>
    <el-card>请点击商品图片进行购买</el-card>
    <div class="branch">
      <div class="row" v-for="rows in branchData">
        <div class="card" v-for="cols in rows" @click="confirm(cols)" >
          <img :src="pictures[cols.id-1]"
                                 height="100" width="100">
          <div class="name">{{cols.name}}：{{cols.price}}积分</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Credit",
  data(){
    return{
      credit:1,
      goodsList:[{id:1,name:"耐摔水杯",price: 900},
        {id:2,name:"电动牙刷",price: 2000},
        {id:3,name:"精品钢笔",price: 1500},
        {id:4,name:"护眼台灯",price:1000},
        {id:5,name:"太阳镜",price:3000}],
      pictures:[require('../../assets/credit/bottle1.jpg'),
      require("../../assets/credit/brush2.jpg"),
      require("../../assets/credit/pen3.jpg"),
      require("../../assets/credit/lamp4.jpg"),
      require("../../assets/credit/glasses5.jpg")],
      branchData:[]//rearranage
    }
  },mounted() {
    this.getRow()
    this.getCredit();
  },methods:{
    getRow(){
      let arr=[]
      let width=4;
            let row = Math.ceil(this.goodsList.length / width);
             for (let i = 0; i < row; i++) {
                arr[i] = [];
              let modLast = this.goodsList.length % width === 0 ? width : this.goodsList.length % width;
            let lastRow = i === (row - 1) ? modLast :width;
            for (let j = 0; j < lastRow; j++) {
                      arr[i][j] = this.goodsList[width * i + j];
                 }
                }
      this.branchData = arr;
    },getCredit(){
      let state1=JSON.parse(sessionStorage.getItem("state"));
      axios.get("http://" + sessionStorage.getItem('ip') + ":8080/consumer/credit/"+state1.user.name).then(
        (res)=>{
          this.credit=res.data.data;
        }
      ).catch((error)=> {
        console.log(error)
      });
    },confirm(cols) {

      this.$confirm('您是否确定要购买'+cols.name+',将花费积分'+cols.price, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.credit>=cols.price){
          let state1=JSON.parse(sessionStorage.getItem("state"));
          axios.put("http://" + sessionStorage.getItem('ip') + ":8080/consumer/buyGift/"+state1.user.name+"/"+cols.price).then(
            (res)=>{
              console.log(res.data)
            }
          ).catch((error) => {
            console.log(error);
          });
          this.$message({
            type: 'success',
            message: '购买成功'
          });
          this.getCredit();
        }else {
          this.$message({
            type: 'error',
            message: '积分不足，请进行消费充值积分'
          });
        }

      });
    }
  }
}
</script>

<style scoped>

.branch {
  width: 800px;
  margin: 0 auto;
}
.card {
  height: 100px;
  width: 100px;
  margin: 40px;
  background-color: turquoise;
  /*display: flex;*/
  justify-content: center;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
}
.title{
  font-family:  "Microsoft YaHei",serif;
  font-size: larger;
}
.name{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  align-items: baseline;
}

</style>
