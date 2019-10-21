import { FC } from "react";
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
export declare const Slider: FC<SliderProps>;
