"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThemeFont = /** @class */ (function () {
    function ThemeFont(name, secondaries, lineHeight) {
        if (secondaries === void 0) { secondaries = "sans-serif"; }
        if (lineHeight === void 0) { lineHeight = 1; }
        this.name = name;
        this.secondaries = secondaries;
        this.lineHeight = lineHeight;
    }
    ThemeFont.prototype.toString = function () {
        return "1em/" + this.lineHeight + " \"" + name + "\", " + this.secondaries;
    };
    return ThemeFont;
}());
exports.default = ThemeFont;
//# sourceMappingURL=ThemeFont.js.map