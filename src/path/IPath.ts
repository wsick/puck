namespace puck.path {
    export interface IPath extends visual.IVisual {
        state: IPathState;
        composite: visual.IVisualComposite;
        processor: {down: path.down.Processor, up: path.up.Processor, render: path.render.Processor};
        stencil: stencil.IStencil;
    }
}