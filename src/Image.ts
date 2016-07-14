namespace puck {
    import IImageState = puck.image.IImageState;
    import IImageComposite = puck.image.IImageComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    /*
     * Represents an Image object to render
     * By default, stretch is set to none which will use the image's natural size as extents
     * If another stretch is represented, image will transform into width/height specified.
     */

    export class Image extends Element {
        state: IImageState;
        composite: IImageComposite;
        stencil: stencil.IStencil;

        init(state?: IImageState, composite?: IImageComposite) {
            this.state = (state || new image.ImageState()).reset();
            this.composite = (composite || new image.ImageComposite()).reset();
            this.processor = {
                down: image.down.Processor.instance,
                up: image.up.Processor.instance,
                render: element.render.Processor.instance,
            };
            this.stencil = imageStencil;
            this.state.source.watch(
                () => this.onSourceChanged(),
                (e) => this.onSourceErrored(e),
                () => this.onSourceLoaded());
        }

        get sourceUri(): string { return this.state.source.uri; }
        // invalidations come through watcher
        set sourceUri(value: string) { this.state.source.uri = value; }

        get stretch(): Stretch { return this.state.stretch; }
        set stretch(value: Stretch) {
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
        }

        get x(): number { return this.state.offset.x; }
        set x(value: number) {
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get y(): number { return this.state.offset.y; }
        set y(value: number) {
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get width(): number { return this.state.size.width; }
        set width(value: number) {
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
        }

        get height(): number { return this.state.size.height; }
        set height(value: number) {
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
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
            var naturalSize = this.state.naturalSize;
            naturalSize.width = width;
            naturalSize.height = height;
            this.composite.taint(DirtyFlags.stretch | DirtyFlags.extents | DirtyFlags.invalidate);
        }
    }

    var imageStencil = <stencil.IStencil>{
        draft(bag: stencil.IStencilBag) {},
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var state = <IImageState>bag.state,
                comp = <IImageComposite>bag.composite;
            ctx.preapply(comp.stretchTransform);
            state.source.draw(ctx.raw);
        },
    };
}