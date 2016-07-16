namespace puck.path {
    import DirtyFlags = puck.element.DirtyFlags;

    export interface IPathComposite extends element.IElementComposite {
        stretchTransform: Float32Array;
        natural: la.IRect;
        bounder: Bounder;
    }

    export class PathComposite extends element.ElementComposite implements IPathComposite {
        stretchTransform = la.mat3.identity();
        natural: la.IRect = la.rect.init(0, 0, 0, 0);
        bounder = new Bounder();

        reset(): this {
            super.reset();
            la.mat3.identity(this.stretchTransform);
            la.rect.init(0, 0, 0, 0, this.natural);
            this.bounder.reset();
            return this;
        }
    }
}