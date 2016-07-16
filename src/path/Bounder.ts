namespace puck.path {
    import FillBounds = curve.bounds.fill.FillBounds;
    import StrokeBounds = curve.bounds.stroke.StrokeBounds;
    import IBoundingBox = curve.bounds.IBoundingBox;

    export class Bounder {
        private $path: curve.Path = null;
        private $filled: FillBounds = null;
        private $stroked: StrokeBounds = null;
        private $pars: curve.IStrokeParameters;

        constructor() {
            this.$pars = {
                strokeThickness: 0,
                strokeDashArray: null,
                strokeDashCap: curve.PenLineCap.Flat,
                strokeDashOffset: 0,
                strokeEndLineCap: curve.PenLineCap.Flat,
                strokeLineJoin: curve.PenLineJoin.Miter,
                strokeMiterLimit: 10,
                strokeStartLineCap: curve.PenLineCap.Flat,
            };
        }

        getPath(): curve.Path {
            return this.$path;
        }

        setPath(path: curve.Path) {
            if (this.$path === path)
                return;
            this.$path = path;
            if (!path) {
                this.$filled = null;
                this.$stroked = null;
            } else {
                this.$filled = new FillBounds(path);
                this.$stroked = new StrokeBounds(path);
                this.$stroked.pars = this.$pars;
            }
        }

        reset() {
            if (this.$filled)
                this.$filled.reset();
            if (this.$stroked)
                this.$stroked.reset();
        }

        getFillRect(dest: la.IRect): this {
            var box = this.$filled;
            if (!box) {
                la.rect.init(0, 0, 0, 0, dest);
            } else {
                dest.x = box.l;
                dest.y = box.t;
                dest.width = box.r - box.l;
                dest.height = box.b - box.t;
            }
            return this;
        }

        getStrokeRect(dest: la.IRect): this {
            var box = this.$stroked;
            if (!box) {
                la.rect.init(0, 0, 0, 0, dest);
            } else {
                dest.x = box.l;
                dest.y = box.t;
                dest.width = box.r - box.l;
                dest.height = box.b - box.t;
            }
            return this;
        }

        calc(state: IPathState): this {
            var stroked = this.$stroked,
                filled = this.$filled;

            if (stroked) {
                if (!!state.stroke && state.strokeThickness > 0) {
                    this.setStroke(state);
                    stroked.ensure();
                } else {
                    stroked.reset();
                }
            }

            if (filled) {
                filled.ensure();
            }

            return this;
        }

        protected setStroke(state: IPathState) {
            var pars = this.$pars;
            pars.strokeThickness = state.strokeThickness;
            pars.strokeStartLineCap = <curve.PenLineCap><number>state.strokeLineCap;
            pars.strokeLineJoin = <curve.PenLineJoin><number>state.strokeLineJoin;
            pars.strokeMiterLimit = state.strokeMiterLimit;
        }
    }
}