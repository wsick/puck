namespace puck {
    export interface ISolidColorBrush extends IBrush {
        color(): Color;
        color(value: Color): this;
    }

    export class SolidColorBrush implements ISolidColorBrush {
        private $color: Color = null;
        private $changer = new puck.internal.WatchChanger();

        constructor(color?: Color|string) {
            this.color(new Color(color));
        }

        color(): Color;
        color(value: Color): this;
        color(value?: Color): any {
            if (arguments.length < 1)
                return this.$color;
            if (!Color.equals(this.$color, value)) {
                this.$changer.on();
            }
            this.$color = value; // always set in case ref changes
            return this;
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