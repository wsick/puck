namespace puck.element {
    export interface IElementComposite {
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags): this;
        untaint(oldDirt: DirtyFlags): this;
        reset(): this;
        invalidate(): this;
        opacity: number;
        visible: boolean;
        transform: Float32Array;
        padding: la.IPadding;
        extents: la.IRect;
        paint: la.IRect;
    }
    export class ElementComposite implements IElementComposite {
        private $$dirt = DirtyFlags.none;

        opacity: number;
        visible: boolean;
        // NOTE: transform, extents, bounds are relative to owner top-left
        transform = la.mat3.identity();
        padding = la.padding.init(0, 0, 0, 0);
        extents = la.rect.init(0, 0, 0, 0);
        // NOTE: paint is used to carry invalidated region up the tree
        paint = la.rect.init(0, 0, 0, 0);

        hasDirt(match: DirtyFlags): boolean {
            return (this.$$dirt & match) > 0;
        }

        taint(newDirt: DirtyFlags): this {
            this.$$dirt |= newDirt;
            return this;
        }

        untaint(oldDirt: DirtyFlags): this {
            this.$$dirt &= ~oldDirt;
            return this;
        }

        reset(): this {
            this.opacity = 1.0;
            this.visible = true;
            la.mat3.identity(this.transform);
            la.padding.init(0, 0, 0, 0, this.padding);
            la.rect.init(0, 0, 0, 0, this.extents);
            la.rect.init(0, 0, 0, 0, this.paint);
            this.$$dirt = DirtyFlags.none;
            return this;
        }

        invalidate(): this {
            this.taint(DirtyFlags.invalidate);
            la.rect.union(this.paint, this.extents);
            return this;
        }
    }
}