/// <reference path="../element/ElementState" />

namespace puck.visual {
    import ElementState = puck.element.ElementState;

    export interface IVisualState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
    }

    export class VisualState extends ElementState implements IVisualState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        
        reset(): this {
            super.reset();
            this.fill = null;
            this.stroke = null;
            this.strokeThickness = 0;
            return this;
        }
    }
}