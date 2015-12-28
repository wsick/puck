namespace puck.vec2 {
    export function create(x: number, y: number): Float32Array {
        var dest = new Float32Array(2);
        dest[0] = x;
        dest[1] = y;
        return dest;
    }

    export function init(x: number, y: number, dest?: Float32Array): Float32Array {
        if (!dest) dest = new Float32Array(2);
        dest[0] = x;
        dest[1] = y;
        return dest;
    }
}