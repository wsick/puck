/// <reference path="../../visual/render/Processor" />

namespace puck.path.render {
    export class Processor extends visual.render.Processor {
        static instance = new Processor();

        protected transformLocal(ctx: puck.render.RenderContext, bag: stencil.IStencilBag) {
            var comp = <IPathComposite>bag.composite;
            ctx.preapply(comp.stretchTransform);
        }

        protected fill(ctx: puck.render.RenderContext, state: IPathState, sbag: stencil.IStencilBag) {
            if (!state.fill)
                return;
            ctx.fillEx(sbag.fillRect, state.fill, state.fillRule);
        }

        protected stroke(ctx: puck.render.RenderContext, state: IPathState, sbag: stencil.IStencilBag) {
            if (!state.stroke || state.strokeThickness <= 0)
                return;
            ctx.setStrokeExtras(state.strokeLineCap, state.strokeLineJoin, state.strokeMiterLimit);
            ctx.strokeEx(sbag.strokeRect, state.stroke, state.strokeThickness);
        }
    }
}