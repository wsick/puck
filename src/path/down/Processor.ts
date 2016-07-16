/// <reference path="../../element/down/Processor" />

namespace puck.path.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Processor extends element.down.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            natural.process(bag);
            stretch.process(bag);
            return super.process(bag);
        }
    }
}