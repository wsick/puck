/// <reference path="../../element/hit/Processor" />

namespace puck.image.hit {
    export class Processor extends element.hit.Processor {
        static instance = new Processor();

        protected hit(el: IImage, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean {
            // Already verified that point is within extents
            // If image is loaded, we are hitting the image
            return true;
        }
    }
}