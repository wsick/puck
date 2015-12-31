/// <reference path="../../element/up/Processor" />

namespace puck.container.up {
    export interface IProcessorBag extends element.up.IProcessorBag {
        state: IContainerState;
        composite: IContainerComposite;
    }

    export class Processor extends element.up.Processor {
        static instance = new Processor();
    }
}