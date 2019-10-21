"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var components_form_1 = require("@xilab/components-form");
var boxicons_regular_1 = require("styled-icons/boxicons-regular");
var classNames = require("classnames");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-radius: 3px 3px 0 0;\n    padding: 0 .3em;\n"], ["\n    border-radius: 3px 3px 0 0;\n    padding: 0 .3em;\n"])));
var ControlButton = styled_components_1.default.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    cursor: pointer;\n    \n    &:not(:last-child) {\n        margin-right: .3em;\n    }\n"], ["\n    cursor: pointer;\n    \n    &:not(:last-child) {\n        margin-right: .3em;\n    }\n"])));
var VolumeSlider = styled_components_1.default(components_form_1.Slider)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 3em;\n    display: inline-block;\n    \n    position: relative;\n    top: .3em;\n"], ["\n    width: 3em;\n    display: inline-block;\n    \n    position: relative;\n    top: .3em;\n"])));
exports.getRealVolume = function (vol) { return Math.max(0, vol); };
exports.getDisplayVolume = function (vol) { return Math.abs(vol); };
exports.invertVolumeState = function (vol) { return -vol; };
/**
 * This component adds buttons to control different media functions, like play/pause, volume etc. It does not include
 * a seek bar, so that component will need to be added separately.
 *
 * @remarks
 * This component is not designed to be resizable, however all sizes (except for the border-radius) are in `em`, so it
 * _is_ possible to resize using `font-size`.
 */
exports.MediaControlPanel = function (props) {
    function togglePlayState() {
        if (props.playing) {
            if (props.onPause)
                props.onPause();
            if (props.onPlay)
                props.onPlay();
        }
    }
    function toggleVolumeState() {
        if (props.onVolumeChanged)
            props.onVolumeChanged(-props.volume);
    }
    var volumeIconLevels = [boxicons_regular_1.VolumeMute, boxicons_regular_1.Volume, boxicons_regular_1.VolumeLow, boxicons_regular_1.VolumeFull];
    var volumeIconIndex = Math.ceil(exports.getRealVolume(props.volume) * (volumeIconLevels.length - 1));
    var currentVolumeIcon = volumeIconLevels[volumeIconIndex];
    return (react_1.default.createElement(Container, { className: classNames(props.className) },
        react_1.default.createElement(ControlButton, { as: props.playing ? boxicons_regular_1.Pause : boxicons_regular_1.Play, size: "1em", onClick: togglePlayState }),
        react_1.default.createElement(ControlButton, { as: currentVolumeIcon, size: "1em", onClick: toggleVolumeState }),
        react_1.default.createElement(VolumeSlider, { min: 0, max: 1, value: exports.getDisplayVolume(props.volume), onChange: props.onVolumeChanged })));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MediaControlPanel.js.map