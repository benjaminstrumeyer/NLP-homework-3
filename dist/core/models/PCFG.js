"use strict";
class PCFG {
    constructor() {
    }
    toString() {
        if (!this.root)
            return null;
        return this.root.toString();
    }
}
exports.PCFG = PCFG;
