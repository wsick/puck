/// <reference path="Container" />

namespace puck {
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Layer extends Container {
        private $ctx: render.RenderContext;
        private $timer: Timer;
        frameDebug: FrameDebug;

        get width(): number {
            return this.$ctx.raw.canvas.width;
        }

        get height(): number {
            return this.$ctx.raw.canvas.height;
        }

        init(state?: IContainerState, composite?: IContainerComposite) {
            super.init(state, composite);
            this.frameDebug = new FrameDebug();
            this.$ctx = new render.RenderContext();
            this.$timer = new Timer((now) => this.onTick(now));
        }

        attach(ctx: CanvasRenderingContext2D): this {
            this.$ctx.init(ctx);
            return this;
        }

        activate(): this {
            this.$timer.enable();
            return this;
        }

        deactivate(): this {
            this.$timer.disable();
            return this;
        }

        process(): this {
            this.frameDebug.beginProcess();
            engine.process(this);
            this.frameDebug.endProcess();
            return this;
        }

        render(): this {
            var ctx = this.$ctx,
                paint = this.composite.paint,
                raw = ctx.raw;

            this.frameDebug.beginRender();
            raw.fillStyle = "#ffffff";
            raw.fillRect(paint.x, paint.y, paint.width, paint.height);
            engine.render(this, ctx, paint);
            this.frameDebug.endRender();

            return this;
        }

        protected onTick(now: number) {
            this.process()
                .render();
        }
    }
}