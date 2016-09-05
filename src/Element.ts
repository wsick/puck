/// <reference path="element/DirtyFlags" />

namespace puck {
    import IElement = puck.element.IElement;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;
    import IElementProcessor = puck.element.IElementProcessor;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Element implements IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;
        stencil: stencil.IStencil;

        constructor(state?: IElementState, composite?: IElementComposite) {
            this.init(state, composite);
            Object.freeze(this);
        }

        init(state?: IElementState, composite?: IElementComposite) {
            this.state = (state || new element.ElementState()).reset();
            this.composite = (composite || new element.ElementComposite()).reset();
            this.processor = {
                down: element.down.Processor.instance,
                up: element.up.Processor.instance,
                render: element.render.Processor.instance,
                hit: element.hit.Processor.instance,
            };
            this.stencil = stencil.empty;
        }

        opacity(): number;
        opacity(value: number): this;
        opacity(value?: number): any {
            if (arguments.length < 1)
                return this.state.opacity;
            if (this.state.opacity !== value) {
                this.state.opacity = value;
                this.composite.taint(DirtyFlags.opacity);
            }
            return this;
        }

        visible(): boolean;
        visible(value: boolean): this;
        visible(value?: boolean): any {
            if (arguments.length < 1)
                return this.state.visible;
            if (this.state.visible !== value) {
                this.state.visible = value;
                this.composite.taint(DirtyFlags.visible);
            }
            return this;
        }

        transformOriginX(): number;
        transformOriginX(value: number): this;
        transformOriginX(value?: number): any {
            if (arguments.length < 1)
                return this.state.transformOrigin.x;
            if (this.state.transformOrigin.x !== value) {
                this.state.transformOrigin.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        transformOriginY(): number;
        transformOriginY(value: number): this;
        transformOriginY(value?: number): any {
            if (arguments.length < 1)
                return this.state.transformOrigin.y;
            if (this.state.transformOrigin.y !== value) {
                this.state.transformOrigin.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
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
            this.composite.taint(DirtyFlags.transform);
            return this;
        }
    }
}