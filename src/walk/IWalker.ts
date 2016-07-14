namespace puck.walk {
    export interface IWalker<T> {
        next(): T;
    }

    var EMPTY_WALKER: walk.IWalker<element.IElement> = {
        next() {
            return undefined;
        }
    };

    export function getWalker(el: element.IElement, reverse?: boolean): IWalker<element.IElement> {
        if (typeof (<container.IContainer>el).walk === "function")
            return (<container.IContainer>el).walk(reverse);
        return EMPTY_WALKER;
    }
}