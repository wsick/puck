/// <reference path="../element/ElementState" />

namespace puck.text {
    import ElementState = puck.element.ElementState;

    export interface ITextState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        font: IFont;
        text: string;
    }

    export class TextState extends ElementState implements ITextState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        font: puck.IFont;
        text: string;

        reset(): this {
            super.reset();

            this.fill = null;
            this.stroke = null;
            this.strokeThickness = 0;

            var f: puck.IFont;
            f = {
                family: defaultFont.family,
                size: defaultFont.size,
                stretch: defaultFont.stretch,
                style: defaultFont.style,
                weight: defaultFont.weight,
                toString() {
                    return font.toString(f);
                },
            };
            this.font = f;
            this.text = "";

            return this;
        }
    }
}