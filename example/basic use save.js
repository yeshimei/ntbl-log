const Log = require('../dist/log.cjs.js')

const log = Log({
  name: 'dots',   // 动画类型
  interval: 80,   // 循环时间
  color: 'green'  // 颜色
})


// 开始
log.start(data => `${data.frame} downloading data from a remote server`)

// 或者,保留动画最后一帧
setTimeout(() => log.stop(true), 2000)