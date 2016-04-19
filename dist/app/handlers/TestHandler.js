"use strict";
const _HandlerBase_1 = require("./_HandlerBase");
class TestHandler {
    static test() {
        var grammar = _HandlerBase_1._HandlerBase.grammar;
        console.log(grammar.rules.filter(x => x.isUnary()).length);
        console.log(grammar.rules.filter(x => x.isBinary()).length);
    }
}
exports.TestHandler = TestHandler;
