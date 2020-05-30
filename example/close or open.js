const log = require('../index')()

log.config.disabled = true;


// 开始
log.start(data => `${data.frame} downloading data from a remote server`)

console.log('我还活着！')

// 两秒后，停止并清除它
setTimeout(() => log.stop(), 2000)