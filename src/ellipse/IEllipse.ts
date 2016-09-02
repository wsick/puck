namespace puck.ellipse {
    export interface IEllipse extends visual.IVisual {
        attr(name: "x"): number;
        attr(name: "x", value: number): this;
        attr(name: "y"): number;
        attr(name: "y", value: number): this;
        attr(name: "width"): number;
        attr(name: "width", value: number): this;
        attr(name: "height"): number;
        attr(name: "height", value: number): this;
        attr(name: string): any;
        attr(name: string, value: any): this;
    }
}