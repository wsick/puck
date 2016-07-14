namespace puck {
    import IImageState = puck.image.IImageState;
    import IElementComposite = puck.element.IElementComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Image extends Element {
        state: IImageState;
        stencil: stencil.IStencil;

        init(state?: IImageState, composite?: IElementComposite) {
            super.init(state, composite);
            this.stencil = imageStencil;
            this.state.source.watch(
                () => this.onSourceChanged(),
                (e) => this.onSourceErrored(e),
                () => this.onSourceLoaded());
        }

        get sourceUri(): string { return this.state.source.uri; }
        // invalidations come through watcher
        set sourceUri(value: string) { this.state.source.uri = value; }

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
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get height(): number { return this.state.size.height; }
        set height(value: number) {
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        protected onSourceChanged() {
            this.composite.taint(DirtyFlags.invalidate);
        }

        protected onSourceErrored(err: any) {
            console.error("error loading image", err);
        }

        protected onSourceLoaded() {
            this.composite.taint(DirtyFlags.invalidate);
        }
    }

    var imageStencil = <stencil.IStencil>{
        draft: stencil.media,
        draw(ctx: render.RenderContext, bag: stencil.IStencilBag) {
            var state = <IImageState>bag.state;

            state.source.draw(ctx.raw);
        },
    };
}