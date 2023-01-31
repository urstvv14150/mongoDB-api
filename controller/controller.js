const { models } = require('mongoose')
const model = require('../models/model')

async function addUser(req, res) {
  if(!req.body) return res.status(400).json("Post Data is invalid")
  let {email, password} = req.body
  const Users = await new model.Users({
    email: email,
    password: password
  })
  Users.save(err => {
    if(err) return res.status(400).json({message: `Error creating user ${err}`})
    res.json(Users)
  })
}

module.exports = {
  addUser
}
