const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/route')

require('dotenv').config()
require('./auth/passport')

const PORT = process.env.PORT

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

