/// <reference path="../element/ElementComposite" />

namespace puck.visual {
    import ElementComposite = puck.element.ElementComposite;

    export interface IVisualComposite extends element.IElementComposite {
    }

    export class VisualComposite extends ElementComposite implements IVisualComposite {
    }
}