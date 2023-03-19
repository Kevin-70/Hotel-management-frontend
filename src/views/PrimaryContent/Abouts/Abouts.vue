<template>
<div>
  <el-container>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="name" label="酒店名称" width="120">
        </el-table-column>
        <el-table-column prop="address" label="电话">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

</div>
</template>

<script>
export default {
  name: "Abouts",
  data(){
    const items = [{
      name: '广州智信大酒店',
      address: '88888999'
    },{
      name: "深圳大酒店",
      address: "88880070"
    }];
    return {
      tableData: items
    }
  }
}
</script>

<style scoped>

</style>
