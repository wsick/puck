namespace puck.polyline {
    export interface IPolyline extends visual.IVisual {
        state: IPolylineState;
        composite: path.IPathComposite;
        processor: IPolylineProcessor;
        stencil: stencil.IStencil;

        points(): Points;
        closed(): boolean;
        closed(value: boolean): this;
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
        path(): curve.Path;
        path(value: curve.Path): this;
        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
    }

    export interface IPolylineProcessor {
        down: polyline.down.Processor;
        up: path.up.Processor;
        render: path.render.Processor;
        hit: path.hit.Processor;
    }
}