namespace puck.element {
    export interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;
    }
    export interface IElementProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}