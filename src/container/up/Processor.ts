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

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = super.process(bag);
            if (bounds.process(bag))
                dirt |= DirtyFlags.bounds;
            return dirt;
        }
    }
}