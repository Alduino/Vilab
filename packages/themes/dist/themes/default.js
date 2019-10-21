"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Colour_1 = __importDefault(require("../Colour"));
var ThemeFont_1 = __importDefault(require("../ThemeFont"));
exports.theme = {
    shade: {
        dark: new Colour_1.default(0, 0, 0),
        light: new Colour_1.default(0, 0, 1),
        grey: function (value) { return new Colour_1.default(0, 0, value); }
    },
    colour: {
        primary: new Colour_1.default(204, 1, .5),
        secondary: new Colour_1.default(58, 1, .5)
    },
    font: {
        header: new ThemeFont_1.default("Segoe UI"),
        body: new ThemeFont_1.default("Segoe UI")
    }
};
//# sourceMappingURL=default.js.map