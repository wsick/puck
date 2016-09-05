namespace puck {
    import IPathState = puck.path.IPathState;
    import IPathComposite = puck.path.IPathComposite;
    import IPathProcessor = puck.path.IPathProcessor;
    import DirtyFlags = puck.element.DirtyFlags;

    /*
     * This represents a multisegment path managed through curve API
     * If any stroke parameters change, we need to recalculate *padding*
     * Calculation of filled/stroked bounds is done via curve
     */

    export class Path extends Visual implements path.IPath {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;

        constructor(state?: IPathState, composite?: IPathComposite) {
            super(state, composite);
        }

        init(state?: IPathState, composite?: IPathComposite) {
            this.state = (state || new path.PathState()).reset();
            this.composite = (composite || new path.PathComposite()).reset();
            this.processor = {
                down: path.down.Processor.instance,
                up: path.up.Processor.instance,
                render: path.render.Processor.instance,
                hit: path.hit.Processor.instance,
            };
            this.stencil = stencil.path;
        }

        x(): number;
        x(value: number): this;
        x(value?: number): any {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        y(): number;
        y(value: number): this;
        y(value?: number): any {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        width(): number;
        width(value: number): this;
        width(value?: number): any {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        }

        height(): number;
        height(value: number): this;
        height(value?: number): any {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        }

        stretch(): Stretch;
        stretch(value: Stretch): this;
        stretch(value?: Stretch): any {
            if (arguments.length < 1)
                return this.state.stretch;
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
            return this;
        }

        path(): curve.Path;
        path(value: curve.Path): this;
        path(value?: curve.Path): any {
            if (arguments.length < 1)
                return this.state.path;
            if (this.state.path !== value) {
                this.state.path = value;
                this.composite.bounder.setPath(value);
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        }

        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        fillRule(value?: FillRule): any {
            if (arguments.length < 1)
                return this.state.fillRule;
            if (this.state.fillRule !== value) {
                this.state.fillRule = value;
                this.composite.invalidate();
            }
            return this;
        }

        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineCap(value?: PenLineCap): any {
            if (arguments.length < 1)
                return this.state.strokeLineCap;
            if (this.state.strokeLineCap !== value) {
                this.state.strokeLineCap = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        }

        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeLineJoin(value?: PenLineJoin): any {
            if (arguments.length < 1)
                return this.state.strokeLineJoin;
            if (this.state.strokeLineJoin !== value) {
                this.state.strokeLineJoin = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        }

        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
        strokeMiterLimit(value?: number): any {
            if (arguments.length < 1)
                return this.state.strokeMiterLimit;
            if (this.state.strokeMiterLimit !== value) {
                this.state.strokeMiterLimit = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        }
    }
}