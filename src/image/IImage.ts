namespace puck.image {
    export interface IImage extends element.IElement {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;
    }

    export interface IImageProcessor {
        down: down.Processor;
        up: up.Processor;
        render: element.render.Processor;
        hit: hit.Processor;
    }
}