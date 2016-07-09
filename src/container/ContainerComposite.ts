/// <reference path="../element/ElementComposite" />

namespace puck.container {
    export interface IContainerComposite extends element.IElementComposite {
    }
    export class ContainerComposite extends element.ElementComposite implements IContainerComposite {
        constructor() {
            super();
            // NOTE: Since containers have children, bounds are independent of extents
            this.bounds = la.rect.init(0, 0, 0, 0);
        }

        reset(): this {
            super.reset();
            la.rect.init(0, 0, 0, 0, this.bounds);
            return this;
        }
    }
}