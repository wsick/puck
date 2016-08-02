/// <reference path="../../element/hit/Processor" />

namespace puck.text.hit {
    export class Processor extends element.hit.Processor {
        static instance = new Processor();

        protected prehit(el: text.IText, ctx: puck.render.RenderContext, pos: Float32Array): boolean {
            if (!super.prehit(el, ctx, pos))
                return false;
            var state = el.state;
            return !!state.fill || (!!state.stroke && state.strokeThickness > 0);
        }

        protected hit(el: text.IText, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            // Already verified that point is within extents
            return true;
        }
    }
}