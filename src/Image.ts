namespace puck {
    import IImageState = puck.image.IImageState;
    import IImageComposite = puck.image.IImageComposite;
    import IImageProcessor = puck.image.IImageProcessor;
    import DirtyFlags = puck.element.DirtyFlags;

    /*
     * Represents an Image object to render
     * By default, stretch is set to none which will use the image's natural size as extents
     * If another stretch is represented, image will transform into width/height specified.
     */

    export class Image extends Element implements image.IImage {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;

        constructor(state?: IImageState, composite?: IImageComposite) {
            super(state, composite);
        }

        init(state?: IImageState, composite?: IImageComposite) {
            this.state = (state || new image.ImageState()).reset();
            this.composite = (composite || new image.ImageComposite()).reset();
            this.processor = {
                down: image.down.Processor.instance,
                up: image.up.Processor.instance,
                render: element.render.Processor.instance,
                hit: image.hit.Processor.instance,
            };
            this.stencil = imageStencil;
            this.state.source.watch(
                () => this.onSourceChanged(),
                (e) => this.onSourceErrored(e),
                () => this.onSourceLoaded());
        }

        x(): number;
        x(value: number): this;
        x(value?: number): any {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        y(): number;
        y(value: number): this;
        y(value?: number): any {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        width(): number;
        width(value: number): this;
        width(value?: number): any {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        }

        height(): number;
        height(value: number): this;
        height(value?: number): any {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        }

        stretch(): Stretch;
        stretch(value: Stretch): this;
        stretch(value?: Stretch): any {
            if (arguments.length < 1)
                return this.state.stretch;
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
            return this;
        }

        sourceUri(): string;
        sourceUri(value: string): this;
        // invalidations come through watcher
        sourceUri(value?: string): any {
            if (arguments.length < 1)
                return this.state.source.uri;
            this.state.source.uri = value;
            return this;
        }

        protected onSourceChanged() {
            this.setNaturalSize(0, 0);
        }

        protected onSourceErrored(err: any) {
            console.error("error loading image", err);
        }

        protected onSourceLoaded() {
            var source = this.state.source;
            this.setNaturalSize(source.naturalWidth, source.naturalHeight);
        }

        protected setNaturalSize(width: number, height: number) {
            var naturalSize = this.state.natural;
            naturalSize.width = width;
            naturalSize.height = height;
            this.composite.taint(DirtyFlags.stretch | DirtyFlags.extents).invalidate();
        }
    }

    var imageStencil = <stencil.IStencil>{
        draft(bag: stencil.IStencilBag) {
        },
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var state = <IImageState>bag.state,
                comp = <IImageComposite>bag.composite;
            ctx.preapply(comp.stretchTransform);
            state.source.draw(ctx.raw);
        },
    };
}