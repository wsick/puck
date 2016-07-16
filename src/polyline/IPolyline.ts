namespace puck.polyline {
    export interface IPolyline extends visual.IVisual {
        state: IPolylineState;
        composite: path.IPathComposite;
        processor: {down: polyline.down.Processor, up: path.up.Processor, render: path.render.Processor};
        stencil: stencil.IStencil;
    }
}