<template>
  <div>
    <el-row :gutter="12" style="margin-bottom: 16px;">
      <el-col :span="6">
        <el-card shadow="hover">
          <label>剩余目标：</label>
          <i>{{ userInfo.intentionCount || 0 }}</i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <label>本月目标：</label>
          <i>{{ userInfo.monthTargetCount || 0 }}</i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <label>未回访名单：</label>
          <i>{{ userInfo.noVisitCount || 0 }}</i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-tooltip :content="userInfo.isWork ? '点击将签退，拒绝接受数据' : '点击将签入，可以接受数据'" placement="top">
            <el-button :loading="changeStatusLoading" @click="changeStatus" :type="userInfo.isWork ? 'primary' : null" size="small">{{ userInfo.isWork ? '已签入' : '已退出' }}</el-button>
          </el-tooltip>
          <label style="margin-left: 12px;" v-if="!changeStatusLoading">{{ userInfo.isWork ? '可以接受数据' : '拒绝接收数据' }}</label>
        </el-card>
      </el-col>
    </el-row>
    <QueryComponent :nodes="nodes" @submit="$refs.table.request($event)" />

    <TableComponent ref="table" url="/myClue/getGoingVisitList">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="活动名称" prop="name" width="140"></el-table-column>
      <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>
      <el-table-column label="未回访" prop="totalMemberCount"></el-table-column>
      <el-table-column label="已回访" prop="visitMemberCount"></el-table-column>
      <el-table-column label="参与人数" prop="joinMemberCount"></el-table-column>
      <el-table-column label="到店人数" prop="comeMemberCount"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" @click="preview(scope.row)" v-if="scope.row.name !== '有奖预约回访名单'">查看</el-button>
        </template>
      </el-table-column>
    </TableComponent>

    <el-drawer :title="activityInfo.name" size="1100px" :destroy-on-close="true" :visible.sync="showPreview">
      <PreviewComponent :activityInfo="activityInfo" />
    </el-drawer>
  </div>
</template>

<script>
import PreviewComponent from "./drawer/activity-preview";
export default {
  components: { PreviewComponent },
  data() {
    return {
      userInfo: {},
      changeStatusLoading: false,
      nodes: [
        {
          label: '活动名称',
          key: 'name',
        }
      ],
      activityInfo: {},
      previewTitle: null,
      showPreview: false
    }
  },
  created() {
    this.axios.post('/myClue/getBaseInfo').then(res => this.userInfo = res.result);
  },
  methods: {
    changeStatus() {
      this.$post('/myClue/updateStatus', { status: Number(!this.userInfo.isWork) }, {
        tip: true,
        loading: 'changeStatusLoading'
      }).then(res => {
        res.code == 1000 && (this.userInfo.isWork = Number(!this.userInfo.isWork));
      });
    },
    preview(activityInfo) {
      this.activityInfo = activityInfo;
      this.showPreview = true;
    }
  }
}
</script>

<style>
.el-card label {
  color: #999;
}
.el-card .el-card__body > i {
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
}
</style>