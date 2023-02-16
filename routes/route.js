const routes = require('express').Router()
const controller = require('../controller/controller')

routes.route('/api/user/register')
  .post(controller.register)

routes.route('/api/user/login')
  .post(controller.login)

routes.route('/api/users/all')
  .get(controller.getAllUsers)

routes.route('/api/articles/all')
  .get(controller.getAllArticles)

routes.route('/api/article/add')
  .get(controller.addArticle)

module.exports = routes