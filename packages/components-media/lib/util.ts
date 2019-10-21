import MediaProps from "./MediaProps";
import {MutableRefObject} from "react";

export type CssValue = number | string;

export type CancellableEventHandler = () => boolean | void;
export type CancellableEventHandlerWithArgument<T> = (arg: T) => boolean | void;

interface EventList {
    [event: string]: (event: Event) => void;
}

export function getMediaListeners(props: MediaProps, ref: MutableRefObject<HTMLMediaElement | null>): EventList {
    return {
        seeking: event => {
            if (ref.current === null) return;
            const time = ref.current.currentTime / ref.current.duration;
            if (props.onSeek && !props.onSeek(time) !== false) event.preventDefault();
        },
        timeupdate: event => {
            if (ref.current === null) return;
            const time = ref.current.currentTime / ref.current.duration;
            if (props.onSeek && !props.onSeek(time) !== false) event.preventDefault();
        },
        play: event => {
            if (props.onPlay && !props.onPlay() !== false) event.preventDefault();
        },
        pause: event => {
            if (props.onPause && !props.onPause() !== false) event.preventDefault();
        },
        end: event => {
            if (props.onEnd) props.onEnd();
        },
        volumeChange: event => {
            if (ref.current === null) return;
            if (props.onVolumeChange && !props.onVolumeChange(ref.current.volume) !== false) event.preventDefault();
        },
        progress: event => {
            if (ref.current === null) return;

            const progresses: {start: number, end: number}[] = [];
            for (let i = 0; i < ref.current.buffered.length; i++) {
                progresses.push({
                    start: ref.current.buffered.start(i) / ref.current.duration,
                    end: ref.current.buffered.end(i) / ref.current.duration
                });
            }

            if (props.onDataLoaded) props.onDataLoaded(progresses);
        }
    };
}

export function addMediaListeners(props: MediaProps, ref: MutableRefObject<HTMLMediaElement | null>, metadataLoaded: () => void) {
    return () => {
        // make typescript happy
        if (ref.current === null) return () => {};

        const listeners = getMediaListeners(props, ref);

        for (const listener in listeners) {
            if (!listeners.hasOwnProperty(listener)) continue;

            ref.current.addEventListener(listener, listeners[listener]);
        }

        ref.current.addEventListener("loadedmetadata", metadataLoaded);

        return () => {
            // make typescript happy
            if (ref.current === null) return;

            for (const listener in listeners) {
                if (!listeners.hasOwnProperty(listener)) continue;
                ref.current.removeEventListener(listener, listeners[listener]);
            }

            ref.current.removeEventListener("loadedmetadata", metadataLoaded);
        };
    };
}

export function sizeToString(size: CssValue) {
    if (typeof size === "string") return size;
    return size + "px";
}