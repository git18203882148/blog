module.exports = [
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs')
        return dayjs(timestamp).format('YYYY-MM-DD')
      }
    }
  ],
  [
    'vuepress-plugin-comment',
    {
      options: {
        el: '#valine-vuepress-comment',
        appId: 'PzJwckatlgGYxh6kPutyuQCa-gzGzoHsz',
        appKey: 'RDEKm8HVVbQBN8Wp9wpxidpC'
      }
    }
  ]
];