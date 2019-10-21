"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var themes_1 = require("@xilab/themes");
var classNames = require("classnames");
var animation = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    0% {\n        opacity: 1;\n    }\n    \n    50% {\n        opacity: .75;\n    }\n    \n    100% {\n        opacity: 0;\n    }\n"], ["\n    0% {\n        opacity: 1;\n    }\n    \n    50% {\n        opacity: .75;\n    }\n    \n    100% {\n        opacity: 0;\n    }\n"])));
var Container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    \n    position: relative;\n"], ["\n    width: 100%;\n    height: 100%;\n    \n    position: relative;\n"])));
var Circle = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n   position: absolute;\n   top: 50%;\n   left: 50%;\n   transform: translate(-50%, -50%);\n   \n   color: ", ";\n   background: ", ";\n   border-radius: 50%;\n   \n   animation: ", " .6s ease-out;\n   opacity: 0;\n"], ["\n   position: absolute;\n   top: 50%;\n   left: 50%;\n   transform: translate(-50%, -50%);\n   \n   color: ", ";\n   background: ", ";\n   border-radius: 50%;\n   \n   animation: ", " .6s ease-out;\n   opacity: 0;\n"])), function (props) { return props.theme.shade.grey(themes_1.Values.xxdark); }, function (props) { return props.theme.shade.light.withAlpha(.5); }, animation);
/**
 * When changed, the specified icon will pop up in the centre of this element and fade away.
 *
 * @remarks
 *
 * The size of the icon is 1em, so you can set its size using the `font-size` property.
 *
 * The icon colour is always the theme's `shade.grey(Values.xxdark)` and the background is always the theme's
 * `shade.light` with 50% alpha.
 *
 * The component by default takes up 100% of its parent element's width and height, and is a block-level element.
 * Do not set its `position` CSS property to anything other than `relative`, as this will break the component.
 */
exports.PopupIcon = function (props) { return (react_1.default.createElement(Container, { className: classNames(props.className) },
    react_1.default.createElement(Circle, { as: props.icon, size: "1em" }))); };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=PopupIcon.js.map