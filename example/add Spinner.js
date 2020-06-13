const log = require('../dist/log.cjs.js')()

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

