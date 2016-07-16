namespace puck.element {
    export interface IElementState {
        //range: [0.0, 1.0]
        opacity: number;
        visible: boolean;

        //visual offset from parent
        offset: la.IPoint;
        size: la.ISize;

        //origin of transform in relative coordinate space ([0.0,1.0], [0.0,1.0])
        transform: Float32Array;
        transformOrigin: la.IPoint;

        reset();

        mapTransformOrigin(comp: IElementComposite): la.IPoint;
    }

    export class ElementState implements IElementState {
        opacity: number = 1.0;
        visible: boolean = true;
        offset = {x: 0, y: 0};
        size = {width: 0, height: 0};
        transform = la.mat3.identity();
        transformOrigin = {x: 0.5, y: 0.5};

        reset(): this {
            this.opacity = 1.0;
            this.visible = true;
            this.offset.x = 0;
            this.offset.y = 0;
            this.size.width = 0;
            this.size.height = 0;
            la.mat3.identity(this.transform);
            this.transformOrigin.x = 0.5;
            this.transformOrigin.y = 0.5;
            return this;
        }

        mapTransformOrigin(comp: IElementComposite): la.IPoint {
            var to = this.transformOrigin,
                size = this.size;
            return {
                x: to.x * size.width,
                y: to.y * size.height
            };
        }
    }
}