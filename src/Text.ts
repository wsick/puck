/// <reference path="Visual" />

namespace puck {
    import ITextState = puck.text.ITextState;
    import IElementComposite = puck.element.IElementComposite;
    import DirtyFlags = puck.element.DirtyFlags;
    import ITextProcessor = puck.text.ITextProcessor;

    export class Text extends Element implements text.IText {
        private $fillwatch: puck.internal.IWatcher = null;
        private $strokewatch: puck.internal.IWatcher = null;

        state: puck.text.ITextState;
        processor: ITextProcessor;

        constructor(state?: ITextState, composite?: IElementComposite) {
            super(state, composite);
        }

        init(state?: ITextState, composite?: IElementComposite) {
            this.state = (state || new text.TextState()).reset();
            this.composite = (composite || new element.ElementComposite()).reset();
            this.processor = {
                down: element.down.Processor.instance,
                up: text.up.Processor.instance,
                render: text.render.Processor.instance,
                hit: text.hit.Processor.instance,
            };
            this.stencil = stencil.empty;
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

        get text(): string {
            return this.state.text;
        }

        set text(value: string) {
            this.state.text = value;
            this.composite.taint(DirtyFlags.font);
        }

        get fontFamily(): string {
            return this.state.font.family;
        }

        set fontFamily(value: string) {
            if (this.state.font.family !== value) {
                this.state.font.family = value;
                this.composite.taint(DirtyFlags.font);
            }
        }

        get fontSize(): number {
            return this.state.font.size;
        }

        set fontSize(value: number) {
            if (this.state.font.size !== value) {
                this.state.font.size = value;
                this.composite.taint(DirtyFlags.font);
            }
        }

        get fontStretch(): string {
            return this.state.font.stretch;
        }

        set fontStretch(value: string) {
            if (this.state.font.stretch !== value) {
                this.state.font.stretch = value;
                this.composite.taint(DirtyFlags.font);
            }
        }

        get fontStyle(): string {
            return this.state.font.style;
        }

        set fontStyle(value: string) {
            if (this.state.font.style !== value) {
                this.state.font.style = value;
                this.composite.taint(DirtyFlags.font);
            }
        }

        get fontWeight(): FontWeight {
            return this.state.font.weight;
        }

        set fontWeight(value: FontWeight) {
            if (this.state.font.weight !== value) {
                this.state.font.weight = value;
                this.composite.taint(DirtyFlags.font);
            }
        }
    }
}