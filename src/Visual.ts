namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    /*
     * This represents an element that has a *fill*, *stroke*, and *strokeThickness*
     * If *fill* or *stroke* change, visual needs repainted
     * If a *fill* or *stroke* is cleared, *extents* needs updated
     * If a *stroke* is cleared, *padding* needs updated
     * If *strokeThickness* changes, *padding* needs updated
     */

    export class Visual extends Element implements visual.IVisual {
        private $fillwatch: puck.internal.IWatcher = null;
        private $strokewatch: puck.internal.IWatcher = null;

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
                this.composite.taint(DirtyFlags.extents).invalidate();
            }
            if (value !== this.state.fill) {
                this.state.fill = value;
                this.composite.invalidate();
            }
            if (value) {
                this.$fillwatch = value.watch(() => this.composite.invalidate());
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
                this.composite.taint(DirtyFlags.padding).invalidate();
            }
            if (value !== this.state.stroke) {
                this.state.stroke = value;
                this.composite.invalidate();
            }
            if (value) {
                this.$strokewatch = value.watch(() => this.composite.invalidate());
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