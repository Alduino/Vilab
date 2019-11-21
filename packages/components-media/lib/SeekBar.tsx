import React, {useEffect, useRef, useState} from "react";
import {FC} from "react";
import styled from "styled-components";
import {Values} from "@xilab/themes/dist";
import classNames = require("classnames");
import {DataLoadSection} from "./MediaProps";
import {formatSecondsAsMS} from "./util";

export interface SeekBarProps {
    /**
     * Group of sections specifying what part of the media is loaded
     */
    loadSections: DataLoadSection[];

    /**
     * The total length of the media in seconds
     */
    duration: number;

    /**
     * The current time through the media, between 0 and 1
     */
    currentTime: number;

    /**
     * Add your own class names to the slider to style it
     */
    className?: number;

    /**
     * Called when the seek bar time is updated
     * @param val - The new time to seek to (between 0 and 1)
     */
    onSeek?: (val: number) => void;
}

interface DotProps {
    offset: number;
}

const Container = styled.div`
    height: 1em;
    display: flex;
    
    padding: 0 .5em;
`;

const BarContainer = styled.div`
    height: 100%;
    position: relative;
    flex-grow: 1;
    align-self: center;
    
    &::before {
        content: "";
        display: block;
        
        position: absolute;
        left: 0;
        right: 0;
        top: .4em;
        height: .2em;
        
        background: ${props => props.theme.shade.grey(Values.dark)};
    }
`;

const TimeStamp = styled.div`
    font: ${props => props.theme.font.body};
    font-size: .8em;
    align-self: center;
    
    margin-left: .2em;
`;

const Dot = styled.div.attrs<DotProps>(props => ({
    style: {
        left: `${props.offset * 100}%`
    }
}))<DotProps>`
    display: block;
    
    position: absolute;
    top: .25em;
    
    width: .5em;
    height: .5em;
    
    transform: translateX(-50%);
    
    background: currentColor;
    
    border-radius: 50%;
`;

const LoadSection = styled.div.attrs<DataLoadSection>(props => ({
    style: {
        left: `${props.start * 100}%`,
        right: `${(1 - props.end) * 100}%`
    }
}))<DataLoadSection>`
    display: block;
        
    position: absolute;
    top: .4em;
    height: .2em;
    
    background: ${props => props.theme.shade.grey(Values.light)};
`;

export const SeekBar: FC<SeekBarProps> = props => {
    const [isMouseDown, setIsMouseDown] = useState(false);

    const offsetEl = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: MouseEvent, force: boolean = false) {
        if (!isMouseDown && !force) return;
        if (offsetEl.current === null) return;
        if (!props.onSeek) return;

        const mousePos = e.pageX - offsetEl.current.offsetLeft;
        const value = mousePos / offsetEl.current.offsetWidth;
        props.onSeek(value);
    }

    function handleMouseUp() {
        setIsMouseDown(false);
    }

    useEffect(() => {
        // Add these events to `window` so the slider doesn't only change when the mouse is directly over it
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });

    const timestampValue =
        formatSecondsAsMS(props.currentTime * props.duration) + "/" +
        formatSecondsAsMS(props.duration);

    return (
        <Container className={classNames(props.className)}>
            <BarContainer ref={offsetEl}
                          onMouseDown={e => { setIsMouseDown(true); handleMouseMove(e.nativeEvent, true); }}>
                {props.loadSections.map((loadSection, i) => (
                    <LoadSection {...loadSection} key={i} />
                ))}
                <Dot offset={props.currentTime} />
            </BarContainer>
            <TimeStamp>{timestampValue}</TimeStamp>
        </Container>
    );
};