<template>
  <TableComponent url="/store/consumptionTaken" :default="{ memberId: id }" size="small">
    <el-table-column label="门店名称" prop="shopName"></el-table-column>
    <el-table-column label="卡类型" prop="cardTypeName"></el-table-column>
    <el-table-column label="消费金额" prop="consumption"></el-table-column>
    <el-table-column label="消费时间" prop="consumeDate"></el-table-column>
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>