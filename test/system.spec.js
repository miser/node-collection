const assert = require('assert')
const { AbstractCollection, AbCollect } = require('./../lib/abstract')
const SystemCollection = require('./../lib/system').default

describe('system', () => {
  it('extend', () => {
    assert(
      SystemCollection.prototype.__proto__.constructor === AbstractCollection
    )
  })
  it('base collect', async () => {
    const systemCollection = new SystemCollection()
    const collection = await systemCollection.collect()
    assert(collection.size === 4)
    assert(typeof collection.get('hostname') === 'string')
    assert(typeof collection.get('freemem') === 'number')
    assert(Array.isArray(collection.get('loadavg')))
    assert(typeof collection.get('ip') === 'string')
    assert(collection.get('error') === undefined)
  })

  it('register', async () => {
    class TestCollect extends AbCollect {
      get Name() {
        return 'test'
      }
      collect() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('node-collection')
          }, 1000)
        })
      }
    }
    const systemCollection = new SystemCollection()
    systemCollection.register(new TestCollect())
    const collection = await systemCollection.collect()
    assert(collection.size === 5)
    assert(collection.get('test') === 'node-collection')
  })

  it('register same key', async () => {
    class TestCollect1 extends AbCollect {
      get Name() {
        return 'test'
      }
      collect() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('node-collection1')
          }, 1000)
        })
      }
    }
    class TestCollect2 extends AbCollect {
      get Name() {
        return 'test'
      }
      async collect() {
        return 'node-collection2'
      }
    }
    class HostnameCollect extends AbCollect {
      get Name() {
        return 'hostname'
      }
      collect() {
        return Promise.resolve('test hostname')
      }
    }

    const systemCollection = new SystemCollection()
    systemCollection.register(new TestCollect1())
    systemCollection.register(new TestCollect2())
    systemCollection.register(new HostnameCollect())

    const collection = await systemCollection.collect()

    assert(collection.size === 5)
    assert(collection.get('hostname').length === 2)
    assert(collection.get('hostname')[1] === 'test hostname')

    assert(collection.get('test').length === 2)
    assert(collection.get('test')[0] === 'node-collection1')
    assert(collection.get('test')[1] === 'node-collection2')
  })
})
