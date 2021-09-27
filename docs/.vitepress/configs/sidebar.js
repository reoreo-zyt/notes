const { getPath } = require('./utils')

module.exports = {
  [getPath('/html/')]: getHtmlSidebar(),
  [getPath('/css/')]: getCssSidebar(),
  [getPath('/框架/')]: getLibrarySidebar(),
}

function getHtmlSidebar() {
  return [
    {
      text: 'Html',
      children: [
        {
          text: 'cookie和html5本地存储的区别',
          link: '/html/cookie和html5本地存储的区别'
        },
        {
          text: 'html语义化',
          link: '/html/html语义化'
        },
      ]
    }
  ]
}

function getCssSidebar() {
  return [
    {
      text: 'css',
      children: [
        {
          text: '盒子模型',
          link: '/css/盒子模型'
        },
        {
          text: '移动端响应式布局开发',
          link: '/css/移动端响应式布局开发'
        },
        {
          text: 'css底层规范BFC',
          link: '/css/css底层规范BFC'
        },
        {
          text: 'css双栏布局',
          link: '/css/css双栏布局'
        },
        {
          text: 'css三栏布局',
          link: '/css/css三栏布局'
        },
        {
          text: 'css圣杯布局',
          link: '/css/css圣杯布局'
        },
      ]
    }
  ]
}

function getLibrarySidebar() {
  return [
    {
      text: '框架',
      children: [
        {
          text: 'Vue',
          link: '/框架/vue'
        },
        {
          text: 'webpack',
          link: '/框架/webpack'
        },
      ]
    }
  ]
}
