namespace puck.element {
    export interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;

        opacity(): number;
        opacity(value: number): this;
        visible(): boolean;
        visible(value: boolean): this;
        transformOriginX(): number;
        transformOriginX(value: number): this;
        transformOriginY(): number;
        transformOriginY(value: number): this;
    }
    export interface IElementProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}