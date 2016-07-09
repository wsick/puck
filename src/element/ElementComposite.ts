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
        bounds: la.IRect;
    }
    export class ElementComposite implements IElementComposite {
        private $$dirt = DirtyFlags.none;

        opacity = 1.0;
        visible = true;
        // NOTE: transform, extents, bounds are relative to owner top-left
        transform = la.mat3.identity();
        extents = la.rect.init(0, 0, 0, 0);
        bounds: la.IRect;

        constructor() {
            // NOTE: Elements have the same extents as bounds
            //       Used by container processor to aggregate without choosing between bounds/extents
            this.bounds = this.extents;
        }

        hasDirt(match: DirtyFlags): boolean {
            return (this.$$dirt & match) > 0;
        }

        taint(newDirt: DirtyFlags) {
            this.$$dirt |= newDirt;
        }

        untaint(oldDirt: DirtyFlags) {
            this.$$dirt &= ~oldDirt;
        }

        reset() {
            this.opacity = 1.0;
            this.visible = true;
            la.mat3.identity(this.transform);
            la.rect.init(0, 0, 0, 0, this.extents);
            //TODO: Should up+down be tainted?
        }
    }
}