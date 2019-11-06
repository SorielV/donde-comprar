import Mongoose, { Schema } from 'mongoose'

const MetaProductSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    require: false,
    uppercase: true
  },
  category: {
    type: String,
    require: false,
    uppercase: true
  },
  images: [{
    type: String,
    default: []
  }],
  updatedAt: {
    type: Date,
    default: null
  }
})

MetaProductSchema.pre('update', function () {
  this.updatedAt = new Date()
})

const MetaProduct = Mongoose.model('MetaProduct', MetaProductSchema)

export default MetaProduct
