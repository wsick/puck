/// <reference path="element/DirtyFlags" />

namespace puck {
    import IElement = puck.element.IElement;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Element implements IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: {down: element.down.Processor, up: element.up.Processor};

        constructor(state?: IElementState, composite?: IElementComposite) {
            this.init(state, composite);
            Object.freeze(this);
        }

        init(state?: IElementState, composite?: IElementComposite) {
            this.state = (state || new element.ElementState()).reset();
            this.composite = (composite || new element.ElementComposite()).reset();
            this.processor = {
                down: element.down.Processor.instance,
                up: element.up.Processor.instance
            };
        }

        get opacity(): number { return this.state.opacity; }
        set opacity(value: number) {
            if (this.state.opacity !== value) {
                this.state.opacity = value;
                this.composite.taint(DirtyFlags.opacity);
            }
        }

        get visible(): boolean { return this.state.visible; }
        set visible(value: boolean) {
            if (this.state.visible !== value) {
                this.state.visible = value;
                this.composite.taint(DirtyFlags.visible);
            }
        }

        get x(): number { return this.state.offset.x; }
        set x(value: number) {
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get y(): number { return this.state.offset.y; }
        set y(value: number) {
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get width(): number { return this.state.size.width; }
        set width(value: number) {
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get height(): number { return this.state.size.height; }
        set height(value: number) {
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
        }

        get transformOriginX(): number { return this.state.transformOrigin.x; }
        set transformOriginX(value: number) {
            if (this.state.transformOrigin.x !== value) {
                this.state.transformOrigin.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get transformOriginY(): number { return this.state.transformOrigin.y; }
        set transformOriginY(value: number) {
            if (this.state.transformOrigin.y !== value) {
                this.state.transformOrigin.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        resetTransform(): this {
            la.mat3.identity(this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        }

        setTransform(mat: Float32Array): this {
            la.mat3.copyTo(mat, this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        }

        applyTransform(mat: Float32Array): this {
            la.mat3.apply(this.state.transform, mat);
            return this;
        }
    }
}