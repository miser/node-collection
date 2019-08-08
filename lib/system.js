"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
const os_1 = require("os");
const ip_1 = require("ip");
class HostnameCollect {
    get Name() {
        return 'hostname';
    }
    collect() {
        return Promise.resolve(os_1.hostname());
    }
}
class FreememCollect {
    get Name() {
        return 'freemem';
    }
    collect() {
        return Promise.resolve(os_1.freemem());
    }
}
class LoadavgCollect {
    get Name() {
        return 'loadavg';
    }
    collect() {
        return Promise.resolve(os_1.loadavg());
    }
}
class IPCollect {
    get Name() {
        return 'ip';
    }
    collect() {
        return Promise.resolve(ip_1.address());
    }
}
class SystemCollection extends abstract_1.AbstractCollection {
    constructor() {
        super();
        this.store.push(new HostnameCollect());
        this.store.push(new FreememCollect());
        this.store.push(new LoadavgCollect());
        this.store.push(new IPCollect());
    }
}
exports.default = SystemCollection;
