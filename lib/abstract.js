"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AbCollect {
    get Name() {
        return '';
    }
}
exports.AbCollect = AbCollect;
class AbstractCollection {
    constructor() {
        this.store = [];
    }
    register(collect) {
        this.store.push(collect);
    }
    collect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const map = new Map();
                const arr = [];
                for (var i = 0; i < this.store.length; i++) {
                    arr.push(this.store[i].collect());
                }
                Promise.all(arr).then(result => {
                    result.forEach((data, index) => {
                        const name = this.store[index].Name.toLocaleLowerCase();
                        const item = map.get(name);
                        if (item) {
                            if (Array.isArray(item)) {
                                item.push(data);
                            }
                            else {
                                map.set(name, [item, data]);
                            }
                        }
                        else {
                            map.set(name, data);
                        }
                    });
                    resolve(map);
                });
            });
        });
    }
}
exports.AbstractCollection = AbstractCollection;
