/// <reference path="Visual" />

namespace puck {
    import ITextState = puck.text.ITextState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import DirtyFlags = puck.element.DirtyFlags;
    import ITextProcessor = puck.text.ITextProcessor;

    export class Text extends Visual implements text.IText {
        state: puck.text.ITextState;
        processor: ITextProcessor;

        constructor(state?: ITextState, composite?: IVisualComposite) {
            super(state, composite);
        }

        init(state?: ITextState, composite?: IVisualComposite) {
            this.state = (state || new text.TextState()).reset();
            this.composite = (composite || new visual.VisualComposite()).reset();
            this.processor = {
                down: element.down.Processor.instance,
                up: text.up.Processor.instance,
                render: visual.render.Processor.instance,
                hit: visual.hit.Processor.instance,
            };
            this.stencil = stencil.visual;
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