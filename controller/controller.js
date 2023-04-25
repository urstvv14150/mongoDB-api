const {Users, Articles, ArticleType} = require('../models/model')
const jwt = require('jsonwebtoken')
const { authRole } = require("../auth/authRole")

require('dotenv').config()
// for process.env.secret_key

// const CLIENT_URL = "https://memories-two-iota.vercel.app"
const CLIENT_URL = "http://localhost:3000"

async function register(req, res) {
  try {    
    const {email, password} = req.body
    if(email && password) {
      const check = await Users.findOne({email})
        
      if(check) {       
        console.log('error') 
        return res.status(400).json({message: "the email registered "})
      }else {
        console.log('success')
        const user = await new Users({
          email: email,
          password: password
        })
        await user.save()
        return res.status(200).json({body: {email, password} ,message: "register successfully"})    
        // res.status(504).redirect(`${CLIENT_URL}/login`)       
      }     
    }
  }catch(e) {
    return res.status(400).json({status:400, message: `user register invalid ${e.message}`})
    console.log(e)
  }
  
}

async function login(req, res) {
  try {
    const {email, password} = req.body
    const user = await Users.findOne({email})    
    if(user.password === password) {
      const id = user._id
      const role = user.role
      const payload = {email, password, role}
      const token = jwt.sign({payload},  process.env.secret_key, {expiresIn: 60*60})
      return res.status(200).json({body: {id, email, token, role} ,status: 200, message: `login successfully`}) 
    }
  }catch(e) {
    return res.status(400).json({status: 400, message: `login failed, ${e.message}`})
    console.log(e)
  }  
}

async function logout(req, res) {
  req.logout();
  res.redirect(CLIENT_URL);
}

// async function googleAuthSuccess(req, res) {
//   console.log('req:', req);
//   console.log('req.cookie:', req.cookie);
//   if (req.user) {
    
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
      
//       //   cookies: req.cookies
//     });
//   }
// }

async function googleAuthCallback(req, res) {  
  console.log(req)
  const payload = req.user
  const token = jwt.sign({payload},  process.env.secret_key, {expiresIn: 60*60})
  res.redirect(`${CLIENT_URL}/loginSuccess?_id=${req.user._id}&email=${req.user.email}&username=${req.user.username}&picUrl=${req.user.picUrl}&role=${req.user.role}&token=${token}`)
}

async function googleAuthFail(req, res) {
  return res.status(401).json({success: false, status: 401, message: `google auth failed`})
}

async function githubAuthCallback(req, res) {  
  // console.log(req)
  const payload = req.user
  const token = jwt.sign({payload},  process.env.secret_key, {expiresIn: 60*60})
  res.redirect(`${CLIENT_URL}/loginSuccess?id=${req.user._id}&username=${req.user.username}&picUrl=${req.user.picUrl}&role=${req.user.role}&token=${token}`)
}

async function githubAuthFail(req, res) {
  return res.status(401).json({success: false, status: 401, message: `github auth failed`})
}

async function facebookAuthCallback(req, res) {  
  console.log(req)
  const payload = req.user
  const token = jwt.sign({payload},  process.env.secret_key, {expiresIn: 60*60})
  res.redirect(`${CLIENT_URL}/loginSuccess?_id=${req.user._id}&username=${req.user.username}&role=${req.user.role}&token=${token}`)
}

async function facebookAuthFail(req, res) {
  return res.status(401).json({success: false, status: 401, message: `facebook auth failed`})
}

