const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/route')
const moment = require('moment')

require('dotenv').config({path: './config.env'})

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(routes)

//mongodb connection
const conn = require('./db/connect')
conn.then(db => {
  if(!db) return process.exit(1)
})

process.env.TZ = "Asia/Taipei"

app.listen(PORT, ()=>{
  console.log('server is running on http://localhost:5050')
})

