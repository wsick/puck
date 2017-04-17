namespace puck.walk {
    export interface IDeepWalker<T> extends IWalker<T> {
        parent: T;
    }
    export function deep(el: element.IElement): IDeepWalker<element.IElement> {
        var walkList: element.IElement[] = [el];
        var parentList: element.IElement[] = [];
        var last: element.IElement;
        var parent: element.IElement;

        var walker = {
            parent: undefined,
            next(): element.IElement {
                if (last) {
                    for (var sub = getWalker(last), i = 0, cur = sub.next(); cur != null; cur = sub.next(), i++) {
                        walkList.splice(i, 0, cur);
                        parentList.unshift(last);
                    }
                }
                parent = parentList.shift();
                return (last = walkList.shift());
            }
        };
        Object.defineProperties(walker, {
            "parent": {
                get() {
                    return parent;
                }
            }
        });
        return walker;
    }
}