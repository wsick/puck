namespace puck.element {
    export interface IElementState {
        //range: [0.0, 1.0]
        opacity: number;
        visible: boolean;
        //visual offset from parent
        offset: IPoint;
        size: ISize;
        transform: Float32Array;
        //origin of transform in relative coordinate space ([0.0,1.0], [0.0,1.0])
        transformOrigin: IPoint;
        reset();
    }

    export class ElementState implements IElementState {
        opacity = 1.0;
        visible = true;
        offset = {x: 0, y: 0};
        size = {width: 0, height: 0};
        transform = mat3.identity();
        transformOrigin = {x: 0.5, y: 0.5};

        reset() {
            this.opacity = 1.0;
            this.visible = true;
            this.offset.x = 0;
            this.offset.y = 0;
            this.size.width = 0;
            this.size.height = 0;
            mat3.identity(this.transform);
            this.transformOrigin.x = 0.5;
            this.transformOrigin.y = 0.5;
        }
    }
}