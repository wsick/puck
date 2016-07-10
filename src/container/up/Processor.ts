/// <reference path="../../element/DirtyFlags" />
/// <reference path="../../element/up/Processor" />

namespace puck.container.up {
    import DirtyFlags = puck.element.DirtyFlags;
    import newbounds = puck.element.up.newbounds;

    export interface IProcessorBag extends element.up.IProcessorBag {
        state: IContainerState;
        composite: IContainerComposite;
    }

    // A container processor additionally processes bounds
    export class Processor extends element.up.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (extents.process(bag))
                dirt |= DirtyFlags.extents;
            newbounds.process(bag);
            if (invalidate.process(bag))
                dirt |= DirtyFlags.invalidate;
            return dirt;
        }
    }
}