namespace puck {
    import IContainer = puck.container.IContainer;
    import IElement = puck.element.IElement;
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;

    export class Container implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];
        processor: {down: container.down.Processor};//, up: up.Processor};

        constructor(state?: IContainerState, composite?: IContainerComposite) {
            this.state = state || new container.ContainerState();
            this.composite = composite || new container.ContainerComposite();
            this.elements = [];
            this.processor = {
                down: container.down.Processor.instance
                //,up: container.up.Processor.instance
            };
            Object.freeze(this);
        }

        walk(): walk.IWalker<element.IElement> {
            var i = -1;
            var els = this.elements;
            var walker = {
                next(): element.IElement {
                    i++;
                    return els[i];
                }
            };
            return walker;
        }
    }
}