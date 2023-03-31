const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const cors = require('cors')
const routes = require('./routes/route')

require('dotenv').config()
require('./auth/passport')

const PORT = process.env.PORT

app.use(
  cookieSession({ name: 'session', keys: [process.env.secret_key], maxAge: 24 * 60 * 60 * 100 })
)

/* passport.initialize()：確認 passport.user 是否已存在，若沒有則初始化一個空的 */
/* passport.session()：用以處理 Session。若有找到 passport.user，則判定其通過驗證，並呼叫 deserializeUser() */
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(express.json())
app.use(routes)

//mongodb connection
const conn = require('./db/connect')
conn.then(db => {
  if(!db) return process.exit(1)
})

app.listen(PORT, ()=>{
  console.log('server is running on http://localhost:5050')
})

