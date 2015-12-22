namespace puck.container {
    export interface IWalker<T> {
        next(): T;
    }
}