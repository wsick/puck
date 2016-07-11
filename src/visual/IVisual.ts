namespace puck.visual {
    export interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: {down: element.down.Processor, up: element.up.Processor, render: element.render.Processor};
    }
}