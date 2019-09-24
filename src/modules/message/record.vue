<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="短信发送记录">
        <TableComponent url="/smsTemplate/sendSmsRecord">
          <el-table-column label="任务ID" width="100" prop="id"></el-table-column>
          <el-table-column label="短信代理商" prop="agentName" width="150"></el-table-column>
          <el-table-column label="签名" prop="smsSign" width="150"></el-table-column>
          <el-table-column label="类型" prop="smsType" width="150"></el-table-column>  
          <el-table-column label="模板ID" prop="templateId" width="150"></el-table-column>  
          <el-table-column label="模板内容" prop="templateContent" width="150">
            <template v-slot="scope">
              <el-popover placement="top-start" title="模板内容" width="300" trigger="hover" :content="scope.row.templateContent">
                <el-button type="text" slot="reference">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>   
          <el-table-column label="用户标签" prop="queryName" width="150">
            <template v-slot="scope">
              <el-popover placement="top-start" title="标签内容" width="300" trigger="hover">
                <p v-for="item in scope.row.queryNameArr" :key ="item"> {{ item }} </p>
                <el-button type="text" slot="reference">详情</el-button>
              </el-popover>
            </template>
          </el-table-column>   
          <el-table-column label="状态" prop="sendStatus" width="150"></el-table-column>  
          <el-table-column label="原因" prop="sendErrorMsg" width="300">
            <template v-slot="scope">{{scope.row.sendErrorMsg}}</template>
          </el-table-column>   
          <el-table-column label="ES总数" prop="esTotal" width="150"></el-table-column>
          <el-table-column label="发送成功数" prop="smsSuccess" width="150"></el-table-column>
          <el-table-column label="发送失败数" prop="smsFail" width="150"></el-table-column>
          <el-table-column label="接收成功数" prop="smsReceiveSuccess" width="150"></el-table-column>
          <el-table-column label="接收失败数" prop="smsReceiveFail" width="150"></el-table-column>
          <el-table-column label="请求发送时间" prop="requestDate" width="200"></el-table-column>
          <el-table-column label="发送完成时间" prop="sendFinishDate" width="200"></el-table-column>
        </TableComponent>
      </el-tab-pane>
      <el-tab-pane label="push发送记录">
        <TableComponent url="/smsTemplate/selectSmsRecord">
          <el-table-column label="url链接" prop="imgUrl"></el-table-column>
          <el-table-column label="发送内容" prop="content"></el-table-column>
          <el-table-column label="发送时间" prop="createDate"></el-table-column>  
        </TableComponent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
  .container {
    padding: 16px;
    background: #fff;
  }
</style>