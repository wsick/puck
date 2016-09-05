namespace puck.path {
    export interface IPath extends visual.IVisual {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;
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

    export interface IPathProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}