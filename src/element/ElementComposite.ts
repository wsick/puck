namespace puck.element {
    export interface IElementComposite {
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags);
        untaint(oldDirt: DirtyFlags);
        reset();
        opacity: number;
        visible: boolean;
        transform: Float32Array;
    }
    export class ElementComposite implements IElementComposite {
        private $$dirt = DirtyFlags.none;

        opacity = 1.0;
        visible = true;
        transform = la.mat3.identity();

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
        }
    }
}