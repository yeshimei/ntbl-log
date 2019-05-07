const log = require('../index')()

log.register('request', {
  hello: {
    text: '（￣︶￣）↗ Hello World！',
    // 开启保留
    save: true,
  },
  downloading:  data => `${data.frame} downloading data from a remote server`,
  completed: '√ download completed',
})


// 状态更换后，保留这条消息
log.request.hello()
setTimeout(() => log.request.downloading(), 500)
// 这一条也会被保留
// 因为状态会一直被持续
setTimeout(() => log.request.completed(), 2000)