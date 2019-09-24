<template>
  <div class="container">
    <el-form label-width="100px">
      <el-form-item label="省市区">
        <el-cascader v-model="address" placeholder="请选择省市区" :props="props" collapse-tags filterable style="width: 300px;"></el-cascader>
      </el-form-item>
      <el-form-item label="用户标签">
        <template v-for="item in tagList">
          <template v-for="c in item[1]">
            <el-tag v-if="c.checked" closable :key="c.labelId" @close="c.checked = false">{{ c.labelName }}</el-tag>
          </template>
        </template>
        <el-button type="primary" icon="el-icon-plus" circle size="small" @click="showLabel = true"></el-button>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" plain @click="send('showSendMessage')">发送短信</el-button>
        <el-button type="primary" plain @click="send('showSendPush')">发送push</el-button>
      </el-form-item>
    </el-form>

    <el-table tooltip-effect="dark" :data="dataSet">
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="生日" prop="birth_day"></el-table-column>
      <el-table-column label="宝宝数量" prop="baby_number"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, prev, pager, next" :hide-on-single-page="true" @current-change="pageInfo.pageNo = $event; getData()" :total="pageInfo.total"></el-pagination>

    <el-dialog title="选择用户标签" top="10vh" :visible.sync="showLabel">
      <el-form label-width="110px">
        <el-form-item v-for="item in tagList" :key="item[0]" :label="item[0] + ':'">
          <el-checkbox v-model="c.checked" v-for="c in item[1]" :key="c.labelId" border>{{ c.labelName }}</el-checkbox>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-drawer title="发送短信" size="520px" :destroy-on-close="true" :visible.sync="showSendMessage">
      <MessageComponent :params="params" />
    </el-drawer>

    <el-drawer title="发送Push" size="720px" :destroy-on-close="true" :visible.sync="showSendPush">
      <PushComponent />
    </el-drawer>
  </div>
</template>

<script>
import MessageComponent from './drawer/message';
import PushComponent from './drawer/push';
export default {
  components: { MessageComponent, PushComponent },
  data() {
    const _this = this;
    return {
      dataSet: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      params: null,
      showSendMessage: false,
      showSendPush: false,
      showLabel: false,
      address: null,
      tagList: null,
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          if (level === 0) {
            _this.axios.post('/linkage/getAllProvince').then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
          } else if (level === 1) {
            _this.axios.post('/linkage/getCityByProvince', { provinceCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
          } else {
            _this.axios.post('/linkage/getAreaByCity', { cityCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: true }))));
          }
        }
      }
    }
  },
  created() {
    this.axios.post('/labelEditing/tabulationLabel').then(res => this.tagList = Object.entries(res.result));
  },
  methods: {
    onSubmit() {
      this.getParams().then(res => {
        this.pageInfo.pageNo = 1;
        this.getData(res);
      });
    },
    send(drawer) {
      this.getParams().then(res => this[drawer] = true);
    },
    getData() {
      this.axios.post('@es/crm/query/label', Object.assign({}, this.params, this.pageInfo)).then(res => {
        this.dataSet = res.result;
        this.pageInfo.total = res.total;
      });
    },
    getParams() {
      return new Promise((resolve, reject) => {
        const hasLabel = this.tagList.some(t => t[1].some(i => i.checked));
        if (this.address || hasLabel) {
          let [ province, city, area ] = this.address || [,,];
          let labels = [[]];
          this.tagList.map(t => {
            const tags = t[1].filter(i => i.checked);
            tags.length == 1 ? labels[0].push(tags[0].labelId) : labels.push(tags.map(i => i.labelId));
          });
          this.params = { province, city, area, labels: JSON.stringify(labels) };
          resolve(this.params);
        } else {
          reject();
          this.$message({ message: '至少选择一项查询条件', type: 'warning' });
        }
      })
    }
  }
}
</script>

<style>
.container {
  padding: 16px;
  background: #fff;
}
.el-card {
  margin-top: 16px;
}
.el-tag {
  margin-right: 6px;
}
.el-dialog {
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.el-dialog__header {
  height: 54px;
}
.el-dialog__body {
  flex: 1;
  overflow: auto;
}

.el-pagination {
  margin-top: 16px;
  text-align: right;
}
</style>