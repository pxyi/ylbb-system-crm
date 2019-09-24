<template>
  <div>
    <TableComponent url="/myClue/getNoVisitList" :default="{memberVisitStatus: memberVisitStatus, visitId: visitId}">
      <el-table-column label="姓名" prop="memberName"></el-table-column>
      <el-table-column label="手机号" prop="mobilePhone" width="110"></el-table-column>
      <el-table-column label="状态" prop="memberVisitStatusInfo" width="60"></el-table-column>
      <el-table-column label="活动名称" prop="visitName"></el-table-column>
      <el-table-column label="宝宝类型" prop="babyNumber" width="70">
        <template v-slot="scope">{{ scope.row.babyNumber + '胞胎' }}</template>
      </el-table-column>
      <el-table-column label="性别" prop="sex" width="50"></el-table-column>
      <el-table-column label="身份" width="80">
        <template v-slot="scope">
          <el-tag size="small" :type="scope.row.havacard ? '' : 'info'" effect="dark">
            {{ scope.row.havacard ? '会员' : '非会员' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="会员卡剩余次数" prop="cardTimes" width="110"></el-table-column>
      <el-table-column label="所属省份" prop="provinceName"></el-table-column>
      <el-table-column label="所属城市" prop="cityName"></el-table-column>
      <el-table-column label="领取时间" prop="receiveTime" width="90"></el-table-column>
      <el-table-column label="操作" width="60">
        <template v-slot="scope">
          <el-button type="text" @click="preview(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </TableComponent>

    <el-drawer :title="memberInfo.memberName" size="960px" :destroy-on-close="true" :visible.sync="showPreview">
      <MemberDetailComponent :id="memberInfo.memberId" :visitId="visitId" />
    </el-drawer>
  </div>
</template>

<script>
import MemberDetailComponent from '@M/customer/detail';
export default {
  components: { MemberDetailComponent },
  props: { memberVisitStatus: Number, visitId: Number },
  data() {
    return {
      showPreview: false,
      memberInfo: {}
    }
  },
  methods: {
    preview(memberInfo) {
      this.showPreview = true;
      this.memberInfo = memberInfo;
    }
  }
}
</script>

<style>

</style>