namespace puck.image {
    export interface IImage extends element.IElement {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;

        attr(name: "sourceUri"): string;
        attr(name: "sourceUri", value: string): this;
        attr(name: "stretch"): Stretch;
        attr(name: "stretch", value: Stretch): this;
        attr(name: "x"): number;
        attr(name: "x", value: number): this;
        attr(name: "y"): number;
        attr(name: "y", value: number): this;
        attr(name: "width"): number;
        attr(name: "width", value: number): this;
        attr(name: "height"): number;
        attr(name: "height", value: number): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }

    export interface IImageProcessor {
        down: down.Processor;
        up: up.Processor;
        render: element.render.Processor;
        hit: hit.Processor;
    }
}