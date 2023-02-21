const {Users, Articles} = require('../models/model')
const jwt = require('jsonwebtoken')

require('dotenv').config()
// for process.env.secret_key

async function register(req, res) {
  try {
    if(!req.body) return res.status(400).json("Post Data is invalid")
    let {email, password} = req.body
    const user = await new Users({
      email: email,
      password: password
    })
    await user.save(user)
    res.json({body: {email, password} ,status: 200, message: "register successfully"})    
  }catch(e) {
    res.json({status:400, message: `user register invalid ${e.message}`})
    console.log(e)
  }
  
}

async function login(req, res) {
  try {
    const {email, password} = req.body
    const check = await Users.findOne({email})    
    if(check.password === password) {
      console.log(process.env.secret_key)
      const payload = {email, password}
      const token = jwt.sign({payload},  process.env.secret_key, {expiresIn: 60*60})
      res.json({body: {email, token} ,status: 200, message: `login successfully`}) 
    }
  }catch(e) {
    res.json({status: 400, message: `login failed, ${e.message}`})
    console.log(e)
  }  
}

async function getAllUsers(req, res) {
  try {
    const data = await Users.find()
    res.json({body: data ,status: 200, message: "get users successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `get users failed, ${e.message}`})
    console.log(e)
  }  
}

async function getUserById(req, res) {
  try {
    const data = await Users.findById(req.params.id)
    res.json({body: data ,status: 200, message: "get user by id successfully"}) 
  }catch(e) {
    res.json({status: 404, message: `get user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function addUser(req, res) {
  try {    
    const data = await Users.create({ 
      email: req.body.email,
      password: req.body.password
    })    
    res.json({body: data ,status: 200, message: "edit user by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `edit user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function editUserById(req, res) {
  try {    
    const data = await Users.updateOne({_id: req.params.id},{ 
      email: req.body.email,
      password: req.body.password
    })
    console.log(req.body)
    res.json({body: data ,status: 200, message: "edit user by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `edit user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteUserById(req, res) {
  try {
    const data = await Users.deleteOne({_id: req.params.id})
    res.json({body: data ,status: 200, message: "delete user by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function getAllArticles(req, res) {
  try {
    const data = await Articles.find()
    res.json({body: data ,status: 200, message: "get articles successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `get articles failed, ${e.message}`})
    console.log(e)
  } 
}

async function getArticleById(req, res) {
  try {
    const data = await Articles.findById(req.params.id)
    res.json({body: data ,status: 200, message: "get article by id successfully"}) 
  }catch(e) {
    res.json({status: 404, message: `get article by id failed, ${e.message}`})
    console.log(e)
  } 
}

async function addArticle(req, res) {
  try {
    let {title, type, content, author} = req.body
    const article = await new Articles({
      title, type, content, author
    })
    await article.save(article)
    res.json({body: article, status: 200, message: "add articles successfully"}) 
  }catch(e) {
    res.json({status: 400, message: "add articles failed"})
    console.log(e)
  }
 
}


module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  addUser,
  editUserById,
  deleteUserById,
  getAllArticles,
  getArticleById,
  addArticle
}
