import { FC, PropsWithChildren } from "react";
import MediaProps from "./MediaProps";
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
export declare const Video: FC<PropsWithChildren<MediaProps>>;
