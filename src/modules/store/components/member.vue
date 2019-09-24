<template>
  <TableComponent url="/store/storeMemberInsider" :default="{ storeId: id }" size="small" :isParamJson="false">
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="手机号" prop="mobilePhone"></el-table-column>
    <el-table-column label="宝宝类型" prop="babyNumber">
      <template slot-scope="scope">
        {{ scope.row.babyNumber == 0 || scope.row.babyNumber == 1 ? '一胞胎' : (scope.row.babyNumber == 2 ? '双胞胎' : (scope.row.babyNumber == 3 ? '三胞胎' : scope.row.babyNumber + '胞胎'))}}
      </template>                  
    </el-table-column>
    <el-table-column label="来源渠道" prop="source"></el-table-column>
    <el-table-column label="身份">
      <template slot-scope="scope">
        {{scope.row.havaCard == 0 ? '非会员': '会员'}}
      </template>                   
    </el-table-column>
    <el-table-column label="近期购买时间" prop="address"></el-table-column>      
    <el-table-column label="近期APP登录" prop="loginDate"></el-table-column> 
    <el-table-column label="近期预约时间" prop="reserveDate"></el-table-column> 
  </TableComponent>
</template>

<script>
export default {
  props: { id: Number }
}
</script>