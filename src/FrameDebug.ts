namespace puck {
    export class FrameDebug {
        private $onBegin: Function = null;
        private $onEnd: Function = null;

        onBegin(cb: Function) {
            this.$onBegin = cb;
        }

        onEnd(cb: Function) {
            this.$onEnd = cb;
        }

        begin() {
            this.$onBegin && this.$onBegin();
        }

        end() {
            this.$onEnd && this.$onEnd();
        }
    }
}