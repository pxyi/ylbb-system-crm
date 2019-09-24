/**
 * @module Filter 配置信息
 */

import { formatDate } from './filter/format';

export default (Vue) => {

  /* ---------------------------- 时间戳转换 ---------------------------- */
  Vue.filter('format', function (value, isHms) {
    if (value) {
      let date = new Date(value);
      return formatDate(date, isHms ? 'yyyy-MM-dd hh:mm:ss' : 'yyyy-MM-dd')
    } else {
      return '';
    }
  });
}