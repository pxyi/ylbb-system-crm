<template>
  <div class="container">
    <el-form :model="formGroup" ref="formGroup" label-width="100px">
      <el-form-item label="代理商" prop="agentId">
        <el-select v-model="formGroup.agentId" placeholder="请选择代理商" @change="agentChange($event)">
          <el-option v-for="o in agentList" :key="o.id" :label="o.dealerName" :value="o.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签名" prop="smsSignId">
        <el-select v-model="formGroup.smsSignId" placeholder="请选择签名">
          <el-option v-for="o in signList" :key="o.id" :label="o.smsSign" :value="o.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剩余短信条数" prop="smsNum">
        <el-input v-model="formGroup.smsNum" readonly placeholder="请选择代理商"></el-input>
      </el-form-item>
      <el-form-item label="短信模板id" prop="templateId">
        <el-input v-model="formGroup.templateId" placeholder="请输入短信模板id">
          <template slot="append"><el-button type="primary">搜索</el-button></template>
        </el-input>
      </el-form-item>
      <el-form-item label="短信模板标题" prop="templateTitle">
        <el-input v-model="formGroup.templateTitle" readonly placeholder="请选择短信模板"></el-input>
      </el-form-item>
      <el-form-item label="短信模板内容" prop="templateContent">
        <el-input v-model="formGroup.templateContent" readonly type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请选择短信模板"></el-input>
      </el-form-item>
      <el-form-item label="短信类型" prop="smsType">
        <el-input v-model="formGroup.smsType" readonly placeholder="请选择短信模板"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认发送短信</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { params: Object },
  data() {
    return {
      agentList: [],
      signList: [],
      formGroup: {
        agentId: null,
        smsSignId: null,
        smsNum: null,
        templateId: null,
        templateTitle: null,
        templateContent: null,
        smsType: null
      }
    }
  },
  created() {
    this.axios.post('/smsTemplate/messageChannel').then(res => this.agentList = res.result);
  },
  methods: {
    agentChange(id) {
      this.axios.post('/smsTemplate/remainingSms', { id }).then(res => this.formGroup.smsNum = res.result);
      this.axios.post('/smsTemplate/smsSignature', { id }).then(res => this.signList = res.result)
    },
    submit() {

    }
  }
}
</script>

<style scoped>
.container {
  padding: 0 16px;
}
.el-select {
  width: 100%;
}
</style>