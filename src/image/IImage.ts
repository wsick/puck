namespace puck.image {
    export interface IImage extends element.IElement {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;

        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        sourceUri(): string;
        sourceUri(value: string): this;
    }

    export interface IImageProcessor {
        down: down.Processor;
        up: up.Processor;
        render: element.render.Processor;
        hit: hit.Processor;
    }
}