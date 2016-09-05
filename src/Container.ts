/// <reference path="Element" />

namespace puck {
    import IContainer = puck.container.IContainer;
    import IElement = puck.element.IElement;
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    import IContainerProcessor = puck.container.IContainerProcessor;
    import DirtyFlags = puck.element.DirtyFlags;

    export class Container implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];
        processor: IContainerProcessor;

        constructor(state?: IContainerState, composite?: IContainerComposite) {
            this.init(state, composite);
            Object.freeze(this);
        }

        init(state?: IContainerState, composite?: IContainerComposite) {
            this.elements = [];
            this.state = (state || new container.ContainerState()).reset();
            this.composite = (composite || new container.ContainerComposite()).reset();
            this.processor = {
                down: container.down.Processor.instance,
                up: container.up.Processor.instance,
                render: container.render.Processor.instance,
                hit: container.hit.Processor.instance,
            };
        }

        walk(reverse?: boolean): walk.IWalker<element.IElement> {
            var els = this.elements;
            var i = -1;
            if (!reverse) {
                return <walk.IWalker<element.IElement>>{
                    next(): element.IElement {
                        i++;
                        return els[i];
                    }
                };
            }

            i = els.length;
            return <walk.IWalker<element.IElement>>{
                next(): element.IElement {
                    i--;
                    return els[i];
                }
            };
        }

        opacity(): number;
        opacity(value: number): this;
        opacity(value?: number): number|this {
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
        visible(value?: boolean): boolean|this {
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
        transformOriginX(value?: number): number|this {
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
        transformOriginY(value?: number): number|this {
            if (arguments.length < 1)
                return this.state.transformOrigin.y;
            if (this.state.transformOrigin.y !== value) {
                this.state.transformOrigin.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        x(): number;
        x(value: number): this;
        x(value?: number): number|this {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        }

        y(): number;
        y(value: number): this;
        y(value: number): number|this {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
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