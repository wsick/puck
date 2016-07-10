/// <reference path="../element/ElementState" />

namespace puck.container {
    export interface IContainerState extends element.IElementState {
        // NOTE: size is ignored
    }
    export class ContainerState extends element.ElementState implements IContainerState {
    }
}