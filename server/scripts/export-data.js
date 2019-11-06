import 'dotenv/config'

import path from 'path'
import { db } from './../config'
import { writeFile } from 'fs/promise'
import Models from './../models'

const models = ['Brand', 'Category', 'Product', 'Shop']
const baseDir = path.resolve(process.env.DATA_EXPORT_FOLDER || './export/')

async function start () {
  return Promise.all(models.map(async model => {
    const Model = Models[model]
    const items = await Model.find()
    return writeFile(path.resolve(baseDir, model + '.json'), JSON.stringify(items), 'utf-8')
  }))
}

/* eslint-disable no-console */
db.connect()
  .then(_ => start())
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
