/// <reference path="Visual" />
/// <reference path="stencil/visual" />

namespace puck {
    import DirtyFlags = puck.element.DirtyFlags;
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    var PI2 = Math.PI * 2;

    export class Ellipse extends Visual implements ellipse.IEllipse {
        init(state?: IVisualState, composite?: IVisualComposite) {
            super.init(state, composite);
            this.stencil = ellipseStencil;
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

    var ellipseStencil = <stencil.IStencil>{
        draft: stencil.visual.draft,
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var fr = bag.fillRect;
            if (fr.width <= 0 || fr.height <= 0) {
                // degenerate
                return;
            }
            var rx = fr.width / 2,
                ry = fr.height / 2;
            var raw = ctx.raw;
            raw.beginPath();
            raw.ellipse(fr.x + rx, fr.y + ry, rx, ry, 0, 0, PI2, false);
            raw.closePath();
        }
    };
}