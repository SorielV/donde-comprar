import mongoose from 'mongoose'

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT || 27017
const MONGO_URI =
  process.env.MONGO_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

export default {
  connect () {
    return Promise.resolve((resolve, reject) => {
      mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
        .then(() => {
          console.log('Database Connection Established')
          resolve(mongoose)
        })
        .catch(err => reject(err))
    })
  }
}
