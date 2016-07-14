namespace puck.stencil {
    import IRect = la.IRect;
    import RenderContext = puck.render.RenderContext;
    import IElementState = puck.element.IElementState;
    import IElementComposite = puck.element.IElementComposite;

    export interface IStencilBag {
        state: IElementState;
        composite: IElementComposite;
        fillRect: IRect;
        strokeRect: IRect;
    }

    export function createBag(state: IElementState, composite: IElementComposite) {
        return <IStencilBag>{
            state: state,
            composite: composite,
            fillRect: la.rect.init(0, 0, 0, 0),
            strokeRect: la.rect.init(0, 0, 0, 0),
        };
    }

    export interface IStencil {
        draft(bag: IStencilBag);
        draw(ctx: RenderContext, bag: IStencilBag);
    }

    export var empty = <IStencil>{
        draft(bag: IStencilBag) {
        },
        draw(ctx: RenderContext, bag: IStencilBag) {
        },
    };
}