async function getAllUsers(req, res) {
  try {
    const data = await Users.find()
    return res.status(200).json({body: data ,status: 200, message: "get users successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get users failed, ${e.message}`})
    console.log(e)
  }  
}

async function getUserById(req, res) {
  try {
    const data = await Users.findById(req.params.id)
    return res.status(200).json({body: data ,status: 200, message: "get user by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function addUser(req, res, next) {
  try {        
    const data = await Users.create({ 
      email: req.body.email,
      password: req.body.password
    })    
    return res.status(200).json({status: 200, body: data, message: "add user by id successfully"})    
    
  }catch(e) {
    return res.status(400).json({status: 400, message: `add user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function editUserById(req, res, next) {
  try {        
    const data = await Users.updateOne({_id: req.params.id},{ 
      email: req.body.email,
      password: req.body.password
    })
    console.log(req.body)
    return res.status(200).json({body: data ,status: 200, message: "edit user by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `edit user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteUserById(req, res) {
  try {   
    const data = await Users.deleteOne({_id: req.params.id})
    return res.status(200).json({body: data ,status: 200, message: "delete user by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete user by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteUsersMany(req, res) {
  try {    
    const where = {"_id": {$in: req.body}}    
    const data = await Users.deleteMany(where)
    return res.status(200).json({body: data ,status: 200, message: "delete users many successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete users many failed, ${e.message}`})
    console.log(e)
  }  
}

async function getAllArticles(req, res) {
  try {
    const data = await Articles.find()
    return res.status(200).json({body: data ,status: 200, message: "get articles successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get articles failed, ${e.message}`})
    console.log(e)
  } 
}

async function getAllActiveArticles(req, res) {
  try {
    const data = await Articles.find({active: true})
    return res.status(200).json({body: data ,status: 200, message: "get articles successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get articles failed, ${e.message}`})
    console.log(e)
  } 
}

async function getArticleById(req, res) {
  try {
    const data = await Articles.findById(req.params.id)
    return res.status(200).json({body: data ,status: 200, message: "get article by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get article by id failed, ${e.message}`})
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
    return res.status(200).json({body: article, status: 200, message: "add articles successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: "add articles failed"})
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
    return res.status(200).json({body: data ,status: 200, message: "edit article by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `edit Article by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleById(req, res) {
  try {
    const requireAuth = "manager"
    authRole(requireAuth, req, res, next)
    const data = await Articles.deleteOne({_id: req.params.id})
    return res.status(200).json({body: data ,status: 200, message: "delete article by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete article by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticlesMany(req, res) {
  try {    
    const where = {"_id": {$in: req.body}}    
    const data = await Articles.deleteMany(where)
    return res.status(200).json({body: data ,status: 200, message: "delete articles many successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete articles many failed, ${e.message}`})
    console.log(e)
  }  
}

async function getAllArticleType(req, res) {
  try {
    const data = await ArticleType.find()
    return res.status(200).json({body: data ,status: 200, message: "get articleType successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get articleType failed, ${e.message}`})
    console.log(e)
  } 
}

async function getAllActiveArticleType(req, res) {
  try {
    const data = await ArticleType.find({active: true})
    return res.status(200).json({body: data ,status: 200, message: "get articleType successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `get articleType failed, ${e.message}`})
    console.log(e)
  } 
}

async function getArticleTypeById(req, res) {
  try {
    const data = await ArticleType.findById(req.params.id)
    return res.status(200).json({body: data ,status: 200, message: "get articleType by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 404, message: `get articleType by id failed, ${e.message}`})
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
    return res.status(200).json({body: articleType, status: 200, message: "add articleType successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `add articleType failed, ${e.message}`})
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
    return res.status(200).json({body: data ,status: 200, message: "edit articleType by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `edit articleType by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleTypeById(req, res) {
  try {   
    const data = await ArticleType.deleteOne({_id: req.params.id})
    return res.status(200).json({body: data ,status: 200, message: "delete articleType by id successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete articleType by id failed, ${e.message}`})
    console.log(e)
  }  
}

async function deleteArticleTypeMany(req, res) {
  try {    
    const where = {"_id": {$in: req.body}}    
    const data = await ArticleType.deleteMany(where)
    return res.status(200).json({body: data ,status: 200, message: "delete articleType many successfully"}) 
  }catch(e) {
    return res.status(400).json({status: 400, message: `delete articleType many failed, ${e.message}`})
    console.log(e)
  }  
}


module.exports = {
  register,
  login,
  logout,
  // googleAuthSuccess,
  googleAuthCallback,
  googleAuthFail,
  githubAuthCallback,
  githubAuthFail,
  facebookAuthCallback,
  facebookAuthFail,
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
