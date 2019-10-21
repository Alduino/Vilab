import React, {FC} from "react";
import styled from "styled-components";
import {StyledIconProps} from "styled-icons/StyledIconBase";
import {Slider} from "@xilab/components-form";
import {Pause, Play, Volume, VolumeFull, VolumeLow, VolumeMute} from "styled-icons/boxicons-regular";
import classNames = require("classnames");

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

const Container = styled.div`
    border-radius: 3px 3px 0 0;
    padding: 0 .3em;
`;

const ControlButton = styled.button<StyledIconProps>`
    cursor: pointer;
    
    &:not(:last-child) {
        margin-right: .3em;
    }
`;

const VolumeSlider = styled(Slider)`
    width: 3em;
    display: inline-block;
    
    position: relative;
    top: .3em;
`;

export const getRealVolume = (vol: number) => Math.max(0, vol);
export const getDisplayVolume = (vol: number) => Math.abs(vol);
export const invertVolumeState = (vol: number) => -vol;

/**
 * This component adds buttons to control different media functions, like play/pause, volume etc. It does not include
 * a seek bar, so that component will need to be added separately.
 *
 * @remarks
 * This component is not designed to be resizable, however all sizes (except for the border-radius) are in `em`, so it
 * _is_ possible to resize using `font-size`.
 */
export const MediaControlPanel: FC<MediaControlPanelProps> = props => {
    function togglePlayState() {
        if (props.playing) {
            if (props.onPause) props.onPause();
            if (props.onPlay) props.onPlay();
        }
    }

    function toggleVolumeState() {
        if (props.onVolumeChanged) props.onVolumeChanged(-props.volume);
    }

    const volumeIconLevels = [VolumeMute, Volume, VolumeLow, VolumeFull];
    const volumeIconIndex = Math.ceil(getRealVolume(props.volume) * (volumeIconLevels.length - 1));
    const currentVolumeIcon = volumeIconLevels[volumeIconIndex];

    return (
        <Container className={classNames(props.className)}>
            <ControlButton as={props.playing ? Pause : Play} size="1em" onClick={togglePlayState} />
            <ControlButton as={currentVolumeIcon} size="1em" onClick={toggleVolumeState} />
            <VolumeSlider min={0} max={1} value={getDisplayVolume(props.volume)} onChange={props.onVolumeChanged} />
        </Container>
    );
};