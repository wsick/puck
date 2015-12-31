declare module puck {
    var version: string;
}
declare namespace puck.element {
    enum DirtyFlags {
        none = 0,
        opacity = 1,
        visible = 2,
        transform = 4,
        down = 7,
    }
}
declare namespace puck {
    import IElement = puck.element.IElement;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;
    class Element implements IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: {
            down: element.down.Processor;
        };
        opacity: number;
        visible: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        transformOriginX: number;
        transformOriginY: number;
        resetTransform(): this;
        setTransform(mat: Float32Array): this;
        applyTransform(mat: Float32Array): this;
        constructor(state?: IElementState, composite?: IElementComposite);
        init(state?: IElementState, composite?: IElementComposite): void;
    }
}
declare namespace puck {
    import IContainer = puck.container.IContainer;
    import IElement = puck.element.IElement;
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    class Container extends Element implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];
        processor: {
            down: container.down.Processor;
        };
        constructor(state?: IContainerState, composite?: IContainerComposite);
        init(state?: IContainerState, composite?: IContainerComposite): void;
        walk(): walk.IWalker<element.IElement>;
    }
}
declare namespace puck {
    interface IBrush {
        setup(ctx: CanvasRenderingContext2D, region: la.IRect): any;
        toHtml5Object(): any;
    }
}
declare namespace puck.element {
    interface IElementComposite {
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags): any;
        untaint(oldDirt: DirtyFlags): any;
        reset(): any;
        opacity: number;
        visible: boolean;
        transform: Float32Array;
    }
    class ElementComposite implements IElementComposite {
        private $$dirt;
        opacity: number;
        visible: boolean;
        transform: Float32Array;
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags): void;
        untaint(oldDirt: DirtyFlags): void;
        reset(): void;
    }
}
declare namespace puck.container {
    interface IContainerComposite extends element.IElementComposite {
    }
    class ContainerComposite extends element.ElementComposite implements IContainerComposite {
    }
}
declare namespace puck.element {
    interface IElementState {
        opacity: number;
        visible: boolean;
        offset: la.IPoint;
        size: la.ISize;
        transform: Float32Array;
        transformOrigin: la.IPoint;
        reset(): any;
    }
    class ElementState implements IElementState {
        opacity: number;
        visible: boolean;
        offset: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        transform: Float32Array;
        transformOrigin: {
            x: number;
            y: number;
        };
        reset(): void;
    }
}
declare namespace puck.container {
    interface IContainerState extends element.IElementState {
    }
    class ContainerState extends element.ElementState implements IContainerState {
    }
}
declare namespace puck.container {
    interface IContainer extends element.IElement {
        state: IContainerState;
        composite: IContainerComposite;
        elements: element.IElement[];
        processor: {
            down: down.Processor;
        };
        walk(): walk.IWalker<element.IElement>;
    }
}
declare namespace puck.element {
    interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: {
            down: down.Processor;
        };
    }
}
declare namespace puck.engine {
    function process(el: element.IElement, parent?: element.IElement): void;
}
declare namespace puck.visual {
    interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
    }
    interface IVisualState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
    }
    interface IVisualComposite extends element.IElementComposite {
    }
}
declare namespace puck.walk {
    interface IWalker<T> {
        next(): T;
    }
    function getWalker(el: element.IElement): IWalker<element.IElement>;
}
declare namespace puck.element.down {
    interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        pcomposite: IElementComposite;
    }
    class Processor {
        static instance: Processor;
        isTainted(bag: IProcessorBag): boolean;
        process(bag: IProcessorBag): DirtyFlags;
        clear(bag: IProcessorBag): this;
    }
}
declare namespace puck.container.down {
    import DirtyFlags = puck.element.DirtyFlags;
    interface IProcessorBag extends element.down.IProcessorBag {
        walker: walk.IWalker<element.IElement>;
        state: IContainerState;
        composite: IContainerComposite;
        pcomposite: IContainerComposite;
    }
    class Processor extends element.down.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
declare namespace puck.element.down.opacity {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.element.down.transform {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.element.down.visible {
    function process(bag: IProcessorBag): boolean;
}
