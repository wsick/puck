/// <reference path="../element/ElementComposite" />

namespace puck.image {
    export interface IImageComposite extends element.IElementComposite {
        stretchTransform: Float32Array;
    }
    export class ImageComposite extends element.ElementComposite implements IImageComposite {
        stretchTransform = la.mat3.identity();

        reset(): this {
            super.reset();
            la.mat3.identity(this.stretchTransform);
            return this;
        }
    }
}