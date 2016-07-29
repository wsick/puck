/// <reference path="../../element/hit/Processor" />

namespace puck.container.hit {
    export class Processor extends element.hit.Processor {
        static instance = new Processor();

        protected hit(el: IContainer, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            for (var walker = el.walk(true), cur = walker.next(); !!cur; cur = walker.next()) {
                if (engine.hit(el, ctx, pos, hitlist))
                    return true;
            }
            return false;
        }
    }
}