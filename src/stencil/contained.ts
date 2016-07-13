namespace puck.stencil {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import RenderContext = puck.render.RenderContext;
    import IRect = la.IRect;

    export var contained = <IStencil>{
        draft(bag: IStencilBag) {
            var state = bag.state,
                size = state.size;

            la.rect.init(0, 0, size.width, size.height, bag.fillRect);
            la.rect.init(0, 0, size.width, size.height, bag.strokeRect);
            if (state.stroke && state.strokeThickness > 0) {
                // visual gets contained only if stroke exists and stroke thickness is non-zero
                var ht = state.strokeThickness / 2;
                la.rect.shrink(bag.fillRect, la.padding.init(ht, ht, ht, ht));
            }
        },
        draw(ctx: RenderContext, bag: IStencilBag) {
            ctx.raw.beginPath();
            ctx.raw.closePath();
        },
    };
}