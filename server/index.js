import 'dotenv/config'
import { db } from './config'
import express from 'express'
import { productAPI } from './web/api'
const app = express()

app.use('/', express.static('public'))
app.use('/api/product', productAPI)

db.connect()
  .then(_ => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Sever running in Port ${8080}`)
    })
  })
  .catch(err => {
    console.error(err)
  })
