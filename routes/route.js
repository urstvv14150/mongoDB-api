const routes = require('express').Router()
const controller = require('../controller/controller')

routes.route('/api/register')
  .post(controller.addUser)

module.exports = routes