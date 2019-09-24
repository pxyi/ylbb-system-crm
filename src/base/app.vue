<template>
  <router-view />
</template>
<style>
  /* 
  * @module: 浏览器统一样式
  * @author: phuhoang
  */
  body { color: #333; font-size: .24rem; background: #fff; }
  body,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}
  table{border-collapse:collapse;border-spacing:0}
  address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}
  ol,ul{list-style:none}
  caption,th{text-align:left}
  h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}
  q:before,q:after{content:''}
  abbr,acronym{border:0;font-variant:normal}
  sup{vertical-align:text-top}
  a{text-decoration:none;color:inherit;outline:none;}
  sub{vertical-align:text-bottom;}
  body{font-size:14px; line-height: 1.6; font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
  .clear:after{content:"\0020";height:0;display:block;clear:both;}
  .clear{zoom:1;}
  em,i{font-style: normal;}
  img{display:block; width: 100%;}
  *, :after, :before {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
  }
  html, body { height: 100%;}
  .el-container {
    height: 100%;
  }
  .el-header {
    box-shadow: 0 0 8px rgba(0,0,0,.08);
    z-index: 1;
  }
  .el-main {
    background: #f8f8f8;
  }
  .el-drawer {
    overflow-y: auto !important;
  }
  .el-drawer__body {
    padding: 0 20px 20px;
  }

  .drawer-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
  }
</style>
