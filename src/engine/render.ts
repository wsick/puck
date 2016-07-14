/// <reference path="../render/RenderContext" />

namespace puck.engine {
    import RenderContext = puck.render.RenderContext;

    export function render(el: element.IElement, ctx: RenderContext, region: la.IRect) {
        var processor = el.processor.render;
        var bag = <puck.element.render.IProcessorBag>{
            walker: walk.getWalker(el, true),
            state: el.state,
            composite: el.composite,
            stencil: (<visual.IVisual>el).stencil,
            ctx: ctx,
            inregion: region,
            curregion: la.rect.init(0, 0, 0, 0),
        };
        processor.process(bag);
        processor.clear(bag);
    }
}