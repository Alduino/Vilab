import Colour from "./Colour";
import ThemeFont from "./ThemeFont";
export declare const Values: {
    xxlight: number;
    xlight: number;
    light: number;
    mid: number;
    dark: number;
    xdark: number;
    xxdark: number;
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
