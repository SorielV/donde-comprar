import Mongoose, { Schema } from 'mongoose'
import { slugify } from './../utils'

const ShopSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  slug: {
    type: String,
    required: false,
    default () {
      return slugify(this.name)
    }
  },
  image: {
    type: String
  }
})

const Shop = Mongoose.model('Shop', ShopSchema)

export default Shop
