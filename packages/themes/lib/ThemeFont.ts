export default class ThemeFont {
    public readonly name: string;
    public readonly lineHeight: number;

    private readonly secondaries: string;

    public constructor(name: string, secondaries: string = "sans-serif", lineHeight: number = 1) {
        this.name = name;
        this.secondaries = secondaries;
        this.lineHeight = lineHeight;
    }

    public toString() {
        return `1em/${this.lineHeight} "${name}", ${this.secondaries}`;
    }
}