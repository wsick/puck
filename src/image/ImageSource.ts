namespace puck.image {
    export class ImageSource implements IImageSource {
        private $el: HTMLImageElement = document.createElement("img");
        private $watchers: IImageWatcher[] = [];

        constructor() {
            this.$el.onerror = (e: ErrorEvent) => this.onErrored(e);
            this.$el.onload = (e) => {
                this.onLoaded();
                this.onChanged();
            };
        }

        reset() {
            this.uri = "";
        }

        get uri(): string { return this.$el.src; }
        set uri(value: string) {
            if (this.$el.src !== value) {
                this.$el.src = value;
                this.onChanged();
            }
        }

        get isEmpty(): boolean {
            var el = this.$el;
            return !el
                || el.naturalWidth <= 0
                || el.naturalHeight <= 0;
        }

        get naturalWidth(): number {
            return this.$el.naturalWidth;
        }

        get naturalHeight(): number {
            return this.$el.naturalHeight;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.drawImage(this.$el, 0, 0);
        }

        watch(onChanged: Function, onErrored: Function, onLoaded: Function): IImageWatcher {
            var watcher: IImageWatcher = {
                change: onChanged,
                error: onErrored,
                load: onLoaded,
                unwatch: () => {
                    var ind = this.$watchers.indexOf(watcher);
                    if (ind > -1)
                        this.$watchers.splice(ind, 1);
                }
            };
            this.$watchers.push(watcher);
            return watcher;
        }

        protected onChanged() {
            for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                watchers[i].change();
            }
        }

        protected onErrored(e: ErrorEvent) {
            for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                watchers[i].error(e.error);
            }
        }

        protected onLoaded() {
            for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                watchers[i].load();
            }
        }
    }
}