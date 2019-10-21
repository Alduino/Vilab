import React, {ComponentType, FC} from "react";
import {StyledIconProps} from "styled-icons/StyledIconBase";
import styled, {keyframes} from "styled-components";
import {Values} from "@xilab/themes";
import classNames = require("classnames");

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

const animation = keyframes`
    0% {
        opacity: 1;
    }
    
    50% {
        opacity: .75;
    }
    
    100% {
        opacity: 0;
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    position: relative;
`;

const Circle = styled.div<StyledIconProps>`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   
   color: ${props => props.theme.shade.grey(Values.xxdark)};
   background: ${props => props.theme.shade.light.withAlpha(.5)};
   border-radius: 50%;
   
   animation: ${animation} .6s ease-out;
   opacity: 0;
`;

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
export const PopupIcon: FC<PopupIconProps> = props => (
    <Container className={classNames(props.className)}>
        <Circle as={props.icon} size="1em" />
    </Container>
);