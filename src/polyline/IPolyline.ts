namespace puck.polyline {
    export interface IPolyline extends visual.IVisual {
        state: IPolylineState;
        composite: path.IPathComposite;
        processor: IPolylineProcessor;
        stencil: stencil.IStencil;
    }

    export interface IPolylineProcessor {
        down: polyline.down.Processor;
        up: path.up.Processor;
        render: path.render.Processor;
        hit: path.hit.Processor;
    }
}