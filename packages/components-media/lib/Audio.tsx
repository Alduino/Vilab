import React, {FC, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";
import classNames from "classnames";
import MediaProps from "./MediaProps";
import {addMediaListeners} from "./util";

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
export const Audio: FC<PropsWithChildren<MediaProps>> = props => {
    const $media = useRef<HTMLMediaElement | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if ($media.current && hasLoaded) $media.current.currentTime = props.time * $media.current.duration;
    }, [props.time, $media, hasLoaded]);

    useEffect(() => {
        if ($media.current) $media.current.volume = props.volume;
    }, [props.volume, $media]);

    useEffect(() => {
        if (!$media.current) return;

        if (props.playing) $media.current.play();
        else $media.current.pause();
    }, [props.playing, $media]);

    useEffect(addMediaListeners(props, $media, () => setHasLoaded(true)));

    return useMemo(
        () => <audio ref={$media} children={props.children} className={classNames(props.className)}/>,
        [$media, props.children, props.className]
    );
};