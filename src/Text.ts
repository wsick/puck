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

        fill(): IBrush;
        fill(value: IBrush): this;
        fill(value?: IBrush): IBrush|this {
            if (arguments.length < 1)
                return this.state.fill;
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
            return this;
        }

        stroke(): IBrush;
        stroke(value: IBrush): this;
        stroke(value?: IBrush): IBrush|this {
            if (arguments.length < 1)
                return this.state.stroke;
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
            return this;
        }

        strokeThickness(): number;
        strokeThickness(value: number): this;
        strokeThickness(value: number): number|this {
            if (arguments.length < 1)
                return this.state.strokeThickness;
            if (value !== this.state.strokeThickness) {
                this.state.strokeThickness = value;
                this.composite.taint(DirtyFlags.padding);
            }
            return this;
        }

        x(): number;
        x(value: number): this;
        x(value?: number): number|this {
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
        y(value: number): number|this {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        text(): string;
        text(value: string): this;
        text(value?: string): string|this {
            if (arguments.length < 1)
                return this.state.text;
            this.state.text = value;
            this.composite.taint(DirtyFlags.font);
            return this;
        }

        fontFamily(): string;
        fontFamily(value: string): this;
        fontFamily(value?: string): string|this {
            if (arguments.length < 1)
                return this.state.font.family;
            if (this.state.font.family !== value) {
                this.state.font.family = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        }

        fontSize(): number;
        fontSize(value: number): this;
        fontSize(value?: number): number|this {
            if (arguments.length < 1)
                return this.state.font.size;
            if (this.state.font.size !== value) {
                this.state.font.size = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        }

        fontStretch(): string;
        fontStretch(value: string): this;
        fontStretch(value?: string): string|this {
            if (arguments.length < 1)
                return this.state.font.stretch;
            if (this.state.font.stretch !== value) {
                this.state.font.stretch = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        }

        fontStyle(): string;
        fontStyle(value: string): this;
        fontStyle(value?: string): string|this {
            if (arguments.length < 1)
                return this.state.font.style;
            if (this.state.font.style !== value) {
                this.state.font.style = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        }

        fontWeight(): number;
        fontWeight(value: number): this;
        fontWeight(value?: number): number|this {
            if (arguments.length < 1)
                return this.state.font.weight;
            if (this.state.font.weight !== value) {
                this.state.font.weight = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        }
    }
}