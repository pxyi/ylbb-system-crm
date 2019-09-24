<template>
  <div class="drawer-footer">
    <el-button v-drawer-close="'showDetail'">取消</el-button>
    <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
  </div>
</template>

<script>
export default {
  props: { 'save-url': String },
  methods: {
    save() {
      this.$emit('save')
    }
  }
}
</script>

<style>

</style>