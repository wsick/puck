namespace puck {
    export interface IBrush {
        setup(ctx: CanvasRenderingContext2D, region: la.IRect);
        toHtml5Object(): any;
    }
}