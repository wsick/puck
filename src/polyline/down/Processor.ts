/// <reference path="../../path/down/Processor" />

namespace puck.polyline.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Processor extends path.down.Processor {
        static instance = new Processor();

        process(bag: IProcessorBag): DirtyFlags {
            points.process(bag);
            return super.process(bag);
        }
    }
}