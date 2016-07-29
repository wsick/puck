/// <reference path="../../visual/hit/Processor" />

namespace puck.path.hit {
    export class Processor extends visual.hit.Processor {
        static instance = new Processor();

        protected hit(el: IPath, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            ctx.save();
            this.transformLocal(el, ctx);
            this.draw(el, ctx);

            var state = el.state,
                px = pos[0],
                py = pos[1],
                inside = false;
            if (!!state.fill && ctx.raw.isPointInPath(px, py)) {
                inside = true;
            } else if (!!state.stroke) {
                ctx.setStrokeExtras(state.strokeLineCap, state.strokeLineJoin, state.strokeMiterLimit);
                if (ctx.isPointInStrokeEx(px, py, state.strokeThickness)) {
                    inside = true;
                }
            }

            ctx.restore();
            return inside;
        }

        protected transformLocal(path: IPath, ctx: puck.render.RenderContext) {
            ctx.preapply(path.composite.stretchTransform);
        }
    }
}