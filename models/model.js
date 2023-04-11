const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const users_model = new Schema({
  email: {type: String, required: true, default: ""},
  password: {type: String},
  googleId: {type: String},
  username: {type: String},
  picUrl: {type: String},
  sercet: {type: String},
  createdAt: {type: Date, default: () => moment().format(), immutable: true},
  updatedAt: {type: Date, default: () => moment().format()}
})

const articles_model = new Schema({
  active: {type: Boolean, default:  false},  
  title: {type: String, default: "新增文章"},
  type: {type: Array},
  content: {type: String, default: ""},
  author: {type: String, default: "admin"},
  createdAt: {type: Date, default: () => moment().format(), immutable: true},
  updatedAt: {type: Date, default: () => moment().format()}
})

const articleType_model = new Schema({
  active: {type: Boolean, default:  false},
  type: {type: String, required: true},
  author: {type: String},
  createdAt: {type: Date, default: () => moment().format(), immutable: true},
  updatedAt: {type: Date, default: () => moment().format()}
})

const Users = mongoose.model('users', users_model)
const Articles = mongoose.model('articles', articles_model)
const ArticleType = mongoose.model('articleType', articleType_model)

module.exports = {
  Users,
  Articles,
  ArticleType
}