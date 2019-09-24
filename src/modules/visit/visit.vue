<template>
  <div>
    <el-card>
      <h2 class="title">请选择所属活动</h2>
      <el-select v-model="activityId" placeholder="请选择活动" filterable size="large">
        <el-option v-for="item in acitivityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-card>

    <el-card v-if="activityId && activityId !== 1">
      <el-form :inline="true">
        <el-form-item label="用户身份" v-if="activityInfo.havaCard"><el-tag>{{ activityInfo.havaCard }}</el-tag></el-form-item>
        <template v-if="activityInfo.contractStatus">
          <el-form-item label="门店类型" v-for="i in activityInfo.contractStatus" :key="i">
            <el-tag>{{ i == 0 ? '正常' : i == 1 ? '合同到期' : i == 2 ? '解约': '转店中' }}</el-tag>
          </el-form-item>
        </template>
        <el-form-item label="所属省份" v-if="activityInfo.provinceLists && activityInfo.provinceLists.length">
          <el-tag v-for="item in activityInfo.provinceLists" :key="item.code">{{ item.name }}</el-tag>
        </el-form-item>
        <el-form-item label="所属城市" v-if="activityInfo.cityLists && activityInfo.cityLists.length">
          <el-tag v-for="item in activityInfo.cityLists" :key="item.code">{{ item.name }}</el-tag>
        </el-form-item>
        <el-form-item label="所属门店" v-if="activityInfo.shopLists && activityInfo.shopLists.length">
          <el-tag v-for="item in activityInfo.shopLists" :key="item.code">{{ item.shopName }}</el-tag>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-show="activityId">
      <el-tabs type="card">
        <el-tab-pane label="待回访"><StayVisitComponent :id="activityId" @preview="showDetail = true; previewId = $event"  @follow="showFollow = true; previewId = $event" /></el-tab-pane>
        <el-tab-pane label="已回访"><AlreadyVisitComponent :id="activityId" @preview="showDetail = true; previewId = $event"  @follow="showFollow = true; previewId = $event" /></el-tab-pane>
      </el-tabs>
    </el-card>

    <el-drawer title="客户详情" size="720px" :destroy-on-close="true" :visible.sync="showDetail">
      <DetailComponent :id="previewId" />
    </el-drawer>

    <el-drawer title="跟进记录" size="720px" :destroy-on-close="true" :visible.sync="showFollow">
      <FollowComponent :id="previewId" :activityId="activityId"  />
    </el-drawer>
  </div>
</template>

<script>
import StayVisitComponent from './components/stay-visit';
import AlreadyVisitComponent from './components/already-visit';
import DetailComponent from './../customer/detail';
import FollowComponent from './follow'
export default {
  components: {
    StayVisitComponent,
    AlreadyVisitComponent,
    DetailComponent,
    FollowComponent
  },
  data() {
    return {
      activityId: null,
      acitivityList: [],
      activityInfo: {},
      showDetail: false,
      showFollow: false,
      previewId: null
    }
  },
  watch: {
    activityId: function(visitId) {
      visitId !== 1 && this.axios.post('/visit/selectVisitById', { visitId }).then(res => this.activityInfo = JSON.parse(res.result.visit.visitInfo[0].queryCriteria));
    }
  },
  created() {
    this.axios.post('/visit/selectVisitListNoCount').then(res => this.acitivityList = res.result);
  }
}
</script>

<style scoped>
  .el-card {
    margin-bottom: 16px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 400;
  }
  .el-card .el-select {
    width: 420px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-tag:not(:last-child) {
    margin-right: 8px;
  }
</style>