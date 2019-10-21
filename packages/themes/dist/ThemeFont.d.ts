export default class ThemeFont {
    readonly name: string;
    readonly lineHeight: number;
    private readonly secondaries;
    constructor(name: string, secondaries?: string, lineHeight?: number);
    toString(): string;
}
