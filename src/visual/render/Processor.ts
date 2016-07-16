/// <reference path="../../element/render/Processor" />

namespace puck.visual.render {
    export interface IProcessorBag extends puck.element.render.IProcessorBag {
        stencil: stencil.IStencil;
    }

    export class Processor extends element.render.Processor {
        static instance = new Processor();

        protected render(bag: IProcessorBag): boolean {
            var state = <IVisualState>bag.state;
            if (!state.fill && !state.stroke)
                return false;

            var ctx = bag.ctx;
            ctx.save();
            var sbag = this.createStencilBag(bag);
            bag.stencil.draft(sbag);
            bag.stencil.draw(ctx, sbag);
            this.fill(ctx, state, sbag);
            this.stroke(ctx, state, sbag);
            ctx.restore();
        }

        protected fill(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag) {
            if (!state.fill)
                return;
            ctx.fillEx(sbag.fillRect, state.fill);
        }

        protected stroke(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag) {
            if (!state.stroke || state.strokeThickness <= 0)
                return;
            ctx.strokeEx(sbag.strokeRect, state.stroke, state.strokeThickness);
        }
    }
}