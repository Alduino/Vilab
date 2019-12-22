import ITheme from "../ITheme";
import Colour from "../Colour";
import ThemeFont from "../ThemeFont";

export const theme: ITheme = {
    shade: {
        dark: new Colour(0, 0, 0),
        light: new Colour(0, 0, 1),
        grey: value => new Colour(0, 0, value)
    },

    colour: {
        primary: new Colour(204, 1, .5),
        secondary: new Colour(58, 1, .5)
    },

    font: {
        header: new ThemeFont("soleil", "'Segoe UI', Helvetica, Arial"),
        body: new ThemeFont("soleil", "'Segoe UI', Helvetica, Arial")
    }
};