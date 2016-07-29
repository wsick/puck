namespace puck.element.hit {
    import mat3 = la.mat3;
    import vec2 = la.vec2;
    import rect = la.rect;

    export class Processor {
        static instance = new Processor();

        process(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            if (!this.prehit(el, ctx, pos))
                return;
            ctx.save();
            ctx.preapply(el.composite.transform);
            var inside = false;
            if (this.hit(el, ctx, pos, hitlist)) {
                inside = true;
                hitlist.unshift(el);
            }
            ctx.restore();
            return inside;
        }

        protected prehit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array): boolean {
            var comp = el.composite;
            if (!comp.visible || (comp.opacity * 255) < 0.5)
                return false;
            var localpos = mat3.transformVec2(ctx.currentTransform, pos, vec2.create(0, 0));
            return rect.containsVec2(comp.extents, localpos);
        }

        protected hit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            // element alone is not hittable
            // visual/container will implement
            return false;
        }

        protected draw(el: visual.IVisual, ctx: puck.render.RenderContext) {
            var sbag: stencil.IStencilBag = {
                state: el.state,
                composite: el.composite,
                fillRect: null,
                strokeRect: null,
            };
            el.stencil.draw(ctx, sbag);
        }
    }
}