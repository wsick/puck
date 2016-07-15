namespace puck {
    export interface IBrush {
        watch(onChanged: () => void): puck.internal.IWatcher;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect);
        toHtml5Object(): any;
    }
}