<template>
  <div class="container">
    
    <TableComponent ref="table" url="/smsTemplate/selectSmsTemplate" :hasPage="false">
      <el-table-column label="模板主题" width="200" prop="title"></el-table-column>
      <el-table-column label="模板内容" prop="memo"></el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header">
          <el-button type="primary" @click="updateTmpt()">添加短信模板</el-button>
        </template>
        <template v-slot="scope">
          <el-button type="text" @click="updateTmpt(scope.row)">编辑</el-button>
          <el-popover v-model="scope.row.visible">
            <p style="margin-bottom: 10px;">确定要删除该模板吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="scope.row.visible = false; deleteTmpt(scope.row.id)">确定</el-button>
            </div>
            <el-button type="text" slot="reference" style="margin-left: 10px">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </TableComponent>

    <el-drawer title="模板详情" size="720px" :visible.sync="showDetail">
      <el-form :model="formGroup" :rules="rules" ref="formGroup" label-position="top" label-width="100px">
        <el-form-item label="模板标题" prop="title">
          <el-input v-model="formGroup.title" placeholder="请输入模板标题" ></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="memo">
          <el-input v-model="formGroup.memo" type="textarea" :rows="3" placeholder="请输入模板内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetail: false,
      formGroup: {
        id: null,
        title: null,
        memo: null
      },
      rules: {
        title: [ { required: true, message: '请输入模板标题', trigger: 'blur' } ],
        memo: [ { required: true, message: '请输入模板内容', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    updateTmpt(data) {
      this.showDetail = true;
      setTimeout(() => {
        data ? (this.formGroup = data) : this.$refs['formGroup'].resetFields();
      });
    },
    submit() {
      this.$refs['formGroup'].validate((valid) => {
        if (valid) {
          this.axios.post(`/smsTemplate/${this.formGroup.id ? 'update' : 'insert'}Sms`, { paramJson: JSON.stringify(this.formGroup) }).then(res => {
            if(res.code == 1000){
              this.$message({ message: '操作成功！', type: 'success'  });
              this.$refs.table.request();
              this.showDetail = false;
            }else{
              this.$message({ message: res.info,  type: 'error'  });
            }
          })
        }
      });
    },
    deleteTmpt(smsId) {
      this.axios.post('/smsTemplate/deleteSmsTemplate', { smsId }).then(res => {
        if (res.code == 1000) {
          this.$message({ message: '操作成功', type: 'success' });
          this.$refs.table.request();
        } else {
          this.$message({ message: res.info, type: 'error' });
        }
      })
    }
  }
}
</script>
<style scoped>
  .container {
    padding: 16px 0 0;
    background: #fff;
  }
  .el-button {
    font-size: 12px;
  }
  .el-form {
    padding: 0 20px;
  }
</style>