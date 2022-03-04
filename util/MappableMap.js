export default class MappableMap extends Map {
    constructor(name) {
        super();
        this.name = name ? name : "unidentified objects"
    }
    toString() {
        return `<Mappable Map of ${this.name}>`;
    }
    array() {
        return this.map(x => x)
    }
    map(fn) {
        const arr = [];
        for(const stuff of this.values()) {
            arr.push(fn(stuff));
        }
        return arr;
    }
}
