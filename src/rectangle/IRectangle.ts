namespace puck.rectangle {
    export interface IRectangle extends visual.IVisual {
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
    }
}