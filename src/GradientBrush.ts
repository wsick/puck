namespace puck {
    export abstract class GradientBrush implements IBrush {
        private $cachedBrush: string | CanvasGradient | CanvasPattern = null;
        private $cachedBounds = la.rect.init(0, 0, 0, 0);
        protected $changer = new puck.internal.WatchChanger();

        private $stops = new GradientStops();
        private $spreadMethod: GradientSpreadMethod = GradientSpreadMethod.pad;
        private $mappingMode: BrushMappingMode = BrushMappingMode.relativeToBounds;

        constructor() {
            this.$stops.watch(() => this.$changer.on());
        }

        get spreadMethod(): GradientSpreadMethod {
            return this.$spreadMethod;
        }

        set spreadMethod(value: GradientSpreadMethod) {
            if (this.$spreadMethod !== value) {
                this.$spreadMethod = value;
                this.$changer.on();
            }
        }

        get mappingMode(): BrushMappingMode {
            return this.$mappingMode;
        }

        set mappingMode(value: BrushMappingMode) {
            if (this.$mappingMode !== value) {
                this.$mappingMode = value;
                this.$changer.on();
            }
        }

        get stops(): GradientStops {
            return this.$stops;
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
            switch (this.spreadMethod) {
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
            if (this.mappingMode === BrushMappingMode.relativeToBounds) {
                mapped.x *= region.width;
                mapped.y *= region.height;
            }
            mapped.x += region.x;
            mapped.y += region.y;
            return mapped;
        }
    }
}