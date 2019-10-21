import MediaProps from "./MediaProps";
import { MutableRefObject } from "react";
export declare type CssValue = number | string;
export declare type CancellableEventHandler = () => boolean | void;
export declare type CancellableEventHandlerWithArgument<T> = (arg: T) => boolean | void;
interface EventList {
    [event: string]: (event: Event) => void;
}
export declare function getMediaListeners(props: MediaProps, ref: MutableRefObject<HTMLMediaElement | null>): EventList;
export declare function addMediaListeners(props: MediaProps, ref: MutableRefObject<HTMLMediaElement | null>, metadataLoaded: () => void): () => () => void;
export declare function sizeToString(size: CssValue): string;
export {};
