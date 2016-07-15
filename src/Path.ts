namespace puck {
    import IPathState = puck.path.IPathState;
    import IPathComposite = puck.path.IPathComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    /*
     * This represents a multisegment path managed through curve API
     * If any stroke parameters change, we need to recalculate *padding*
     * Calculation of filled/stroked bounds is done via curve
     */

    export class Path extends Visual implements path.IPath {
        state: IPathState;
        composite: IPathComposite;
        processor: {down: path.down.Processor; up: path.up.Processor; render: path.render.Processor};

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
            };
            this.stencil = stencil.path;
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