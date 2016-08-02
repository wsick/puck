/// <reference path="../../element/render/Processor" />

namespace puck.text.render {
    import IProcessorBag = puck.element.render.IProcessorBag;
    var isFirefox = /firefox/i.test(navigator.userAgent);
    var paintRegion = la.rect.init(0, 0, 0, 0);

    export class Processor extends element.render.Processor {
        static instance = new Processor();

        protected render(bag: IProcessorBag): boolean {
            var state = <ITextState>bag.state,
                noStroke = !state.stroke || state.strokeThickness <= 0;
            if (!state.fill && noStroke)
                return false;

            var ctx = bag.ctx,
                raw = ctx.raw,
                comp = bag.composite;
            ctx.save();
            raw.beginPath();
            raw.font = state.font.toString();
            raw.textAlign = "left";
            paintRegion.width = comp.extents.width;
            paintRegion.height = comp.extents.height;
            if (state.fill)
                this.fill(raw, state, paintRegion);
            if (!noStroke)
                this.stroke(raw, state, paintRegion);
            ctx.restore();
        }

        protected fill(ctx: CanvasRenderingContext2D, state: ITextState, region: la.IRect) {
            state.fill.setup(ctx, region);
            ctx.fillStyle = state.fill.toHtml5Object();

            if (isFirefox) {
                ctx.textBaseline = "bottom";
                ctx.fillText(state.text, 0, state.size.height);
            } else {
                ctx.textBaseline = "top";
                ctx.fillText(state.text, 0, 0);
            }
        }

        protected stroke(ctx: CanvasRenderingContext2D, state: ITextState, region: la.IRect) {
            state.stroke.setup(ctx, region);
            ctx.strokeStyle = state.stroke.toHtml5Object();

            ctx.lineWidth = state.strokeThickness;
            if (isFirefox) {
                ctx.textBaseline = "bottom";
                ctx.strokeText(state.text, 0, state.size.height);
            } else {
                ctx.textBaseline = "top";
                ctx.strokeText(state.text, 0, 0);
            }
        }
    }
}