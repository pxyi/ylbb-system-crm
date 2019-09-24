<template>
  <div class="container">
    <el-form :model="formGroup" ref="formGroup" :rules="rules" label-width="100px">
      <el-form-item label="跟进内容" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入跟进内容" v-model="formGroup.content"></el-input>
      </el-form-item>

      <el-form-item label="跟进状态" prop="state">
        <el-radio-group v-model="formGroup.state" @change="stateChange($event)">
          <el-radio-button label="#参与#">#参与#</el-radio-button>
          <el-radio-button label="#不参与#">#不参与#</el-radio-button>
          <el-radio-button label="#已到店#">#已到店#</el-radio-button>
          <el-radio-button label="#未到店#">#未到店#</el-radio-button>
          <el-radio-button label="#未接通#">#未接通#</el-radio-button>
          <el-radio-button label="#考虑中#">#考虑中#</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="跟进人" prop="crmFollowPersonId">
        <el-select v-model="formGroup.crmFollowPersonId" placeholder="请选择跟进人" >
          <el-option v-for="option in followList"  :key="option.id" :label="option.name" :value="option.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="title">跟进记录</div>
    
    <TableComponent ref="table" url="/trackingRecord/selectTrackingRecord" :hasPage="false" :isParamJson="false" :default="{ memberId: id, visitId: activityId }">
      <el-table-column label="跟进次数" prop="times">
        <template v-slot="scope">
          第{{ scope.row.times }}次跟进
        </template>
      </el-table-column>
      <el-table-column label="跟进时间" prop="createTime">
        <template v-slot="scope">
          {{ scope.row.createTime | format }}
        </template>
      </el-table-column>
      <el-table-column label="跟进人" prop="followPerson">
      </el-table-column>
      <el-table-column label="跟进记录">
        <template v-slot="scope">
          <el-tooltip effect="dark" :content="scope.row.content" placement="top">
            <span>{{ scope.row.content.length > 5 ? scope.row.content.substr(0, 5) + '...' : scope.row.content }}</span>
          </el-tooltip>
        </template>
      </el-table-column>      
      <el-table-column label="跟进状态" prop="createTime">
        <template v-slot="scope">
          <el-tag>{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="回访名单名称" prop="createTime">
        <template v-slot="scope">
          <el-tag>{{ scope.row.visitName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </TableComponent>
  </div>
</template>

<script>
import TableComponent from '@L/table';
export default {
  components: { TableComponent },
  props: { id: Number, activityId: Number },
  data() {
    return {
      formGroup: {
        id: null,
        content: null,
        state: null,
        crmFollowPersonId: null
      },
      rules: {
        content: [
          { required: true, message: '请输入跟进内容' }
        ],
        state: [
          { required: true, message: '请输入跟进状态' }
        ],
        crmFollowPersonId: [
          { required: true, message: '请输入跟进人' }
        ],
      },
      followList: []
    }
  },
  created() {
    this.axios.post('/trackingRecord/selectCrmFollowPerson').then(res => this.followList = res.result);
  },
  methods: {
    submit() {
      this.$refs['formGroup'].validate((valid) => {
        if (valid) {
          let followPerson = this.followList.filter(f => f.id === this.formGroup.state)
          this.axios.post('/trackingRecord/insertMemberTrackingRecord', Object.assign({
            visitId: this.activityId,
            memberId: this.id
          }, this.formGroup)).then(res => {
            this.$message({ type: 'success', message: res.info });
            this.$refs.table.request();
          })
        }
      });
    },
    stateChange(e) {
      this.formGroup.content = !this.formGroup.content ? e : !this.formGroup.content.includes(e) ? (this.formGroup.content + e) : this.formGroup.content;
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 0 16px;
  }
  .tag-list {
    margin: 16px 0;
  }
  .title {
    font-size: 16px;
    line-height: 42px;
    font-weight: 400;
    text-indent: 12px;
    border-bottom: solid 1px #DCDFE6;
    margin-bottom: 12px;
  }
</style>