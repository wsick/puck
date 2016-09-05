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
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
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
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
            return this;
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