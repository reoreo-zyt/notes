const { getPath } = require('./utils')

module.exports = [
  { text: 'html', link: '/html/html语义化', activeMatch: getPath('^/html/') },
  { text: 'css', link: '/css/盒子模型', activeMatch: getPath('^/css/') },
  { text: '框架', link: '/框架/vue', activeMatch: getPath('^/框架/') },
  { text: '数据库', link: '/数据库/mongodb' },
  { text: '笔试、面试记录', link: '/笔试、面试记录/我的笔试、面试记录' },
  { text: '笔试、面试题汇总', link: '/笔试、面试题汇总/4399笔试', activeMatch: getPath('^/笔试、面试题汇总/') },
]
