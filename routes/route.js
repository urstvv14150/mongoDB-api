const routes = require('express').Router()
const controller = require('../controller/controller')
const passport = require('passport')

const CLIENT_URL = "http://localhost:3000/"

routes.route('/api/user/register')
  .post(controller.register)

routes.route('/api/user/login')
  .post(controller.login)

routes.route("/api/googleLogin/success")
  .get(controller.googleAuthSuccess)

routes.route('/api/user/googleLogin')
  .get(passport.authenticate('google', { scope: ['profile'] }))

routes.route('/logout')
.get((req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
})

routes.route('/auth/google/callback')
.get(passport.authenticate('google', { successRedirect: CLIENT_URL, failureRedirect: controller.googleAuthFail }))

routes.route('/api/users/all')
  .get(passport.authenticate("jwt", {session: false}), controller.getAllUsers)

routes.route('/api/user/:id')
  .get(passport.authenticate("jwt", {session: false}), controller.getUserById)

routes.route('/api/user/add')
  .post(passport.authenticate("jwt", {session: false}), controller.addUser)

routes.route('/api/user/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), controller.editUserById)

routes.route('/api/users/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteUsersMany)

routes.route('/api/user/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteUserById)



routes.route('/api/articles/all')
  .get(passport.authenticate("jwt", {session: false}), controller.getAllArticles)

routes.route('/api/articles/active/all')
  .get(controller.getAllActiveArticles)

routes.route('/api/article/:id')
  .get(passport.authenticate("jwt", {session: false}), controller.getArticleById)

routes.route('/api/article/add')
  .post(passport.authenticate("jwt", {session: false}), controller.addArticle)

routes.route('/api/article/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), controller.editArticleById)

routes.route('/api/articles/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteArticlesMany)

routes.route('/api/article/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteArticleById)



routes.route('/api/articleType/all')
  .get(passport.authenticate("jwt", {session: false}), controller.getAllArticleType)

routes.route('/api/articleType/active/all')
  .get(controller.getAllActiveArticleType)

routes.route('/api/articleType/:id')
  .get(passport.authenticate("jwt", {session: false}), controller.getArticleTypeById)

routes.route('/api/articleType/add')
  .post(passport.authenticate("jwt", {session: false}), controller.addArticleType)

routes.route('/api/articleType/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), controller.editArticleTypeById)

routes.route('/api/articleType/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteArticleTypeMany)

routes.route('/api/articleType/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), controller.deleteArticleTypeById)


//:id route 必須放在後面

module.exports = routes