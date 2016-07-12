namespace puck {
    export class Timer {
        private enabled = false;
        private active: number = 0;

        constructor(public callback: FrameRequestCallback) {
        }

        enable() {
            this.enabled = true;
            this.active = animate.request((now) => this.onFrame(now));
        }

        disable() {
            this.enabled = false;
            if (this.active) {
                animate.cancel(this.active);
                this.active = 0;
            }
        }

        protected onFrame(now: number) {
            this.callback && this.callback(now);
            this.active = animate.request((now) => this.onFrame(now));
        }
    }

    namespace animate {
        export var request = window.requestAnimationFrame
            || (<any>window).webkitRequestAnimationFrame
            || (<any>window).mozRequestAnimationFrame
            || (<any>window).oRequestAnimationFrame
            || (<any>window).msRequestAnimationFrame
            || ((callback) => window.setTimeout(callback, 1000 / 200));

        export var cancel = window.cancelAnimationFrame
            || (<any>window).webkitCancelAnimationFrame
            || (<any>window).mozCancelAnimationFrame
            || (<any>window).oCancelAnimationFrame
            || (<any>window).msCancelAnimationFrame
            || ((handle: number) => window.clearTimeout(handle));
    }
}