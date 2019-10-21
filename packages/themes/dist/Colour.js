"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colour = /** @class */ (function () {
    function Colour(h, s, l, a) {
        if (a === void 0) { a = 1; }
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    Colour.hueToRgb = function (p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    // copied from https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    Colour.hslaToRgba = function (h, s, l, a) {
        if (s === 0)
            return { r: s, g: s, b: s, a: a };
        var q = l < .5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        var r = this.hueToRgb(p, q, h + 1 / 3);
        var g = this.hueToRgb(p, q, h);
        var b = this.hueToRgb(p, q, h - 1 / 3);
        return { r: r, g: g, b: b, a: a };
    };
    Colour.rgbaToHsla = function (r, g, b, a) {
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var l = (max + min) / 2;
        if (max === min)
            return { h: 0, s: 0, l: l, a: a };
        var d = max - min;
        var s = l > .5 ? d / (2 - max - min) : d / (max + min);
        var h = 0;
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
        return { h: h, s: s, l: l, a: a };
    };
    Colour.fromRGB = function (r, g, b, a) {
        if (g === void 0) { g = r; }
        if (b === void 0) { b = r; }
        if (a === void 0) { a = 1; }
        var _a = this.rgbaToHsla(r, g, b, a), h = _a.h, s = _a.s, l = _a.l;
        return new Colour(h, s, l, a);
    };
    Colour.prototype.hex = function () {
        var _a = Colour.hslaToRgba(this.h, this.s, this.l, this.a), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        var redString = Math.floor(r * 255).toString(16).padStart(2, "0");
        var greenString = Math.floor(g * 255).toString(16).padStart(2, "0");
        var blueString = Math.floor(b * 255).toString(16).padStart(2, "0");
        var alphaString = a === 1 ? "" : this.a.toString(16).padStart(2, "0");
        return "#" + redString + greenString + blueString + alphaString;
    };
    Colour.prototype.rgb = function () {
        var _a = Colour.hslaToRgba(this.h, this.s, this.l, this.a), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        var redString = Math.floor(r * 255).toString();
        var greenString = Math.floor(g * 255).toString();
        var blueString = Math.floor(b * 255).toString();
        var alphaString = a.toString();
        if (this.a === 1) {
            return "rgb(" + redString + ", " + greenString + ", " + blueString + ")";
        }
        else {
            return "rgba(" + redString + ", " + greenString + ", " + blueString + ", " + alphaString + ")";
        }
    };
    Colour.prototype.hsl = function () {
        var hueString = this.h + "deg";
        var saturationString = (this.s * 100) + "%";
        var lightnessString = (this.l * 100) + "%";
        var alphaString = this.a.toString();
        if (this.a === 1) {
            return "hsl(" + hueString + ", " + saturationString + ", " + lightnessString + ")";
        }
        else {
            return "hsla(" + hueString + ", " + saturationString + ", " + lightnessString + ", " + alphaString + ")";
        }
    };
    Colour.prototype.toString = function () {
        return this.hsl();
    };
    Colour.prototype.withHue = function (h) {
        return new Colour(h, this.s, this.l, this.a);
    };
    Colour.prototype.addHue = function (h) {
        return new Colour(this.h + h, this.s, this.l, this.a);
    };
    Colour.prototype.minusHue = function (h) {
        return new Colour(this.h - h, this.s, this.l, this.a);
    };
    Colour.prototype.timesHue = function (h) {
        return new Colour(this.h * h, this.s, this.l, this.a);
    };
    Colour.prototype.divideHue = function (h) {
        return new Colour(this.h / h, this.s, this.l, this.a);
    };
    Colour.prototype.withSaturation = function (s) {
        return new Colour(this.h, s, this.l, this.a);
    };
    Colour.prototype.addSaturation = function (s) {
        return new Colour(this.h, this.s + s, this.l, this.a);
    };
    Colour.prototype.minusSaturation = function (s) {
        return new Colour(this.h, this.s - s, this.l, this.a);
    };
    Colour.prototype.timesSaturation = function (s) {
        return new Colour(this.h, this.s * s, this.l, this.a);
    };
    Colour.prototype.divideSaturation = function (s) {
        return new Colour(this.h, this.s / s, this.l, this.a);
    };
    Colour.prototype.withLightness = function (l) {
        return new Colour(this.h, this.s, l, this.a);
    };
    Colour.prototype.addLightness = function (l) {
        return new Colour(this.h, this.s, this.l + l, this.a);
    };
    Colour.prototype.minusLightness = function (l) {
        return new Colour(this.h, this.s, this.l - l, this.a);
    };
    Colour.prototype.timesLightness = function (l) {
        return new Colour(this.h, this.s, this.l * l, this.a);
    };
    Colour.prototype.divideLightness = function (l) {
        return new Colour(this.h, this.s, this.l / l, this.a);
    };
    Colour.prototype.withAlpha = function (a) {
        return new Colour(this.h, this.s, this.l, a);
    };
    Colour.prototype.addAlpha = function (a) {
        return new Colour(this.h, this.s, this.l, this.a + a);
    };
    Colour.prototype.minusAlpha = function (a) {
        return new Colour(this.h, this.s, this.l, this.a - a);
    };
    Colour.prototype.timesAlpha = function (a) {
        return new Colour(this.h, this.s, this.l, this.a * a);
    };
    Colour.prototype.divideAlpha = function (a) {
        return new Colour(this.h, this.s, this.l, this.a / a);
    };
    return Colour;
}());
exports.default = Colour;
//# sourceMappingURL=Colour.js.map