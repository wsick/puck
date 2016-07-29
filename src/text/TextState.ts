/// <reference path="../visual/VisualState" />

namespace puck.text {
    import VisualState = puck.visual.VisualState;

    export interface ITextState extends visual.IVisualState {
        font: IFont;
        text: string;
    }

    export class TextState extends VisualState implements ITextState {
        font: puck.IFont;
        text: string;

        reset(): this {
            super.reset();
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