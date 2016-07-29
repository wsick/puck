namespace puck.engine {
    export function hit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]) {
        var processor = el.processor.hit;
        processor.process(el, ctx, pos, hitlist);
    }
}