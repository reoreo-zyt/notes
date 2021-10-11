const { getPath } = require('./utils')

module.exports = {
  [getPath('/html/')]: getHtmlSidebar(),
  [getPath('/css/')]: getCssSidebar(),
  [getPath('/js/')]: getJsSidebar(),
  [getPath('/框架/')]: getLibrarySidebar(),
  [getPath('/常见需求、demo')]: getDemoSidebar(),
  [getPath('/笔试/')]: getBiShiSidebar(),
  [getPath('/面经/')]: getMianJingSidebar(),
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

function getJsSidebar() {
  return [
    {
      text: 'js',
      children: [
        {
          text: 'var，let，const的区别是什么',
          link: '/js/var，let，const的区别是什么'
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

function getBiShiSidebar(){
  return [
    {
      text: '笔试',
      children: [
        {
          text: '笔试',
          link: '/笔试/index'
        },
      ]
    }
  ]
}

function getMianJingSidebar(){
  return [
    {
      text: '面经',
      children: [
        {
          text: '面经',
          link: '/面经/index'
        },
      ]
    }
  ]
}

function getDemoSidebar() {
  return [
    {
      text: '常见需求、demo',
      children: [
        {
          text: '表头固定、内容滚动',
          link: '/常见需求、demo/表头固定、内容滚动'
        },
      ]
    }
  ]
}