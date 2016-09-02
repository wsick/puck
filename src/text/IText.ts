namespace puck.text {
    export interface IText extends element.IElement {
        state: ITextState;

        attr(name: "fill"): IBrush;
        attr(name: "fill", value: IBrush): this;
        attr(name: "stroke"): IBrush;
        attr(name: "stroke", value: IBrush): this;
        attr(name: "strokeThickness"): IBrush;
        attr(name: "strokeThickness", value: IBrush): this;
        attr(name: "x"): number;
        attr(name: "x", value: number): this;
        attr(name: "y"): number;
        attr(name: "y", value: number): this;
        attr(name: "text"): string;
        attr(name: "text", value: string): this;
        attr(name: "fontFamily"): string;
        attr(name: "fontFamily", value: string): this;
        attr(name: "fontSize"): number;
        attr(name: "fontSize", value: number): this;
        attr(name: "fontStretch"): string;
        attr(name: "fontStretch", value: string): this;
        attr(name: "fontStyle"): string;
        attr(name: "fontStyle", value: string): this;
        attr(name: "fontWeight"): string;
        attr(name: "fontWeight", value: string): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }
    export interface ITextProcessor {
        down: element.down.Processor;
        up: text.up.Processor;
        render: text.render.Processor;
        hit: text.hit.Processor;
    }
}