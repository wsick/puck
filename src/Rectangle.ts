/// <reference path="Visual" />
/// <reference path="stencil/visual" />

namespace puck {
    import DirtyFlags = puck.element.DirtyFlags;
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;

    export class Rectangle extends Visual {
        init(state?: IVisualState, composite?: IVisualComposite) {
            super.init(state, composite);
            this.stencil = rectangleStencil;
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
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get height(): number {
            return this.state.size.height;
        }

        set height(value: number) {
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }
    }

    var rectangleStencil = <stencil.IStencil>{
        draft: stencil.visual.draft,
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var fr = bag.fillRect;
            if (fr.width <= 0 || fr.height <= 0) {
                // degenerate
                return;
            }
            var raw = ctx.raw;
            raw.beginPath();
            raw.rect(fr.x, fr.y, fr.width, fr.height);
            raw.closePath();
        }
    };
}