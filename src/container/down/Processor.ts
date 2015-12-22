namespace puck.container.down {
    import DirtyFlags = puck.element.DirtyFlags;

    export interface IProcessorBag extends element.down.IProcessorBag {
        walker: IWalker<element.IElement>;
        state: IContainerState;
        composite: IContainerComposite;
        pcomposite: IContainerComposite; //parent composite
    }

    export class Processor extends element.down.Processor {
        process(bag: IProcessorBag): DirtyFlags {
            var dirt = super.process(bag);
            for (var cur = bag.walker.next(); !!cur; cur = bag.walker.next()) {
                cur.composite.taint(dirt);
            }
            return dirt;
        }
    }
}