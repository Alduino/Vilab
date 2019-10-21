import { FC } from "react";
export interface MediaControlPanelProps {
    /**
     * Changing this value will play/pause the media.
     *
     * @remarks
     * ## Remarks about Internal State
     * This component does not have an internal state, so by default acts as if it is readonly. Instead the component
     * expects that the parent will listen to its events and set the required properties. This fixes many problems with
     * de-synchronisation between components that would otherwise happen if we kept our own state, as there is just one
     * state source instead of multiple.
     */
    playing: boolean;
    /**
     * Volume level of the media.
     *
     * @remarks
     * This value's range is between -1 and 1. The reason for this is that we can specify when the audio is muted by
     * using a value <=0. This makes calculations really easy, as we can use `max(0, vol)` to find the real volume,
     * `abs(vol)` to find what volume should be displayed on its slider, and `-vol` to mute/unmute. Hence there are
     * helper methods, `getRealVolume(vol)`, `getDisplayVolume(vol)` and `invertVolumeState(vol)` to find these values.
     *
     * @see MediaControlPanelProps.playing See remarks about internal state
     */
    volume: number;
    className?: string;
    /**
     * Triggered when the play button is pressed
     */
    onPlay?: () => void;
    /**
     * Triggered when the pause button is pressed
     */
    onPause?: () => void;
    /**
     * Triggered when the volume changes
     * @param volume - See {@link volume}
     */
    onVolumeChanged?: (volume: number) => void;
}
export declare const getRealVolume: (vol: number) => number;
export declare const getDisplayVolume: (vol: number) => number;
export declare const invertVolumeState: (vol: number) => number;
/**
 * This component adds buttons to control different media functions, like play/pause, volume etc. It does not include
 * a seek bar, so that component will need to be added separately.
 *
 * @remarks
 * This component is not designed to be resizable, however all sizes (except for the border-radius) are in `em`, so it
 * _is_ possible to resize using `font-size`.
 */
export declare const MediaControlPanel: FC<MediaControlPanelProps>;
