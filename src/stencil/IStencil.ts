namespace puck.stencil {
    import IVisualState = puck.visual.IVisualState;
    import IVisualComposite = puck.visual.IVisualComposite;
    import IRect = la.IRect;
    import RenderContext = puck.render.RenderContext;

    export interface IStencilBag {
        state: IVisualState;
        composite: IVisualComposite;
        fillRect: IRect;
        strokeRect: IRect;
    }

    export function createBag(state: IVisualState, composite: IVisualComposite) {
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