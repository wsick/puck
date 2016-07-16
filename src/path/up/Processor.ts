/// <reference path="../../element/up/Processor" />

namespace puck.path.up {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    import newbounds = puck.element.up.newbounds;

    export class Processor extends element.up.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (extents.process(bag))
                dirt |= DirtyFlags.extents;
            newbounds.process(bag);
            return dirt;
        }
    }
}