export default [
  {
    label : '首页',
    key   : '/base/home',
    icon  : 's-home',
    disabled: true
  },
  {
    label : '客户管理',
    key   : '/base/customer',
    icon  : 'user-solid'
  },
  {
    label : '门店管理',
    key   : '/base/store',
    icon  : 's-shop'
  },
  {
    label : '回访管理',
    key   : '/base/visit',
    icon  : 'phone'
  },
  {
    label : '消息管理',
    key   : '/base/message',
    icon  : 'message',
    children : [
      {
        label : '发送消息',
        key   : '/base/message-send'
      },
      {
        label : '发送记录',
        key   : '/base/message-record'
      },
      {
        label : '消息模板',
        key   : '/base/message-template'
      }
    ]
  },
  {
    label : '线索管理',
    key   : '/base/clue',
    icon  : 's-order',
    children : [
      {
        label : '我的线索',
        key   : '/base/clue-list'
      },
      {
        label : '活动管理',
        key   : '/base/clue-activity'
      },
      // {
      //   label : '通话记录',
      //   key   : '/base/clue-record'
      // }
    ]
  },
];