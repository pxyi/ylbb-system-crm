import QueryComponent from '@L/query';
import TableComponent from '@L/table';
import TitleComponent from '@L/title';

const AppComponents = {
  QueryComponent,
  TableComponent,
  TitleComponent
};

const install = Vue => {
  if (install.installed) return;
  Object.keys(AppComponents).forEach(key => Vue.component(key, AppComponents[key]));
};

export default {
  version: '0.0.1',
  install,
}