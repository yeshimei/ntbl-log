# log

一个内置 loading 动画的命令行文本输出工具。

[![GitHub](https://img.shields.io/badge/GitHub-yeshimei-green.svg)](https://github.com/yeshimei/ntbl-log.git) [![npm](https://img.shields.io/npm/v/@ntbl/log.svg)](https://www.npmjs.com/package/@ntbl/log) [![MIT](https://img.shields.io/npm/l/express.svg)](https://github.com/yeshimei/ntbl-log.git)

- [Installation](#Installation)
- [Frames](#Frames)
- [自定义动画](#自定义动画)
- [状态器](#状态器)
- [开启或关闭](#开启或关闭)

# Installation

```bash
$ npm i @ntbl/log --save
```

# Usage

```js
const Log = require('@ntbl/log')

const log = Log({
  name: 'dots',   // 动画类型
  interval: 80,   // 循环时间
  color: 'green'  // 颜色
})


// 开始
log.start(data => `${data.frame} downloading data from a remote server`)

// 两秒后，停止并清除它
setTimeout(() => log.stop(), 2000)
```


![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044104.gif)

```js
// 或者,保留动画最后一帧
setTimeout(() => log.stop(true), 2000)
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044125.gif)


```js
// 在同一行打印文本
log.log('在一行覆盖式输入文本')
// 清除
log.clear()
```

# Frames

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531050832.svg)


log 内置了所有 [cli-spinners](https://github.com/sindresorhus/cli-spinners) 动画。

```js
// 默认为 dots
Log('dots')
// 或者
Log({
  name: 'earth'
})
```

# 自定义动画

您还可以发挥无穷的想象力为 `log` 添加有趣生动的自定义动画。

比如，我们添加一个 `步枪` 动画。

```js
const log = require('@ntbl/log')()

log.addSpinner('rifle', {
  "interval": 80,
  "frames": [
    "▅        ",
    "▅︻      ",
    "▅︻┳┷    ",
    "▅︻┳┷一一",
    "▅︻┳┷一  ",
    "▅︻┳┷    ",
    "▅︻      ",
    "▅        ",
  ]
})

log.start({
  name: 'rifle',
  color: 'red',
  text: data => `${data.frame} a custom rifle`
})
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200605234302.gif)



# 状态器

状态器帮助你把分散在不同时刻的消息集中在一起，并以语义化的方式进行使用。

```js
const log = require('@ntbl/log')()

// 注册一个消息
log.register('request', {
  // 你可以自定义你的任何状态
  downloading: data => `${data.frame} downloading data from a remote server`,
  completed: '√ download completed',
})

// 使用
log.request.downloading()
// 注意，最后一条状态会被保留
setTimeout(() => log.request.completed(), 2000)
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044116.gif)


自定义状态还可以是一个对象，满足某些个性化的设置。

```js
Log.register('request', {
  downloading: {
    name: 'earth',   // 使用 earth 动画
    interval: 50,   // 更快一些
    color: 'red',  // 红色！
    text: data => `${data.frame} downloading data from a remote server`
  }
})
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044138.gif)


默认情况下，当你更换状态时内部会使用 `log.stop()`  停止并清除**上一个状态的消息**。如果你需要保留它，你可以这么做。

```js
const log = require('@ntbl/log')()

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
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044042.gif)


如果，你的消息是动态生成的，你还可以传入参数。

```js
const log = require('@ntbl/log')()

log.register('request', {
  // 传入的参数都会保存在 args 中
  downloading:  data => `${data.frame} downloading from ${data.args[0]} data from a remote server`,
  completed: '√ download completed',
})



log.request.downloading('www.baidu.com')
setTimeout(() => log.request.completed(), 2000)
```

![](https://yeshimei.oss-cn-beijing.aliyuncs.com/20200531044132.gif)


# 开启或关闭

log 支持一键开启或关闭文本输出了，这是为测试进行优化的功能。

log 在输出文本时会更新命令行界面，当进行排错或测试时，使用 `console` 等函数输出的文本会被覆盖。为了保证其正常使用，我们可以：

```js
log.config.disabled = true
```

现在，当前实例所有的文本输出都被禁用了。