namespace puck.container {
    export interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
        processor: IContainerProcessor;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;
    }

    export interface IContainerProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}