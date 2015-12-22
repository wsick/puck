namespace puck {
    import IContainer = puck.container.IContainer;
    import IElement = puck.element.IElement;
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;

    export class Container implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];

        constructor(state?: IContainerState, composite?: IContainerComposite) {
            this.state = state || new container.ContainerState();
            this.composite = composite || new container.ContainerComposite();
            this.elements = [];
            Object.freeze(this);
        }
    }
}