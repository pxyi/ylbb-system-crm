<template>
  <div>
    <QueryComponent :nodes="nodes" @submit="$refs.table.request($event)">
      <el-button type="primary" @click="showDetail = true">新建活动</el-button>
    </QueryComponent>

    <TableComponent ref="table" url="/visit/selectVisitList">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="活动名称" prop="name" width="120"></el-table-column>
      <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">{{ scope.row.activityStatus == 0 ? '未分配' : scope.row.activityStatus == 1 ? '进行中' : '已结束' }}</template>
      </el-table-column>
      <el-table-column label="总数据" prop="totalMemberCount"></el-table-column>
      <el-table-column label="已回访" prop="visitMemberCount"></el-table-column>
      <el-table-column label="参与人数" prop="joinMemberCount"></el-table-column>
      <el-table-column label="到店人数" prop="comeMemberCount"></el-table-column>

      <el-table-column label="操作" fixed="right" align="center">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="seeInfo(scope.row)" v-if="scope.row.name !== '有奖预约回访名单'">查看</el-button>
          <template v-if="scope.row.name === '有奖预约回访名单'">-</template>
          <el-button type="text" size="small" @click="distributionClues(scope.row.id)" v-if="scope.row.activityStatus == 0 && scope.row.name !== '有奖预约回访名单'">分配</el-button>
        </template>
      </el-table-column>
    </TableComponent>

    <el-dialog title="线索分配" :visible.sync="showDistributionClues" width="320px">
      <el-form :model="formGroup" :rules="rules" ref="formGroup">
        <el-form-item prop="linkmanIds">
          <el-select v-model="formGroup.linkmanIds" multiple placeholder="请选择分配人员" collapse-tags clearable @change="linkmanIdsChange">
            <el-option v-for="option in personnelList" :key="option.id" :label="option.name" :value="option.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDistributionClues = false">取 消</el-button>
        <el-button type="primary" :loading="distributionCluesLoading" @click="saveDistributionClues">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer ref="drawer" title="创建活动" size="720px" :destroy-on-close="true" :visible.sync="showDetail">
      <ActivityDetailComponent />
    </el-drawer>
    <el-drawer :title="activityInfo.name" size="1000px" :destroy-on-close="true" :visible.sync="showSeeActivitiy">
      <ActivitySeeComponent :activityInfo="activityInfo" />
    </el-drawer>
  </div>
</template>

<script>
import ActivityDetailComponent from "./drawer/activity-detail";
import ActivitySeeComponent from "./drawer/activity-see";
export default {
  components: { ActivityDetailComponent, ActivitySeeComponent },
  data() {
    return {
      showDetail: false,
      showSeeActivitiy: false,
      activityInfo: {},
      nodes: [
        {
          label: '活动名称',
          key: 'name'
        },
        {
          label: '活动状态',
          key: 'status',
          type: 'S',
          options: [{ value: 0, label: '未分配' }, { value: 1, label: '进行中' }, { value: 2, label: '结束' }]
        },
        {
          label: '创建时间',
          type: 'rangepicker',
          keys: ['starDate', 'endDate']
        },
      ],
      rules: {
        linkmanIds: {required: true, message: '请选择分配人员'}
      },
      personnelList: [],
      showDistributionClues: false,
      distributionCluesLoading: false,
      formGroup: {
        visitId: null,
        linkmanIds: []
      },
    }
  },
  created() {
    this.$post('/store/getLinkmanList').then(res => this.personnelList = [{id: -1, name: '全部'}, ...res.result.list.map(p => {p.name += p.isWork ? '(在线)' : '(离线)'; return p;})]);
  },
  methods: {
    saveDistributionClues() {
      this.$refs.formGroup.validate(v => {
        let params = Object.assign({}, this.formGroup);
        params.linkmanIds = params.linkmanIds.join(',');
        v && this.$post('/store/autoAssignmentByGeneral', params, {
          tip: true,
          table: true,
          loading: 'distributionCluesLoading',
          dialog: 'showDistributionClues'
        })
      })
    },
    distributionClues(id) {
      this.showDistributionClues = true;
      setTimeout(() => {
        this.$refs.formGroup.resetFields();
        this.formGroup.visitId = id;
      });
    },
    linkmanIdsChange() {
      if (this.formGroup.linkmanIds.includes(-1)) {
        this.formGroup.linkmanIds = [...this.personnelList].filter(p => p.id !== -1).map(p => p.id);
      }
    },
    seeInfo(activityInfo) {
      this.showSeeActivitiy = true;
      this.activityInfo = activityInfo;
    }
  }
}
</script>