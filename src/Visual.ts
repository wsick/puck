namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Visual extends Element implements visual.IVisual {
        private $fillwatch: IBrushWatcher = null;
        private $strokewatch: IBrushWatcher = null;

        state: IVisualState;
        composite: IVisualComposite;
        processor: {down: element.down.Processor, up: element.up.Processor, render: visual.render.Processor};

        constructor(state?: IVisualState, composite?: IVisualComposite) {
            super(state, composite);
        }

        init(state?: IVisualState, composite?: IVisualComposite) {
            this.state = (state || new visual.VisualState()).reset();
            this.composite = (composite || new visual.VisualComposite()).reset();
            this.processor = {
                down: element.down.Processor.instance,
                up: element.up.Processor.instance,
                render: visual.render.Processor.instance,
            };
            this.stencil = stencil.visual;
        }

        get fill(): IBrush { return this.state.fill; }
        set fill(value: IBrush) {
            if (this.$fillwatch) {
                this.$fillwatch.unwatch();
                this.$fillwatch = null;
            }
            if ((!value) === (!this.state.fill)) {
                // toggling fill on/off can disturb extents
                this.composite.taint(DirtyFlags.extents | DirtyFlags.invalidate);
            }
            if (value !== this.state.fill) {
                this.state.fill = value;
                this.composite.taint(DirtyFlags.invalidate);
            }
            if (value) {
                this.$fillwatch = value.watch(() => this.composite.taint(DirtyFlags.invalidate));
            }
        }

        get stroke(): IBrush { return this.state.stroke; }
        set stroke(value: IBrush) {
            if (this.$strokewatch) {
                this.$strokewatch.unwatch();
                this.$strokewatch = null;
            }
            if ((!value) === (!this.state.stroke)) {
                // toggling stroke on/off can disturb padding
                this.composite.taint(DirtyFlags.padding | DirtyFlags.invalidate);
            }
            if (value !== this.state.stroke) {
                this.state.stroke = value;
                this.composite.taint(DirtyFlags.invalidate);
            }
            if (value) {
                this.$strokewatch = value.watch(() => this.composite.taint(DirtyFlags.invalidate));
            }
        }

        get strokeThickness(): number { return this.state.strokeThickness; }
        set strokeThickness(value: number) {
            if (value !== this.state.strokeThickness) {
                this.state.strokeThickness = value;
                this.composite.taint(DirtyFlags.padding);
            }
        }
    }
}