const log = require('../index')()

const count = 10000

log.register('test', {
  msg1: '我是一条纯消息',
  msg2: data => `我是一条带参的纯消息, ${data.args[0]}`,
  msg3: data => `${data.frame} 我是一条带动画的消息,`
})

console.time('纯消息：')
for (let n of new Array(count)) {
  log.test.msg1()
}

log.clear()
console.timeEnd('纯消息：')
log.done()

console.time('带参的纯消息：')
for (let n of new Array(count)) {
  log.test.msg2('我是参数')
}

log.clear()
console.timeEnd('带参的纯消息：')
log.done()

console.time('带动画的消息：')
for (let n of new Array(count)) {
  log.test.msg3()
}

log.clear()
console.timeEnd('带动画的消息：')
log.stop()

