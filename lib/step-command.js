const util = require('util')
const events = require('events')
const Cucumber = require.main.require('cucumber/lib/cucumber')

function Step () {
  events.EventEmitter.call(this)
}

util.inherits(Step, events.EventEmitter)

Step.prototype.command = function (step) {
  const self = this
  const client = this.client

  step.execute(client.api, function (result) {
    if (result && result.getStatus() === Cucumber.Status.FAILED) {
      console.error(result.getFailureException())
    }

    setImmediate(function () {
      self.emit('complete')
    })
  })

  return client.api
}

module.exports = Step
