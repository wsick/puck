namespace puck.element {
    export interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;

        attr(name: "opacity"): number;
        attr(name: "opacity", value: number): this;
        attr(name: "visible"): boolean;
        attr(name: "visible", value: boolean): this;
        attr(name: "transformOriginX"): number;
        attr(name: "transformOriginX", value: number): this;
        attr(name: "transformOriginY"): number;
        attr(name: "transformOriginY", value: number): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }
    export interface IElementProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}