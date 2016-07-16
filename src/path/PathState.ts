/// <reference path="../visual/VisualState" />

namespace puck.path {
    export interface IPathState extends visual.IVisualState {
        path: curve.Path;
        stretch: Stretch;
        fillRule: FillRule;
        strokeLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;
        getEffectiveStretch(comp: IPathComposite): Stretch;
    }
    export class PathState extends visual.VisualState implements IPathState {
        path: curve.Path = null;
        stretch: Stretch = Stretch.none;
        fillRule: FillRule = FillRule.evenodd;
        strokeLineCap: PenLineCap = PenLineCap.flat;
        strokeLineJoin: PenLineJoin = PenLineJoin.miter;
        strokeMiterLimit: number = 10;

        reset(): this {
            super.reset();
            this.path = null;
            this.stretch = Stretch.none;
            this.fillRule = FillRule.evenodd;
            this.strokeLineCap = PenLineCap.flat;
            this.strokeLineJoin = PenLineJoin.miter;
            this.strokeMiterLimit = 10;
            return this;
        }

        getEffectiveStretch(comp: IPathComposite): Stretch {
            var size = this.size,
                natural = comp.natural;
            if (size.width <= 0 || size.height <= 0) {
                // fall back to none if width/height are empty
                // otherwise, we would build a singular stretch transform
                return Stretch.none;
            }
            if (natural.width <= 0 || natural.height <= 0) {
                // fall back to none if no-size path
                // otherwise, we would get NaN, NaN scale stretch transform
                return Stretch.none;
            }
            return this.stretch;
        }
    }
}