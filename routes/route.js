const routes = require('express').Router()
const controller = require('../controller/controller')
const passport = require('passport')
const { authRole } = require("../auth/authRole")

routes.route('/api/user/register')
  .post(controller.register)

routes.route('/api/user/login')
  .post(controller.login)

// routes.route("/api/googleLogin/success")
//   .get(controller.googleAuthSuccess)

routes.route('/api/user/googleLogin')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }))

routes.route('/api/user/githubLogin')
  .get(passport.authenticate('github', { scope: ['user:email'] }))

routes.route('/api/user/facebookLogin')
  .get(passport.authenticate('facebook', { scope: ['user_friends', 'user_link'] }))

routes.route('/auth/google/callback')
  .get(passport.authenticate('google', {failureRedirect: controller.googleAuthFail}), controller.googleAuthCallback)

routes.route('/auth/github/callback')
  .get(passport.authenticate('github', {failureRedirect: controller.githubAuthFail}), controller.githubAuthCallback)

routes.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {failureRedirect: controller.facebookAuthFail}), controller.githubAuthCallback)

routes.route('/logout')
  .get(controller.logout)

routes.route('/api/users/all')
  .get(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.getAllUsers)

routes.route('/api/user/:id')
  .get(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.getUserById)

routes.route('/api/user/add')
  .post(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.addUser)

routes.route('/api/user/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.editUserById)

routes.route('/api/users/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.deleteUsersMany)

routes.route('/api/user/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("admin", req, res, next)}, controller.deleteUserById)



routes.route('/api/articles/all')
  .get(controller.getAllArticles)

routes.route('/api/articles/active/all')
  .get(controller.getAllActiveArticles)

routes.route('/api/article/:id')
  .get(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.getArticleById)

routes.route('/api/article/add')
  .post(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.addArticle)

routes.route('/api/article/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.editArticleById)

routes.route('/api/articles/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.deleteArticlesMany)

routes.route('/api/article/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.deleteArticleById)



routes.route('/api/articleType/all')
  .get(controller.getAllArticleType)

routes.route('/api/articleType/active/all')
  .get(controller.getAllActiveArticleType)

routes.route('/api/articleType/:id')
  .get(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.getArticleTypeById)

routes.route('/api/articleType/add')
  .post(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.addArticleType)

routes.route('/api/articleType/edit/:id')
  .put(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.editArticleTypeById)

routes.route('/api/articleType/delete/many')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.deleteArticleTypeMany)

routes.route('/api/articleType/delete/:id')
  .delete(passport.authenticate("jwt", {session: false}), (req, res, next) => {authRole("manager", req, res, next)}, controller.deleteArticleTypeById)


//:id route 必須放在後面

module.exports = routes