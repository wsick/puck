namespace puck {
    export interface IBrush {
        watch(onChanged: () => void): IBrushWatcher;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect);
        toHtml5Object(): any;
    }
    export interface IBrushWatcher {
        change();
        unwatch();
    }
}