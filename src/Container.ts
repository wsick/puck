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

        get opacity(): number {
            return this.state.opacity;
        }

        set opacity(value: number) {
            if (this.state.opacity !== value) {
                this.state.opacity = value;
                this.composite.taint(DirtyFlags.opacity);
            }
        }

        get visible(): boolean {
            return this.state.visible;
        }

        set visible(value: boolean) {
            if (this.state.visible !== value) {
                this.state.visible = value;
                this.composite.taint(DirtyFlags.visible);
            }
        }

        get x(): number {
            return this.state.offset.x;
        }

        set x(value: number) {
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get y(): number {
            return this.state.offset.y;
        }

        set y(value: number) {
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get transformOriginX(): number {
            return this.state.transformOrigin.x;
        }

        set transformOriginX(value: number) {
            if (this.state.transformOrigin.x !== value) {
                this.state.transformOrigin.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
        }

        get transformOriginY(): number {
            return this.state.transformOrigin.y;
        }

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
            this.composite.taint(DirtyFlags.transform);
            return this;
        }
    }
}