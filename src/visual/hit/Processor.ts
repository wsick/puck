/// <reference path="../../element/hit/Processor" />

namespace puck.visual.hit {
    export class Processor extends element.hit.Processor {
        static instance = new Processor();

        protected prehit(el: visual.IVisual, ctx: puck.render.RenderContext, pos: Float32Array): boolean {
            if (!super.prehit(el, ctx, pos))
                return false;
            var state = el.state;
            return !!state.fill || (!!state.stroke && state.strokeThickness > 0);
            // TODO: can we check degenerate size?
        }

        protected hit(el: visual.IVisual, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            ctx.save();
            this.transformLocal(el, ctx);
            this.draw(el, ctx);

            var state = el.state,
                px = pos[0],
                py = pos[1],
                inside = false;
            // TODO: fill rule?
            if (!!state.fill && ctx.raw.isPointInPath(px, py)) {
                inside = true;
            } else if (!!state.stroke && ctx.isPointInStrokeEx(px, py, state.strokeThickness)) {
                inside = true;
            }

            ctx.restore();
            return inside;
        }

        protected transformLocal(el: element.IElement, ctx: puck.render.RenderContext) {
        }
    }
}