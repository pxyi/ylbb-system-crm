<template>
  <TableComponent url="/store/welfareTaken" :default="{ memberId: id, status: 1 }" :isParamJson="false" size="small">
    <el-table-column label="商品名称" prop="welfareProductName"></el-table-column>
    <el-table-column label="商品价格" prop="productPrice"></el-table-column>
    <el-table-column label="时间" prop="reserveTime"></el-table-column>
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>