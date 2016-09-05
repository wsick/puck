namespace puck.container {
    export interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
        processor: IContainerProcessor;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;

        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
    }

    export interface IContainerProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}