"use strict";
class MathHelper {
    static doLogSum(...args) {
        var sum = 0;
        for (let arg of args) {
            sum += Math.log10(arg);
        }
        return Math.pow(10, sum);
    }
}
exports.MathHelper = MathHelper;
