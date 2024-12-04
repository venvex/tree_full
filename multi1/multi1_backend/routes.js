'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const dataHandler = require('./handlers/treeDataHandler')




module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/configured', configured(opts))

  //TODO:
  app.get('/data', dataHandler.getHanlder)
  app.post("/data", dataHandler.postHandler)
}
