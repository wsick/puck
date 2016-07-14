/// <reference path="../../element/down/Processor" />

namespace puck.image.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Processor extends element.down.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            stretch.process(bag);
            return super.process(bag);
        }
    }
}