namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        transform = 1 << 2,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.transform
    }

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
        transform = mat3.identity();

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
            mat3.identity(this.transform);
        }
    }
}