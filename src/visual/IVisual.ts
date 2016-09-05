namespace puck.visual {
    export interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: IVisualProcessor;
        stencil: stencil.IStencil;

        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;

        sub(attr: "fill", func: (value: IBrush) => any): this;
        sub(attr: "stroke", func: (value: IBrush) => any): this;
        sub(attr: string, func: any): this;
    }

    export interface IVisualProcessor {
        down: element.down.Processor;
        up: element.up.Processor;
        render: visual.render.Processor;
        hit: visual.hit.Processor;
    }
}