/// <reference path="../element/ElementState" />

namespace puck.image {
    export interface IImageState extends element.IElementState {
        source: IImageSource;
        stretch: Stretch;
        natural: la.IRect;
        getEffectiveStretch(): Stretch;
    }

    export class ImageState extends element.ElementState implements IImageState {
        source: IImageSource = new ImageSource();
        stretch: Stretch = Stretch.none;
        natural: la.IRect = la.rect.init(0, 0, 0, 0);

        reset(): this {
            super.reset();
            this.source.reset();
            this.stretch = Stretch.none;
            la.rect.init(0, 0, 0, 0, this.natural);
            return this;
        }

        getEffectiveStretch(): Stretch {
            var size = this.size,
                natural = this.natural;
            if (size.width <= 0 || size.height <= 0) {
                // fall back to none if width/height are empty
                // otherwise, we would build a singular stretch transform
                return Stretch.none;
            }
            if (natural.width <= 0 || natural.height <= 0) {
                // fall back to none if no-size image
                // otherwise, we would get NaN, NaN scale stretch transform
                return Stretch.none;
            }
            return this.stretch;
        }
    }
}