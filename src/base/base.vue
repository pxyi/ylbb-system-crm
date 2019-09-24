<template>
  <el-container>
    <el-header><HeaderComponent /></el-header>
    <el-container>
      <el-aside width="240px"><AsideComponent /></el-aside>
      <el-container>
        <el-main><MainComponent /></el-main>
        <!-- <el-footer><FooterComponent /></el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from './header';
import AsideComponent from './aside';
import MainComponent from './main';
import FooterComponent from './footer';
export default {
  components: {
    HeaderComponent,
    AsideComponent,
    MainComponent,
    FooterComponent
  }
}
</script>