const urls = {
  baseUrl: "",
  picUrl: "http://qk.heniankj.com/public",
  publicUrl: "http://qk.heniankj.com/public"
};

const menu = [
  {
    name:'日程安排',
    value:'1',
    url: '/main',
    icon:'ios-home'
  },
  {
    name:'资料库',
    value:'2',
    url: '/qbank',
    icon:'ios-paper'
  },
  {
    name:'通知',
    value:'3',
    url: '/inform',
    icon:'ios-notifications'
  },
  {
    name:'关于我们',
    value:'4',
    url: '/about',
    icon:'ios-stats'
  },
];


export default {
  urls,
  menu
}
