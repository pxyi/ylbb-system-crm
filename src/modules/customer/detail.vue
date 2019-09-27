<template>
  <div class="container">
    <TitleComponent>家长信息</TitleComponent>
    <el-row>
      <el-col :span="8"><span>姓名：</span><span>{{ memberInfo.parentName }}</span></el-col>
      <el-col :span="8"><span>手机号：</span><span>{{ memberInfo.mobilePhone }}</span></el-col>
      <el-col :span="8"><span>宝宝数量：</span><span>{{ memberInfo.babyNumber }}</span></el-col>
    </el-row>
    <TitleComponent>宝宝信息</TitleComponent>
    <el-row>
      <el-col :span="8"><span>姓名：</span><span>{{ memberInfo.name || '-' }}</span></el-col>
      <el-col :span="8"><span>昵称：</span><span>{{ memberInfo.nick || '-' }}</span></el-col>
      <el-col :span="8"><span>性别：</span><span>{{ memberInfo.sex || '-' }}</span></el-col>
      <el-col :span="8"><span>生日：</span><span>{{ memberInfo.birthday || '-' }}</span></el-col>
      <el-col :span="8"><span>身高：</span><span>{{ memberInfo.height ? memberInfo.height + 'cm' : '-' }}</span></el-col>
      <el-col :span="8"><span>体重：</span><span>{{ memberInfo.weight ? memberInfo.weight + 'kg' : '-' }}</span></el-col>
      <el-col :span="8"><span>门店归属：</span><span>{{ memberInfo.shopName || '-' }}</span></el-col>
      <el-col :span="8"><span>所属社区：</span><span>{{ memberInfo.communityName || '-' }}</span></el-col>
    </el-row>
    <template v-if="memberInfo.memberInfo">
      <TitleComponent>会员卡信息</TitleComponent>
      <TableComponent :dataSet="memberInfo.memberInfo">
        <el-table-column label="会员卡类型" prop="cardTypeName"></el-table-column>
        <el-table-column label="会员卡状态" prop="cardTypeName">
          <template v-slot="scope">
            {{ scope.row.recordStatus == 0 ? '未使用' : 
               scope.row.recordStatus == 1 ? '使用中' : 
               scope.row.recordStatus == 2 ? '即将过期' : '已过期' }}
          </template>
        </el-table-column>
        <el-table-column label="办卡时间" prop="createDate"></el-table-column>
        <el-table-column label="失效时间" prop="expireDate"></el-table-column>
        <el-table-column label="有效期剩余天数" prop="differenceMonth"></el-table-column>
        <el-table-column label="剩余卡次" prop="cardTimes"></el-table-column>
      </TableComponent>
    </template>
    
    <TitleComponent>标签信息</TitleComponent>
    <div class="not-tag" v-if="!labelList.length && !visitList.length">暂无标签</div>
    <div style="margin-bottom: 30px;">
      <template v-if="labelList.length"><el-tag v-for="(list, fileIndex) in labelList" :key="fileIndex">{{list}}</el-tag></template>
      <template v-if="visitList.length"><el-tag v-for="(list, fileIndex) in visitList" :key="fileIndex">{{list.visitName}}</el-tag></template>
    </div>

    <el-tabs type="card">
      <el-tab-pane v-if="visitId" lazy label="跟踪记录"><TrackingRecordComponent :id="id" :visitId="visitId" /></el-tab-pane>
      <el-tab-pane lazy label="商品购买记录"><GoodsBuyComponent :id="id" /></el-tab-pane>
      <el-tab-pane lazy label="福利兑换记录"><WelfareExchangeComponent :id="id" /></el-tab-pane>
      <el-tab-pane lazy label="福利购买记录"><WelfareBuyComponent :id="id" /></el-tab-pane>
      <el-tab-pane lazy label="消费记录"><ConsumptionComponent :id="id" /></el-tab-pane>
      <el-tab-pane lazy label="预约记录"><ReserveComponent :id="id" /></el-tab-pane>
      <el-tab-pane lazy label="意见反馈"><FeedbackComponent :id="id" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TrackingRecordComponent from './components/tracking-record';
import GoodsBuyComponent from './components/goods-buy';
import WelfareExchangeComponent from './components/welfare-exchange';
import WelfareBuyComponent from './components/welfare-buy';
import ConsumptionComponent from './components/consumption';
import ReserveComponent from './components/reserve';
import FeedbackComponent from './components/feedback';
export default {
  props: {
    id: Number,
    visitId: Number
  },
  components: {
    TrackingRecordComponent,
    GoodsBuyComponent,
    WelfareExchangeComponent,
    WelfareBuyComponent,
    ConsumptionComponent,
    ReserveComponent,
    FeedbackComponent
  },
  created() {
    this.init();

    //标签信息    
    this.axios.post('/store/memberLabelInfo', { memberId: this.id }).then(res => this.labelList = res.result || []);
    //回访名单标签
    this.axios.post('/visit/selectMemberVisitById', { memberId: this.id }).then(res => this.visitList = res.result.visitInfo || [])
  },
  watch: {
    id: function (e) {
      this.init()
    }
  },
  data() {
    return {
      labelList: [],
      visitList: [],
      memberInfo: {}
    }
  },
  methods: {
    init() {
      this.axios.post('/store/memberDetails', { memberId: this.id }).then(res => this.memberInfo = res.result.member);
    },
  }
}
</script>

<style lang="less" scoped>
  .not-tag {
    color: #999;
    height: 80px;
    line-height: 40px;
    text-align: center;
  }
  .el-row {
    margin-bottom: 18px;
  }
  .el-col {
    color: #666;
    text-indent: 12px;
    line-height: 36px;
  }
  div /deep/ .el-tag {
    margin-right: 8px;
    margin-bottom: 10px;
  }
</style>