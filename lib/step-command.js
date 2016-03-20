const util = require('util')
const events = require('events')

module.exports = function () {
  function Step () {
    events.EventEmitter.call(this)
  }

  util.inherits(Step, events.EventEmitter)

  Step.prototype.command = function () {
    const self = this
    const client = this.client

    setImmediate(function () {
      self.emit('complete')
    })

    return client.api
  }

  return Step
}
