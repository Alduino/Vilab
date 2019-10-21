import { FC, PropsWithChildren } from "react";
import MediaProps from "./MediaProps";
/**
 * A wrapper for the HTML audio element that Reactifies it. Expects `source` HTML elements as children.
 *
 * @remarks
 * You shouldn't change the `time` property on this component unless you want to seek the video - the following will
 * make the video jutter, as it will seek the video whenever the video time changes:
 * ```jsx
 * const [time, setTime] = useState(0);
 * // ...
 * <Audio ... time={time} onSeek={setTime}
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
export declare const Audio: FC<PropsWithChildren<MediaProps>>;
