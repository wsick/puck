/// <reference path="../element/ElementComposite" />

namespace puck.container {
    export interface IContainerComposite extends element.IElementComposite {
    }
    export class ContainerComposite extends element.ElementComposite implements IContainerComposite {
    }
}