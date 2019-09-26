<template>
  <div class="container">
    <el-form :model="formGroup" ref="formGroup" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="活动名称" prop="visitName">
            <el-input v-model="formGroup.visitName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动类型" prop="type">
            <el-select v-model="formGroup.type" placeholder="请选择活动类型" multiple clearable>
              <el-option label="婴儿" :value="1"></el-option>
              <el-option label="幼儿" :value="2"></el-option>
              <el-option label="少儿" :value="3"></el-option>
              <el-option label="宝妈" :value="4"></el-option>
              <el-option label="宝爸" :value="5"></el-option>
              <el-option label="其他" :value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户身份" prop="havacard">
            <el-select v-model="formGroup.havaCard" placeholder="请选择活动类型" clearable>
              <el-option label="会员" :value="1"></el-option>
              <el-option label="非会员" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formGroup.sex" placeholder="请选择性别" clearable>
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门店类型" prop="contractStatus">
            <el-select v-model="formGroup.contractStatus" placeholder="请选择门店类型" multiple clearable>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="合同到期" :value="1"></el-option>
              <el-option label="解约" :value="2"></el-option>
              <el-option label="转店中" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最小年龄" prop="bStart">
            <el-input v-model="formGroup.bStart" placeholder="请输入最小年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最大年龄" prop="bEnd">
            <el-input v-model="formGroup.bEnd" placeholder="请输入最大年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属城市门店" prop="cityShop">
            <el-cascader v-model="formGroup.cityShop" placeholder="请选择所属城市门店" :props="props" collapse-tags filterable clearable ref="cascader"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="cityShop">
            <el-input placeholder="请输入创建时间" v-model="formGroup.month">
              <template slot="append">个月之内</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否快速分配">
            <el-select v-model="formGroup.isDistribution" placeholder="请选择是否快速分配">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="活动描述" prop="activityDesc">
            <el-input v-model="formGroup.activityDesc" type="textarea" :rows="2" placeholder="请输入活动描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="drawer-footer">
      <el-button v-drawer-close="'showDetail'">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </div>
    <!-- <drawer-footer save-url="/xxxx" /> -->
  </div>
</template>

<script>
export default {
  data() {
    const _this = this;
    return {
      saveLoading: false,
      formGroup: {
        visitName: null,
        type: null,
        havaCard: null,
        sex: null,
        contractStatus: null,
        cityShop: null,
        month: null,
        bStart: null,
        bEnd: null,
        activityDesc: null,
        isDistribution: 1
      },
      rules: {
        visitName: [{ required: true, message: '请输入活动名称' }, { min: 2, message: '最少两位字符' }, { max: 20, message: '最多二十位字符' }]
      },
      props: {
        lazy: true,
        multiple: true,
        checkStrictly: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          if (level === 0) {
            _this.axios.post('/linkage/getAllProvince').then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
          } else if (level === 1) {
            _this.axios.post('/linkage/getCityByProvince', { provinceCode: node.value }).then(res => resolve(res.result.map(r => ({ value: r.code, label: r.name, leaf: false }))));
          } else {
            _this.axios.post('/store/listShopByCity', { city: node.value, contractStatus: _this.formGroup.contractStatus ? _this.formGroup.contractStatus.join(',') : null }).then(res => resolve(res.result.shop.map(r => ({ value: r.storeId, label: r.shopName, leaf: true }))));
          }
        }
      }
    }
  },
  methods: {
    save() {
      this.$refs.formGroup.validate(v => {
        if (v) {
          let { visitName, activityDesc, type, isDistribution, cityShop } = this.formGroup;
          const formGroup = Object.assign({}, this.formGroup);
          let province = [],
              city = [],
              storeList = [];
          cityShop && Array.isArray(cityShop) && cityShop.map(r => {
            province.push(r[0]);
            r[1] && city.push(r[1]);
            r[2] && storeList.push(r[2]);
          });

          province = Array.from(new Set(province)).join(',');
          city = Array.from(new Set(city)).join(',');
          formGroup.province = province;
          formGroup.city = city;
          formGroup.storeList = storeList.join(',');
          delete formGroup.cityShop;

          let provinceNameList = [],
              cityNameList = [],
              storeNameList = [];
          let checkedNodes = this.$refs.cascader.getCheckedNodes();

          checkedNodes.map(node => {
            if (node.level == 1) {
              provinceNameList.push(node.label);
            } else if (node.level == 2) {
              cityNameList.push(node.label);
              provinceNameList.push(node.parent.label);
            } else {
              storeNameList.push(node.label);
              cityNameList.push(node.parent.label);
              provinceNameList.push(node.parent.parent.label);
            }
          })
          Array.isArray(formGroup.contractStatus) && ( formGroup.contractStatus = formGroup.contractStatus.join(',') );
          Array.isArray(formGroup.type) && ( formGroup.type = formGroup.type.join(',') );
          let params = Object.assign( { queryCriteria: Object.assign({
            provinceNameList: Array.from(new Set(provinceNameList)),
            cityNameList: Array.from(new Set(cityNameList)),
            storeNameList: Array.from(new Set(storeNameList))
          }, formGroup) }, Object.assign({}, formGroup) );

          this.$post('/store/listMemberNoPage', { paramJson: JSON.stringify(params) }, {
            tip: true,
            drawer: true,
            table: true,
            loading: 'saveLoading'
          })
        }
      })
    }
  }
}
</script>

<style>
.el-select,
.el-cascader {
  width: 100% !important;
}
</style>