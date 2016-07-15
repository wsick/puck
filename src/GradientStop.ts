namespace puck {
    export interface IGradientStop {
        color: Color;
        offset: number;
    }

    export class GradientStop implements IGradientStop {
        constructor(public color: Color, public offset: number) {
            Object.freeze(this);
        }
    }
}