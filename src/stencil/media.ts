namespace puck.stencil {
    import RenderContext = puck.render.RenderContext;

    export var media = <IStencil>{
        draft(bag: IStencilBag) {
            var state = bag.state,
                size = state.size;
            la.rect.init(0, 0, size.width, size.height, bag.fillRect);
        },
        draw(ctx: RenderContext, bag: IStencilBag) {
            ctx.raw.beginPath();
            ctx.raw.closePath();
        },
    };
}