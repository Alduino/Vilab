import {CancellableEventHandler, CancellableEventHandlerWithArgument} from "./util";

export interface DataLoadSection {
    start: number;
    end: number;
}

export default interface MediaProps {
    /**
     * The percentage through the media item that we are currently at
     */
    time: number;

    /**
     * The percentage volume for the media item
     */
    volume: number;

    /**
     * Specifies whether or not the media item is currently playing. True will play the item, false will pause it.
     */
    playing: boolean;

    /**
     * Add your own class names to the media item to style it
     */
    className?: string;

    /**
     * Triggered when the time changes
     * @param time - The percent through the video
     */
    onSeek?: CancellableEventHandlerWithArgument<number>;

    /**
     * Triggered when the media element plays
     */
    onPlay?: CancellableEventHandler;

    /**
     * Triggered when the media element pauses
     */
    onPause?: CancellableEventHandler;

    /**
     * Triggered when the media element finishes playing
     */
    onEnd?: () => void;

    /**
     * Triggered when the volume changes
     */
    onVolumeChange?: CancellableEventHandlerWithArgument<number>

    /**
     * Triggered when the load amount has changed
     * @param amounts - List of load sections, each between 0 and 1
     */
    onDataLoaded?: (amounts: DataLoadSection[]) => void;
}