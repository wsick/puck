namespace puck.layer {
    export interface ILayer extends container.IContainer {
        width(): number;
        height(): number;
    }
}