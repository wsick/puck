namespace puck.element {
    export interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: {down: down.Processor};//, up: up.Processor};
    }
}