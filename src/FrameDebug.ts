namespace puck {
    export class FrameDebug {
        private $onBeginProcess: Function = null;
        private $onEndProcess: Function = null;
        private $onBeginRender: Function = null;
        private $onEndRender: Function = null;

        onBeginProcess(cb: Function): this {
            this.$onBeginProcess = cb;
            return this;
        }

        onEndProcess(cb: Function): this {
            this.$onEndProcess = cb;
            return this;
        }

        onBeginRender(cb: Function): this {
            this.$onBeginRender = cb;
            return this;
        }

        onEndRender(cb: Function): this {
            this.$onEndRender = cb;
            return this;
        }

        beginProcess() {
            this.$onBeginProcess && this.$onBeginProcess();
        }

        endProcess() {
            this.$onEndProcess && this.$onEndProcess();
        }

        beginRender() {
            this.$onBeginRender && this.$onBeginRender();
        }

        endRender() {
            this.$onEndRender && this.$onEndRender();
        }
    }
}