namespace puck.text {
    export interface IText extends element.IElement {
        state: ITextState;

        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        text(): string;
        text(value: string): this;
        fontFamily(): string;
        fontFamily(value: string): this;
        fontSize(): number;
        fontSize(value: number): this;
        fontStretch(): string;
        fontStretch(value: string): this;
        fontStyle(): string;
        fontStyle(value: string): this;
        fontStyle(): string;
        fontStyle(value: string): this;
        fontWeight(): number;
        fontWeight(value: number): this;
    }
    export interface ITextProcessor {
        down: element.down.Processor;
        up: text.up.Processor;
        render: text.render.Processor;
        hit: text.hit.Processor;
    }
}