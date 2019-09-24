<template>
  <div class="container">
    <TitleComponent>基本信息</TitleComponent>
    <el-row>
      <el-col :span="8"><span>门店名称：</span>{{ storeInfo.shopName }}</el-col>
      <el-col :span="8"><span>门店代码：</span>{{ storeInfo.shopCode }}</el-col>
      <el-col :span="8"><span>门店缩写：</span>{{ storeInfo.shortName }}</el-col>
      <el-col :span="8"><span>加盟方式：</span>{{ storeInfo.type == 0 ? '加盟店':( storeInfo.type == 1?'直营店':'其他' ) }}</el-col>
      <el-col :span="8"><span>门店级别：</span>{{ storeInfo.level || '-' }}</el-col>
      <el-col :span="8"><span>门店类型：</span>{{ storeInfo.shopType || '-' }}</el-col>
      <el-col :span="8"><span>门店品牌：</span>{{ storeInfo.shopBrand || '-' }}</el-col>
      <el-col :span="16"><span>营业执照号：</span>{{ storeInfo.businessLicenseNum || '-' }}</el-col>
      <el-col :span="24"><span>详细地址：</span>{{ storeInfo.shopAddress || '-' }}</el-col>
      <el-col :span="8"><span>门店面积：</span>{{ storeInfo.shopArea || '-' }}</el-col>
      <el-col :span="8"><span>电费单价：</span>{{ storeInfo.electricityPrice || '-' }}</el-col>
      <el-col :span="8"><span>水费单价：</span>{{ storeInfo.waterPrice || '-' }}</el-col>
      <el-col :span="8"><span>房租单价：</span>{{ storeInfo.housePrice || '-' }}</el-col>
      <el-col :span="8"><span>店长数：</span>{{ storeInfo.managerNum || '-' }}</el-col>
      <el-col :span="8"><span>人员成本：</span>{{ storeInfo.employeePrice || '-' }}</el-col>
      <el-col :span="8"><span>其他成本：</span>{{ storeInfo.otherPrice || '-' }}</el-col>
      <el-col :span="8"><span>锅炉信息：</span>{{ storeInfo.boilerType || '-' }}</el-col>
      <el-col :span="8"><span>开业时间：</span>{{ storeInfo.openDate || '-' }}</el-col>
      <el-col :span="8"><span>试营业截止日期：</span>{{ storeInfo.probationDate || '-' }}</el-col>
      <el-col :span="8"><span>门店到期日：</span>{{ storeInfo.expirationDate || '-' }}</el-col>
      <el-col :span="8"><span>门店电话：</span>{{ storeInfo.shopTel || '-' }}</el-col>
      <el-col :span="8"><span>省：</span>{{ storeInfo.province || '-' }}</el-col>
      <el-col :span="8"><span>市：</span>{{ storeInfo.city || '-' }}</el-col>
      <el-col :span="8"><span>区：</span>{{ storeInfo.area || '-' }}</el-col>
    </el-row>

    <el-tabs type="card">
      <el-tab-pane label="潜在客户列表"><ClueComponent :id="id" /></el-tab-pane>
      <el-tab-pane label="会员列表"><MemberComponent :id="id" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClueComponent from './components/clue';
import MemberComponent from './components/member';
export default {
  props: {
    id: Number
  },
  components: { ClueComponent, MemberComponent },
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
      storeInfo: {}
    }
  },
  methods: {
    init() {
      this.axios.post('/store/storeDetails', { storeId: this.id }).then(res => this.storeInfo = res.result.store[0]);
    },
  }
}
</script>

<style scoped>
  .container {
    padding: 0 16px 24px;
  }
  .el-row {
    margin-bottom: 18px;
  }
  .el-col {
    color: #888;
    text-indent: 12px;
    line-height: 42px;
  }
  .el-col span {
    color: #333;
  }
</style>