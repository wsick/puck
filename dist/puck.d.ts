declare module puck {
    var version: string;
}
declare namespace puck {
    class Color {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(color?: Color | string);
        add(color2: Color): Color;
        subtract(color2: Color): Color;
        multiply(factor: number): Color;
        toString(): string;
        toHexString(): string;
        toHexStringNoAlpha(): string;
        static equals(color1: Color, color2: Color): boolean;
        static lerp(start: Color, end: Color, p: number): Color;
        static fromRgba(r: number, g: number, b: number, a: number): Color;
        static fromHex(hex: string): Color;
    }
    var KnownColors: {
        AliceBlue: Color;
        AntiqueWhite: Color;
        Aqua: Color;
        Aquamarine: Color;
        Azure: Color;
        Beige: Color;
        Bisque: Color;
        Black: Color;
        BlanchedAlmond: Color;
        Blue: Color;
        BlueViolet: Color;
        Brown: Color;
        BurlyWood: Color;
        CadetBlue: Color;
        Chartreuse: Color;
        Chocolate: Color;
        Coral: Color;
        CornflowerBlue: Color;
        Cornsilk: Color;
        Crimson: Color;
        Cyan: Color;
        DarkBlue: Color;
        DarkCyan: Color;
        DarkGoldenrod: Color;
        DarkGray: Color;
        DarkGreen: Color;
        DarkKhaki: Color;
        DarkMagenta: Color;
        DarkOliveGreen: Color;
        DarkOrange: Color;
        DarkOrchid: Color;
        DarkRed: Color;
        DarkSalmon: Color;
        DarkSeaGreen: Color;
        DarkSlateBlue: Color;
        DarkSlateGray: Color;
        DarkTurquoise: Color;
        DarkViolet: Color;
        DeepPink: Color;
        DeepSkyBlue: Color;
        DimGray: Color;
        DodgerBlue: Color;
        Firebrick: Color;
        FloralWhite: Color;
        ForestGreen: Color;
        Fuchsia: Color;
        Gainsboro: Color;
        GhostWhite: Color;
        Gold: Color;
        Goldenrod: Color;
        Gray: Color;
        Green: Color;
        GreenYellow: Color;
        Honeydew: Color;
        HotPink: Color;
        IndianRed: Color;
        Indigo: Color;
        Ivory: Color;
        Khaki: Color;
        Lavender: Color;
        LavenderBlush: Color;
        LawnGreen: Color;
        LemonChiffon: Color;
        LightBlue: Color;
        LightCoral: Color;
        LightCyan: Color;
        LightGoldenrodYellow: Color;
        LightGray: Color;
        LightGreen: Color;
        LightPink: Color;
        LightSalmon: Color;
        LightSeaGreen: Color;
        LightSkyBlue: Color;
        LightSlateGray: Color;
        LightSteelBlue: Color;
        LightYellow: Color;
        Lime: Color;
        LimeGreen: Color;
        Linen: Color;
        Magenta: Color;
        Maroon: Color;
        MediumAquamarine: Color;
        MediumBlue: Color;
        MediumOrchid: Color;
        MediumPurple: Color;
        MediumSeaGreen: Color;
        MediumSlateBlue: Color;
        MediumSpringGreen: Color;
        MediumTurquoise: Color;
        MediumVioletRed: Color;
        MidnightBlue: Color;
        MintCream: Color;
        MistyRose: Color;
        Moccasin: Color;
        NavajoWhite: Color;
        Navy: Color;
        OldLace: Color;
        Olive: Color;
        OliveDrab: Color;
        Orange: Color;
        OrangeRed: Color;
        Orchid: Color;
        PaleGoldenrod: Color;
        PaleGreen: Color;
        PaleTurquoise: Color;
        PaleVioletRed: Color;
        PapayaWhip: Color;
        PeachPuff: Color;
        Peru: Color;
        Pink: Color;
        Plum: Color;
        PowderBlue: Color;
        Purple: Color;
        Red: Color;
        RosyBrown: Color;
        RoyalBlue: Color;
        SaddleBrown: Color;
        Salmon: Color;
        SandyBrown: Color;
        SeaGreen: Color;
        SeaShell: Color;
        Sienna: Color;
        Silver: Color;
        SkyBlue: Color;
        SlateBlue: Color;
        SlateGray: Color;
        Snow: Color;
        SpringGreen: Color;
        SteelBlue: Color;
        Tan: Color;
        Teal: Color;
        Thistle: Color;
        Tomato: Color;
        Transparent: Color;
        Turquoise: Color;
        Violet: Color;
        Wheat: Color;
        White: Color;
        WhiteSmoke: Color;
        Yellow: Color;
        YellowGreen: Color;
    };
}
declare namespace puck.element {
    enum DirtyFlags {
        none = 0,
        opacity = 1,
        visible = 2,
        stretch = 4,
        transform = 8,
        padding = 16,
        extents = 32,
        newbounds = 64,
        invalidate = 128,
        down = 15,
        up = 112,
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
            up: element.up.Processor;
            render: element.render.Processor;
        };
        stencil: stencil.IStencil;
        constructor(state?: IElementState, composite?: IElementComposite);
        init(state?: IElementState, composite?: IElementComposite): void;
        opacity: number;
        visible: boolean;
        transformOriginX: number;
        transformOriginY: number;
        resetTransform(): this;
        setTransform(mat: Float32Array): this;
        applyTransform(mat: Float32Array): this;
    }
}
declare namespace puck {
    import IContainer = puck.container.IContainer;
    import IElement = puck.element.IElement;
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    class Container implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];
        processor: {
            down: container.down.Processor;
            up: container.up.Processor;
            render: container.render.Processor;
        };
        constructor(state?: IContainerState, composite?: IContainerComposite);
        init(state?: IContainerState, composite?: IContainerComposite): void;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;
        opacity: number;
        visible: boolean;
        x: number;
        y: number;
        transformOriginX: number;
        transformOriginY: number;
        resetTransform(): this;
        setTransform(mat: Float32Array): this;
        applyTransform(mat: Float32Array): this;
    }
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    class Visual extends Element implements visual.IVisual {
        private $fillwatch;
        private $strokewatch;
        state: IVisualState;
        composite: IVisualComposite;
        processor: {
            down: element.down.Processor;
            up: element.up.Processor;
            render: visual.render.Processor;
        };
        constructor(state?: IVisualState, composite?: IVisualComposite);
        init(state?: IVisualState, composite?: IVisualComposite): void;
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
    }
}
declare namespace puck.stencil {
    var visual: IStencil;
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    class Ellipse extends Visual {
        init(state?: IVisualState, composite?: IVisualComposite): void;
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
declare namespace puck {
    enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    enum PenLineCap {
        Flat = 0,
        Square = 1,
        Round = 2,
        Triangle = 3,
    }
}
declare namespace puck {
    class FrameDebug {
        private $onBegin;
        private $onEnd;
        onBegin(cb: Function): void;
        onEnd(cb: Function): void;
        begin(): void;
        end(): void;
    }
}
declare namespace puck {
    interface IBrush {
        watch(onChanged: () => void): IBrushWatcher;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect): any;
        toHtml5Object(): any;
    }
    interface IBrushWatcher {
        change(): any;
        unwatch(): any;
    }
}
declare namespace puck {
    import IImageState = puck.image.IImageState;
    import IImageComposite = puck.image.IImageComposite;
    class Image extends Element {
        state: IImageState;
        composite: IImageComposite;
        stencil: stencil.IStencil;
        init(state?: IImageState, composite?: IImageComposite): void;
        sourceUri: string;
        stretch: Stretch;
        x: number;
        y: number;
        width: number;
        height: number;
        protected onSourceChanged(): void;
        protected onSourceErrored(err: any): void;
        protected onSourceLoaded(): void;
        protected setNaturalSize(width: number, height: number): void;
    }
}
declare namespace puck {
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    class Layer extends Container {
        private $ctx;
        private $timer;
        private $collector;
        frameDebug: FrameDebug;
        constructor(ctx: CanvasRenderingContext2D);
        width: number;
        height: number;
        init(state?: IContainerState, composite?: IContainerComposite): void;
        activate(): this;
        deactivate(): this;
        protected onTick(now: number): void;
    }
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    class Rectangle extends Visual {
        init(state?: IVisualState, composite?: IVisualComposite): void;
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
declare namespace puck {
    class SolidColorBrush implements IBrush {
        private $color;
        private $watchers;
        constructor(color?: Color | string);
        color: Color;
        watch(onChanged: () => void): puck.IBrushWatcher;
        protected onChanged(): void;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect): void;
        toHtml5Object(): any;
    }
}
declare namespace puck {
    enum Stretch {
        none = 0,
        fill = 1,
        uniform = 2,
        uniformToFill = 3,
    }
}
declare namespace puck {
    class Timer {
        callback: FrameRequestCallback;
        private enabled;
        private active;
        constructor(callback: FrameRequestCallback);
        enable(): void;
        disable(): void;
        protected onFrame(now: number): void;
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
        padding: la.IPadding;
        extents: la.IRect;
        paint: la.IRect;
    }
    class ElementComposite implements IElementComposite {
        private $$dirt;
        opacity: number;
        visible: boolean;
        transform: Float32Array;
        padding: la.IPadding;
        extents: la.IRect;
        paint: la.IRect;
        hasDirt(match: DirtyFlags): boolean;
        taint(newDirt: DirtyFlags): void;
        untaint(oldDirt: DirtyFlags): void;
        reset(): this;
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
        reset(): this;
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
            up: up.Processor;
            render: render.Processor;
        };
        walk(reverse?: boolean): walk.IWalker<element.IElement>;
    }
}
declare namespace puck.element {
    interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: {
            down: down.Processor;
            up: up.Processor;
            render: render.Processor;
        };
    }
}
declare namespace puck.engine {
    function process(el: element.IElement, parent?: element.IElement): void;
}
declare namespace puck.render {
    class RenderContext {
        private $$transforms;
        currentTransform: Float32Array;
        hasFillRule: boolean;
        raw: CanvasRenderingContext2D;
        size: RenderContextSize;
        constructor(ctx: CanvasRenderingContext2D);
        static hasFillRule: boolean;
        applyDpiRatio(): void;
        save(): void;
        restore(): void;
        setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        resetTransform(): void;
        transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        scale(x: number, y: number): void;
        rotate(angle: number): void;
        translate(x: number, y: number): void;
        apply(mat: Float32Array): void;
        preapply(mat: Float32Array): void;
        clipRect(rect: la.IRect): void;
        fillEx(region: la.IRect, brush: IBrush, fillRule?: FillRule): void;
        strokeEx(region: la.IRect, brush: IBrush, thickness: number): void;
        isPointInStrokeEx(pars: IStrokeParameters, x: number, y: number): boolean;
    }
}
declare namespace puck.engine {
    import RenderContext = puck.render.RenderContext;
    function render(el: element.IElement, ctx: RenderContext, region: la.IRect): void;
}
declare namespace puck.image {
    interface IImageSource {
        uri: string;
        naturalWidth: number;
        naturalHeight: number;
        draw(ctx: CanvasRenderingContext2D): any;
        watch(onChanged: Function, onErrored: Function, onLoaded: Function): IImageWatcher;
        reset(): any;
    }
    interface IImageWatcher {
        change(): any;
        error(err: any): any;
        load(): any;
        unwatch(): any;
    }
}
declare namespace puck.image {
    interface IImageComposite extends element.IElementComposite {
        stretchTransform: Float32Array;
    }
    class ImageComposite extends element.ElementComposite implements IImageComposite {
        stretchTransform: Float32Array;
        reset(): this;
    }
}
declare namespace puck.image {
    class ImageSource implements IImageSource {
        private $el;
        private $watchers;
        constructor();
        reset(): void;
        uri: string;
        naturalWidth: number;
        naturalHeight: number;
        draw(ctx: CanvasRenderingContext2D): void;
        watch(onChanged: () => any, onErrored: () => any, onLoaded: () => any): IImageWatcher;
        protected onChanged(): void;
        protected onErrored(e: ErrorEvent): void;
        protected onLoaded(): void;
    }
}
declare namespace puck.image {
    interface IImageState extends element.IElementState {
        source: IImageSource;
        stretch: Stretch;
        naturalSize: la.ISize;
        getEffectiveStretch(): Stretch;
    }
    class ImageState extends element.ElementState implements IImageState {
        source: IImageSource;
        stretch: Stretch;
        naturalSize: la.ISize;
        reset(): this;
        getEffectiveStretch(): Stretch;
    }
}
declare namespace puck.render {
    interface IStrokeParameters {
        stroke: IBrush;
        strokeThickness: number;
        strokeLineJoin: PenLineJoin;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeMiterLimit: number;
    }
}
declare namespace puck.render {
    function getNaturalCanvasSize(canvas: HTMLCanvasElement): la.ISize;
}
declare namespace puck.render {
    class RenderContextSize {
        private $$ctx;
        private $$desiredWidth;
        private $$desiredHeight;
        private $$changed;
        private $$lastDpiRatio;
        desiredWidth: number;
        desiredHeight: number;
        paintWidth: number;
        paintHeight: number;
        dpiRatio: number;
        init(ctx: CanvasRenderingContext2D): void;
        queueResize(width: number, height: number): RenderContextSize;
        commitResize(): RenderContextSize;
        updateDpiRatio(): boolean;
        private $adjustCanvas();
    }
}
declare namespace puck.render.zoom {
    var calc: () => number;
}
declare namespace puck.stencil {
    import IRect = la.IRect;
    import RenderContext = puck.render.RenderContext;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;
    interface IStencilBag {
        state: IElementState;
        composite: IElementComposite;
        fillRect: IRect;
        strokeRect: IRect;
    }
    interface IStencil {
        draft(bag: IStencilBag): any;
        draw(ctx: RenderContext, bag: IStencilBag): any;
    }
    var empty: IStencil;
}
declare namespace puck.visual {
    interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: {
            down: element.down.Processor;
            up: element.up.Processor;
            render: visual.render.Processor;
        };
        stencil: stencil.IStencil;
    }
}
declare namespace puck.visual {
    import ElementComposite = puck.element.ElementComposite;
    interface IVisualComposite extends element.IElementComposite {
    }
    class VisualComposite extends ElementComposite implements IVisualComposite {
    }
}
declare namespace puck.visual {
    import ElementState = puck.element.ElementState;
    interface IVisualState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
    }
    class VisualState extends ElementState implements IVisualState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        reset(): this;
    }
}
declare namespace puck.walk {
    interface IWalker<T> {
        next(): T;
    }
    function getWalker(el: element.IElement, reverse?: boolean): IWalker<element.IElement>;
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
declare namespace puck.element.render {
    import RenderContext = puck.render.RenderContext;
    interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        ctx: RenderContext;
        inregion: la.IRect;
        curregion: la.IRect;
        stencil: stencil.IStencil;
    }
    enum SkipResult {
        none = 0,
        render = 2,
        post = 4,
        all = 6,
    }
    class Processor {
        static instance: Processor;
        process(bag: IProcessorBag): void;
        clear(bag: IProcessorBag): this;
        protected prerender(bag: IProcessorBag): SkipResult;
        protected render(bag: IProcessorBag): void;
        protected postrender(bag: IProcessorBag): void;
        protected createStencilBag(bag: IProcessorBag): stencil.IStencilBag;
    }
}
declare namespace puck.container.render {
    interface IProcessorBag extends element.render.IProcessorBag {
        walker: walk.IWalker<element.IElement>;
        composite: IContainerComposite;
    }
    class Processor extends element.render.Processor {
        static instance: Processor;
        protected render(bag: IProcessorBag): void;
    }
}
declare namespace puck.container.up.extents {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.container.up.invalidate {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.element.up {
    interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        ccomposites: IElementComposite[];
    }
    class Processor {
        static instance: Processor;
        isTainted(bag: IProcessorBag): boolean;
        process(bag: IProcessorBag): DirtyFlags;
        clear(bag: IProcessorBag): this;
    }
}
declare namespace puck.element.up.newbounds {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.container.up {
    import DirtyFlags = puck.element.DirtyFlags;
    interface IProcessorBag extends element.up.IProcessorBag {
        state: IContainerState;
        composite: IContainerComposite;
    }
    class Processor extends element.up.Processor {
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
declare namespace puck.element.render.narrow {
    function process(bag: IProcessorBag): void;
}
declare namespace puck.element.render.prepare {
    function process(bag: IProcessorBag): void;
}
declare namespace puck.element.render.should {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.element.render.validate {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.element.up.extents {
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.image.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    class Processor extends element.down.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
declare namespace puck.image.down.stretch {
    import IProcessorBag = puck.element.down.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.image.up.extents {
    import IProcessorBag = puck.element.up.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.image.up {
    import DirtyFlags = puck.element.DirtyFlags;
    import IProcessorBag = puck.element.up.IProcessorBag;
    class Processor extends element.up.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
interface CanvasRenderingContext2D {
    backingStorePixelRatio: number;
}
interface CanvasRenderingContext2D {
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, antiClockwise?: boolean): any;
}
interface CanvasRenderingContext2D {
    isPointInStroke(x: number, y: number): boolean;
}
declare namespace puck.visual.render {
    interface IProcessorBag extends puck.element.render.IProcessorBag {
        stencil: stencil.IStencil;
    }
    class Processor extends element.render.Processor {
        static instance: Processor;
        protected render(bag: IProcessorBag): boolean;
        protected fill(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag): void;
        protected stroke(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag): void;
    }
}
