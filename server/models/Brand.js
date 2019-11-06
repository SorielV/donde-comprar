import Mongoose, { Schema } from 'mongoose'
import { slugify } from './../utils'

const BrandSchema = new Schema({
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
  }
})

const Brand = Mongoose.model('Brand', BrandSchema)

export default Brand
