const routes = require('express').Router()
const controller = require('../controller/controller')

routes.route('/api/register')
  .post(controller.addUser)

routes.route('/api/hello')
  .get((req, res)=>{return res.send("hello")})

module.exports = routes