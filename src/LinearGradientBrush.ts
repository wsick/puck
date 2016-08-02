/// <reference path="GradientBrush" />

namespace puck {
    export class LinearGradientBrush extends GradientBrush {
        private $start: la.IPoint = {x: 0, y: 0};
        private $end: la.IPoint = {x: 0, y: 1};

        get start(): la.IPoint {
            return this.$start;
        }

        set start(value: la.IPoint) {
            if (this.$start !== value) {
                this.$start = value;
                Object.freeze(value);
                this.$changer.on();
            }
        }

        get end(): la.IPoint {
            return this.$end;
        }

        set end(value: la.IPoint) {
            if (this.$end !== value) {
                this.$end = value;
                Object.freeze(value);
                this.$changer.on();
            }
        }

        protected createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            var grd = ctx.createLinearGradient(mstart.x, mstart.y, mend.x, mend.y);
            for (var it = this.stops.iter(), result = it.next(); !result.done; result = it.next()) {
                addColorStop(grd, result.value);
            }
            return grd;
        }

        protected createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            return this.createInterpolated(ctx, linearGradient.createRepeatInterpolator(mstart, mend, region));
        }

        protected createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            return this.createInterpolated(ctx, linearGradient.createReflectInterpolator(mstart, mend, region));
        }

        private createInterpolated(ctx: CanvasRenderingContext2D, interpolator: linearGradient.IInterpolator) {
            var grd = ctx.createLinearGradient(interpolator.x0, interpolator.y0, interpolator.x1, interpolator.y1);
            var allStops = this.stops.paddedIter();
            for (; interpolator.step();) {
                for (var result = allStops.next(); !result.done; result = allStops.next()) {
                    let cur = result.value;
                    let inter = {
                        color: cur.color,
                        offset: interpolator.interpolate(cur.offset)
                    };
                    if (inter.offset >= 0 && inter.offset <= 1)
                        addColorStop(grd, inter);
                }
            }
            return grd;
        }
    }

    function addColorStop(grd: CanvasGradient, stop: IGradientStop) {
        // Placing color stop in between [0.0, 1.0]
        // Otherwise, gradient will not render
        var offset = Math.min(1.0, Math.max(0.0, stop.offset));
        var color = stop.color.toString();
        grd.addColorStop(offset, color);
    }
}