namespace puck.layer {
    export interface ILayer extends container.IContainer {
        attr(name: "width"): number;
        attr(name: "height"): number;
        attr(name: string): any;
    }
}