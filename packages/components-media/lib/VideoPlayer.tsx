import React, {FC, useState} from "react";
import {CancellableEventHandler, CancellableEventHandlerWithArgument, CssValue, sizeToString} from "./util";
import {getRealVolume, MediaControlPanel} from "./MediaControlPanel";
import styled from "styled-components";
import {SeekBar} from "./SeekBar";
import {Video} from "./Video";
import {PopupIcon} from "./PopupIcon";
import {DataLoadSection} from "./MediaProps";
import {Pause, Play} from "styled-icons/boxicons-regular";

export interface VideoPlayerProps {
    width: CssValue;
    height: CssValue;

    //onPlay?: CancellableEventHandler;
    //onPause?: CancellableEventHandler;

    //onVolumeUpdate?: CancellableEventHandlerWithArgument<number>;
    //onSeek?: CancellableEventHandlerWithArgument<number>;
}

interface VideoOverlayProps {
    width: CssValue;
    height: CssValue;
}

const Controls = styled(MediaControlPanel)`
    background: ${props => props.theme.shade.light.withAlpha(.7)};
    
    grid-row: 2;
    grid-column: 2;
    
    transition: 100ms linear;
    opacity: 0;
    
    color: ${props => props.theme.colour.primary};
`;

const Progress = styled(SeekBar)`
    grid-row: 3;
    grid-column: 1/4;
    
    transition: 100ms linear;
    opacity: 0;
    
    background: ${props => props.theme.shade.light.withAlpha(.7)};
`;

const Overlay = styled.div<VideoOverlayProps>`
    width: ${props => sizeToString(props.width)};
    height: ${props => sizeToString(props.height)};
    
    display: grid;
    grid-template-rows: 1fr auto auto;
    grid-template-columns: 1fr auto 1fr;
    
    &:hover ${Progress}, &:hover ${Controls} {
        opacity: 1;
    }
`;

const StyledVideo = styled(Video)`
    width: 100%;
    
    grid-row: 1/4;
    grid-column: 1/4;
`;

const VideoHider = styled.div`
    grid-row: 1/4;
    grid-column: 1/4;
`;

const PlayPauser = styled(PopupIcon)`
    grid-row: 1/4;
    grid-column: 1/4;
    pointer-events: none;
    
    font-size: 10em;
`;

/**
 * All-in-one video player. Simply set and forget.
 */
export const VideoPlayer: FC<VideoPlayerProps> = props => {
    const [time, setTime] = useState(0), // TODO initial timestamp
        [videoOverrideTime, setVideoOverrideTime] = useState(time);
    const [loadTimes, setLoadTimes] = useState<DataLoadSection[]>([]);
    const [isPlaying, setIsPlaying] = useState(false); // TODO autoplay option
    const [volume, setVolume] = useState(1); // TODO store previous volume
    const [duration, setDuration] = useState(0);

    return (
        <Overlay width={props.width} height={props.height}>
            <StyledVideo time={videoOverrideTime}
                         volume={getRealVolume(volume)}
                         playing={isPlaying}
                         onSeek={setTime}
                         onPlay={() => setIsPlaying(true)}
                         onPause={() => setIsPlaying(false)}
                         onEnd={() => setIsPlaying(false)}
                         onDataLoaded={setLoadTimes}
                         onDurationLoaded={setDuration}
                         children={props.children} />

            <VideoHider onClick={() => setIsPlaying(state => !state)} />

            <PlayPauser icon={isPlaying ? Play : Pause} />
            <Progress duration={duration}
                      loadSections={loadTimes}
                      currentTime={time}
                      onSeek={setVideoOverrideTime}/>
            <Controls playing={isPlaying}
                      volume={volume}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onVolumeChanged={setVolume} />
        </Overlay>
    );
};