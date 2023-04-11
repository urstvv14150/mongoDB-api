const mongoose = require('mongoose')

// mongoose.set('strictQuery', true) //Mongoose 將確保只有在您的模式中指定的字段才會保存在數據庫中，而不會保存所有其他字段
const conn = mongoose.connect(process.env.ATLAS_URI)
  .then(db => {
    console.log("Database Connected")
    return db
  }).catch(err => {
    console.log("Connection Error")
  })

  module.exports = conn