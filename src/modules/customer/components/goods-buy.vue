<template>
  <TableComponent url="/store/commodityToken" :default="{ memberId: id }" :isParamJson="false" size="small">
    <el-table-column label="商品名称" prop="orderProductName"></el-table-column>
    <el-table-column label="商品价格" prop="activityPrice"></el-table-column>
    <el-table-column label="购买数量" prop="totalCount"></el-table-column>
    <el-table-column label="购买时间" prop="createDate"></el-table-column>
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>