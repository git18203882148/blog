module.exports = {
  title: '王玉略的个人网站',
  description: '记录生活，记录代码',
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../assets/images'
      }
    }
  },
  plugins: [
    // [
    //   'vuepress-plugin-clean-urls',
    //   {
    //     normalSuffix: '',
    //     indexSuffix: '/',
    //     notFoundPath: '/404.html',
    //   },
    // ],
  ],
  themeConfig: {
    sidebarDepth: 0,
    lastUpdated: 'Last Updated',
    displayAllHeaders: true,
    nav: [
      { text: 'Code', link: '/code/' },
      { text: 'Read', link: '/read/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: {
      '/code/': [
        {
          title: 'git',
          children: [
            'git/常见用法',
            'git/submodule',
          ],
        },
        {
          title: 'nginx',
          children: [
            'nginx/重写路径',
            'nginx/通用配置优化',
          ],
        },
      ],
      '/read/': [
        '奥斯本检核表法',
        '大而不倒',
        '大教堂和集市',
        '动物农场'
      ]
    }
  },
}