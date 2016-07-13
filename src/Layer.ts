/// <reference path="Container" />

namespace puck {
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Layer extends Container {
        private $ctx: render.RenderContext;
        private $timer: Timer;
        private $collector: element.IElement;

        constructor(ctx: CanvasRenderingContext2D) {
            this.$ctx = new render.RenderContext(ctx);
            super();
        }

        init(state?: IContainerState, composite?: IContainerComposite) {
            super.init(state, composite);
            this.$timer = new Timer((now) => this.onFrame(now));
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

        protected onFrame(now: number) {
            engine.process(this);
            engine.render(this, this.$ctx, this.composite.paint);
        }
    }
}