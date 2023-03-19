<template>
  <div>
    <el-table
      :data="infos"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="index"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="info"
        label="活动内容" width="600">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      infos:[
        {index:'1',
          info:'双十二大促销，全酒店当天半价订房'
        }]
    }
  },
  methods: {
    // open() {
    //   this.$alert('订单已被接收', '标题名称', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: `action: ${ action }`
    //       });
    //     }
    //   });  //如果open在dialog里请查找
    // }
  }
}
</script>

<style scoped>

</style>
