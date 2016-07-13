namespace puck {
    export class SolidColorBrush implements IBrush {
        private $color: Color = null;
        private $watchers: IBrushWatcher[] = [];

        constructor(color?: Color|string) {
            this.color = new Color(color);
        }

        get color(): Color { return this.$color; }
        set color(value: Color) {
            if (!Color.equals(this.$color, value)) {
                this.onChanged();
            }
            this.$color = value; // always set in case ref changes
        }

        watch(onChanged: () => void): puck.IBrushWatcher {
            var watcher = <IBrushWatcher>{
                change: onChanged,
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

        setup(ctx: CanvasRenderingContext2D, region: la.IRect) {
        }

        toHtml5Object(): any {
            return this.color.toString();
        }
    }
}