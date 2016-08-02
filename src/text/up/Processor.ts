/// <reference path="../../element/up/Processor" />

namespace puck.text.up {
    import DirtyFlags = puck.element.DirtyFlags;
    import IProcessorBag = puck.element.up.IProcessorBag;

    export class Processor extends element.up.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            font.process(bag);
            dirt |= super.process(bag);
            return dirt;
        }
    }
}