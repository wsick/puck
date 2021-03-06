/// <reference path="GradientBrush" />

namespace puck {
    var tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
    var tmpCtx: CanvasRenderingContext2D = tmpCanvas.getContext('2d');
    var epsilon = 1E-10;
    var fallbackColor = Color.fromHex("#FF000000");

    export interface IRadialGradientBrush extends IGradientBrush {
        center(): la.IPoint;
        center(value: la.IPoint): this;
        origin(): la.IPoint;
        origin(value: la.IPoint): this;
        radiusX(): number;
        radiusX(value: number): this;
        radiusY(): number;
        radiusY(value: number): this;
    }

    export class RadialGradientBrush extends GradientBrush implements IRadialGradientBrush {
        private $center: la.IPoint = {x: 0.5, y: 0.5};
        private $origin: la.IPoint = {x: 0.5, y: 0.5};
        private $radius: la.IPoint = {x: 0.5, y: 0.5};

        center(): la.IPoint;
        center(value: la.IPoint): this;
        center(value?: la.IPoint): any {
            if (arguments.length < 1)
                return this.$center;
            if (this.$center !== value) {
                this.$center = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        }

        origin(): la.IPoint;
        origin(value: la.IPoint): this;
        origin(value?: la.IPoint): any {
            if (arguments.length < 1)
                return this.$origin;
            if (this.$origin !== value) {
                this.$origin = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        }

        radiusX(): number;
        radiusX(value: number): this;
        radiusX(value?: number): any {
            if (arguments.length < 1)
                return this.$radius.x;
            if (this.$radius.x !== value) {
                this.$radius.x = value;
                this.$changer.on();
            }
            return this;
        }

        radiusY(): number;
        radiusY(value: number): this;
        radiusY(value?: number): any {
            if (arguments.length < 1)
                return this.$radius.y;
            if (this.$radius.y !== value) {
                this.$radius.y = value;
                this.$changer.on();
            }
            return this;
        }

        protected createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var data = this.getPointData(region);
            var grd = (!data.balanced ? tmpCtx : ctx).createRadialGradient(data.x0, data.y0, 0, data.x1, data.y1, data.r1);
            for (var it = this.stops().iter(), result = it.next(); !result.done; result = it.next()) {
                addColorStop(grd, result.value);
            }
            return this.fit(ctx, grd, data, region);
        }

        protected createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var data = this.getPointData(region);
            return this.createInterpolated(data, region, false);
        }

        protected createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string|CanvasGradient|CanvasPattern {
            var data = this.getPointData(region);
            return this.createInterpolated(data, region, true);
        }

        private createInterpolated(data: radialGradient.IRadialPointData, bounds: la.IRect, reflect: boolean): CanvasPattern {
            tmpCanvas.width = bounds.width;
            tmpCanvas.height = bounds.height;
            tmpCtx.save();
            if (!data.balanced)
                tmpCtx.scale(data.sx, data.sy);
            tmpCtx.globalCompositeOperation = "destination-over";

            var inverted = false;
            var allStops = this.stops().paddedIter();
            for (var extender = radialGradient.createExtender(data, bounds); extender.step(); inverted = !inverted) {
                var grd = extender.createGradient(tmpCtx);
                for (var result = allStops.next(); !result.done; result = allStops.next()) {
                    let cur = result.value;
                    let inter = {
                        color: cur.color,
                        offset: (reflect && inverted) ? 1 - cur.offset : cur.offset,
                    };
                    addColorStop(grd, inter);
                }
                tmpCtx.fillStyle = grd;
                tmpCtx.beginPath();
                tmpCtx.arc(extender.x1, extender.y1, extender.r1, 0, 2 * Math.PI, false);
                tmpCtx.closePath();
                tmpCtx.fill();
            }

            var pattern = tmpCtx.createPattern(tmpCanvas, "no-repeat");
            tmpCtx.restore();
            return pattern;
        }

        private getPointData(bounds: la.IRect): radialGradient.IRadialPointData {
            var mcenter = this.mapPoint(bounds, this.$center);
            var morigin = this.mapPoint(bounds, this.$origin);
            var mradius = this.mapPoint(bounds, this.$radius);

            var rad = Math.max(mradius.x, mradius.y);
            var side = Math.max(bounds.width, bounds.height),
                sx = bounds.width / side,
                sy = bounds.height / side;
            return {
                x0: morigin.x / sx,
                y0: morigin.y / sy,
                x1: mcenter.x / sx,
                y1: mcenter.y / sy,
                r1: rad,
                side: side,
                sx: bounds.width / side,
                sy: bounds.height / side,
                balanced: Math.abs(mradius.x - mradius.y) < epsilon
            };
        }

        private fit(ctx: CanvasRenderingContext2D, fill: string|CanvasGradient|CanvasPattern, data: radialGradient.IRadialPointData, bounds: la.IRect): CanvasPattern {
            //NOTE:
            //  This will return the CanvasGradient if bounds are square
            //  Otherwise, it will create a CanvasPattern by scaling square coordinate space into bounds
            if (data.balanced)
                return fill;

            tmpCanvas.width = bounds.width;
            tmpCanvas.height = bounds.height;

            tmpCtx.save();
            tmpCtx.scale(data.sx, data.sy);
            tmpCtx.fillStyle = fill;
            tmpCtx.fillRect(0, 0, data.side, data.side);
            var pattern = ctx.createPattern(tmpCanvas, "no-repeat");
            tmpCtx.restore();
            return pattern;
        }
    }

    function addColorStop(grd: CanvasGradient, stop: IGradientStop) {
        // Placing color stop in between [0.0, 1.0]
        // Otherwise, gradient will not render
        var offset = Math.min(1.0, Math.max(0.0, stop.offset));
        var color = (stop.color || fallbackColor).toString();
        grd.addColorStop(offset, color);
    }
}