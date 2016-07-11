/// <reference path="../../element/render/Processor" />

namespace puck.container.render {
    export interface IProcessorBag extends element.render.IProcessorBag {
        walker: walk.IWalker<element.IElement>;
        composite: IContainerComposite;
    }

    export class Processor extends element.render.Processor {
        static instance = new Processor();

        protected render(bag: IProcessorBag) {
            for (var cur = bag.walker.next(); !!cur; cur = bag.walker.next()) {
                engine.render(cur, bag.ctx, bag.curregion);
            }
        }
    }
}