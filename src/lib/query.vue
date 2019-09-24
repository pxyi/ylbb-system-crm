<template>
  <el-form :inline="true" :model="formGroup" ref="formGroup" label-width="82px" class="query-content">
    <template v-for="item in nodes">
      <el-form-item :label="item.label" :key="item.key">

        <template v-if="item.type === 'input' || item.type === 'I'">
          <el-input v-model="formGroup[item.key]" :placeholder="item.placeholder || '请输入' + item.label" clearable @keydown.enter="onSubmit()">
            <template slot="append" v-if="item.after">{{ item.after }}</template>
          </el-input>
        </template>

        <template v-else-if="item.type === 'number' || item.type === 'N'">
          <el-input type="number" v-model="formGroup[item.key]" :placeholder="item.placeholder || '请输入' + item.label" class="input-number" @keydown.enter="onSubmit()">
            <template slot="append" v-if="item.after">{{ item.after }}</template>
          </el-input>
        </template>

        <template v-else-if="item.type === 'select' || item.type === 'S'">
          <el-select v-model="formGroup[item.key]" :multiple="item.multiple" :placeholder="item.placeholder || '请选择' + item.label" @change="type === 'simple' && onSubmit()" collapse-tags clearable>
            <el-option v-for="option in item.options" :key="option[item.valueKey || 'value']" :label="option[item.labelKey || 'label']" :value="option[item.valueKey || 'value']"></el-option>
          </el-select>
        </template>

        <template v-else-if="item.type === 'datepicker' || item.type === 'D'">
          <el-date-picker v-model="formGroup[item.key]" :placeholder="item.placeholder || '请选择' + item.label" @change="type === 'simple' && onSubmit()" type="date"></el-date-picker>
        </template>

        <template v-else-if="item.type === 'rangepicker' || item.type === 'R'">
          <el-date-picker v-model="formGroup[item.keys.join()]" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="type === 'simple' && onSubmit()"></el-date-picker>
        </template>

        <template v-else-if="item.type === 'between' || item.type === 'B'">
          <div class="between-group">
            <el-input type="number" v-model="formGroup[item.keys[0]]" placeholder="开始" @keydown.enter="onSubmit()"></el-input>
            <div class="separator">~</div>
            <el-input type="number" v-model="formGroup[item.keys[1]]" placeholder="结束" @keydown.enter="onSubmit()" :class="{'has-append': !!item.after}"></el-input>
            <div class="append" v-if="item.after">{{ item.after }}</div>
          </div>
        </template>

        <template v-else-if="item.type === 'cascader' || item.type === 'C'">
          <el-cascader v-model="formGroup[item.keys.join()]" :placeholder="item.placeholder || '请选择' + item.label" :props="item.props" collapse-tags filterable clearable @change="type === 'simple' && onSubmit()"></el-cascader>
        </template>

        <template v-else>
          <el-input v-model="formGroup[item.key]" :placeholder="item.placeholder || '请输入' + item.label" clearable @keydown.enter="onSubmit()">
            <template slot="append" v-if="item.after">{{ item.after }}</template>
          </el-input>
        </template>
      </el-form-item>
    </template>

    <el-form-item label=" " v-if="type !== 'simple' && type !== 'S'">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
      <slot :params="params"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { format } from 'date-fns';
export default {
  name: 'QueryComponent',
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    params: function() {
      return this.getParams();
    }
  },
  data() {
    let formGroup = {};
    this.nodes.map((n, i) => {
      if (n.type === 'between' || n.type === 'N') {
        formGroup[n.keys[0]] = n.default && n.default[0] ? n.default[0] : null;
        formGroup[n.keys[1]] = n.default && n.default[1] ? n.default[1] : null;
      } else {
        formGroup[n.keys ? n.keys.join() : n.key] = n.default || null;
      }
      if ((n.type === 'select' || n.type === 'S') && n.url) {
        this.axios.post(n.url).then(res => this.$set(this.nodes[i], 'options', [...res.result, ...(n.options || [])]) );
      }
    });
    return {
      formGroup,
      isReady: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.getParams());
    },
    resetForm() {
      Object.keys(this.formGroup).map(k => this.formGroup[k] = null);
    },
    getParams() {
      let params = { };
      this.nodes.map(n => {
        if (n.type === 'rangepicker' || n.type === 'R') {
          let key = n.keys.join();
          if (this.formGroup[key]) {
            params[n.keys[0]] = format(this.formGroup[key][0], 'yyyy-MM-dd');
            params[n.keys[1]] = format(this.formGroup[key][1], 'yyyy-MM-dd');
          }
        } else if (n.type === 'between' || n.type === 'B') {
          params[n.keys[0]] = this.formGroup[n.keys[0]];
          params[n.keys[1]] = this.formGroup[n.keys[1]];
        } else if((n.type === 'select' || n.type === 'S') && n.multiple) {
          params[n.key] = this.formGroup[n.key] ? this.formGroup[n.key].join(',') : null;
        } else if (n.type === 'cascader' || n.type === 'C') {
          let key = n.keys.join();
          let val = this.formGroup[key] || [];
          n.keys.map(r => params[r] = []);
          if (n.props.multiple) {
            val.map(v => params[n.keys[v.length - 1]].push(v[v.length - 1]));
          } else {
            val.map((v, i) => params[n.keys[i]].push(v));
          }
          n.keys.map(r => params[r] = params[r].join(','));
        } else {
          params[n.key] = this.formGroup[n.key];
        }
      });
      Object.keys(params).map(k => (params[k] === null || params[k] === undefined || params[k] === '') && delete params[k]);
      return params;
    }
  }
}
</script>

<style lang="less">
.query-content {
  padding: 16px 16px 0;
  background: #fff;
  margin-bottom: 16px;
  .el-input__inner,
  .el-date-editor--daterange.el-input__inner,
  .between-group { width: 300px; }
  .between-group {
    display: flex;
    .el-input {
      width: auto;
      flex: 1;
      &:first-child input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right-color: #fff;
        &:focus {
          border-right: 1px solid #409EFF;
        }
      }
      &:nth-child(3) input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-color: #fff;
        &:focus {
          border-left: 1px solid #409EFF;
        }
      }
      &.has-append input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .el-input__inner {
        width: 100%;
      }
    }
    .separator {
      width: 20px;
      height: 36px;
      text-align: center;
      border-top: 1px solid #DCDFE6;
      border-bottom: 1px solid #DCDFE6;
      background: #fff;
    }
    .append {
      height: 36px;
      line-height: 34px;
      background-color: #F5F7FA;
      color: #909399;
      vertical-align: middle;
      position: relative;
      border: 1px solid #DCDFE6;
      border-left: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 0 20px;
      white-space: nowrap;
    }
  }
  .el-input.input-number {
    width: 300px;
    display: flex;
    input {
      flex: 1;
      display: block;
    }
    .el-input-group__append {
      width: auto;
      height: 36px;
      display: block;
      line-height: 36px;
    }
  }
}
</style>