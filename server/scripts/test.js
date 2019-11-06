import { chain } from 'stream-chain'
import { parser } from 'stream-json'
import { pick } from 'stream-json/filters/Pick'
import { ignore } from 'stream-json/filters/Ignore'
import { streamValues } from 'stream-json/streamers/StreamValues'

import fs from 'fs'
import zlib from 'zlib'

const pipeline = chain([
  fs.createReadStream('./data/results.json'),
  parser(),
  pick({ filter: 'data' }),
  ignore({ filter: /\b_meta\b/i }),
  streamValues(),
  data => {
    const value = data.value
    return value
  }
])

// let counter = 0
// pipeline.on('data', () => ++counter)
// pipeline.on('end', () => console.log(`The accounting department has ${counter} employees.`))
