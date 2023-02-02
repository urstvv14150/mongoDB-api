const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users_model = new Schema({
  email: {type: String, required: true, default: ""},
  password: {type: String, required: true, default: ""},
  createdAt: {type: Date, default: () => Date.now(), immutable: true},
  updatedAt: {type: Date, default: () => Date.now()}
})

const articles_model = new Schema({  
  title: {type: String, default: "新增文章"},
  type: {type: String, required: true, default: "未分類"},
  content: {type: String, default: ""},
  auther: {type: String, default: "admin"},
  createdAt: {type: Date, default: () => Date.now(), immutable: true},
  updatedAt: {type: Date, default: () => Date.now()}
})

const Users = mongoose.model('users', users_model)
const Articles = mongoose.model('articles', articles_model)

module.exports = {
  Users,
  Articles
}