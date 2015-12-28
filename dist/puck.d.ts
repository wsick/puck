declare namespace puck.mat3 {
    function create(src?: number[] | Float32Array): Float32Array;
    function copyTo(src: Float32Array, dest: Float32Array): Float32Array;
    function init(dest: Float32Array, m11: number, m12: number, m21: number, m22: number, x0: number, y0: number): Float32Array;
    function identity(dest?: Float32Array): Float32Array;
    function equal(a: Float32Array, b: Float32Array): boolean;
    function multiply(a: Float32Array, b: Float32Array, dest?: Float32Array): Float32Array;
    function inverse(mat: Float32Array, dest?: Float32Array): Float32Array;
    function transformVec2(mat: Float32Array, vec: Float32Array, dest?: Float32Array): Float32Array;
    function createTranslate(x: number, y: number, dest?: Float32Array): Float32Array;
    function translate(mat: Float32Array, x: number, y: number): Float32Array;
    function createScale(sx: number, sy: number, dest?: Float32Array): Float32Array;
    function scale(mat: Float32Array, sx: number, sy: number): Float32Array;
    function createRotate(angleRad: number, dest?: Float32Array): Float32Array;
    function createSkew(angleRadX: number, angleRadY: number, dest?: Float32Array): Float32Array;
    function preapply(dest: Float32Array, mat: Float32Array): Float32Array;
    function apply(dest: Float32Array, mat: Float32Array): Float32Array;
}
declare namespace puck.vec2 {
    function create(x: number, y: number): Float32Array;
    function init(x: number, y: number, dest?: Float32Array): Float32Array;
    function clone(src: Float32Array, dest?: Float32Array): Float32Array;
    function reverse(src: Float32Array, dest?: Float32Array): Float32Array;
    function orthogonal(src: Float32Array, dest?: Float32Array): Float32Array;
    function normalize(src: Float32Array, dest?: Float32Array): Float32Array;
    function rotate(src: Float32Array, theta: number, dest?: Float32Array): Float32Array;
    function angleBetween(u: Float32Array, v: Float32Array): number;
    function isClockwiseTo(v1: Float32Array, v2: Float32Array): boolean;
    function intersection(s1: Float32Array, d1: Float32Array, s2: Float32Array, d2: Float32Array): Float32Array;
}
