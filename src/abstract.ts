export interface Data {
  name: string
  value: any
}

export abstract class AbCollect {
  get Name(): string {
    return ''
  }
  abstract collect(): Promise<any>
}

export abstract class AbstractCollection {
  protected store: AbCollect[]
  constructor() {
    this.store = []
  }

  register(collect: AbCollect) {
    this.store.push(collect)
  }

  collect(): Promise<Map<string, any>> {
    return new Promise(resolve => {
      const map = new Map()
      const arr = []
      for (var i = 0; i < this.store.length; i++) {
        arr.push(this.store[i].collect())
      }

      Promise.all(arr).then(result => {
        result.forEach((data, index) => {
          const name: string = this.store[index].Name.toLocaleLowerCase()
          const item = map.get(name)
          if (item) {
            if (Array.isArray(item)) {
              item.push(data)
            } else {
              map.set(name, [item, data])
            }
          } else {
            map.set(name, data)
          }
        })
        resolve(map)
      })
    })
  }
}
