namespace puck.path {
    export interface IPath extends visual.IVisual {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;
        stencil: stencil.IStencil;
    }

    export interface IPathProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}