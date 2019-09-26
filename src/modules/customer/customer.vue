<template>
  <div>
    <QueryComponent :nodes="nodes" @submit="$refs.table.request($event)" />

    <TableComponent url="/store/listMember" ref="table">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="手机号">
        <template v-slot="scope">
          {{ scope.row.showPhone ? scope.row.mobilePhone : '' }}
          <el-button type="text" v-if="!scope.row.showPhone" size="small" @click="$set(scope.row, 'showPhone', true)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="宝宝类型" prop="babyNumber"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="身份"><template v-slot="scope">{{ scope.row.havaCard ? '会员' : '非会员' }}</template></el-table-column>
      <el-table-column label="会员卡状态"><template v-slot="scope">{{ scope.row.cardStatus == 0 ?  '有效' : '' }}</template></el-table-column>
      <el-table-column label="创建时间" prop="createDate" width="90"></el-table-column>
      <el-table-column label="剩余卡次" prop="cardNumbers"></el-table-column>
      <el-table-column label="近期APP登录" prop="loginDate" width="100"></el-table-column>
      <el-table-column label="近期预约时间" prop="reserveDate" width="110"></el-table-column>

      <el-table-column label="操作" fixed="right" align="center">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="previewId = scope.row.id; showDetail = true">查看</el-button>
        </template>
      </el-table-column>
    </TableComponent>

    <el-drawer title="客户详情" size="960px" :destroy-on-close="true" :visible.sync="showDetail">
      <DetailComponent :id="previewId" />
    </el-drawer>
  </div>
</template>

<script>
import DetailComponent from './detail';

export default {
  components: { DetailComponent },
  data() {
    const _this = this;
    return {
      nodes: [
        {
          label: '用户名称',
          type: 'input',
          key: 'name'
        },
        {
          label: '用户身份',
          type: 'select',
          key: 'havaCard',
          options: [ {label: '会员', value: 1}, {label: '非会员', value: 0} ]
        },
        {
          label: '门店类型',
          type: 'S',
          key: 'contractStatus',
          multiple: true,
          options: [{ label: '正常', value: 0 }, { label: '合同到期', value: 1 }, { label: '解约', value: 2 }, { label: '转店中', value: 3 }]
        },
        {
          label: '线索标签',
          type: 'S',
          key: 'noPhone',
          options: [ { label: '空号', value: true },{ label: '正常', value: false } ]
        },
        {
          label: '最小年龄',
          type: 'N',
          key: 'bStart',
          after: '岁'
        },
        {
          label: '最大年龄',
          type: 'N',
          key: 'bEnd',
          after: '岁'
        },
        {
          label: '所属门店',
          type: 'C',
          keys: ['province' , 'city', 'storeList'],
          props: {
            checkStrictly: true, 
            multiple: true,
            lazy: true,
            lazyLoad (node, resolve) {
              const { level } = node;
              if (level === 0) {
                _this.axios.post('/linkage/getAllProvince').then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
              } else if (level === 1) {
                _this.axios.post('/linkage/getCityByProvince', { provinceCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
              } else {
                _this.axios.post('/store/listShopByCity', { city: node.value }).then(res => resolve(res.result.shop.map(r => ({ value: r.storeId, label: r.shopName, leaf: true }))));
              }
            }
          }
        },
        {
          label: '创建时间',
          type: 'number',
          key: 'month',
          after: '个月之内'
        },
      ],
      showDetail: false,
      previewId: null
    }
  }
}
</script>