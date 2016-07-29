/// <reference path="../visual/VisualState" />

namespace puck.text {
    import VisualState = puck.visual.VisualState;

    export interface ITextState extends visual.IVisualState {
        font: IFont;
    }

    export class TextState extends VisualState implements ITextState {
        font: puck.IFont;

        reset(): this {
            super.reset();
            this.font = {
                family: defaultFont.family,
                size: defaultFont.size,
                stretch: defaultFont.stretch,
                style: defaultFont.style,
                weight: defaultFont.weight,
            };
            return this;
        }
    }
}