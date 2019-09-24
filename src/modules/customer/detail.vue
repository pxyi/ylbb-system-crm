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
    <TitleComponent>标签信息</TitleComponent>
    <div class="not-tag">暂无标签</div>

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
  },
  watch: {
    id: function (e) {
      this.init()
    }
  },
  data() {
    return {
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
</style>