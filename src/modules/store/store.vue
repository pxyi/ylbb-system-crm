<template>
  <div>
    <QueryComponent :nodes="nodes" @submit="$refs.table.request($event)" />

    <TableComponent url="/store/listStore" ref="table">
      <el-table-column label="门店名称" prop="shopName" width="130"></el-table-column>
      <el-table-column label="品牌名称" prop="shopBrand"></el-table-column>
      <el-table-column label="所在城市" prop="city"></el-table-column>
      <el-table-column label="所在区域" prop="area"></el-table-column>
      <el-table-column label="门店状态" prop="contractStatus">
        <template v-slot="scope">
          {{ scope.row.contractStatus == 0 ? '正常' : scope.row.contractStatus == 1 ? '合同到期' : scope.row.contractStatus == 2 ? '解约': '转店中' }}
        </template>
      </el-table-column>
      <el-table-column label="门店类型" prop="tong">
        <template v-slot="scope">{{ scope.row.tong ? '通卡店' : '非通卡店' }}</template>
      </el-table-column>
      <el-table-column label="会员总数" prop="membership" sortable width="100"></el-table-column>
      <el-table-column label="有效会员数" prop="effectiveMembership" sortable width="110"></el-table-column>  
      <el-table-column label="通卡会员数" prop="tongMembership" sortable width="110"></el-table-column>   
      <el-table-column label="APP安装量" prop="mountNumber" sortable width="110"></el-table-column>  
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewId = scope.row.id; showDetail = true">查看</el-button>
        </template>
      </el-table-column>        
    </TableComponent>

    <el-drawer title="门店详情" size="720px" :destroy-on-close="true" :visible.sync="showDetail">
      <DetailComponent :id="previewId" />
    </el-drawer>
  </div>
</template>

<script>
import DetailComponent from './detail';
export default {
  components: {
    DetailComponent
  },
  data() {
    const _this = this;
    return {
      nodes: [
        {
          label: '门店名称',
          key: 'shopName'
        },
        {
          label: '所属品牌',
          key: 'brandId',
          type: 'S',
          options: [{ value:12, label:'鱼乐贝贝'  },{ value:1, label:'贝贝约'  },{ value:17, label:'泡泡塘'  },{ value:18, label:'鱼儿亲子' },{ value:19, label:'宝宝游泳网' }]
        },
        {
          label: '门店状态',
          key: 'contractStatus',
          type: 'S',
          options: [{ value: 0, label: '正常' }, { value: 2, label: '解约' }]
        },
        {
          label: '门店类型',
          key: 'tong',
          type: 'S',
          options: [{ value: 0, label: '非通卡' }, { value: 1, label: '通卡' }]
        },
        {
          label: '所在地址',
          type: 'C',
          keys: ['province', 'city', 'area'],
          props: {
            checkStrictly: true,
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
      ],
      showDetail: false,
      previewId: null
    };
  }
}
</script>