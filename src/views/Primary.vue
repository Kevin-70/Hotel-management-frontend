<template>
<div>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-orange"></i>酒店展示</template>

          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link :to="{name :'HotelDisplays',params:{nameh: 'a'}}">酒店照片</router-link>
            </el-menu-item>


          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-orange"></i>酒店特色活动</template>
          <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/primary/activities">优惠大全</router-link>
          </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>关于</template>
          <el-menu-item index="3-1"><router-link to="/primary/telephone">热线电话</router-link></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <router-view></router-view>
    </el-container>
  </el-container>
</div>


</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Primary",
  data(){
    return{
      username:"用户名",
    }
  },methods:{
    echarts(){

// 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'));
// 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },mounted() {
    this.echarts();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
