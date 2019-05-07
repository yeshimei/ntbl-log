const log = require('../index')()

// 在实例化之前，注册一个消息
log.register('request', {
  // 你可以自定义你的任何状态
  downloading: data => `${data.frame} downloading data from a remote server`,
  completed: '√ download completed',
})



// 使用
log.request.downloading()
setTimeout(() => log.request.completed(), 2000)

