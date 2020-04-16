const sidebarConf = require('./config/sidebar');
const navConf = require('./config/nav');
const pluginsConf = require('./config/plugins');
module.exports = {
  title: '王玉略的网络日志',
  description: '写过点代码读过点书',
  dest: './dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../assets/images'
      }
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
  ],
  plugins: pluginsConf,
  themeConfig: {
    sidebarDepth: 0,
    lastUpdated: '上次更新',
    displayAllHeaders: true,
    // 在线编辑相关
    repo: 'https://github.com/WangYuLue/docs',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    // 搜索相关
    // algolia: {
    //   apiKey: '<API_KEY>',
    //   indexName: '<INDEX_NAME>'
    // },
    nav: navConf,
    sidebar: sidebarConf
  },
}