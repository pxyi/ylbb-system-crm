<template>
  <el-menu :router="true" :default-active="defaultActive">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <el-submenu :index="item.key" :key="item.key">
          <template slot="title">
            <i :class="['el-icon-' + item.icon]"></i>
            <span slot="title">{{ item.label }}</span>
          </template>
          <el-menu-item v-for="m in item.children" :index="m.key" :key="m.key">{{ m.label }}</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.key" :key="item.key">
          <i :class="['el-icon-' + item.icon]"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import MenuConfig from '@/core/menu'
export default {
  data() {
    return {
      menuList: MenuConfig,
      defaultActive: this.$route.path
    }
  },
  watch: {
    '$route.path': function(e) { this.defaultActive = e; }
  }
}
</script>

<style>
  .el-menu {
    height: 100%;
  }
</style>