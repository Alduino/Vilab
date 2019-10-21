export default class Colour {
    private static hueToRgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    // copied from https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    private static hslaToRgba(h: number, s: number, l: number, a: number): {r: number, g: number, b: number, a: number} {
        if (s === 0) return {r: s, g: s, b: s, a};

        const q = l < .5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const r = this.hueToRgb(p, q, h + 1/3);
        const g = this.hueToRgb(p, q, h);
        const b = this.hueToRgb(p, q, h - 1/3);

        return {r, g, b, a};
    }

    private static rgbaToHsla(r: number, g: number, b: number, a: number): {h: number, s: number, l: number, a: number} {
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;

        if (max === min) return {h: 0, s: 0, l, a};

        const d = max - min;
        const s = l > .5 ? d / (2 - max - min) : d / (max + min);

        let h = 0;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d  + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;

        return {h, s, l, a};
    }

    static fromRGB(r: number, g: number = r, b: number = r, a: number = 1) {
        const {h, s, l} = this.rgbaToHsla(r, g, b, a);
        return new Colour(h, s, l, a);
    }

    private readonly h: number;
    private readonly s: number;
    private readonly l: number;
    private readonly a: number;

    constructor(h: number, s: number, l: number, a: number = 1) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }

    hex() {
        const {r, g, b, a} = Colour.hslaToRgba(this.h, this.s, this.l, this.a);

        const redString = Math.floor(r * 255).toString(16).padStart(2, "0");
        const greenString = Math.floor(g * 255).toString(16).padStart(2, "0");
        const blueString = Math.floor(b * 255).toString(16).padStart(2, "0");
        const alphaString = a === 1 ? "" : this.a.toString(16).padStart(2, "0");

        return "#" + redString + greenString + blueString + alphaString;
    }

    rgb() {
        const {r, g, b, a} = Colour.hslaToRgba(this.h, this.s, this.l, this.a);

        const redString = Math.floor(r * 255).toString();
        const greenString = Math.floor(g * 255).toString();
        const blueString = Math.floor(b * 255).toString();
        const alphaString = a.toString();

        if (this.a === 1) {
            return `rgb(${redString}, ${greenString}, ${blueString})`;
        } else {
            return `rgba(${redString}, ${greenString}, ${blueString}, ${alphaString})`;
        }
    }

    hsl() {
        const hueString = this.h + "deg";
        const saturationString = (this.s * 100) + "%";
        const lightnessString = (this.l * 100) + "%";
        const alphaString = this.a.toString();

        if (this.a === 1) {
            return `hsl(${hueString}, ${saturationString}, ${lightnessString})`;
        } else {
            return `hsla(${hueString}, ${saturationString}, ${lightnessString}, ${alphaString})`;
        }
    }

    toString() {
        return this.hsl();
    }

    withHue(h: number): Colour {
        return new Colour(h, this.s, this.l, this.a);
    }

    addHue(h: number): Colour {
        return new Colour(this.h + h, this.s, this.l, this.a);
    }

    minusHue(h: number): Colour {
        return new Colour(this.h - h, this.s, this.l, this.a);
    }

    timesHue(h: number): Colour {
        return new Colour(this.h * h, this.s, this.l, this.a);
    }

    divideHue(h: number): Colour {
        return new Colour(this.h / h, this.s, this.l, this.a);
    }

    withSaturation(s: number): Colour {
        return new Colour(this.h, s, this.l, this.a);
    }

    addSaturation(s: number): Colour {
        return new Colour(this.h, this.s + s, this.l, this.a);
    }

    minusSaturation(s: number): Colour {
        return new Colour(this.h, this.s - s, this.l, this.a);
    }

    timesSaturation(s: number): Colour {
        return new Colour(this.h, this.s * s, this.l, this.a);
    }


    divideSaturation(s: number): Colour {
        return new Colour(this.h, this.s / s, this.l, this.a);
    }

    withLightness(l: number): Colour {
        return new Colour(this.h, this.s, l, this.a);
    }

    addLightness(l: number): Colour {
        return new Colour(this.h, this.s, this.l + l, this.a);
    }

    minusLightness(l: number): Colour {
        return new Colour(this.h, this.s, this.l - l, this.a);
    }

    timesLightness(l: number): Colour {
        return new Colour(this.h, this.s, this.l * l, this.a);
    }

    divideLightness(l: number): Colour {
        return new Colour(this.h, this.s, this.l / l, this.a);
    }

    withAlpha(a: number): Colour {
        return new Colour(this.h, this.s, this.l, a);
    }

    addAlpha(a: number): Colour {
        return new Colour(this.h, this.s, this.l, this.a + a);
    }

    minusAlpha(a: number): Colour {
        return new Colour(this.h, this.s, this.l, this.a - a);
    }

    timesAlpha(a: number): Colour {
        return new Colour(this.h, this.s, this.l, this.a * a);
    }

    divideAlpha(a: number): Colour {
        return new Colour(this.h, this.s, this.l, this.a / a);
    }
}