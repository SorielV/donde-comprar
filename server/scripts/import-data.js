import 'dotenv/config'

import path from 'path'
import { db } from '../config'
import { slugify } from '../utils'

import { Product, Brand, Category, Shop } from '../models'
import { readFile, readdir } from 'fs/promises'

const baseDir = path.resolve(process.env.DATA_FOLDER || './data/')

const readJSON = async file => {
  const data = await readFile(path.join(baseDir, file))
  return JSON.parse(data)
}

function getPrice (price) {
  return {
    origin: price.origin,
    original: price.original.toString().replace(',', ''),
    discount: price.discount.toString().replace(',', ''),
    image: price.url
  }
}

async function start (files) {
  const brands = []
  const categories = []
  const shops = []
  // const categoriesReference = {}

  if (files.length === 0) return 0

  for (const file of files) {
    const { data: items } = await readJSON(file)

    for (const item of items) {
      let productInDB

      item.category = item.categoria ? slugify(item.categoria) : null
      item.brand = item.marca ? slugify(item.marca) : null

      if (item.model) {
        productInDB = await Product.findOne({ model: item.model })
      }

      if (item.brand) {
        if (!brands.includes(item.brand)) {
          const brand = await Brand.findOne({ slug: item.brand }).lean()

          if (!brand) {
            const brand = new Brand({ name: item.brand })
            await brand.save()
            item.brand = brand.slug
            brands.push(brand.slug)
          } else {
            brands.push(brand.slug)
          }
        }
      }

      if (item.category) {
        if (!categories.includes(item.category)) {
          const category = await Category.findOne({
            slug: item.category
          }).lean()

          if (!category) {
            const category = new Category({ name: item.category })
            await category.save()
            item.category = category.slug
            categories.push(category.slug)
          } else {
            categories.push(category.slug)
          }
        }
      }

      const price = getPrice(item.price)
      item.price = []

      if (!shops.includes(slugify(price.origin))) {
        const shop = await Shop.findOne({ slug: slugify(price.origin) })

        if (!shop) {
          const shop = new Shop({ name: price.origin })
          await shop.save()
          price.origin = shop.slug
          shops.push(shop.slug)
        } else {
          shops.push(shop.slug)
        }
      }

      let product

      if (productInDB) {
        Object.keys(item).map(prop => {
          if (!productInDB[prop] && item[prop]) {
            productInDB[prop] = item[prop]
          }
        })
        product = productInDB
      } else {
        product = new Product({ ...item, price: [] })
      }

      if (!product.price) {
        product.price = []
      }
      product.price.push(price)

      await product.save()
    }
  }
}

/* eslint-disable no-console */
db.connect()
  .then(() => readdir(baseDir))
  .then((files) => files.filter(file => file.endsWith('.json')))
  .then((files) => start(files))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
