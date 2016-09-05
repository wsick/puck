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

        points(): Points {
            return this.state.points;
        }

        closed(): boolean;
        closed(value: boolean): this;
        closed(value?: boolean): any {
            if (arguments.length < 1)
                return this.state.closed;
            if (this.state.closed !== value) {
                this.state.closed = value;
                this.composite.invalidate();
            }
            return this;
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