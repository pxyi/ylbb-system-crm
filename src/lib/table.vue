<template>
  <div v-loading="loading" class="table-content">
    <el-table tooltip-effect="dark" :data="list" :size="size">
      <slot></slot>
    </el-table>

    <el-pagination v-if="hasPage" background layout="total, sizes, prev, pager, next" :hide-on-single-page="true" @current-change="currentChange($event)" @size-change="sizeChange($event)" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    isParamJson: {
      type: Boolean,
      default: true
    },
    auto: {
      type: Boolean,
      default: true
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    dataSet: {
      type: Array,
      default: () => []
    },
    default: {
      type: Object,
      default: () => { return {} }
    },
    init: {
      type: Object,
      default: () => { return {} }
    }
  },
  created() {
    if (this.auto) {
      this.initParams = this.init;
      this.request();
      this.initParams = {};
      this.list = this.dataSet;
    }
  },
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      params: {},
      initParams: {},
      list: [],
      loading: false
    }
  },
  methods: {
    sizeChange(e) {
      this.pageSize = e;
      this.request();
    },
    currentChange(e) {
      this.pageNum = e;
      this.request();
    },
    request(params) {
      if (this.loading) { return; }
      this.loading = true;
      if(params) {
        this.pageNum = 1;
        this.params = params;
      }
      let paramJson = Object.assign({}, this.default, this.params);
      this.axios.post(this.url, Object.assign({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }, this.isParamJson ? { 
        paramJson: JSON.stringify(Object.assign(paramJson, this.initParams))
      } : Object.assign(paramJson, this.initParams) )).then(res => {
        this.loading = false;
        try {
          if (res.code == 1000) {
            if (this.hasPage) {
              if (Object.keys(res.result).length) {
                this.total = Object.keys(res.result)[0].indexOf('count') > -1 ? res.result[Object.keys(res.result)[0]] : res.result[Object.keys(res.result)[1]];
                this.list = Object.keys(res.result)[0].indexOf('count') > -1 ? res.result[Object.keys(res.result)[1]] : res.result[Object.keys(res.result)[0]];
              } else {
                this.total = 0;
                this.list = [];
              }
            } else {
              this.list = res.result;
            }
          } else {
            this.$message({ message: res.info || '操作失败', type: 'warning' });
          }
        } catch (error) { }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .table-content {
    padding: 0 16px 16px;
    background: #fff;
    .el-table {
      margin-bottom: 16px;
    }
    .el-pagination {
      text-align: right;
    }
  }
</style>