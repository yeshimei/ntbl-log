const log = require('../index')()

log.register('request', {
  // 传入的参数都会保存在 args 中
  downloading:  data => `${data.frame} downloading from ${data.args[0]} data from a remote server`,
  completed: '√ download completed',
})



log.request.downloading('www.baidu.com')
setTimeout(() => log.request.completed(), 2000)