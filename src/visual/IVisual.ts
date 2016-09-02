namespace puck.visual {
    export interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: IVisualProcessor;
        stencil: stencil.IStencil;

        attr(name: "fill"): IBrush;
        attr(name: "fill", value: IBrush): this;
        attr(name: "stroke"): IBrush;
        attr(name: "stroke", value: IBrush): this;
        attr(name: "strokeThickness"): IBrush;
        attr(name: "strokeThickness", value: IBrush): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }

    export interface IVisualProcessor {
        down: element.down.Processor;
        up: element.up.Processor;
        render: visual.render.Processor;
        hit: visual.hit.Processor;
    }
}