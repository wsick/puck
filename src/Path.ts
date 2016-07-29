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

        init(state ?: IPathState, composite ?: IPathComposite) {
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

        get x(): number {
            return this.state.offset.x;
        }

        set x(value: number) {
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get y(): number {
            return this.state.offset.y;
        }

        set y(value: number) {
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get width(): number {
            return this.state.size.width;
        }

        set width(value: number) {
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
        }

        get height(): number {
            return this.state.size.height;
        }

        set height(value: number) {
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
        }

        get stretch(): Stretch {
            return this.state.stretch;
        }

        set stretch(value: Stretch) {
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
        }

        get path() {
            return this.state.path;
        }

        set path(value: curve.Path) {
            if (this.state.path !== value) {
                this.state.path = value;
                this.composite.bounder.setPath(value);
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
        }

        get fillRule() {
            return this.state.fillRule;
        }

        set fillRule(value: FillRule) {
            if (this.state.fillRule !== value) {
                this.state.fillRule = value;
                this.composite.invalidate();
            }
        }

        get strokeLineCap() {
            return this.state.strokeLineCap;
        }

        set strokeLineCap(value: PenLineCap) {
            if (this.state.strokeLineCap !== value) {
                this.state.strokeLineCap = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
        }

        get strokeLineJoin() {
            return this.state.strokeLineJoin;
        }

        set strokeLineJoin(value: PenLineJoin) {
            if (this.state.strokeLineJoin !== value) {
                this.state.strokeLineJoin = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
        }

        get strokeMiterLimit() {
            return this.state.strokeMiterLimit;
        }

        set strokeMiterLimit(value: number) {
            if (this.state.strokeMiterLimit !== value) {
                this.state.strokeMiterLimit = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
        }
    }
}