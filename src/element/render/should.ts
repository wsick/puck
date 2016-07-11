namespace puck.element.render.should {
    import rect = la.rect;

    export function process(bag: IProcessorBag): boolean {
        var r = rect.transform(bag.composite.extents, bag.ctx.currentTransform, bag.curregion);
        rect.roundOut(r);
        rect.intersection(r, bag.inregion);
        return r.width > 0 && r.height > 0;
    }
}