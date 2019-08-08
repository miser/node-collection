const assert = require('assert')
const { AbstractCollection, AbCollect } = require('./../lib/abstract')
const ProcessCollection = require('./../lib/process').default

describe('system', () => {
  it('extend', () => {
    assert(
      ProcessCollection.prototype.__proto__.constructor === AbstractCollection
    )
  })
  it('base collect', async () => {
    const processCollection = new ProcessCollection()
    const collection = await processCollection.collect()
    assert(collection.size === 2)
    assert(typeof collection.get('pid') === 'number')
    assert(typeof collection.get('memory') === 'object')
    const memory = collection.get('memory')
    assert(Object.keys(memory).length === 5)
    assert(memory.unit === 'MB')
    assert(memory.rss)
    assert(memory.heapTotal)
    assert(memory.heapUsed)
    assert(memory.external)
  })
})
