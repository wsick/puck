namespace puck {
    export class FrameDebug {
        private $onBegin: Function = null;
        private $onEnd: Function = null;

        onBegin(cb: Function): this {
            this.$onBegin = cb;
            return this;
        }

        onEnd(cb: Function): this {
            this.$onEnd = cb;
            return this;
        }

        begin() {
            this.$onBegin && this.$onBegin();
        }

        end() {
            this.$onEnd && this.$onEnd();
        }
    }
}