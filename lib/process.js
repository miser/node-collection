"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class PIDCollect {
    get Name() {
        return 'pid';
    }
    collect() {
        return Promise.resolve(process.pid);
    }
}
class MemoryCollect {
    get Name() {
        return 'memory';
    }
    collect() {
        const memeryInfo = process.memoryUsage();
        return Promise.resolve(Object.entries(memeryInfo).reduce((val, [key, value]) => {
            val[key] = Math.round((value / 1024 / 1024) * 100) / 100;
            return val;
        }, { unit: 'MB' }));
    }
}
class ProcessCollection extends abstract_1.AbstractCollection {
    constructor() {
        super();
        this.store.push(new PIDCollect());
        this.store.push(new MemoryCollect());
    }
}
exports.default = ProcessCollection;
