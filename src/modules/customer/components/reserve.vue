<template>
  <TableComponent url="/store/reserveTaken" :default="{ memberId: id }" :isParamJson="false" size="small">
    <el-table-column label="门店名称" prop="reserveShopName"></el-table-column>
    <el-table-column label="卡类型" prop="cardTypeName"></el-table-column>
    <el-table-column label="是否通卡" prop="tong"></el-table-column>
    <el-table-column label="时间" prop="reserveDate"></el-table-column>
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>