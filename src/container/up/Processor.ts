/// <reference path="../../element/DirtyFlags" />
/// <reference path="../../element/up/Processor" />

namespace puck.container.up {
    import DirtyFlags = puck.element.DirtyFlags;

    export interface IProcessorBag extends element.up.IProcessorBag {
        state: IContainerState;
        composite: IContainerComposite;
    }

    // A container processor additionally processes bounds
    export class Processor extends element.up.Processor {
        static instance = new Processor();

        // We are pushing dirty flags up to parent
        // If extents changed, parent's bounds changed
        // If bounds changed, parent should be invalidated
        // If there was an invalidation from below without changing bounds
        //   => parent should be invalidated
        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (bounds.process(bag))
                dirt |= DirtyFlags.invalidate;
            if (invalidate.process(bag))
                dirt |= DirtyFlags.invalidate;
            return dirt;
        }
    }
}