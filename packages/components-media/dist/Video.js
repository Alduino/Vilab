"use strict";
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
var classnames_1 = __importDefault(require("classnames"));
var util_1 = require("./util");
/**
 * A wrapper for the HTML video element that Reactifies it. Expects `source` and/or `track` HTML elements as children.
 *
 * @remarks
 * You shouldn't change the `time` property on this component unless you want to seek the video - the following will
 * make the video jutter, as it will seek the video whenever the video time changes:
 * ```jsx
 * const [time, setTime] = useState(0);
 * // ...
 * <Video ... time={time} onSeek={setTime}
 * ```
 *
 * Instead, you will need to use a different state for the real video time, if you want a progress bar for the video:
 * ```jsx
 * const [time, setTime] = useState(0);
 * const [videoOverrideTime, setVideoOverrideTime] = useState(time);
 * <Video ... time={videoOverrideTime} onSeek={setTime} />
 * <SeekBar ... time={time} onSeek={val => { setTime(val); setVideoOverrideTime(val); }}
 * ```
 */
exports.Video = function (props) {
    var $media = react_1.useRef(null);
    var _a = react_1.useState(false), hasLoaded = _a[0], setHasLoaded = _a[1];
    react_1.useEffect(function () {
        if ($media.current && hasLoaded)
            $media.current.currentTime = props.time * $media.current.duration;
    }, [props.time, $media, hasLoaded]);
    react_1.useEffect(function () {
        if ($media.current)
            $media.current.volume = props.volume;
    }, [props.volume, $media]);
    react_1.useEffect(function () {
        if (!$media.current)
            return;
        if (props.playing)
            $media.current.play();
        else
            $media.current.pause();
    }, [props.playing, $media]);
    react_1.useEffect(util_1.addMediaListeners(props, $media, function () { return setHasLoaded(true); }));
    return react_1.useMemo(function () { return react_1.default.createElement("video", { ref: $media, children: props.children, className: classnames_1.default(props.className) }); }, [$media, props.children, props.className]);
};
//# sourceMappingURL=Video.js.map