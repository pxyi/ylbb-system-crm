<template>
  <div>
    <el-form :model="formGroup" :rules="rules" ref="formGroup">
      <el-form-item prop="content">
        <el-input v-model="formGroup.content" type="textarea" :rows="2" placeholder="请输入跟进内容"></el-input>
      </el-form-item>
      <el-form-item prop="state">
        <el-select v-model="formGroup.state" placeholder="请选择跟进状态">
          <el-option value="未接通" label="未接通"></el-option>
          <el-option value="考虑中" label="考虑中"></el-option>
          <el-option value="有意向" label="有意向"></el-option>
          <el-option value="无意向" label="无意向"></el-option>
          <el-option value="空号" label="空号"></el-option>
        </el-select>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <TableComponent ref="table" url="/trackingRecord/selectTrackingRecord" :default="{ memberId: id }" size="small" :hasPage="false">
      <el-table-column label="活动名称" prop="visitName"></el-table-column>
      <el-table-column label="跟进详情" prop="content"></el-table-column>
      <el-table-column label="跟进状态" prop="state"></el-table-column>
      <el-table-column label="跟进人" prop="followPerson"></el-table-column>
      <el-table-column label="跟进时间" prop="createTime"></el-table-column>
      <el-table-column label="跟进次数" prop="times"></el-table-column>
    </TableComponent>
  </div>
</template>

<script>
export default {
  props: { id: Number, visitId: Number },
  data() {
    return {
      formGroup: {
        content: null,
        state: null
      },
      rules: {
        content: { required: true, message: '请输入跟进内容' },
        state: { required: true, message: '请选择跟进状态' }
      }
    }
  },
  methods: {
    save() {
      this.$refs.formGroup.validate(valid => valid && this.axios.post('/trackingRecord/insertMemberTrackingRecord', Object.assign({
        memberId: this.id,
        visitId: this.visitId
      }, this.formGroup)).then(res => {
        this.$refs.formGroup.resetFields();
        this.$refs.table.request();
      }))
    }
  }
}
</script>
<style scoped>
  div /deep/ .el-select {
    width: 300px !important;
    margin-right: 14px;
  }
</style>