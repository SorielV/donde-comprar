import Mongoose, { Schema } from 'mongoose'
import { slugify } from './../utils'

const CategorySchema = new Schema({
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
  refersTo: {
    type: Schema.ObjectId,
    ref: 'Category',
    required: undefined
  }
})

const Category = Mongoose.model('Category', CategorySchema)

export default Category
