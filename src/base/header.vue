<template>
  <div>
    <div class="logo"><img src="~@A/logo.png" alt="logo"></div>

    <el-dropdown :show-timeout="0">
      <div class="user">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span>管理员<i class="el-icon-arrow-down"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>我的设置</el-dropdown-item>
          <el-dropdown-item divided @click="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </div>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      window.localStorage.removeItem('token');
      window.location.href = process.env.VUE_APP_LOGIN_ADDRESS;
    }
  }
}
</script>

<style lang="less" scoped>
  .logo {
    float: left;
    line-height: 60px;
    img {
      display: inline-block;
      width: auto;
      height: 34px;
      vertical-align: middle;
    }
  }
  div /deep/ .el-dropdown {
    cursor: pointer;
    float: right;
    position: relative;
    margin-right: -8px;
    transition: all .2s;
    &:hover {
      background: #e6f7ff;
    }
  }
  .user {
    padding: 0 8px;
    height: 100%;
    line-height: 60px;
    .el-avatar {
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
  }
</style>