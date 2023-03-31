const {Users, Articles, ArticleType} = require('../models/model')
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
    await user.save()
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

async function googleAuthSuccess(req, res) {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
}

async function googleAuthFail(req, res) {
  res.json({success: false, status: 401, message: `google auth failed`})
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

async function deleteUsersMany(req, res) {
  try {
    const where = {"_id": {$in: req.body}}    
    const data = await Users.deleteMany(where)
    res.json({body: data ,status: 200, message: "delete users many successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete users many failed, ${e.message}`})
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

async function getAllActiveArticles(req, res) {
  try {
    const data = await Articles.find({active: true})
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
    let {active, title, type, content, author} = req.body
    const article = await new Articles({
     active, title, type, content, author
    })
    await article.save()
    res.json({body: article, status: 200, message: "add articles successfully"}) 
  }catch(e) {
    res.json({status: 400, message: "add articles failed"})
    console.log(e)
  }
 
}

async function editArticleById(req, res) {
  try {    
    const data = await Articles.updateOne({_id: req.params.id},{ 
      type: req.body.type,
      active: req.body.active,
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    })
    console.log(req.body)
    res.json({body: data ,status: 200, message: "edit article by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `edit Article by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleById(req, res) {
  try {
    const data = await Articles.deleteOne({_id: req.params.id})
    res.json({body: data ,status: 200, message: "delete article by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete article by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticlesMany(req, res) {
  try {
    const where = {"_id": {$in: req.body}}    
    const data = await Articles.deleteMany(where)
    res.json({body: data ,status: 200, message: "delete articles many successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete articles many failed, ${e.message}`})
    console.log(e)
  }  
}

async function getAllArticleType(req, res) {
  try {
    const data = await ArticleType.find()
    res.json({body: data ,status: 200, message: "get articleType successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `get articleType failed, ${e.message}`})
    console.log(e)
  } 
}

async function getAllActiveArticleType(req, res) {
  try {
    const data = await ArticleType.find({active: true})
    res.json({body: data ,status: 200, message: "get articleType successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `get articleType failed, ${e.message}`})
    console.log(e)
  } 
}

async function getArticleTypeById(req, res) {
  try {
    const data = await ArticleType.findById(req.params.id)
    res.json({body: data ,status: 200, message: "get articleType by id successfully"}) 
  }catch(e) {
    res.json({status: 404, message: `get articleType by id failed, ${e.message}`})
    console.log(e)
  } 
}

async function addArticleType(req, res) {
  try {
    let {active, type, author} = req.body
    const articleType = await new ArticleType({
     active, type, author
    })
    await articleType.save()
    res.json({body: articleType, status: 200, message: "add articleType successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `add articleType failed, ${e.message}`})
    console.log(e)
  }
 
}

async function editArticleTypeById(req, res) {
  try {    
    const data = await ArticleType.updateOne({_id: req.params.id},{ 
      active: req.body.active,
      type: req.body.type,
      author: req.body.author,
      updatedAt: new Date()
    })    
    res.json({body: data ,status: 200, message: "edit articleType by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `edit articleType by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleTypeById(req, res) {
  try {
    const data = await ArticleType.deleteOne({_id: req.params.id})
    res.json({body: data ,status: 200, message: "delete articleType by id successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete articleType by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleTypeMany(req, res) {
  try {
    const where = {"_id": {$in: req.body}}    
    const data = await ArticleType.deleteMany(where)
    res.json({body: data ,status: 200, message: "delete articleType many successfully"}) 
  }catch(e) {
    res.json({status: 400, message: `delete articleType many failed, ${e.message}`})
    console.log(e)
  }  
}


module.exports = {
  register,
  login,
  googleAuthSuccess,
  googleAuthFail,
  getAllUsers,
  getUserById,
  addUser,
  editUserById,
  deleteUserById,
  deleteUsersMany,
  getAllArticles,
  getAllActiveArticles,
  getArticleById,
  addArticle,
  editArticleById,
  deleteArticleById,
  deleteArticlesMany,
  getAllArticleType,
  getAllActiveArticleType,
  getArticleTypeById,
  addArticleType,
  editArticleTypeById,
  deleteArticleTypeById,
  deleteArticleTypeMany
}
