<template>
  <div class="title"><slot></slot></div>
</template>
<style lang="less" scoped>
.title {
  font-size: 16px;
  padding: 15px;
  line-height: 1;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 18px;
    border-radius: 4px;
    position: absolute;
    top: 14px;
    left: 0;
    background: #409EFF
  }
}
</style>