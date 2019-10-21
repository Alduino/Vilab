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
var util_1 = require("./util");
var MediaControlPanel_1 = require("./MediaControlPanel");
var styled_components_1 = __importDefault(require("styled-components"));
var SeekBar_1 = require("./SeekBar");
var Video_1 = require("./Video");
var PopupIcon_1 = require("./PopupIcon");
var boxicons_regular_1 = require("styled-icons/boxicons-regular");
var Controls = styled_components_1.default(MediaControlPanel_1.MediaControlPanel)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: ", ";\n    \n    grid-row: 2;\n    grid-column: 2;\n    \n    transition: 100ms linear;\n    opacity: 0;\n    \n    color: ", ";\n"], ["\n    background: ", ";\n    \n    grid-row: 2;\n    grid-column: 2;\n    \n    transition: 100ms linear;\n    opacity: 0;\n    \n    color: ", ";\n"])), function (props) { return props.theme.shade.light.withAlpha(.7); }, function (props) { return props.theme.colour.primary; });
var Progress = styled_components_1.default(SeekBar_1.SeekBar)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    grid-row: 3;\n    grid-column: 1/4;\n    \n    transition: 100ms linear;\n    opacity: 0;\n    \n    background: ", ";\n"], ["\n    grid-row: 3;\n    grid-column: 1/4;\n    \n    transition: 100ms linear;\n    opacity: 0;\n    \n    background: ", ";\n"])), function (props) { return props.theme.shade.light.withAlpha(.7); });
var Overlay = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: ", ";\n    height: ", ";\n    \n    display: grid;\n    grid-template-rows: 1fr auto auto;\n    grid-template-columns: 1fr auto 1fr;\n    \n    &:hover ", ", &:hover ", " {\n    opacity: 1;\n    }\n"], ["\n    width: ", ";\n    height: ", ";\n    \n    display: grid;\n    grid-template-rows: 1fr auto auto;\n    grid-template-columns: 1fr auto 1fr;\n    \n    &:hover ", ", &:hover ", " {\n    opacity: 1;\n    }\n"])), function (props) { return util_1.sizeToString(props.width); }, function (props) { return util_1.sizeToString(props.height); }, Progress, Controls);
var StyledVideo = styled_components_1.default(Video_1.Video)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 100%;\n    \n    grid-row: 1/4;\n    grid-column: 1/4;\n"], ["\n    width: 100%;\n    \n    grid-row: 1/4;\n    grid-column: 1/4;\n"])));
var VideoHider = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    grid-row: 1/4;\n    grid-column: 1/4;\n"], ["\n    grid-row: 1/4;\n    grid-column: 1/4;\n"])));
var PlayPauser = styled_components_1.default(PopupIcon_1.PopupIcon)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    grid-row: 1/4;\n    grid-column: 1/4;\n    pointer-events: none;\n    \n    font-size: 10em;\n"], ["\n    grid-row: 1/4;\n    grid-column: 1/4;\n    pointer-events: none;\n    \n    font-size: 10em;\n"])));
exports.VideoPlayer = function (props) {
    var _a = react_1.useState(0), time = _a[0], setTime = _a[1], // TODO initial timestamp
    _b = react_1.useState(time), videoOverrideTime = _b[0], setVideoOverrideTime = _b[1];
    var _c = react_1.useState([]), loadTimes = _c[0], setLoadTimes = _c[1];
    var _d = react_1.useState(false), isPlaying = _d[0], setIsPlaying = _d[1]; // TODO autoplay option
    var _e = react_1.useState(1), volume = _e[0], setVolume = _e[1]; // TODO store previous volume
    return (react_1.default.createElement(Overlay, { width: props.width, height: props.height },
        react_1.default.createElement(StyledVideo, { time: videoOverrideTime, volume: MediaControlPanel_1.getRealVolume(volume), playing: isPlaying, onSeek: setTime, onPlay: function () { return setIsPlaying(true); }, onPause: function () { return setIsPlaying(false); }, onEnd: function () { return setIsPlaying(false); }, onDataLoaded: setLoadTimes, children: props.children }),
        react_1.default.createElement(VideoHider, { onClick: function () { return setIsPlaying(function (state) { return !state; }); } }),
        react_1.default.createElement(PlayPauser, { icon: isPlaying ? boxicons_regular_1.Play : boxicons_regular_1.Pause }),
        react_1.default.createElement(Progress, null),
        react_1.default.createElement(Controls, { playing: isPlaying, volume: volume, onPlay: function () { return setIsPlaying(true); }, onPause: function () { return setIsPlaying(false); }, onVolumeChanged: setVolume })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=VideoPlayer.js.map