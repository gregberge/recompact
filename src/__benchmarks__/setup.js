import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('', {
  userAgent: 'node.js',
})
global.document = jsdom.document
global.window = jsdom.window

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property]
  }
})
