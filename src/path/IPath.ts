namespace puck.path {
    export interface IPath extends visual.IVisual {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;
        stencil: stencil.IStencil;

        attr(name: "x"): number;
        attr(name: "x", value: number): this;
        attr(name: "y"): number;
        attr(name: "y", value: number): this;
        attr(name: "width"): number;
        attr(name: "width", value: number): this;
        attr(name: "height"): number;
        attr(name: "height", value: number): this;
        attr(name: "stretch"): Stretch;
        attr(name: "stretch", value: Stretch): this;
        attr(name: "path"): curve.Path;
        attr(name: "path", value: curve.Path): this;
        attr(name: "fillRule"): FillRule;
        attr(name: "fillRule", value: FillRule): this;
        attr(name: "strokeLineCap"): PenLineCap;
        attr(name: "strokeLineCap", value: PenLineCap): this;
        attr(name: "strokeLineJoin"): PenLineJoin;
        attr(name: "strokeLineJoin", value: PenLineJoin): this;
        attr(name: "strokeMiterLimit"): number;
        attr(name: "strokeMiterLimit", value: number): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }

    export interface IPathProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}