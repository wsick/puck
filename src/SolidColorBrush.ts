namespace puck {
    export interface ISolidColorBrush extends IBrush {
        attr(name: "color"): Color;
        attr(name: "color", value: Color): this;
        attr(name: string): any;
        attr(name: string, value: any);
    }

    export class SolidColorBrush implements ISolidColorBrush {
        private $color: Color = null;
        private $changer = new puck.internal.WatchChanger();

        constructor(color?: Color|string) {
            this.color = new Color(color);
        }

        attr(name: string, value?: any): any {
            if (typeof value === "undefined") {
                return this[name];
            } else {
                this[name] = value;
                return this;
            }
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