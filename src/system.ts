import { AbstractCollection, AbCollect } from './abstract'
import { freemem, hostname, loadavg } from 'os'
import { address } from 'ip'

class HostnameCollect implements AbCollect {
  get Name() {
    return 'hostname'
  }
  collect(): Promise<any> {
    return Promise.resolve(hostname())
  }
}

class FreememCollect implements AbCollect {
  get Name() {
    return 'freemem'
  }
  collect(): Promise<any> {
    return Promise.resolve(freemem())
  }
}

class LoadavgCollect implements AbCollect {
  get Name() {
    return 'loadavg'
  }
  collect(): Promise<any> {
    return Promise.resolve(loadavg())
  }
}

class IPCollect implements AbCollect {
  get Name() {
    return 'ip'
  }
  collect(): Promise<any> {
    return Promise.resolve(address())
  }
}

class SystemCollection extends AbstractCollection {
  __proto__: AbstractCollection
  constructor() {
    super()
    this.store.push(new HostnameCollect())
    this.store.push(new FreememCollect())
    this.store.push(new LoadavgCollect())
    this.store.push(new IPCollect())
  }
}

export default SystemCollection
