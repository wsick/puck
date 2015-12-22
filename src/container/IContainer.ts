namespace puck.container {
    export interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
    }
}