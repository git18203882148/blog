module.exports = [
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs')
        return dayjs(timestamp).format('YYYY/MM/DD')
      }
    }
  ]
  // [
  //   'vuepress-plugin-clean-urls',
  //   {
  //     normalSuffix: '',
  //     indexSuffix: '/',
  //     notFoundPath: '/404.html',
  //   },
  // ],
];