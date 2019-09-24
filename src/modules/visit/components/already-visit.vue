<template>
  <div>
    <QueryComponent :nodes="nodes" type="simple" v-show="id === 1" @submit="query($event)" />

    <TableComponent url="/visit/memberVisitInfoList" :default="{visitType: 0}" ref="table" :auto="false">
      <el-table-column label="姓名" prop="name" width="80"></el-table-column>
      <el-table-column label="手机号" prop="mobilePhone" width="90"></el-table-column>
      <el-table-column label="奖品名称" prop="prizeName"></el-table-column>
      <el-table-column label="宝宝类型">
        <template v-slot="scope">{{ scope.row.babyNumber }}胞胎</template>
      </el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>         
      <el-table-column label="身份">
        <template v-slot="scope">{{scope.row.havaCard ?  '会员' : '非会员'}}</template>
      </el-table-column>
      <el-table-column label="剩余卡次" prop="cardNumbers"></el-table-column>
      <el-table-column label="所属省份" prop="provinceName"></el-table-column>
      <el-table-column label="所属城市" prop="cityName"></el-table-column>               
      <el-table-column label="领取时间" v-if="id === 1">
        <template v-slot="scope">
          {{scope.row.createTime | format}}
        </template>
      </el-table-column>
      <el-table-column label="最后一次回访时间" v-if="id !== 1" width="120">
        <template v-slot="scope">
          {{scope.row.createTime | format}}
        </template>
      </el-table-column>
      <el-table-column label="近期预约时间" prop="reserveDate" width="100"></el-table-column>
      <el-table-column label="操作" fixed="right" width="110" align="center">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="$emit('preview', scope.row.id)">查看</el-button>
          <el-button type="text" size="small" @click="$emit('follow', scope.row.id)">跟进记录</el-button>
        </template>
      </el-table-column>
    </TableComponent>
  </div>
</template>

<script>
import QueryComponent from '@L/query';
import TableComponent from '@L/table';
export default {
  props: {
    id: Number
  },
  components: {
    QueryComponent,
    TableComponent
  },
  watch: {
    id: function (visitId) {
      this.$refs.table.request({ visitId })
    }
  },
  data() {
    const _this = this;
    return {
      nodes: [
        {
          label: '奖品名称',
          type: 'S',
          key: 'prizeId',
          url: '/visit/selectPrize',
          labelKey: 'prizeName',
          valueKey: 'prizeId'
        },
        {
          label: '回访状态',
          type: 'S',
          key: 'state',
          options: [{ label:'参与', value:'参与' },{ label:'不参与', value:'不参与' },{ label:'已到店', value:'已到店' },{ label:'未到店', value:'未到店' },{ label:'未接通', value:'未接通' },{ label:'考虑中', value:'考虑中' }]
        },
        {
          label: '所属地址',
          type: 'C',
          keys: ['province' , 'city'],
          props: {
            checkStrictly: true, 
            lazy: true,
            lazyLoad (node, resolve) {
              const { level } = node;
              if (level === 0) {
                _this.axios.post('/linkage/getAllProvince').then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
              } else {
                _this.axios.post('/linkage/getCityByProvince', { provinceCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: true }))));
              }
            }
          }
        }
      ]
    }
  },
  methods: {
    query(e) {
      this.$refs.table.request(Object.assign(e, { visitId: this.id }));
    }
  }
}
</script>

<style>

</style>