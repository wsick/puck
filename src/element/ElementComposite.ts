namespace puck.element {
    export interface IElementComposite {
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags);
        untaint(oldDirt: DirtyFlags);
        reset();
        opacity: number;
        visible: boolean;
        transform: Float32Array;
        extents: la.IRect;
        paint: la.IRect;
    }
    export class ElementComposite implements IElementComposite {
        private $$dirt = DirtyFlags.none;

        opacity: number;
        visible: boolean;
        // NOTE: transform, extents, bounds are relative to owner top-left
        transform = la.mat3.identity();
        extents = la.rect.init(0, 0, 0, 0);
        // NOTE: paint is used to carry invalidated region up the tree
        paint = la.rect.init(0, 0, 0, 0);

        hasDirt(match: DirtyFlags): boolean {
            return (this.$$dirt & match) > 0;
        }

        taint(newDirt: DirtyFlags) {
            this.$$dirt |= newDirt;
        }

        untaint(oldDirt: DirtyFlags) {
            this.$$dirt &= ~oldDirt;
        }

        reset(): this {
            this.opacity = 1.0;
            this.visible = true;
            la.mat3.identity(this.transform);
            la.rect.init(0, 0, 0, 0, this.extents);
            la.rect.init(0, 0, 0, 0, this.paint);
            this.$$dirt = DirtyFlags.none;
            return this;
        }
    }
}