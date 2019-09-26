<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户身份:" v-if="activity.havaCard"><el-tag>{{ activity.havaCard ? '会员' : '非会员' }}</el-tag></el-form-item>
      <el-form-item label="性别:" v-if="activity.sex"><el-tag>{{ activity.sex == 1 ? '男' : '女' }}</el-tag></el-form-item>
      <template v-if="activity.contractStatus || activity.contractStatus > -1">
        <el-form-item label="门店类型:">
          <el-tag v-for="i in activity.contractStatus" :key="i">{{ i == 0 ? '正常' : i == 1 ? '合同到期' : i == 2 ? '解约': '转店中' }}</el-tag>
        </el-form-item>
      </template>
      <template v-if="activity.type">
        <el-form-item label="活动类型:">
          <el-tag v-for="i in activity.type" :key="i">{{ i == 1 ? '婴儿' : i == 2 ? '幼儿' : i == 3 ? '少儿': i == 4 ? '宝妈': i == 5 ? '宝爸': '其他' }}</el-tag>
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
      <el-form-item label="总数量:">{{ activityInfo.totalMemberCount }}</el-form-item>
      <el-form-item label="待回访:">{{ activityInfo.noReturnVisitCount }}</el-form-item>
      <el-form-item label="有意向:">{{ activityInfo.intentionCount }}</el-form-item>
      <el-form-item label="到店:">{{ activityInfo.comeMemberCount }}</el-form-item>
    </el-form>

    <QueryComponent :nodes="nodes" @submit="$refs.table.request($event)">
      <template v-slot="scope">
        <el-button @click="showImport = true">导入</el-button>
        <el-button @click="exportExcel(scope.params)">导出</el-button>
      </template>
    </QueryComponent>

    <TableComponent ref="table" url="/myClue/getNoVisitList" :default="{ visitId: activityInfo.id }">
      <el-table-column label="负责销售" prop="tmkName" width="80"></el-table-column>
      <el-table-column label="姓名" prop="memberName" width="80"></el-table-column>
      <el-table-column label="手机号" prop="mobilePhone" width="120"></el-table-column>
      <el-table-column label="状态" prop="memberVisitStatusInfo" width="80"></el-table-column>
      <el-table-column label="活动名称" prop="visitName"></el-table-column>
      <el-table-column label="宝宝类型" prop="babyNumber">
        <template v-slot="scope">{{ scope.row.babyNumber + '胞胎' }}</template>
      </el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="身份">
        <template v-slot="scope">{{ scope.row.havacard ? '会员' : '非会员' }}</template>
      </el-table-column>
      <el-table-column label="剩余卡次" prop="cardTimes"></el-table-column>
      <el-table-column label="所属省份" prop="provinceName"></el-table-column>
      <el-table-column label="所属城市" prop="cityName"></el-table-column>
      <el-table-column label="领取时间" prop="receiveTime" width="90"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button type="text" @click="preview(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </TableComponent>

    <el-drawer :title="memberInfo.memberName" size="960px" :destroy-on-close="true" :visible.sync="showPreview">
      <MemberDetailComponent :id="memberInfo.memberId" :visitId="activityInfo.id" />
    </el-drawer>

    <el-drawer :visible.sync="showImport" title="导入数据" size="400px" :destroy-on-close="true">
      <el-upload drag :action="importUrl" name="filename" :data="{token: token}" :on-success="importResult">
        <i class="el-icon-upload"></i>
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-drawer>

  </div>
</template>

<script>
import MemberDetailComponent from '@M/customer/detail';
export default {
  components: { MemberDetailComponent },
  props: { activityInfo: Object },
  computed: {
    activity: function() {
      return JSON.parse(this.activityInfo.queryCriteria);
    },
    importUrl: function () {
      return `${process.env.VUE_APP_BASE_URL}/myClue/batchImport`;
    },
    token: function () {
      return window.localStorage.getItem('token') || '';
    }
  },
  data() {
    const _this = this;
    return {
      nodes: [
        {
          label: '姓名',
          key: 'memberName'
        },
        {
          label: '手机号',
          key: 'mobilePhone'
        },
        {
          label: '身份',
          type: 'S',
          key: 'havacard',
          options: [ { label: '会员', value: 1 },{ label: '非会员', value: 0 } ]
        },
        {
          label: '所属省市',
          type: 'C',
          keys: ['provinceCode' , 'cityCode'],
          props: {
            checkStrictly: true, 
            multiple: true,
            lazy: true,
            lazyLoad (node, resolve) {
              const { level } = node;
              if (level === 0) {
                _this.axios.post('/linkage/getAllProvince').then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
              } else {
                _this.axios.post('/linkage/getCityByProvince', { provinceCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: true }))));
              }
            }
          }
        }
      ],
      showPreview: false,
      memberInfo: {},
      showImport: false
    }
  },
  methods: {
    preview(memberInfo) {
      this.showPreview = true;
      this.memberInfo = memberInfo;
    },
    importResult(res) {
      this.$message({ type: res.code == 1000 ? 'success' : 'warning', message: res.info });
    },
    exportExcel(params) {
      params.visitId = this.activityInfo.id;
      window.open(`${process.env.VUE_APP_BASE_URL}/myClue/myClueExport?paramJson=${encodeURI(JSON.stringify(params))}&token=${this.token}`);
    }
  }
}
</script>
<style scoped>
  div /deep/ .el-tag:not(:last-child) {
    margin-right: 8px;
  }
</style>