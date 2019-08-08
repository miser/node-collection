import { AbstractCollection, AbCollect } from './abstract'

class PIDCollect implements AbCollect {
  get Name() {
    return 'pid'
  }
  collect(): Promise<any> {
    return Promise.resolve(process.pid)
  }
}
class MemoryCollect implements AbCollect {
  get Name() {
    return 'memory'
  }
  collect(): Promise<any> {
    const memeryInfo = process.memoryUsage()
    return Promise.resolve(
      Object.entries(memeryInfo).reduce(
        (val, [key, value]) => {
          val[key] = Math.round((value / 1024 / 1024) * 100) / 100
          return val
        },
        { unit: 'MB' }
      )
    )
  }
}

class ProcessCollection extends AbstractCollection {
  __proto__: AbstractCollection
  constructor() {
    super()
    this.store.push(new PIDCollect())
    this.store.push(new MemoryCollect())
  }
}

export default ProcessCollection
