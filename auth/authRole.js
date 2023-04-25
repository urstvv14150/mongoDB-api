const { Users } = require('../models/model')

async function authRole(requireAtuh, req, res, next) {
  // console.log(req)
  try {  
    
    const role = req.user.role
    if(!role) return res.status(504).json({message: "permission denied"})
   
    switch (requireAtuh) {
      case "admin":
        if(role === "admin") {
          next()
        }else {
          res.status(504).json({message: "permission denied"})
        }
        break
      
      case "manager":
        if(role === "admin" || role === "manager") {
          next()
        }else {
          res.status(504).json({message: "permission denied"})
        }      
        break

      case "guest":      
        next()     
        break

      default: 
        res.status(504).json({message: "permission denied"})
    }
  }catch(e) {
    return
  }
  
}


module.exports = {
  authRole
}