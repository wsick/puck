namespace puck {
    import DirtyFlags = puck.element.DirtyFlags;
    import IPolylineState = puck.polyline.IPolylineState;
    import IPathComposite = puck.path.IPathComposite;
    import IPolylineProcessor = puck.polyline.IPolylineProcessor;

    export class Polyline extends Visual implements polyline.IPolyline {
        state: polyline.IPolylineState;
        composite: path.IPathComposite;
        processor: IPolylineProcessor;

        constructor(state?: IPolylineState, composite?: IPathComposite) {
            super(state, composite);
        }

        init(state ?: IPolylineState, composite ?: IPathComposite) {
            this.state = (state || new polyline.PolylineState()).reset();
            this.composite = (composite || new path.PathComposite()).reset();
            this.processor = {
                down: polyline.down.Processor.instance,
                up: path.up.Processor.instance,
                render: path.render.Processor.instance,
                hit: path.hit.Processor.instance,
            };
            this.stencil = stencil.path;
            this.state.points.watch(() => {
                if (this.state.path)
                    this.state.path.reset();
                // forces repathing from points
            });
        }

        get points() {
            return this.state.points;
        }

        get closed() {
            return this.closed;
        }

        set closed(value: boolean) {
            if (this.state.closed !== value) {
                this.state.closed = value;
                this.composite.invalidate();
            }
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