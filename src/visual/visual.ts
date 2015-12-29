namespace puck.visual {
    export interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
    }

    export interface IVisualState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
    }

    export interface IVisualComposite extends element.IElementComposite {
    }
}