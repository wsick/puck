namespace puck.stencil {
    import IPathComposite = puck.path.IPathComposite;

    export var path: IStencil = {
        draft(bag: stencil.IStencilBag) {
            // Bounds are updated in "down:natural"
            var comp = <IPathComposite>bag.composite;
            comp.bounder
                .getFillRect(bag.fillRect)
                .getStrokeRect(bag.strokeRect);
        },
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var fr = bag.fillRect;
            if (fr.width <= 0 || fr.height <= 0) {
                // degenerate
                return;
            }

            var raw = ctx.raw;
            raw.beginPath();
            bag.path.draw(raw);
            // NOTE: curve.Path dictates whether to "closePath"
        },
    };
}