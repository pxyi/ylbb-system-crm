import axios from 'axios';
import ElementUI from 'element-ui';

Request.install = function (Vue, options) {

  /**
   * Vue.$post 请求
   * @param url     : string     请求地址     必填
   * 
   * @param params  : Object     请求参数     选填
   * 
   * @param options : Object     自动化配置   选填
   *            ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
   *         tip    : Boolean                 是否提示返回结果
   *         loading: String                  自动改变loading状态
   *         table  : Boolean | String<ref>   是否刷新表格
   *         dialog : String                  Visible 值
   *         drawer : Boolean                 是否自动关闭抽屉
   * 
   * @time 2019-09-20
   * @author phuhoang
   */
  
  Vue.prototype.$post = function (url, params, options) {
    options = options || {};
    options.loading && (this[options.loading] = true);
    return new Promise((resolve, reject) => { 
      axios.post(url, params).then(res => {
        options.loading && (this[options.loading] = false);
        try {
          options.dialog && res.code == 1000 && (this[options.dialog] = false);
        } catch (error) {
          console.warn('请检查弹框visible是否正确');
        }
        try {
          options.drawer && res.code == 1000 && this.$parent.$parent.$refs.drawer && this.$parent.$parent.$refs.drawer.closeDrawer();
        } catch (error) {
          console.warn('请检查抽屉ref是否赋值')
        }
        try {
          if (options.table && res.code == 1000) {
            this.$refs.table && this.$refs.table.request();
            this.$parent.$parent.$refs.table && this.$parent.$parent.$refs.table.request();
          }
        } catch (error) {
          console.warn('请检查是否为表单 ref赋值');
        }
        options.tip && ElementUI.Message({ type: res.code == 1000 ? 'success' : 'warning', message: res.info || '操作失败' });
        res.code == 1000 ? resolve(res) : reject(res);
      }).catch(err => {
        options.loading && (this[options.loading] = false);
        reject(err);
      });
    });
    
  }
}
export default Request;