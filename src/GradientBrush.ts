namespace puck {
    export interface IGradientBrush extends IBrush {
        spreadMethod(): GradientSpreadMethod;
        spreadMethod(value: GradientSpreadMethod): this;
        mappingMode(): BrushMappingMode;
        mappingMode(value: BrushMappingMode): this;
        stops(): GradientStops;

        sub(attr: "stops", func: (value: GradientStops) => any): this;
        sub(attr: string, func: any): this;
    }

    export abstract class GradientBrush implements IGradientBrush {
        private $cachedBrush: string | CanvasGradient | CanvasPattern = null;
        private $cachedBounds = la.rect.init(0, 0, 0, 0);
        protected $changer = new puck.internal.WatchChanger();

        private $stops = new GradientStops();
        private $spreadMethod: GradientSpreadMethod = GradientSpreadMethod.pad;
        private $mappingMode: BrushMappingMode = BrushMappingMode.relativeToBounds;

        constructor() {
            this.$stops.watch(() => this.$changer.on());
        }

        spreadMethod(): GradientSpreadMethod;
        spreadMethod(value: GradientSpreadMethod): this;
        spreadMethod(value?: GradientSpreadMethod): any {
            if (arguments.length < 1)
                return this.$spreadMethod;
            if (this.$spreadMethod !== value) {
                this.$spreadMethod = value;
                this.$changer.on();
            }
            return this;
        }

        mappingMode(): BrushMappingMode;
        mappingMode(value: BrushMappingMode): this;
        mappingMode(value?: BrushMappingMode): any {
            if (arguments.length < 1)
                return this.$mappingMode;
            if (this.$mappingMode !== value) {
                this.$mappingMode = value;
                this.$changer.on();
            }
            return this;
        }

        stops(): GradientStops {
            return this.$stops;
        }

        sub(attr: string, func: (value: any) => any): this {
            var getFunc = <Function>this[attr];
            if (typeof getFunc !== "function") {
                throw new Error("cannot modify sub-property, unknown attribute: " + attr);
            }
            func(getFunc.call(this));
            return this;
        }

        watch(onChanged: ()=>void): puck.internal.IWatcher {
            return this.$changer.watch(onChanged);
        }

        setup(ctx: CanvasRenderingContext2D, region: la.IRect) {
            if (this.$cachedBrush && la.rect.equal(this.$cachedBounds, region))
                return;
            la.rect.copyTo(region, this.$cachedBounds);
            this.$cachedBrush = this.createBrush(ctx, region);
        }

        toHtml5Object(): any {
            return this.$cachedBrush;
        }

        protected createBrush(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern {
            switch (this.$spreadMethod) {
                case GradientSpreadMethod.pad:
                    return this.createPad(ctx, region);
                default:
                case GradientSpreadMethod.reflect:
                    return this.createReflect(ctx, region);
                case GradientSpreadMethod.repeat:
                    return this.createRepeat(ctx, region);
            }
        }

        protected abstract createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;

        protected abstract createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;

        protected abstract createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;

        protected mapPoint(region: la.IRect, point: la.IPoint): la.IPoint {
            var mapped = {x: point.x, y: point.y};
            if (this.$mappingMode === BrushMappingMode.relativeToBounds) {
                mapped.x *= region.width;
                mapped.y *= region.height;
            }
            mapped.x += region.x;
            mapped.y += region.y;
            return mapped;
        }
    }
}