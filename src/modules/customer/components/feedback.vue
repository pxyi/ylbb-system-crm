<template>
  <TableComponent url="/store/memberFeedBack" :default="{ memberId: id }" :isParamJson="false" size="small">
    <el-table-column label="反馈内容" prop="content"></el-table-column>
    <el-table-column label="反馈时间" prop="createDate"></el-table-column>
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>