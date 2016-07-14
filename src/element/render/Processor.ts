/// <reference path="../../render/RenderContext" />

namespace puck.element.render {
    import RenderContext = puck.render.RenderContext;

    export interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        ctx: RenderContext;
        inregion: la.IRect;
        curregion: la.IRect;
        stencil: stencil.IStencil;
    }

    export enum SkipResult {
        none = 0,
        render = 1 << 1,
        post = 1 << 2,

        all = render | post,
    }

    export class Processor {
        static instance = new Processor();

        process(bag: IProcessorBag) {
            var result = this.prerender(bag);
            if ((result & SkipResult.render) === 0) {
                this.render(bag);
            }
            if ((result & SkipResult.post) === 0) {
                this.postrender(bag);
            }
        }

        clear(bag: IProcessorBag): this {
            bag.composite.untaint(DirtyFlags.invalidate);
            la.rect.init(0, 0, 0, 0, bag.composite.paint);
            return this;
        }

        protected prerender(bag: IProcessorBag): SkipResult {
            if (!validate.process(bag))
                return SkipResult.all;
            if (!should.process(bag))
                return SkipResult.all;
            prepare.process(bag);
            narrow.process(bag);
            //TODO: Prerender effect
            return SkipResult.none;
        }

        protected render(bag: IProcessorBag) {
            var sbag = this.createStencilBag(bag);
            bag.stencil.draft(sbag);
            bag.stencil.draw(bag.ctx, sbag);
        }

        protected postrender(bag: IProcessorBag) {
            //TODO: Postrender effect
            bag.ctx.restore();
        }

        protected createStencilBag(bag: IProcessorBag): stencil.IStencilBag {
            return {
                state: bag.state,
                composite: bag.composite,
                fillRect: la.rect.init(0, 0, 0, 0),
                strokeRect: la.rect.init(0, 0, 0, 0),
            };
        }
    }
}