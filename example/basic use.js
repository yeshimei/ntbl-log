const Log = require('../index')

const log = Log({
  name: 'dots',   // 动画类型
  interval: 80,   // 循环时间
  color: 'green'  // 颜色
})


// 开始
log.start(data => `${data.frame} downloading data from a remote server`)

// 两秒后，停止并清除它
setTimeout(() => log.stop(), 2000)