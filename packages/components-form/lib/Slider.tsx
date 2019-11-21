import React, {FC, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Values} from "@xilab/themes";
import classNames = require("classnames");

export interface SliderProps {
    /**
     * Minimum value on the slider (when it is at its left-most setting)
     */
    min: number;

    /**
     * Maximum value of the slider (when it is at its right-most setting)
     */
    max: number;

    /**
     * The current value of the slider. Must be between min and max, otherwise undefined behaviour will happen
     */
    value: number;

    /**
     * Add your own class names to the slider to style it
     */
    className?: number;

    /**
     * Called when the slider value is updated.
     * @param val - New slider value between min and max
     */
    onChange?: (val: number) => void;
}

interface DotProps {
    offset: number;
}

const Container = styled.div`
    height: 1em;
    position: relative;
    
    &::before {
        content: "";
        display: block;
        
        position: absolute;
        left: 0;
        right: 0;
        top: .4em;
        height: .2em;
        
        background: ${props => props.theme.shade.grey(Values.light)};
    }
`;

const Dot = styled.div.attrs<DotProps>(props => ({
    style: {
        // This value changes whenever the dot moves, so put it as an attribute so styled-components doesn't generate
        // a new class for every dot position
        left: `${props.offset * 100}%`
    }
}))<DotProps>`
    content: "";
    display: block;
    
    position: absolute;
    top: .25em;
    
    width: .5em;
    height: .5em;
    
    transform: translateX(-50%);
    
    background: currentColor;
    
    border-radius: 50%;
`;

/**
 * A simple slider component, similar to HTML's range input. Displays `value` prop as the position of a dot on a line,
 * and calls {@link SliderProps.onChange} when the user inputs a new value.
 *
 * @remarks
 * The slider is always `1em` high, so you can scale it however you want by setting `font-size`. It is also a block
 * element, so you can set its with normally. You can set the dot colour with the `color` CSS property, however the
 * background will always be a grey based on the current theme.
 *
 * Unlike the normal HTML range input, this component does not update itself - the following code would act like a
 * readonly slider:
 * ```jsx
 * <Slider min={0} max={1} value={0.5} />
 * ```
 *
 * Instead, to make it act like a normal slider, you can use React hooks:
 * ```jsx
 * const [sliderValue, setSliderValue] = useHook(0.5);
 * // ...
 * <Slider min={0} max={1} value={sliderValue} onChange={setSliderValue} />
 * ```
 */
export const Slider: FC<SliderProps> = props => {
    const [isMouseDown, setIsMouseDown] = useState(false);

    // Reference to an element of the same width as the slider, so we can get its width for value calculations
    const offsetEl = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: MouseEvent, force: boolean = false) {
        // If the mouse isn't down (and we aren't being forced for an update) we shouldn't do anything
        if (!isMouseDown && !force) return;

        // Make typescript happy
        if (offsetEl.current === null) return;

        // No point doing any of this if there isn't any event to trigger
        if (!props.onChange) return;

        const mousePos = e.pageX - offsetEl.current.offsetLeft;
        const smallValue = mousePos / offsetEl.current.offsetWidth;
        const clampedValue = Math.max(0, Math.min(1, smallValue));
        const scaledValue = props.min + clampedValue * (props.max - props.min);

        props.onChange(scaledValue);
    }

    // This needs to be in a separate function so we can remove it later
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

    return (
        <Container className={classNames(props.className)}
                   onMouseDown={e => { setIsMouseDown(true); handleMouseMove(e.nativeEvent, true); }}
                   ref={offsetEl}>
            <Dot offset={(props.value - props.min) / (props.max - props.min)} />
        </Container>
    );
};