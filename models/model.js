const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users_model = new Schema({
  email: {type: String, default: ""},
  password: {type: String, default: ""}
})

const articles_model = new Schema({
  id: {type: Number, default: ""},
  title: {type: String, default: "新增文章"},
  type: {type: String, default: "未分類"},
  content: {type: String, default: ""},
  date: {type: Date, default: new Date()}
})

const Users = mongoose.model('users', users_model)
const Articles = mongoose.model('articles', articles_model)

module.exports = {
  Users,
  Articles
}