import { FC } from "react";
import { CancellableEventHandler, CancellableEventHandlerWithArgument, CssValue } from "./util";
export interface VideoPlayerProps {
    width: CssValue;
    height: CssValue;
    onPlay?: CancellableEventHandler;
    onPause?: CancellableEventHandler;
    onVolumeUpdate?: CancellableEventHandlerWithArgument<number>;
    onSeek?: CancellableEventHandlerWithArgument<number>;
}
export declare const VideoPlayer: FC<VideoPlayerProps>;
