namespace puck.container {
    export interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
        processor: IContainerProcessor;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;

        attr(name: "x"): number;
        attr(name: "x", value: number): this;
        attr(name: "y"): number;
        attr(name: "y", value: number): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }

    export interface IContainerProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}