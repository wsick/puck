namespace puck.container {
    export interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
        processor: {down: down.Processor, up: up.Processor};
        walk(): walk.IWalker<element.IElement>;
    }
}