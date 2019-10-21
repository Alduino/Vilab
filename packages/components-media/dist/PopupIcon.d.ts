import { ComponentType, FC } from "react";
import { StyledIconProps } from "styled-icons/StyledIconBase";
export interface PopupIconProps {
    /**
     * The icon to display
     */
    icon: ComponentType<StyledIconProps>;
    /**
     * Add your own class names to the slider to style it
     */
    className?: string;
}
/**
 * When changed, the specified icon will pop up in the centre of this element and fade away.
 *
 * @remarks
 *
 * The size of the icon is 1em, so you can set its size using the `font-size` property.
 *
 * The icon colour is always the theme's `shade.grey(Values.xxdark)` and the background is always the theme's
 * `shade.light` with 50% alpha.
 *
 * The component by default takes up 100% of its parent element's width and height, and is a block-level element.
 * Do not set its `position` CSS property to anything other than `relative`, as this will break the component.
 */
export declare const PopupIcon: FC<PopupIconProps>;
