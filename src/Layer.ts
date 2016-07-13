/// <reference path="Container" />

namespace puck {
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Layer extends Container {
        private $ctx: render.RenderContext;
        private $timer: Timer;
        private $collector: element.IElement;
        frameDebug: FrameDebug;

        constructor(ctx: CanvasRenderingContext2D) {
            this.$ctx = new render.RenderContext(ctx);
            super();
        }

        get width(): number { return this.$ctx.raw.canvas.width; }
        get height(): number { return this.$ctx.raw.canvas.height; }

        init(state?: IContainerState, composite?: IContainerComposite) {
            super.init(state, composite);
            this.frameDebug = new FrameDebug();
            this.$timer = new Timer((now) => this.onTick(now));
            this.$collector = new Element();
        }

        activate(): this {
            this.$timer.enable();
            return this;
        }

        deactivate(): this {
            this.$timer.disable();
            return this;
        }

        protected onTick(now: number) {
            this.frameDebug.begin();

            engine.process(this);

            var ctx = this.$ctx,
                paint = this.composite.paint,
                raw = ctx.raw;

            raw.fillStyle = "#ffffff";
            raw.fillRect(paint.x, paint.y, paint.width, paint.height);
            engine.render(this, ctx, paint);

            this.frameDebug.end();
        }
    }
}