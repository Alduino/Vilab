"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var themes_1 = require("@xilab/themes");
var classNames = require("classnames");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 1em;\n    position: relative;\n    \n    &::before {\n        content: \"\";\n        display: block;\n        \n        position: absolute;\n        left: 0;\n        right: 0;\n        top: .4em;\n        height: .2em;\n        \n        background: ", ";\n    }\n"], ["\n    height: 1em;\n    position: relative;\n    \n    &::before {\n        content: \"\";\n        display: block;\n        \n        position: absolute;\n        left: 0;\n        right: 0;\n        top: .4em;\n        height: .2em;\n        \n        background: ", ";\n    }\n"])), function (props) { return props.theme.shade.grey(themes_1.Values.light); });
var Dot = styled_components_1.default.div.attrs(function (props) { return ({
    style: {
        // This value changes whenever the dot moves, so put it as an attribute so styled-components doesn't generate
        // a new class for every dot position
        left: props.offset * 100 + "%"
    }
}); })(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    content: \"\";\n    display: block;\n    \n    position: absolute;\n    top: .25em;\n    \n    width: .5em;\n    height: .5em;\n    \n    transform: translateX(-50%);\n    \n    background: currentColor;\n    \n    border-radius: 50%;\n"], ["\n    content: \"\";\n    display: block;\n    \n    position: absolute;\n    top: .25em;\n    \n    width: .5em;\n    height: .5em;\n    \n    transform: translateX(-50%);\n    \n    background: currentColor;\n    \n    border-radius: 50%;\n"])));
/**
 * A simple slider component, similar to HTML's range input. Displays `value` prop as the position of a dot on a line,
 * and calls {@link SliderProps.onChange} when the user inputs a new value.
 *
 * @remarks
 * The slider is always `1em` high, so you can scale it however you want by setting `font-size`. It is also a block
 * element, so you can set its with normally. You can set the dot colour with the `color` CSS property, however the
 * background will always be a grey based on the current theme.
 *
 * Unlike the normal HTML range input, this component does not update itself - the following code would act like a
 * readonly slider:
 * ```jsx
 * <Slider min={0} max={1} value={0.5} />
 * ```
 *
 * Instead, to make it act like a normal slider, you can use React hooks:
 * ```jsx
 * const [sliderValue, setSliderValue] = useHook(0.5);
 * // ...
 * <Slider min={0} max={1} value={sliderValue} onChange={setSliderValue} />
 * ```
 */
exports.Slider = function (props) {
    var _a = react_1.useState(false), isMouseDown = _a[0], setIsMouseDown = _a[1];
    // Reference to an element of the same width as the slider, so we can get its width for value calculations
    var offsetEl = react_1.useRef(null);
    function handleMouseMove(e, force) {
        if (force === void 0) { force = false; }
        // If the mouse isn't down (and we aren't being forced for an update) we shouldn't do anything
        if (!isMouseDown && !force)
            return;
        // Make typescript happy
        if (offsetEl.current === null)
            return;
        // No point doing any of this if there isn't any event to trigger
        if (!props.onChange)
            return;
        var mousePos = e.pageX - offsetEl.current.offsetLeft;
        var smallValue = mousePos / offsetEl.current.offsetWidth;
        var clampedValue = Math.max(0, Math.min(1, smallValue));
        var scaledValue = props.min + clampedValue * (props.max - props.min);
        if (props.onChange)
            props.onChange(scaledValue);
    }
    // This needs to be in a separate function so we can remove it later
    function handleMouseUp() {
        setIsMouseDown(false);
    }
    react_1.useEffect(function () {
        // Add these events to `window` so the slider doesn't only change when the mouse is directly over it
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return function () {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });
    return (react_1.default.createElement(Container, { className: classNames(props.className), onMouseDown: function (e) { setIsMouseDown(true); handleMouseMove(e.nativeEvent, true); }, ref: offsetEl },
        react_1.default.createElement(Dot, { offset: (props.value - props.min) / (props.max - props.min) })));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=Slider.js.map