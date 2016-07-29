/// <reference path="../../element/render/Processor" />

namespace puck.text.render {
    import IProcessorBag = puck.element.render.IProcessorBag;
    var isFirefox = /firefox/i.test(navigator.userAgent);

    export class Processor extends element.render.Processor {
        static instance = new Processor();

        protected render(bag: IProcessorBag): boolean {
            var state = <ITextState>bag.state,
                noStroke = !state.stroke || state.strokeThickness <= 0;
            if (!state.fill && noStroke)
                return false;

            var ctx = bag.ctx,
                raw = ctx.raw;
            ctx.save();
            raw.beginPath();
            raw.font = state.font.toString();
            raw.textAlign = "left";
            if (state.fill)
                this.fill(raw, state, bag.composite);
            if (!noStroke)
                this.stroke(raw, state, bag.composite);
            ctx.restore();
        }

        protected fill(ctx: CanvasRenderingContext2D, state: ITextState, comp: element.IElementComposite) {
            state.fill.setup(ctx, comp.extents);
            ctx.fillStyle = state.fill.toHtml5Object();

            if (isFirefox) {
                ctx.textBaseline = "bottom";
                ctx.fillText(state.text, 0, state.size.height);
            } else {
                ctx.textBaseline = "top";
                ctx.fillText(state.text, 0, 0);
            }
        }

        protected stroke(ctx: CanvasRenderingContext2D, state: ITextState, comp: element.IElementComposite) {
            state.stroke.setup(ctx, comp.extents);
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