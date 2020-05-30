const cliSpinners = require('cli-spinners')
const logUpdate = require('log-update')
const chalk = require('chalk')

module.exports = Log



function Log(options = {}) {
  if (!(this instanceof Log)) return new Log(options)

  if (typeof  options === 'string') {
    options = {
      name: options
    }
  }

  this.name = options.name || 'dots'
  this.color = options.color || 'green'
  this.spinner = cliSpinners[this.name]
  this.interval = options.interval || this.spinner.interval
  this.index = 0
  this.timer = null
  this.options = {}
  this._nextSave = null
  this.config = {
    // 是否禁用当前实例的文本消息输出
    disabled: false
  }
}

Log.prototype = {
  constructor: Log,

  _interval () {
    const {args, text, name = this.name, interval = this.interval, color = this.color} =  this.options
    const frames = cliSpinners[name].frames
    let frame = null
    const _ = () =>  {
      frame = chalk[color](frames[this.index++ % frames.length])
      this.log(text(data))
    }

    const data = {
      args,
    }

    // 性能优化
    // 只有 data.frame 被使用时，才会触发循环定时器
    Object.defineProperty(data, 'frame', {
      get: () => {
        if (!this.timer) this.timer = setInterval(_, interval)
        return frame
      }
    })

    // 立即显示
    _()
  },


  start (options, ...args) {
    if (this.config.disabled) return 

    if (typeof options === 'string') return this.log(options)


    if (typeof options.text === 'string') return this.log(options.text)

    if (typeof options === 'function')  {
      this.options = {
        args,
        text: options,
      }
    } else {
      options.args = args
      this.options = options
    }

    if (!this.timer) this._interval()
  },

  stop (save) {
    clearInterval(this.timer)
    this.timer = null
    save ? this.done () : this.clear()
  },

  clear () {
    logUpdate.clear()
  },

  done () {
    logUpdate.done()
  },

  log (text) {
    if (this.config.disabled) return 
    logUpdate(text)
  },

  register (name, states) {
    const log = this[name] = {}
    for (let key in states) {
      let options = states[key]

      log[key] = function (...args) {
        // 延迟到下次状态
        if (this._nextSave !== null) {
          this.stop(this._nextSave)
        }
        this._nextSave = options.save
        this.start(options, ...args)
      }.bind(this)
    }
  }
}


