namespace puck.visual {
    export interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: IVisualProcessor;
        stencil: stencil.IStencil;
    }

    export interface IVisualProcessor {
        down: element.down.Processor;
        up: element.up.Processor;
        render: visual.render.Processor;
        hit: visual.hit.Processor;
    }
}