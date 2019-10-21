import Colour from "./Colour";
import ThemeFont from "./ThemeFont";

export const Values = {
    xxlight: 1,
    xlight: .8,
    light: .6,
    mid: .5,
    dark: .4,
    xdark: .25,
    xxdark: .1
};

export default interface ITheme {
    shade: {
        dark: Colour;
        light: Colour;
        grey: (value: number) => Colour;
    };

    colour: {
        primary: Colour;
        secondary: Colour;
    };

    font: {
        header: ThemeFont;
        body: ThemeFont;
    };
}