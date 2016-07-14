namespace puck.image {
    export interface IImageSource {
        uri: string;
        naturalWidth: number;
        naturalHeight: number;
        draw(ctx: CanvasRenderingContext2D);
        //createPattern(ctx: CanvasRenderingContext2D): CanvasPattern;
        watch(onChanged: Function, onErrored: Function, onLoaded: Function): IImageWatcher;
        reset();
    }

    export interface IImageWatcher {
        change();
        error(err: any);
        load();
        unwatch();
    }
}