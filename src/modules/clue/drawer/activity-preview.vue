<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户身份:" v-if="activity.havaCard"><el-tag>{{ activity.havaCard ? '会员' : '非会员' }}</el-tag></el-form-item>
      <el-form-item label="性别:" v-if="activity.sex"><el-tag>{{ activity.sex == 1 ? '男' : '女' }}</el-tag></el-form-item>
      <template v-if="activity.contractStatus != ''">
        <el-form-item label="门店类型:">
          <el-tag v-for="i in activity.contractStatus" :key="i">{{ i == 0 ? '正常' : i == 1 ? '合同到期' : i == 2 ? '解约': '转店中' }}</el-tag>
        </el-form-item>
      </template>
      <template v-if="activity.type">
        <el-form-item label="活动类型:">
          <el-tag v-for="i in activity.type.split(',')" :key="i">{{ i == 1 ? '婴儿' : i == 2 ? '幼儿' : i == 3 ? '少儿' : i == 4 ? '宝妈': i == 5 ? '宝爸': '其他' }}</el-tag>
        </el-form-item>
      </template>
      <el-form-item v-if="activity.bStart" label="最小年龄:">{{ activity.bStart }}岁</el-form-item>
      <el-form-item v-if="activity.bEnd" label="最大年龄:">{{ activity.bEnd }}岁</el-form-item>
      <el-form-item v-if="activity.month" label="创建时间:">{{ activity.month }}个月之内</el-form-item>
      <el-form-item label="所属省份:" v-if="activity.provinceNameList && activity.provinceNameList.length">
        <el-tag v-for="item in activity.provinceNameList" :key="item">{{ item }}</el-tag>
      </el-form-item>
      <el-form-item label="所属城市:" v-if="activity.cityNameList && activity.cityNameList.length">
        <el-tag v-for="item in activity.cityNameList" :key="item">{{ item }}</el-tag>
      </el-form-item>
      <el-form-item label="所属门店:" v-if="activity.storeNameList && activity.storeNameList.length">
        <el-tag v-for="item in activity.storeNameList" :key="item">{{ item }}</el-tag>
      </el-form-item>
    </el-form>

    <el-tabs type="card">
      <el-tab-pane lazy label="未回访"><PreviewVisitComponent :memberVisitStatus="0" :visitId="activityInfo.id" /></el-tab-pane>
      <el-tab-pane lazy label="未接通"><PreviewVisitComponent :memberVisitStatus="1" :visitId="activityInfo.id" /></el-tab-pane>
      <el-tab-pane lazy label="考虑中"><PreviewVisitComponent :memberVisitStatus="2" :visitId="activityInfo.id" /></el-tab-pane>
      <el-tab-pane lazy label="无意向"><PreviewVisitComponent :memberVisitStatus="3" :visitId="activityInfo.id" /></el-tab-pane>
      <el-tab-pane lazy label="有意向"><PreviewVisitComponent :memberVisitStatus="4" :visitId="activityInfo.id" /></el-tab-pane>
      <el-tab-pane lazy label="已到店"><PreviewVisitComponent :memberVisitStatus="5" :visitId="activityInfo.id" /></el-tab-pane>
      <!-- <el-tab-pane lazy label="未分配"><PreviewVisitComponent :memberVisitStatus="6" :visitId="activityInfo.id" /></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import PreviewVisitComponent from "./activity-visit";
export default {
  components: { PreviewVisitComponent },
  props: { activityInfo: Object },
  computed: {
    activity: function() {
      return JSON.parse(this.activityInfo.queryCriteria);
    }
  },
  created() {
    // console.log(this.activityInfo)
  }
}
</script>

<style scoped>
  .el-tag:not(:last-child) {
    margin-right: 8px;
  }
</style>