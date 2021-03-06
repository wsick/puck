declare module puck {
    var version: string;
}
declare namespace puck {
    enum BrushMappingMode {
        relativeToBounds = 0,
        absolute = 1,
    }
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
        font = 16,
        padding = 32,
        extents = 64,
        newbounds = 128,
        invalidate = 256,
        down = 15,
        up = 496,
    }
}
declare namespace puck {
    import IElement = puck.element.IElement;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;
    import IElementProcessor = puck.element.IElementProcessor;
    class Element implements IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;
        stencil: stencil.IStencil;
        constructor(state?: IElementState, composite?: IElementComposite);
        init(state?: IElementState, composite?: IElementComposite): void;
        opacity(): number;
        opacity(value: number): this;
        visible(): boolean;
        visible(value: boolean): this;
        transformOriginX(): number;
        transformOriginX(value: number): this;
        transformOriginY(): number;
        transformOriginY(value: number): this;
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
    import IContainerProcessor = puck.container.IContainerProcessor;
    class Container implements IContainer {
        state: IContainerState;
        composite: IContainerComposite;
        elements: IElement[];
        processor: IContainerProcessor;
        constructor(state?: IContainerState, composite?: IContainerComposite);
        init(state?: IContainerState, composite?: IContainerComposite): void;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;
        opacity(): number;
        opacity(value: number): this;
        visible(): boolean;
        visible(value: boolean): this;
        transformOriginX(): number;
        transformOriginX(value: number): this;
        transformOriginY(): number;
        transformOriginY(value: number): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        resetTransform(): this;
        setTransform(mat: Float32Array): this;
        applyTransform(mat: Float32Array): this;
    }
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import IVisualProcessor = puck.visual.IVisualProcessor;
    class Visual extends Element implements visual.IVisual {
        private $fillwatch;
        private $strokewatch;
        state: IVisualState;
        composite: IVisualComposite;
        processor: IVisualProcessor;
        constructor(state?: IVisualState, composite?: IVisualComposite);
        init(state?: IVisualState, composite?: IVisualComposite): void;
        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;
        sub(attr: string, func: any): any;
    }
}
declare namespace puck.stencil {
    var visual: IStencil;
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    class Ellipse extends Visual implements ellipse.IEllipse {
        init(state?: IVisualState, composite?: IVisualComposite): void;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
    }
}
declare namespace puck {
    enum FillRule {
        evenodd = 0,
        nonzero = 1,
    }
    enum PenLineJoin {
        miter = 0,
        bevel = 1,
        round = 2,
    }
    enum PenLineCap {
        flat = 0,
        square = 1,
        round = 2,
        triangle = 3,
    }
}
declare namespace puck {
    var FontStyle: {
        normal: string;
        italic: string;
        oblique: string;
    };
    var FontStretch: {
        ultraCondensed: string;
        extraCondensed: string;
        condensed: string;
        semiCondensed: string;
        normal: string;
        semiExpanded: string;
        expanded: string;
        extraExpanded: string;
        ultraExpanded: string;
    };
    enum FontWeight {
        thin = 100,
        extraLight = 200,
        light = 300,
        normal = 400,
        medium = 500,
        semiBold = 600,
        bold = 700,
        extraBold = 800,
        black = 900,
        extraBlack = 950,
    }
    interface IFont {
        family: string;
        size: number;
        stretch: string;
        style: string;
        weight: FontWeight;
        toString(): string;
    }
    var defaultFont: IFont;
}
declare namespace puck {
    class FrameDebug {
        private $onBeginProcess;
        private $onEndProcess;
        private $onBeginRender;
        private $onEndRender;
        onBeginProcess(cb: Function): this;
        onEndProcess(cb: Function): this;
        onBeginRender(cb: Function): this;
        onEndRender(cb: Function): this;
        beginProcess(): void;
        endProcess(): void;
        beginRender(): void;
        endRender(): void;
    }
}
declare namespace puck {
    interface IGradientBrush extends IBrush {
        spreadMethod(): GradientSpreadMethod;
        spreadMethod(value: GradientSpreadMethod): this;
        mappingMode(): BrushMappingMode;
        mappingMode(value: BrushMappingMode): this;
        stops(): GradientStops;
        sub(attr: "stops", func: (value: GradientStops) => any): this;
        sub(attr: string, func: any): this;
    }
    abstract class GradientBrush implements IGradientBrush {
        private $cachedBrush;
        private $cachedBounds;
        protected $changer: internal.WatchChanger;
        private $stops;
        private $spreadMethod;
        private $mappingMode;
        constructor();
        spreadMethod(): GradientSpreadMethod;
        spreadMethod(value: GradientSpreadMethod): this;
        mappingMode(): BrushMappingMode;
        mappingMode(value: BrushMappingMode): this;
        stops(): GradientStops;
        sub(attr: string, func: (value: any) => any): this;
        watch(onChanged: () => void): puck.internal.IWatcher;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect): void;
        toHtml5Object(): any;
        protected createBrush(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected abstract createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected abstract createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected abstract createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected mapPoint(region: la.IRect, point: la.IPoint): la.IPoint;
    }
}
declare namespace puck {
    enum GradientSpreadMethod {
        pad = 0,
        reflect = 1,
        repeat = 2,
    }
}
declare namespace puck {
    interface IGradientStop {
        color: Color;
        offset: number;
    }
    class GradientStop implements IGradientStop {
        color: Color;
        offset: number;
        constructor(color: Color, offset: number);
    }
}
declare namespace puck {
    class PuckArray<T> {
        protected $backing: T[];
        protected $changer: internal.WatchChanger;
        length: number;
        clear(): this;
        add(item: T): this;
        addMany(items: T[]): this;
        insert(index: number, item: T): this;
        insertMany(index: number, items: T[]): this;
        edit(oldItem: T, newItem: T): this;
        editAt(index: number, newItem: T): this;
        remove(item: T): this;
        removeAt(index: number): this;
        watch(onChanged: () => void): puck.internal.IWatcher;
        iter(): Iterator<T>;
        static arrayIter<T>(arr: T[]): Iterator<T>;
    }
}
declare namespace puck {
    class GradientStops extends PuckArray<IGradientStop> {
        paddedIter(): Iterator<IGradientStop>;
    }
}
declare namespace puck {
    interface IBrush {
        watch(onChanged: () => void): puck.internal.IWatcher;
        setup(ctx: CanvasRenderingContext2D, region: la.IRect): any;
        toHtml5Object(): any;
    }
}
declare namespace puck {
    import IImageState = puck.image.IImageState;
    import IImageComposite = puck.image.IImageComposite;
    import IImageProcessor = puck.image.IImageProcessor;
    class Image extends Element implements image.IImage {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;
        constructor(state?: IImageState, composite?: IImageComposite);
        init(state?: IImageState, composite?: IImageComposite): void;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        sourceUri(): string;
        sourceUri(value: string): this;
        protected onSourceChanged(): void;
        protected onSourceErrored(err: any): void;
        protected onSourceLoaded(): void;
        protected setNaturalSize(width: number, height: number): void;
    }
}
declare namespace puck {
    import IContainerState = puck.container.IContainerState;
    import IContainerComposite = puck.container.IContainerComposite;
    class Layer extends Container implements layer.ILayer {
        private $ctx;
        private $timer;
        frameDebug: FrameDebug;
        width(): number;
        height(): number;
        init(state?: IContainerState, composite?: IContainerComposite): void;
        attach(ctx: CanvasRenderingContext2D): this;
        activate(): this;
        deactivate(): this;
        process(): this;
        render(): this;
        protected onTick(now: number): void;
    }
}
declare namespace puck {
    interface ILinearGradientBrush extends IGradientBrush {
        start(): la.IPoint;
        start(value: la.IPoint): this;
        end(): la.IPoint;
        end(value: la.IPoint): this;
    }
    class LinearGradientBrush extends GradientBrush implements ILinearGradientBrush {
        private $start;
        private $end;
        start(): la.IPoint;
        start(value: la.IPoint): this;
        end(): la.IPoint;
        end(value: la.IPoint): this;
        protected createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        private createInterpolated(ctx, interpolator);
    }
}
declare namespace puck {
    import IPathState = puck.path.IPathState;
    import IPathComposite = puck.path.IPathComposite;
    import IPathProcessor = puck.path.IPathProcessor;
    class Path extends Visual implements path.IPath {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;
        constructor(state?: IPathState, composite?: IPathComposite);
        init(state?: IPathState, composite?: IPathComposite): void;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        path(): curve.Path;
        path(value: curve.Path): this;
        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
    }
}
declare namespace puck {
    class Points extends PuckArray<la.IPoint> {
    }
}
declare namespace puck {
    import IPolylineState = puck.polyline.IPolylineState;
    import IPathComposite = puck.path.IPathComposite;
    import IPolylineProcessor = puck.polyline.IPolylineProcessor;
    class Polyline extends Visual implements polyline.IPolyline {
        state: polyline.IPolylineState;
        composite: path.IPathComposite;
        processor: IPolylineProcessor;
        constructor(state?: IPolylineState, composite?: IPathComposite);
        init(state?: IPolylineState, composite?: IPathComposite): void;
        points(): Points;
        closed(): boolean;
        closed(value: boolean): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        path(): curve.Path;
        path(value: curve.Path): this;
        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
    }
}
declare namespace puck {
    interface IRadialGradientBrush extends IGradientBrush {
        center(): la.IPoint;
        center(value: la.IPoint): this;
        origin(): la.IPoint;
        origin(value: la.IPoint): this;
        radiusX(): number;
        radiusX(value: number): this;
        radiusY(): number;
        radiusY(value: number): this;
    }
    class RadialGradientBrush extends GradientBrush implements IRadialGradientBrush {
        private $center;
        private $origin;
        private $radius;
        center(): la.IPoint;
        center(value: la.IPoint): this;
        origin(): la.IPoint;
        origin(value: la.IPoint): this;
        radiusX(): number;
        radiusX(value: number): this;
        radiusY(): number;
        radiusY(value: number): this;
        protected createPad(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected createReflect(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        protected createRepeat(ctx: CanvasRenderingContext2D, region: la.IRect): string | CanvasGradient | CanvasPattern;
        private createInterpolated(data, bounds, reflect);
        private getPointData(bounds);
        private fit(ctx, fill, data, bounds);
    }
}
declare namespace puck {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    class Rectangle extends Visual implements rectangle.IRectangle {
        init(state?: IVisualState, composite?: IVisualComposite): void;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
    }
}
declare namespace puck {
    interface ISolidColorBrush extends IBrush {
        color(): Color;
        color(value: Color): this;
    }
    class SolidColorBrush implements ISolidColorBrush {
        private $color;
        private $changer;
        constructor(color?: Color | string);
        color(): Color;
        color(value: Color): this;
        watch(onChanged: () => void): puck.internal.IWatcher;
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
    import ITextState = puck.text.ITextState;
    import IElementComposite = puck.element.IElementComposite;
    import ITextProcessor = puck.text.ITextProcessor;
    class Text extends Element implements text.IText {
        private $fillwatch;
        private $strokewatch;
        state: puck.text.ITextState;
        processor: ITextProcessor;
        constructor(state?: ITextState, composite?: IElementComposite);
        init(state?: ITextState, composite?: IElementComposite): void;
        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        text(): string;
        text(value: string): this;
        fontFamily(): string;
        fontFamily(value: string): this;
        fontSize(): number;
        fontSize(value: number): this;
        fontStretch(): string;
        fontStretch(value: string): this;
        fontStyle(): string;
        fontStyle(value: string): this;
        fontWeight(): number;
        fontWeight(value: number): this;
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
        taint(newDirt: DirtyFlags): this;
        untaint(oldDirt: DirtyFlags): this;
        reset(): this;
        invalidate(): this;
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
        taint(newDirt: DirtyFlags): this;
        untaint(oldDirt: DirtyFlags): this;
        reset(): this;
        invalidate(): this;
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
        mapTransformOrigin(comp: IElementComposite): la.IPoint;
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
        mapTransformOrigin(comp: IElementComposite): la.IPoint;
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
        processor: IContainerProcessor;
        walk(reverse?: boolean): walk.IWalker<element.IElement>;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
    }
    interface IContainerProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}
declare namespace puck.element {
    interface IElement {
        state: IElementState;
        composite: IElementComposite;
        processor: IElementProcessor;
        opacity(): number;
        opacity(value: number): this;
        visible(): boolean;
        visible(value: boolean): this;
        transformOriginX(): number;
        transformOriginX(value: number): this;
        transformOriginY(): number;
        transformOriginY(value: number): this;
    }
    interface IElementProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}
declare namespace puck.ellipse {
    interface IEllipse extends visual.IVisual {
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
    }
}
declare namespace puck.engine {
    function hit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): void;
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
        constructor();
        static hasFillRule: boolean;
        init(ctx: CanvasRenderingContext2D): this;
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
        isPointInStrokeEx(x: number, y: number, thickness: number): boolean;
        setStrokeExtras(lineCap: PenLineCap, lineJoin: PenLineJoin, miterLimit: number): void;
    }
}
declare namespace puck.engine {
    import RenderContext = puck.render.RenderContext;
    function render(el: element.IElement, ctx: RenderContext, region: la.IRect): void;
}
declare namespace puck.fit.extents {
    function calc(extents: la.IRect, stretch: Stretch, natural: la.IRect, size: la.ISize): void;
}
declare namespace puck.fit.transform {
    function calc(transform: Float32Array, stretch: Stretch, natural: la.IRect, size: la.ISize): void;
}
declare namespace puck.font {
    function toString(font: IFont): string;
}
declare namespace puck.image {
    interface IImage extends element.IElement {
        state: IImageState;
        composite: IImageComposite;
        processor: IImageProcessor;
        stencil: stencil.IStencil;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        sourceUri(): string;
        sourceUri(value: string): this;
    }
    interface IImageProcessor {
        down: down.Processor;
        up: up.Processor;
        render: element.render.Processor;
        hit: hit.Processor;
    }
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
        natural: la.IRect;
        getEffectiveStretch(): Stretch;
    }
    class ImageState extends element.ElementState implements IImageState {
        source: IImageSource;
        stretch: Stretch;
        natural: la.IRect;
        reset(): this;
        getEffectiveStretch(): Stretch;
    }
}
declare namespace puck.internal {
    interface IWatcher {
        change(): any;
        unwatch(): any;
    }
    class WatchChanger {
        private $watchers;
        watch(onChanged: () => void): IWatcher;
        on(): void;
    }
}
declare namespace puck.layer {
    interface ILayer extends container.IContainer {
        width(): number;
        height(): number;
    }
}
declare namespace puck.linearGradient {
    interface IInterpolator {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        step(): boolean;
        interpolate(offset: number): number;
    }
    function createRepeatInterpolator(start: la.IPoint, end: la.IPoint, bounds: la.IRect): IInterpolator;
    function createReflectInterpolator(start: la.IPoint, end: la.IPoint, bounds: la.IRect): IInterpolator;
}
declare namespace puck.linearGradient {
    function calcMetrics(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect): void;
}
declare namespace puck.path {
    class Bounder {
        private $path;
        private $filled;
        private $stroked;
        private $pars;
        constructor();
        getPath(): curve.Path;
        setPath(path: curve.Path): void;
        reset(): void;
        getFillRect(dest: la.IRect): this;
        getStrokeRect(dest: la.IRect): this;
        calc(state: IPathState): this;
        protected setStroke(state: IPathState): void;
    }
}
declare namespace puck.path {
    interface IPath extends visual.IVisual {
        state: IPathState;
        composite: IPathComposite;
        processor: IPathProcessor;
        stencil: stencil.IStencil;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        path(): curve.Path;
        path(value: curve.Path): this;
        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
        sub(attr: "path", func: (value: curve.Path) => any): this;
        sub(attr: string, func: any): this;
    }
    interface IPathProcessor {
        down: down.Processor;
        up: up.Processor;
        render: render.Processor;
        hit: hit.Processor;
    }
}
declare namespace puck.path {
    interface IPathComposite extends element.IElementComposite {
        stretchTransform: Float32Array;
        natural: la.IRect;
        bounder: Bounder;
    }
    class PathComposite extends element.ElementComposite implements IPathComposite {
        stretchTransform: Float32Array;
        natural: la.IRect;
        bounder: Bounder;
        reset(): this;
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
declare namespace puck.path {
    interface IPathState extends visual.IVisualState {
        path: curve.Path;
        stretch: Stretch;
        fillRule: FillRule;
        strokeLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;
        getEffectiveStretch(comp: IPathComposite): Stretch;
    }
    class PathState extends visual.VisualState implements IPathState {
        path: curve.Path;
        stretch: Stretch;
        fillRule: FillRule;
        strokeLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;
        reset(): this;
        getEffectiveStretch(comp: IPathComposite): Stretch;
        mapTransformOrigin(comp: IPathComposite): la.IPoint;
    }
}
interface IteratorResult<T> {
    done: boolean;
    value?: T;
}
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
declare namespace puck.polyline {
    interface IPolyline extends visual.IVisual {
        state: IPolylineState;
        composite: path.IPathComposite;
        processor: IPolylineProcessor;
        stencil: stencil.IStencil;
        points(): Points;
        closed(): boolean;
        closed(value: boolean): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
        stretch(): Stretch;
        stretch(value: Stretch): this;
        path(): curve.Path;
        path(value: curve.Path): this;
        fillRule(): FillRule;
        fillRule(value: FillRule): this;
        strokeLineCap(): PenLineCap;
        strokeLineCap(value: PenLineCap): this;
        strokeLineJoin(): PenLineJoin;
        strokeLineJoin(value: PenLineJoin): this;
        strokeMiterLimit(): number;
        strokeMiterLimit(value: number): this;
        sub(attr: "points", func: (value: Points) => any): this;
        sub(attr: "path", func: (value: curve.Path) => any): this;
        sub(attr: string, func: (value: any) => any): this;
    }
    interface IPolylineProcessor {
        down: polyline.down.Processor;
        up: path.up.Processor;
        render: path.render.Processor;
        hit: path.hit.Processor;
    }
}
declare namespace puck.polyline {
    interface IPolylineState extends path.IPathState {
        points: Points;
        closed: boolean;
    }
    class PolylineState extends path.PathState implements IPolylineState {
        points: Points;
        closed: boolean;
        reset(): this;
    }
}
declare namespace puck.radialGradient {
    interface IExtender {
        x0: number;
        y0: number;
        r0: number;
        x1: number;
        y1: number;
        r1: number;
        step(): boolean;
        createGradient(ctx: CanvasRenderingContext2D): CanvasGradient;
    }
    interface IRadialPointData {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        r1: number;
        sx: number;
        sy: number;
        side: number;
        balanced: boolean;
    }
    function createExtender(data: IRadialPointData, bounds: la.IRect): IExtender;
}
declare namespace puck.rectangle {
    interface IRectangle extends visual.IVisual {
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        width(): number;
        width(value: number): this;
        height(): number;
        height(value: number): this;
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
declare namespace puck.stencil {
    var path: IStencil;
}
declare namespace puck.text {
    interface IText extends element.IElement {
        state: ITextState;
        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;
        x(): number;
        x(value: number): this;
        y(): number;
        y(value: number): this;
        text(): string;
        text(value: string): this;
        fontFamily(): string;
        fontFamily(value: string): this;
        fontSize(): number;
        fontSize(value: number): this;
        fontStretch(): string;
        fontStretch(value: string): this;
        fontStyle(): string;
        fontStyle(value: string): this;
        fontStyle(): string;
        fontStyle(value: string): this;
        fontWeight(): number;
        fontWeight(value: number): this;
    }
    interface ITextProcessor {
        down: element.down.Processor;
        up: text.up.Processor;
        render: text.render.Processor;
        hit: text.hit.Processor;
    }
}
declare namespace puck.text {
    import ElementState = puck.element.ElementState;
    interface ITextState extends element.IElementState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        font: IFont;
        text: string;
    }
    class TextState extends ElementState implements ITextState {
        fill: IBrush;
        stroke: IBrush;
        strokeThickness: number;
        font: puck.IFont;
        text: string;
        reset(): this;
    }
}
declare namespace puck.visual {
    interface IVisual extends element.IElement {
        state: IVisualState;
        composite: IVisualComposite;
        processor: IVisualProcessor;
        stencil: stencil.IStencil;
        fill(): IBrush;
        fill(value: IBrush): this;
        stroke(): IBrush;
        stroke(value: IBrush): this;
        strokeThickness(): number;
        strokeThickness(value: number): this;
        sub(attr: "fill", func: (value: IBrush) => any): this;
        sub(attr: "stroke", func: (value: IBrush) => any): this;
        sub(attr: string, func: any): this;
    }
    interface IVisualProcessor {
        down: element.down.Processor;
        up: element.up.Processor;
        render: visual.render.Processor;
        hit: visual.hit.Processor;
    }
}
declare namespace puck.visual {
    import ElementComposite = puck.element.ElementComposite;
    interface IVisualComposite extends element.IElementComposite {
    }
    class VisualComposite extends ElementComposite implements IVisualComposite {
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
declare namespace puck.element.hit {
    class Processor {
        static instance: Processor;
        process(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
        protected prehit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array): boolean;
        protected hit(el: element.IElement, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
        protected draw(el: visual.IVisual, ctx: puck.render.RenderContext): void;
    }
}
declare namespace puck.container.hit {
    class Processor extends element.hit.Processor {
        static instance: Processor;
        protected hit(el: IContainer, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
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
declare namespace puck.font.height {
    var cache: {
        hits: number;
        misses: number;
    };
    function get(font: IFont | string): number;
}
declare namespace puck.font.height {
    function measure(font: IFont | string): number;
}
declare namespace puck.font.width {
    function measure(font: IFont | string, text: string): number;
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
declare namespace puck.image.hit {
    class Processor extends element.hit.Processor {
        static instance: Processor;
        protected hit(el: IImage, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
    }
}
declare namespace puck.image.up.extents {
    import IProcessorBag = puck.element.up.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.image.up {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    class Processor extends element.up.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
declare namespace puck.path.down.natural {
    import IProcessorBag = puck.element.down.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.path.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    class Processor extends element.down.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
declare namespace puck.path.down.stretch {
    import IProcessorBag = puck.element.down.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.visual.hit {
    class Processor extends element.hit.Processor {
        static instance: Processor;
        protected prehit(el: visual.IVisual, ctx: puck.render.RenderContext, pos: Float32Array): boolean;
        protected hit(el: visual.IVisual, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
        protected transformLocal(el: element.IElement, ctx: puck.render.RenderContext): void;
    }
}
declare namespace puck.path.hit {
    class Processor extends visual.hit.Processor {
        static instance: Processor;
        protected hit(el: IPath, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
        protected transformLocal(path: IPath, ctx: puck.render.RenderContext): void;
    }
}
declare namespace puck.visual.render {
    interface IProcessorBag extends puck.element.render.IProcessorBag {
        stencil: stencil.IStencil;
    }
    class Processor extends element.render.Processor {
        static instance: Processor;
        protected render(bag: IProcessorBag): boolean;
        protected transformLocal(ctx: puck.render.RenderContext, bag: stencil.IStencilBag): void;
        protected fill(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag): void;
        protected stroke(ctx: puck.render.RenderContext, state: IVisualState, sbag: stencil.IStencilBag): void;
    }
}
declare namespace puck.path.render {
    class Processor extends visual.render.Processor {
        static instance: Processor;
        protected transformLocal(ctx: puck.render.RenderContext, bag: stencil.IStencilBag): void;
        protected fill(ctx: puck.render.RenderContext, state: IPathState, sbag: stencil.IStencilBag): void;
        protected stroke(ctx: puck.render.RenderContext, state: IPathState, sbag: stencil.IStencilBag): void;
    }
}
declare namespace puck.path.up.extents {
    import IProcessorBag = puck.element.up.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.path.up {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
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
declare namespace puck.polyline.down.points {
    import IProcessorBag = puck.element.down.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.polyline.down {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    class Processor extends path.down.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
declare namespace puck.text.hit {
    class Processor extends element.hit.Processor {
        static instance: Processor;
        protected prehit(el: text.IText, ctx: puck.render.RenderContext, pos: Float32Array): boolean;
        protected hit(el: text.IText, ctx: puck.render.RenderContext, pos: Float32Array, hitlist: element.IElement[]): boolean;
    }
}
declare namespace puck.text.render {
    import IProcessorBag = puck.element.render.IProcessorBag;
    class Processor extends element.render.Processor {
        static instance: Processor;
        protected render(bag: IProcessorBag): boolean;
        protected fill(ctx: CanvasRenderingContext2D, state: ITextState, region: la.IRect): void;
        protected stroke(ctx: CanvasRenderingContext2D, state: ITextState, region: la.IRect): void;
    }
}
declare namespace puck.text.up.font {
    import IProcessorBag = puck.element.up.IProcessorBag;
    function process(bag: IProcessorBag): boolean;
}
declare namespace puck.text.up {
    import DirtyFlags = puck.element.DirtyFlags;
    import IProcessorBag = puck.element.up.IProcessorBag;
    class Processor extends element.up.Processor {
        static instance: Processor;
        process(bag: IProcessorBag): DirtyFlags;
    }
}
