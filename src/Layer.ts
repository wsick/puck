/// <reference path="Container" />

namespace puck {
    export class Layer extends Container {
        private $ctx: render.RenderContext = null;
        private $timer = new Timer((now) => this.onFrame(now));
        private $collector = new Element();

        attachTo(ctx: CanvasRenderingContext2D): this {
            this.$ctx = new render.RenderContext(ctx);
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

        protected onFrame(now: number) {
            var collector = this.$collector,
                paint = la.rect.init(0, 0, 0, 0, collector.composite.paint);
            engine.process(this, collector);
            engine.render(this, this.$ctx, paint);
        }
    }
}