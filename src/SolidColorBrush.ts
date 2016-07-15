namespace puck {
    export class SolidColorBrush implements IBrush {
        private $color: Color = null;
        private $changer = new puck.internal.WatchChanger();

        constructor(color?: Color|string) {
            this.color = new Color(color);
        }

        get color(): Color { return this.$color; }
        set color(value: Color) {
            if (!Color.equals(this.$color, value)) {
                this.$changer.on();
            }
            this.$color = value; // always set in case ref changes
        }

        watch(onChanged: () => void): puck.internal.IWatcher {
            return this.$changer.watch(onChanged);
        }

        setup(ctx: CanvasRenderingContext2D, region: la.IRect) {
        }

        toHtml5Object(): any {
            return this.color.toString();
        }
    }
}