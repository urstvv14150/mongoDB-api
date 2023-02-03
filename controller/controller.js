const {Users, Articles} = require('../models/model')
const jwt = require('jsonwebtoken')

async function register(req, res) {
  try {
    if(!req.body) return res.status(400).json("Post Data is invalid")
    let {email, password} = req.body
    const user = await new Users({
      email: email,
      password: password
    })
    user.save(err => {
      if(err) return res.status(400).json({message: `Error creating user ${err}`})
      res.status(200)
      
    })
  }catch(e) {
    res.status(400).json({message: `user register invalid`})
    console.log(e)
  }
  
}

async function login(req, res) {
  try {
    const {email, password} = req.body

    const check = await Users.findOne({email})
    if(check.password === password) {
      const payload = {email, password}
      const token = jwt.sign({payload, exp: 60*60},  process.env.secret_key)
      res.json({email, token}).status(200)
    }
  }catch(e) {
    res.status(400).json({message: `email or password invalid`})
    console.log(e)
  }  
}

async function getAllArticles(req, res) {
  try {
    const data = await Articles.find()
    res.json(data).status(200)
  }catch(e) {
    res.status(400).send("fail to get articles")
    console.log(e)
  } 
}

async function addArticle(req, res) {
  try {
    let {title, type, content, author} = req.body
    const article = await new Articles({
      title, type, content, author
    })
    article.save(err => {
      if(err) return res.status(400).send("Error add user")
      res.status(200)
    })  
  }catch(e) {
    res.status(400).send("fail to add article")
    console.log(e)
  }
 
}


module.exports = {
  register,
  login,
  getAllArticles,
  addArticle
}
