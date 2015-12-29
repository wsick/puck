namespace puck {
    export interface IBrush {
        setup(ctx: CanvasRenderingContext2D, region: IRect);
        toHtml5Object(): any;
    }
}